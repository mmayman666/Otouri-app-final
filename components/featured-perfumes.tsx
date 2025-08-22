"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export function FeaturedPerfumes() {
  const perfumes = [
    {
      id: 1,
      name: "عطر الأميرة",
      brand: "شانيل",
      price: "٥٩٩ ر.س",
      rating: 4.8,
      image: "/placeholder.svg?key=3la4d",
    },
    {
      id: 2,
      name: "عود ملكي",
      brand: "العربية للعطور",
      price: "٧٩٩ ر.س",
      rating: 4.9,
      image: "/placeholder.svg?key=nr8pb",
    },
    {
      id: 3,
      name: "مسك الليل",
      brand: "ديور",
      price: "٨٥٠ ر.س",
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300&query=perfume bottle elegant 3",
    },
    {
      id: 4,
      name: "زهرة الياسمين",
      brand: "جيفنشي",
      price: "٤٩٩ ر.س",
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300&query=perfume bottle elegant 4",
    },
  ]

  return (
    <section className="container py-20">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">عطور مميزة</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">اكتشف مجموعة مختارة من أفضل العطور والإصدارات الجديدة</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {perfumes.map((perfume, index) => (
          <motion.div
            key={perfume.id}
            className="group relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-white/80 backdrop-blur-sm text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
                جديد
              </span>
            </div>

            <div className="aspect-square bg-gradient-to-br from-amber-50 to-white relative overflow-hidden">
              <Image
                src={perfume.image || "/placeholder.svg"}
                alt={perfume.name}
                fill
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-4 bg-white">
              <h3 className="font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">
                {perfume.name}
              </h3>
              <p className="text-sm text-gray-600">{perfume.brand}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-amber-800 font-bold">{perfume.price}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm text-gray-600 mr-1">{perfume.rating}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-amber-100 flex justify-between items-center">
                <button className="text-xs text-amber-800 font-medium hover:text-amber-600">التفاصيل</button>
                <button className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium px-2 py-1 rounded-full">
                  أضف للمفضلة
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-50 hover:border-amber-500">
          عرض المزيد من العطور
        </Button>
      </div>
    </section>
  )
}
