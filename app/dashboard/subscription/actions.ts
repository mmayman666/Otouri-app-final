"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { getStripe, STRIPE_PRICE_IDS } from "@/lib/stripe"

export async function createCheckoutSession() {
  const stripe = getStripe()

  if (!stripe) {
    throw new Error("Stripe not configured")
  }

  const supabase = createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  // Get or create customer
  let customerId: string

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single()

  if (subscription?.stripe_customer_id) {
    customerId = subscription.stripe_customer_id
  } else {
    // Create new customer
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: {
        user_id: user.id,
      },
    })
    customerId = customer.id

    // Update subscription record
    await supabase.from("subscriptions").update({ stripe_customer_id: customerId }).eq("user_id", user.id)
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: STRIPE_PRICE_IDS.premium_monthly,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/subscription?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/subscription?canceled=true`,
    metadata: {
      user_id: user.id,
    },
  })

  if (session.url) {
    redirect(session.url)
  }

  throw new Error("Failed to create checkout session")
}

export async function createPortalSession() {
  const stripe = getStripe()

  if (!stripe) {
    throw new Error("Stripe not configured")
  }

  const supabase = createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  // Get customer ID
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single()

  if (!subscription?.stripe_customer_id) {
    throw new Error("No customer found")
  }

  // Create portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/subscription`,
  })

  redirect(session.url)
}

export async function getUserSubscription() {
  const supabase = createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  // Get or create subscription data
  let { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single()

  if (!subscription) {
    // Create default subscription if it doesn't exist
    const { data: newSubscription, error: subError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        plan_type: "free",
        status: "active",
      })
      .select()
      .single()

    if (subError) {
      console.error("Error creating subscription:", subError)
    } else {
      subscription = newSubscription
    }
  }

  // Get or create credits data
  let { data: credits } = await supabase.from("user_credits").select("*").eq("user_id", user.id).single()

  if (!credits) {
    // Create default credits if they don't exist
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1)
    nextMonth.setHours(0, 0, 0, 0)

    const { data: newCredits, error: creditsError } = await supabase
      .from("user_credits")
      .insert({
        user_id: user.id,
        credits_used: 0,
        credits_limit: 10,
        reset_date: nextMonth.toISOString(),
      })
      .select()
      .single()

    if (creditsError) {
      console.error("Error creating credits:", creditsError)
    } else {
      credits = newCredits
    }
  }

  return {
    subscription,
    credits,
  }
}

export async function consumeCredit(action: string) {
  const supabase = createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  // Check if user has premium subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan_type, status")
    .eq("user_id", user.id)
    .single()

  // Premium users have unlimited credits
  if (subscription?.plan_type === "premium" && subscription?.status === "active") {
    // Log usage for analytics
    await supabase.from("usage_logs").insert({
      user_id: user.id,
      action,
      credits_consumed: 0,
      plan_type: "premium",
    })
    return { success: true, creditsRemaining: -1 }
  }

  // For free users, check and consume credits
  const { data: credits, error: creditsError } = await supabase
    .from("user_credits")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (creditsError || !credits) {
    throw new Error("Credits data not found")
  }

  // Check if user has enough credits
  if (credits.credits_used >= credits.credits_limit) {
    return { success: false, error: "Credit limit exceeded", creditsRemaining: 0 }
  }

  // Consume credit
  const { error: updateError } = await supabase
    .from("user_credits")
    .update({
      credits_used: credits.credits_used + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)

  if (updateError) {
    throw new Error("Failed to consume credit")
  }

  // Log usage
  await supabase.from("usage_logs").insert({
    user_id: user.id,
    action,
    credits_consumed: 1,
    plan_type: "free",
  })

  return {
    success: true,
    creditsRemaining: credits.credits_limit - credits.credits_used - 1,
  }
}

export async function checkAndConsumeCredits(actionType: string, creditsNeeded = 1) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  // Get user subscription and credits - with fallback creation
  let { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan_type, status")
    .eq("user_id", user.id)
    .single()

  if (!subscription) {
    // Create default subscription
    const { data: newSub } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        plan_type: "free",
        status: "active",
      })
      .select("plan_type, status")
      .single()
    subscription = newSub
  }

  // If premium plan, allow unlimited usage
  if (subscription?.plan_type === "premium" && subscription?.status === "active") {
    // Log usage for premium users (for analytics)
    await supabase.from("usage_logs").insert({
      user_id: user.id,
      action_type: actionType,
      credits_consumed: 0, // Premium users don't consume credits
    })

    return { success: true, remainingCredits: -1 }
  }

  // For free plan, check credits
  let { data: credits } = await supabase.from("user_credits").select("*").eq("user_id", user.id).single()

  if (!credits) {
    // Create default credits
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1)
    nextMonth.setHours(0, 0, 0, 0)

    const { data: newCredits } = await supabase
      .from("user_credits")
      .insert({
        user_id: user.id,
        credits_used: 0,
        credits_limit: 10,
        reset_date: nextMonth.toISOString(),
      })
      .select()
      .single()
    credits = newCredits
  }

  if (!credits) {
    throw new Error("Failed to create or fetch credits")
  }

  // Check if credits need to be reset (monthly)
  const now = new Date()
  const resetDate = new Date(credits.reset_date)

  if (now >= resetDate) {
    // Reset credits
    const nextResetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    await supabase
      .from("user_credits")
      .update({
        credits_used: 0,
        reset_date: nextResetDate.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)

    // Refresh credits data
    const { data: refreshedCredits } = await supabase.from("user_credits").select("*").eq("user_id", user.id).single()

    if (refreshedCredits) {
      credits.credits_used = refreshedCredits.credits_used
    }
  }

  // Check if user has enough credits
  const remainingCredits = credits.credits_limit - credits.credits_used
  if (remainingCredits < creditsNeeded) {
    return {
      success: false,
      remainingCredits,
      error: "لا توجد عمليات بحث متبقية. قم بالترقية للباقة المميزة للحصول على عمليات بحث غير محدودة.",
    }
  }

  // Consume credits
  await supabase
    .from("user_credits")
    .update({
      credits_used: credits.credits_used + creditsNeeded,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)

  // Log usage
  await supabase.from("usage_logs").insert({
    user_id: user.id,
    action_type: actionType,
    credits_consumed: creditsNeeded,
  })

  return {
    success: true,
    remainingCredits: remainingCredits - creditsNeeded,
  }
}

// Helper function to initialize user subscription data
export async function initializeUserSubscription() {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  // Check if subscription exists
  const { data: existingSub } = await supabase.from("subscriptions").select("id").eq("user_id", user.id).single()

  if (!existingSub) {
    await supabase.from("subscriptions").insert({
      user_id: user.id,
      plan_type: "free",
      status: "active",
    })
  }

  // Check if credits exist
  const { data: existingCredits } = await supabase.from("user_credits").select("id").eq("user_id", user.id).single()

  if (!existingCredits) {
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1)
    nextMonth.setHours(0, 0, 0, 0)

    await supabase.from("user_credits").insert({
      user_id: user.id,
      credits_used: 0,
      credits_limit: 10,
      reset_date: nextMonth.toISOString(),
    })
  }

  return { success: true }
}
