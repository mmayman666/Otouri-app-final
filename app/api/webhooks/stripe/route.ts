import { headers } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { createClient } from "@supabase/supabase-js"
import type Stripe from "stripe"

export async function POST(req: NextRequest) {
  const stripe = getStripe()

  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 })
  }

  const body = await req.text()
  const signature = headers().get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Use service role client to bypass RLS
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.user_id

        console.log("Checkout session completed for user:", userId)

        if (!userId) {
          console.error("No user ID in session metadata")
          break
        }

        if (session.subscription) {
          // Get the subscription from Stripe
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

          console.log("Updating subscription for user:", userId, "with subscription:", subscription.id)

          // Update subscription in database using user_id
          const { data, error } = await supabase
            .from("subscriptions")
            .update({
              stripe_subscription_id: subscription.id,
              stripe_price_id: subscription.items.data[0].price.id,
              status: "active",
              plan_type: "premium",
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId)
            .select()

          console.log("Subscription update result:", { data, error })

          if (error) {
            console.error("Failed to update subscription:", error)
          }
        }

        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // If this payment intent is for a subscription, handle it
        if (paymentIntent.invoice) {
          const invoice = await stripe.invoices.retrieve(paymentIntent.invoice as string)

          if (invoice.subscription) {
            const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
            const customer = await stripe.customers.retrieve(subscription.customer as string)

            if (customer && !customer.deleted && customer.metadata?.user_id) {
              const userId = customer.metadata.user_id

              console.log("Payment succeeded for subscription, updating user:", userId)

              const { data, error } = await supabase
                .from("subscriptions")
                .update({
                  stripe_subscription_id: subscription.id,
                  stripe_price_id: subscription.items.data[0].price.id,
                  status: "active",
                  plan_type: "premium",
                  current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                  current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                  updated_at: new Date().toISOString(),
                })
                .eq("user_id", userId)
                .select()

              console.log("Payment succeeded subscription update:", { data, error })
            }
          }
        }

        break
      }

      case "charge.succeeded": {
        const charge = event.data.object as Stripe.Charge

        // If this charge is for a subscription, handle it
        if (charge.invoice) {
          const invoice = await stripe.invoices.retrieve(charge.invoice as string)

          if (invoice.subscription) {
            const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
            const customer = await stripe.customers.retrieve(subscription.customer as string)

            if (customer && !customer.deleted && customer.metadata?.user_id) {
              const userId = customer.metadata.user_id

              console.log("Charge succeeded for subscription, updating user:", userId)

              const { data, error } = await supabase
                .from("subscriptions")
                .update({
                  stripe_subscription_id: subscription.id,
                  stripe_price_id: subscription.items.data[0].price.id,
                  status: "active",
                  plan_type: "premium",
                  current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                  current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                  updated_at: new Date().toISOString(),
                })
                .eq("user_id", userId)
                .select()

              console.log("Charge succeeded subscription update:", { data, error })
            }
          }
        }

        break
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        console.log("Subscription created for customer:", customerId)

        // Get customer to find user_id in metadata
        const customer = await stripe.customers.retrieve(customerId)

        if (customer && !customer.deleted && customer.metadata?.user_id) {
          const userId = customer.metadata.user_id

          console.log("Found user_id in customer metadata:", userId)

          // Update subscription using user_id
          const { data, error } = await supabase
            .from("subscriptions")
            .update({
              stripe_subscription_id: subscription.id,
              stripe_price_id: subscription.items.data[0].price.id,
              status: "active",
              plan_type: "premium",
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId)
            .select()

          console.log("Subscription created update result:", { data, error })
        } else {
          // Fallback: try to find by stripe_customer_id
          const { data, error } = await supabase
            .from("subscriptions")
            .update({
              stripe_subscription_id: subscription.id,
              stripe_price_id: subscription.items.data[0].price.id,
              status: "active",
              plan_type: "premium",
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId)
            .select()

          console.log("Fallback subscription update result:", { data, error })
        }

        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)

          // Update subscription status
          await supabase
            .from("subscriptions")
            .update({
              status: "active",
              plan_type: "premium",
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_subscription_id", subscriptionId)
        }

        break
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)

          // Update subscription status and details
          await supabase
            .from("subscriptions")
            .update({
              stripe_subscription_id: subscription.id,
              stripe_price_id: subscription.items.data[0].price.id,
              status: "active",
              plan_type: "premium",
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", invoice.customer as string)
        }

        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          await supabase
            .from("subscriptions")
            .update({
              status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_subscription_id", subscriptionId)
        }

        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription

        await supabase
          .from("subscriptions")
          .update({
            status: subscription.status === "active" ? "active" : "inactive",
            plan_type: subscription.status === "active" ? "premium" : "free",
            cancel_at_period_end: subscription.cancel_at_period_end,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id)

        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription

        await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            plan_type: "free",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id)

        break
      }

      case "invoice.created":
      case "invoice.finalized":
      case "payment_intent.created":
        // These events don't require action, just acknowledge
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
