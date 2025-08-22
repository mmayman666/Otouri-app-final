"use client"

import { Search, Upload, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"

export function SearchSection() {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text")

  return (
    <section className="container py-16 relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-mint-100 rounded-full -z-10 opacity-50 blur-3xl" />

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sage-100">
          {/* تبويبات البحث */}
          <div className="flex border-b border-sage-100">
            <button
              className={`flex-1 py-4 text-center font-medium transition-all ${
                activeTab === "text"
                  ? "bg-sage-50 text-sage-900 border-b-2 border-mint-500"
                  : "text-gray-500 hover:bg-sage-50/50"
              }`}
              onClick={() => setActiveTab("text")}
            >
              البحث بالنص
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-all ${
                activeTab === "image"
                  ? "bg-sage-50 text-sage-900 border-b-2 border-mint-500"
                  : "text-gray-500 hover:bg-sage-50/50"
              }`}
              onClick={() => setActiveTab("image")}
            >
              البحث بالصورة
            </button>
          </div>

          {/* محتوى البحث بالنص */}
          <div className={`p-6 ${activeTab === "text" ? "block" : "hidden"}`}>
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="اكتب اسم العطر والماركة والنوع (رجالي/نسائي)..."
                  className="pr-10 py-6 text-right border-sage-200 focus:border-mint-400 rounded-lg"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm cursor-pointer hover:bg-sage-100">
                  عطور رجالية
                </span>
                <span className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm cursor-pointer hover:bg-sage-100">
                  عطور نسائية
                </span>
                <span className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm cursor-pointer hover:bg-sage-100">
                  عطور شرقية
                </span>
                <span className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm cursor-pointer hover:bg-sage-100">
                  عطور فرنسية
                </span>
              </div>

              <p className="text-xs text-gray-500 text-right">
                الحصول على نتائج دقيقة بناءً على اسم العطر والتفاصيل. مصنفة حسب اسم العطر، الماركة والنوع (رجالي/نسائي)
              </p>

              <motion.button
                className="w-full py-3 rounded-lg bg-gradient-to-r from-sage-600 to-mint-500 text-white font-medium flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ابحث الآن
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </motion.button>

              <p className="text-xs text-center text-gray-500">
                يمكنك البحث كزائر 3 مرات بشكل إجمالي قبل الحاجة لتسجيل الدخول
              </p>
            </div>
          </div>

          {/* محتوى البحث بالصورة */}
          <div className={`p-6 ${activeTab === "image" ? "block" : "hidden"}`}>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-sage-200 rounded-lg p-8 text-center cursor-pointer hover:bg-sage-50/50 transition-colors">
                <Upload className="h-12 w-12 mx-auto text-mint-400 mb-4" />
                <p className="text-gray-600 mb-2">قم بسحب وإفلات صورة العطر هنا</p>
                <p className="text-sm text-gray-500">أو انقر لاختيار ملف</p>
              </div>

              <p className="text-xs text-gray-500 text-right">المحتويات المتاحة: 272 (مشاركة من البحث والتوصيات)</p>

              <motion.button
                className="w-full py-3 rounded-lg bg-gradient-to-r from-sage-600 to-mint-500 text-white font-medium flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ابحث بالصورة
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
