import type { EmailOtpType } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/dashboard"
  const code = searchParams.get("code")

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Create profile for OAuth users
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        // Check if profile exists, if not create one
        const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

        if (!profile) {
          await supabase.from("profiles").insert({
            id: user.id,
            name: user.user_metadata?.full_name || user.user_metadata?.name || "User",
            email: user.email,
            avatar_url: user.user_metadata?.avatar_url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
        }
      }

      redirect("/dashboard")
    }
  }

  if (token_hash && type) {
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })

    if (!error) {
      redirect("/dashboard")
    }
  }

  // If we get here, something went wrong
  redirect("/auth/error?message=" + encodeURIComponent("خطأ في تأكيد البريد الإلكتروني. يرجى المحاولة مرة أخرى."))
}
