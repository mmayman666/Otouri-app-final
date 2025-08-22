"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const cookieStore = cookies()
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Check if it's an email confirmation error
    if (error.message.includes("Email not confirmed") || error.message.includes("email_not_confirmed")) {
      return redirect("/auth/error?type=email_not_confirmed&email=" + encodeURIComponent(email))
    }
    return redirect("/auth/error?message=" + encodeURIComponent(error.message))
  }

  revalidatePath("/", "layout")
  return redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      data: {
        name,
      },
    },
  })

  if (error) {
    return redirect("/auth/error?message=" + encodeURIComponent(error.message))
  }

  return redirect("/auth/verify-email?email=" + encodeURIComponent(email))
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  return redirect("/")
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string
  const supabase = createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })

  if (error) {
    return redirect("/auth/error?message=" + encodeURIComponent(error.message))
  }

  return redirect("/auth/check-email?email=" + encodeURIComponent(email))
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string
  const supabase = createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return redirect("/auth/error?message=" + encodeURIComponent(error.message))
  }

  return redirect("/auth/login?message=" + encodeURIComponent("تم تحديث كلمة المرور بنجاح"))
}

export async function resendConfirmation(formData: FormData) {
  const email = formData.get("email") as string
  const supabase = createClient()

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  })

  if (error) {
    return redirect("/auth/error?message=" + encodeURIComponent(error.message))
  }

  return redirect("/auth/check-email?email=" + encodeURIComponent(email) + "&resent=true")
}
