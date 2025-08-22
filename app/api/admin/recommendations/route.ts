import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create a Supabase client with service role to bypass RLS
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("Fetching recommendations with service role...")

    // Fetch all recommendations
    const { data: recommendations, error } = await supabaseAdmin
      .from("recommendations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching recommendations:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Found ${recommendations?.length || 0} recommendations`)

    // Calculate statistics
    const totalRecommendations = recommendations?.length || 0
    const uniqueUsers = new Set(recommendations?.map((rec) => rec.user_id) || []).size

    // Calculate average match percentage across all recommendations
    let totalMatchPercentage = 0
    let totalRecommendationItems = 0

    recommendations?.forEach((rec) => {
      const recs = Array.isArray(rec.recommendations) ? rec.recommendations : []
      recs.forEach((item) => {
        if (item.matchPercentage) {
          totalMatchPercentage += Number.parseFloat(item.matchPercentage.toString())
          totalRecommendationItems++
        }
      })
    })

    const averageMatchPercentage =
      totalRecommendationItems > 0 ? (totalMatchPercentage / totalRecommendationItems).toFixed(1) : "0"

    return NextResponse.json({
      recommendations: recommendations || [],
      stats: {
        totalRecommendations,
        uniqueUsers,
        averageMatchPercentage,
      },
    })
  } catch (error) {
    console.error("Error in recommendations API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
