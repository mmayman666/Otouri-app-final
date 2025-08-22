import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/utils/supabase/admin"

export async function GET(request: NextRequest) {
  try {
    // Create admin client with service role (bypasses RLS)
    const supabase = createAdminClient()

    // Fetch ALL image search history data - no joins, just raw data
    const { data: imageHistory, error } = await supabase
      .from("image_search_history")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching image analysis history:", error)
      return NextResponse.json({ error: "Failed to fetch image analysis history" }, { status: 500 })
    }

    // Get stats
    const totalAnalyses = imageHistory?.length || 0
    const uniqueUsers = new Set(imageHistory?.map((item) => item.user_id)).size || 0
    const successfulAnalyses =
      imageHistory?.filter((item) => {
        try {
          const results =
            typeof item.analysis_results === "string" ? JSON.parse(item.analysis_results) : item.analysis_results
          return results.confidence && results.confidence > 50
        } catch {
          return false
        }
      }).length || 0

    return NextResponse.json({
      imageHistory: imageHistory || [],
      stats: {
        total: totalAnalyses,
        uniqueUsers: uniqueUsers,
        successful: successfulAnalyses,
        failed: totalAnalyses - successfulAnalyses,
      },
    })
  } catch (error) {
    console.error("Admin image analysis API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
