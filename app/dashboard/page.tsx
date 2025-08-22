import { createClient } from "@/utils/supabase/server"
import DashboardContent from "./dashboard-content"

async function getDashboardData() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      searchCount: 0,
      favoritesCount: 0,
      lastUpdate: "غير متوفر",
      newRecommendations: 0,
      recentActivities: [],
      userName: "مستخدم",
    }
  }

  // Get user profile for name
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single()

  // Get search count from image search history
  const { count: imageSearchCount } = await supabase
    .from("image_search_history")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Get favorites count
  const { count: favoritesCount } = await supabase
    .from("user_favorites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Get recommendations count from this month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count: recommendationsCount } = await supabase
    .from("recommendations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", startOfMonth.toISOString())

  // Get recent activities from multiple sources
  const recentActivities = []

  // Get recent image searches
  const { data: recentSearches } = await supabase
    .from("image_search_history")
    .select("created_at, analysis_results")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3)

  if (recentSearches) {
    recentSearches.forEach((search) => {
      recentActivities.push({
        type: "search",
        title: `بحثت عن ${search.analysis_results?.perfumeName || "عطر"}`,
        time: search.created_at,
      })
    })
  }

  // Get recent favorites
  const { data: recentFavorites } = await supabase
    .from("user_favorites")
    .select("created_at, perfume_data")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(2)

  if (recentFavorites) {
    recentFavorites.forEach((favorite) => {
      recentActivities.push({
        type: "favorite",
        title: `أضفت ${favorite.perfume_data?.name || "عطر"} للمفضلة`,
        time: favorite.created_at,
      })
    })
  }

  // Get recent recommendations
  const { data: recentRecommendations } = await supabase
    .from("recommendations")
    .select("created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(2)

  if (recentRecommendations) {
    recentRecommendations.forEach((rec) => {
      recentActivities.push({
        type: "recommendation",
        title: "حصلت على توصيات عطور جديدة",
        time: rec.created_at,
      })
    })
  }

  // Sort activities by time
  recentActivities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

  // Get last update time
  const lastActivity = recentActivities[0]
  let lastUpdate = "غير متوفر"

  if (lastActivity) {
    const lastTime = new Date(lastActivity.time)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - lastTime.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) {
      lastUpdate = "منذ دقائق"
    } else if (diffHours < 24) {
      lastUpdate = `منذ ${diffHours} ساعة`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      lastUpdate = `منذ ${diffDays} يوم`
    }
  }

  return {
    searchCount: (imageSearchCount || 0) + (recommendationsCount || 0),
    favoritesCount: favoritesCount || 0,
    lastUpdate,
    newRecommendations: recommendationsCount || 0,
    recentActivities: recentActivities.slice(0, 5),
    userName: profile?.full_name || "مستخدم",
  }
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData()

  return <DashboardContent dashboardData={dashboardData} />
}
