import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

const supabaseAdmin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mark all notifications as read using service role
    const { error } = await supabaseAdmin
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false)

    if (error) {
      console.error("Error marking all notifications as read:", error)
      return NextResponse.json({ error: "Failed to mark all notifications as read" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "All notifications marked as read",
    })
  } catch (error) {
    console.error("Error in mark all read API:", error)
    return NextResponse.json({ error: "Failed to mark all notifications as read" }, { status: 500 })
  }
}
