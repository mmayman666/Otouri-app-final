"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"

export function PersonalConsultation() {
  const benefits = [
    "تحليل شخصي لذوقك في العطور",
    "اقتراحات مخصصة بناءً على تفضيلاتك",
    "نصائح من خبراء العطور",
    "عينات مجانية للتجربة قبل الشراء",
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)]"
          >
            <Image src="/placeholder.svg?key=frldg" alt="استشارة شخصية" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-900/70 via-sage-800/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-mint-50 flex items-center justify-center shadow-md">
                    <span className="text-mint-600 text-lg font-bold">93%</span>
                  </div>
                  <div>
                    <p className="font-bold text-mint-700">نسبة الرضا</p>
                    <p className="text-sm text-gray-600">من عملائنا عن الاستشارات</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6 drop-shadow-sm">
              استشارة شخصية مع خبراء العطور
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              احصل على استشارة شخصية مع خبراء العطور لدينا لاكتشاف العطر المثالي الذي يعبر عن شخصيتك ويناسب أسلوب حياتك.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-mint-50 flex items-center justify-center shadow-sm">
                    <Check className="h-4 w-4 text-mint-500" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <motion.button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 text-white font-medium shadow-[0_10px_25px_-5px_rgba(37,207,113,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(37,207,113,0.5)] transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              احجز استشارتك الآن
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
