import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create admin client with service role (bypasses RLS completely)
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
    }

    // First authenticate with regular client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check admin status using service role (bypasses RLS)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("is_admin, full_name")
      .eq("id", authData.user.id)
      .single()

    console.log("Admin check - Profile:", profile)
    console.log("Admin check - Error:", profileError)

    if (profileError) {
      return NextResponse.json({ error: "Profile fetch error" }, { status: 500 })
    }

    if (!profile || profile.is_admin !== true) {
      // Sign out the user
      await supabase.auth.signOut()
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      user: authData.user,
      profile: profile,
    })
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
