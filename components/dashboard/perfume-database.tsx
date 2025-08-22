"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Filter, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export function PerfumeDatabase() {
  const categories = [
    { name: "عطور شرقية", count: 245, total: 300, color: "bg-amber-500" },
    { name: "عطور فرنسية", count: 189, total: 200, color: "bg-mint-500" },
    { name: "عطور خشبية", count: 120, total: 150, color: "bg-sage-500" },
    { name: "عطور زهرية", count: 210, total: 250, color: "bg-rose-500" },
  ]

  return (
    <Card className="border-sage-100 shadow-md hover:shadow-lg transition-shadow" dir="rtl">
      <CardHeader className="pb-2 pt-4 px-4" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-mint-500" />
            <CardTitle className="text-base font-bold text-sage-900">قاعدة بيانات العطور</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-mint-600 hover:text-mint-700 hover:bg-mint-50 -mr-2 h-8 text-sm"
          >
            <Filter className="h-4 w-4 ml-1" />
            تصفية
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4" dir="rtl">
        <div className="space-y-3">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1" dir="rtl">
                <span className="text-sm font-medium text-gray-600 text-right">{category.name}</span>
                <span className="text-sm text-gray-500 text-right">
                  {category.count} / {category.total}
                </span>
              </div>
              <Progress
                value={(category.count / category.total) * 100}
                className="h-3"
                indicatorClassName={category.color}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-sage-100">
          <Button
            variant="outline"
            size="default"
            className="w-full border-mint-200 text-mint-600 hover:bg-mint-50 hover:text-mint-700 flex items-center justify-center gap-1 text-base shadow-sm"
          >
            استكشاف قاعدة البيانات
            <ArrowRight className="h-4 w-4 mr-1 rtl:rotate-180" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
