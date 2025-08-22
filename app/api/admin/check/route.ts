import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createAdminClient } from "@/utils/supabase/admin"

export async function GET() {
  try {
    // Get current user
    const supabase = createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ isAdmin: false, error: "Not authenticated" }, { status: 401 })
    }

    // Check admin status using service role
    const adminClient = createAdminClient()
    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select("is_admin, full_name")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("Profile check error:", profileError)
      return NextResponse.json({ isAdmin: false, error: "Profile error" }, { status: 500 })
    }

    return NextResponse.json({
      isAdmin: profile?.is_admin === true,
      profile: profile,
    })
  } catch (error) {
    console.error("Admin check error:", error)
    return NextResponse.json({ isAdmin: false, error: "Server error" }, { status: 500 })
  }
}
