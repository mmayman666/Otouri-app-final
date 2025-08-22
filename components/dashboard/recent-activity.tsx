"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Heart, Clock, Eye, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations/context"

interface Activity {
  type: string
  title: string
  time: string
}

interface RecentActivityProps {
  activities: Activity[]
}

const translations = {
  ar: {
    recentActivity: "النشاط الأخير",
    viewAll: "عرض الكل",
    noRecentActivity: "لا يوجد نشاط حديث",
    startUsingApp: "ابدأ باستخدام التطبيق لرؤية نشاطك هنا",
    moreActivityWillAppear: "المزيد من النشاط سيظهر هنا",
    minutesAgo: "منذ دقائق",
    hoursAgo: "ساعة",
    daysAgo: "يوم",
    since: "منذ",
  },
  en: {
    recentActivity: "Recent Activity",
    viewAll: "View All",
    noRecentActivity: "No recent activity",
    startUsingApp: "Start using the app to see your activity here",
    moreActivityWillAppear: "More activity will appear here",
    minutesAgo: "minutes ago",
    hoursAgo: "hours ago",
    daysAgo: "days ago",
    since: "",
  },
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const { language } = useTranslation()
  const t = translations[language]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "search":
        return <Search className="h-5 w-5" />
      case "favorite":
        return <Heart className="h-5 w-5" />
      case "recommendation":
        return <Sparkles className="h-5 w-5" />
      default:
        return <Eye className="h-5 w-5" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "search":
        return "bg-mint-100 text-mint-600"
      case "favorite":
        return "bg-rose-100 text-rose-600"
      case "recommendation":
        return "bg-sage-100 text-sage-600"
      default:
        return "bg-amber-100 text-amber-600"
    }
  }

  const formatTime = (timeString: string) => {
    const time = new Date(timeString)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) {
      return language === "ar" ? t.minutesAgo : `${t.minutesAgo}`
    } else if (diffHours < 24) {
      return language === "ar" ? `${t.since} ${diffHours} ${t.hoursAgo}` : `${diffHours} ${t.hoursAgo}`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return language === "ar" ? `${t.since} ${diffDays} ${t.daysAgo}` : `${diffDays} ${t.daysAgo}`
    }
  }

  return (
    <Card
      className="border-sage-100 shadow-md hover:shadow-lg transition-shadow min-h-[400px]"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <CardHeader className="pb-2 pt-4 px-4" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-mint-500" />
            <CardTitle className="text-xl font-bold text-sage-900">{t.recentActivity}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-mint-600 hover:text-mint-700 hover:bg-mint-50 -mr-2 h-9 text-base"
          >
            {t.viewAll}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 h-full" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="h-full flex flex-col">
          {activities.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <Clock className="h-16 w-16 mx-auto text-gray-300" />
              <p className="text-gray-500 text-lg text-center">{t.noRecentActivity}</p>
              <p className="text-gray-400 text-sm text-center">{t.startUsingApp}</p>
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: language === "ar" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-white to-gray-50/50 border border-gray-100 hover:shadow-md transition-all duration-200"
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center shrink-0 shadow-md`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0" dir={language === "ar" ? "rtl" : "ltr"}>
                    <p
                      className={`text-base font-medium text-gray-700 mb-1 ${language === "ar" ? "text-right" : "text-left"}`}
                    >
                      {activity.title}
                    </p>
                    <p className={`text-sm text-gray-500 ${language === "ar" ? "text-right" : "text-left"}`}>
                      {formatTime(activity.time)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Fill remaining space if activities are less than expected */}
              {activities.length > 0 && activities.length < 5 && (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">{t.moreActivityWillAppear}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
