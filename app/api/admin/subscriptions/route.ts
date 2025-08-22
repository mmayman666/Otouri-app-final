import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/utils/supabase/admin"

export async function GET(request: NextRequest) {
  try {
    // Create admin client with service role (bypasses RLS)
    const supabase = createAdminClient()

    // Fetch ALL subscriptions data - no joins, just raw data
    const { data: subscriptions, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching subscriptions:", error)
      return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
    }

    // Get subscription stats
    const totalSubscriptions = subscriptions?.length || 0
    const activeSubscriptions = subscriptions?.filter((sub) => sub.status === "active").length || 0
    const premiumSubscriptions = subscriptions?.filter((sub) => sub.plan_type === "premium").length || 0
    const freeSubscriptions = subscriptions?.filter((sub) => sub.plan_type === "free").length || 0

    return NextResponse.json({
      subscriptions: subscriptions || [],
      stats: {
        total: totalSubscriptions,
        active: activeSubscriptions,
        premium: premiumSubscriptions,
        free: freeSubscriptions,
      },
    })
  } catch (error) {
    console.error("Admin subscriptions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
