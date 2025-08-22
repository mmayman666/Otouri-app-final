import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

const supabaseAdmin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { notificationId } = await request.json()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mark notification as read using service role
    const { error } = await supabaseAdmin
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId)
      .eq("user_id", user.id)

    if (error) {
      console.error("Error marking notification as read:", error)
      return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Notification marked as read",
    })
  } catch (error) {
    console.error("Error in mark read API:", error)
    return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 })
  }
}
