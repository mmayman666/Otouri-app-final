import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { notificationServiceServer } from "@/utils/notification-service-server"

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

    console.log("Populating notifications for user:", user.id)

    // Populate notifications for the current user
    await notificationServiceServer.populateUserNotifications(user.id)

    return NextResponse.json({
      success: true,
      message: "Notifications populated successfully",
    })
  } catch (error) {
    console.error("Error in populate notifications API:", error)
    return NextResponse.json({ error: "Failed to populate notifications" }, { status: 500 })
  }
}
