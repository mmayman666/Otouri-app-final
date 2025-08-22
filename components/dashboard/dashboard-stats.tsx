"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Search, Heart, Clock, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations/context"

interface DashboardStatsProps {
  searchCount: number
  favoritesCount: number
  lastUpdate: string
  newRecommendations: number
}

const translations = {
  ar: {
    searches: "عمليات البحث",
    favorites: "العطور المفضلة",
    lastUpdate: "آخر تحديث",
    newRecommendations: "توصيات جديدة",
  },
  en: {
    searches: "Searches",
    favorites: "Favorite Perfumes",
    lastUpdate: "Last Update",
    newRecommendations: "New Recommendations",
  },
}

export function DashboardStats({ searchCount, favoritesCount, lastUpdate, newRecommendations }: DashboardStatsProps) {
  const { language } = useTranslation()
  const t = translations[language]

  const stats = [
    {
      title: t.searches,
      value: searchCount.toString(),
      change: searchCount > 0 ? `+${Math.min(searchCount, 5)}` : "",
      icon: <Search className="h-6 w-6" />,
      color: "from-mint-500 to-mint-400",
    },
    {
      title: t.favorites,
      value: favoritesCount.toString(),
      change: favoritesCount > 0 ? `+${Math.min(favoritesCount, 3)}` : "",
      icon: <Heart className="h-6 w-6" />,
      color: "from-rose-500 to-rose-400",
    },
    {
      title: t.lastUpdate,
      value: lastUpdate,
      change: "",
      icon: <Clock className="h-6 w-6" />,
      color: "from-amber-500 to-amber-400",
    },
    {
      title: t.newRecommendations,
      value: newRecommendations.toString(),
      change: newRecommendations > 0 ? `+${newRecommendations}` : "",
      icon: <Sparkles className="h-6 w-6" />,
      color: "from-sage-500 to-sage-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" dir={language === "ar" ? "rtl" : "ltr"}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card
            className="border-sage-100 shadow-md hover:shadow-lg transition-shadow"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <CardContent className="p-4" dir={language === "ar" ? "rtl" : "ltr"}>
              <div className="flex items-center justify-between" dir={language === "ar" ? "rtl" : "ltr"}>
                <div dir={language === "ar" ? "rtl" : "ltr"}>
                  <p
                    className={`text-sm font-medium text-gray-500 mb-1 ${language === "ar" ? "text-right" : "text-left"}`}
                  >
                    {stat.title}
                  </p>
                  <div className={`flex items-center gap-2 ${language === "ar" ? "justify-end" : "justify-start"}`}>
                    <p className="text-2xl font-bold text-sage-900">{stat.value}</p>
                    {stat.change && (
                      <span className="text-sm font-medium text-mint-600 bg-mint-50 px-2 py-0.5 rounded">
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
