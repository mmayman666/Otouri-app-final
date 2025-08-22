"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function ImageSearchSection() {
  return (
    <Card className="border-sage-100 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-sage-900">البحث بالصورة</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="text-mint-600 border-mint-200 hover:bg-mint-50 hover:text-mint-700 h-9 text-base"
          >
            سجل البحث
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <div className="border-2 border-dashed border-sage-200 rounded-lg p-6 text-center cursor-pointer hover:bg-sage-50/50 transition-colors flex-1 flex flex-col items-center justify-center shadow-inner">
              <Upload className="h-12 w-12 mx-auto text-mint-400 mb-3" />
              <p className="text-gray-600 mb-2 text-base">قم بسحب وإفلات صورة العطر هنا</p>
              <p className="text-sm text-gray-500 mb-4">أو انقر لاختيار ملف</p>
              <Button size="default" className="bg-mint-500 hover:bg-mint-600 text-white shadow-md text-base">
                اختيار صورة
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="bg-gradient-to-br from-mint-50 to-sage-50 rounded-lg p-4 shadow-md flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-mint-100 flex items-center justify-center shadow-md">
                  <ImageIcon className="h-5 w-5 text-mint-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sage-800 text-base mb-1">تقنية متطورة للتعرف على العطور</h3>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-mint-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">التعرف على العطر من خلال صورة العبوة</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-mint-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">تحليل المكونات والنوتات العطرية</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-mint-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">اقتراح عطور مشابهة بناءً على الصورة</span>
                </li>
              </ul>

              <div className="text-center">
                <Button
                  variant="outline"
                  size="default"
                  className="border-mint-200 text-mint-600 hover:bg-mint-50 hover:text-mint-700 text-base shadow-sm"
                >
                  معرفة المزيد
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
