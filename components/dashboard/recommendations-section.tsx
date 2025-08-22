"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, Sparkles, Crown, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
import { useTranslation } from "@/lib/translations/context"

type PerfumeRecommendation = {
  id: string
  name: string
  brand: string
  price: string
  rating: number
  match: string
  image: string
  description: string
  notes: string[]
  gender: string
  strength: string
  longevity: string
  occasion: string[]
  season: string[]
}

type RecommendationHistory = {
  id: string
  recommendations: PerfumeRecommendation[]
  created_at: string
}

const translations = {
  ar: {
    latestRecommendations: "آخر التوصيات",
    viewAll: "عرض الكل",
    loading: "جاري التحميل...",
    noRecommendations: "لا توجد توصيات بعد",
    getPersonalizedRecommendations: "احصل على توصيات مخصصة",
    match: "تطابق",
  },
  en: {
    latestRecommendations: "Latest Recommendations",
    viewAll: "View All",
    loading: "Loading...",
    noRecommendations: "No recommendations yet",
    getPersonalizedRecommendations: "Get Personalized Recommendations",
    match: "Match",
  },
}

export function RecommendationsSection() {
  const { language } = useTranslation()
  const t = translations[language]
  const [recommendations, setRecommendations] = useState<PerfumeRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const supabase = createClient()

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        // Get the most recent recommendation
        const { data: recentRecommendation, error } = await supabase
          .from("recommendations")
          .select("id, recommendations, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (error) {
          console.error("Error fetching recommendations:", error)
          setRecommendations([])
        } else if (recentRecommendation) {
          // Extract recommendations array and add match percentage
          const recs = recentRecommendation.recommendations.map((rec: any, index: number) => ({
            ...rec,
            match: `${95 - index * 2}%`, // Generate decreasing match percentages
          }))
          setRecommendations(recs.slice(0, 6)) // Show up to 6 recommendations
        } else {
          setRecommendations([])
        }
      } catch (error) {
        console.error("Error:", error)
        setRecommendations([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading) {
    return (
      <Card
        className="border-sage-100 shadow-lg bg-gradient-to-br from-white to-mint-50/20"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <CardHeader className="pb-3 pt-6 px-6 bg-gradient-to-r from-mint-500 to-sage-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            {t.latestRecommendations}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-8">
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500 text-lg">{t.loading}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return (
      <Card
        className="border-sage-100 shadow-lg bg-gradient-to-br from-white to-mint-50/20"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <CardHeader className="pb-3 pt-6 px-6 bg-gradient-to-r from-mint-500 to-sage-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            {t.latestRecommendations}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-mint-100 p-6 rounded-full">
              <Sparkles className="h-16 w-16 text-mint-600" />
            </div>
            <div className="text-gray-600 text-center text-lg font-medium">{t.noRecommendations}</div>
            <Link href="/dashboard/recommendations">
              <Button className="bg-gradient-to-r from-mint-600 to-sage-600 hover:from-mint-700 hover:to-sage-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                {t.getPersonalizedRecommendations}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="border-sage-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-mint-50/20 overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <CardHeader
        className="pb-3 pt-6 px-6 bg-gradient-to-r from-mint-500 to-sage-600 text-white"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between" dir={language === "ar" ? "rtl" : "ltr"}>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            {t.latestRecommendations}
          </CardTitle>
          <Link href="/dashboard/recommendations">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-mint-100 hover:bg-white/10 flex items-center gap-1 h-9 text-base rounded-full px-4"
            >
              {t.viewAll}
              <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-1 rtl:rotate-180" : "ml-1"}`} />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6" dir={language === "ar" ? "rtl" : "ltr"}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {recommendations.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-white via-mint-50/30 to-sage-50/30 rounded-xl border border-sage-200/50 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 p-5 h-full backdrop-blur-sm">
                {/* Premium Badge */}
                <div className={`absolute top-2 ${language === "ar" ? "left-2" : "right-2"}`}>
                  <Crown className="h-4 w-4 text-amber-500" />
                </div>

                {/* Heart Icon */}
                <div className={`absolute top-2 ${language === "ar" ? "right-2" : "left-2"}`}>
                  <Heart className="h-4 w-4 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
                </div>

                <div className="space-y-4 h-full flex flex-col pt-6">
                  {/* Match Badge */}
                  <div className="flex justify-center">
                    <span className="bg-gradient-to-r from-mint-500 to-sage-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {t.match} {item.match}
                    </span>
                  </div>

                  {/* Perfume Info */}
                  <div className="text-center space-y-2 flex-1">
                    <h3 className="font-bold text-sage-900 group-hover:text-mint-600 transition-colors text-base text-center leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{item.brand}</p>

                    {/* Notes Preview */}
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {item.notes?.slice(0, 2).map((note, idx) => (
                        <span key={idx} className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Rating */}
                  <div className="flex items-center justify-between pt-3 border-t border-sage-100">
                    <span className="text-mint-700 font-bold text-base">{item.price}</span>
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className={`text-sm text-amber-700 font-medium ${language === "ar" ? "mr-1" : "ml-1"}`}>
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-mint-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
