"use client"

import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecommendationsSection } from "@/components/dashboard/recommendations-section"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TrendingPerfumes } from "@/components/dashboard/trending-perfumes"
import { useTranslation } from "@/lib/translations/context"

interface DashboardContentProps {
  dashboardData: {
    searchCount: number
    favoritesCount: number
    lastUpdate: string
    newRecommendations: number
    recentActivities: any[]
    userName: string
  }
}

export default function DashboardContent({ dashboardData }: DashboardContentProps) {
  const { t, isRTL } = useTranslation()

  return (
    <div className="p-4 space-y-5" dir={isRTL ? "rtl" : "ltr"}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        <h1 className={`text-2xl md:text-3xl font-bold text-sage-900 mb-2 ${isRTL ? "text-right" : "text-left"}`}>
          {t("dashboard.welcome", { name: dashboardData.userName })}
        </h1>
        <p className={`text-gray-600 text-base ${isRTL ? "text-right" : "text-left"}`}>{t("dashboard.subtitle")}</p>
      </div>

      <DashboardStats
        searchCount={dashboardData.searchCount}
        favoritesCount={dashboardData.favoritesCount}
        lastUpdate={dashboardData.lastUpdate}
        newRecommendations={dashboardData.newRecommendations}
      />

      {/* Each section takes full width */}
      <div className="space-y-5" dir={isRTL ? "rtl" : "ltr"}>
        <RecommendationsSection />
        <RecentActivity activities={dashboardData.recentActivities} />
      </div>

      {/* Moved Trending Perfumes to the end of the page */}
      <TrendingPerfumes />
    </div>
  )
}
