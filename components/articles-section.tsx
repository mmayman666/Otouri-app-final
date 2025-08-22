"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

export function ArticlesSection() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      title: "مقالات ونصائح عطرية",
      description: "اكتشف أحدث المقالات والنصائح حول عالم العطور",
      readMore: "قراءة المزيد",
      viewAll: "عرض جميع المقالات",
      article1Title: "كيف تختار العطر المناسب لفصل الصيف",
      article1Excerpt: "نصائح مهمة لاختيار العطور المناسبة لفصل الصيف والمناسبات المختلفة...",
      article1Date: "منذ 3 أيام",
      article2Title: "أفضل العطور الشرقية لعام 2025",
      article2Excerpt: "قائمة بأفضل العطور الشرقية الفاخرة التي تم إطلاقها هذا العام...",
      article2Date: "منذ أسبوع",
      article3Title: "دليلك الشامل لفهم نوتات العطور",
      article3Excerpt: "تعرف على النوتات العليا والوسطى والقاعدية وكيفية تأثيرها على رائحة العطر...",
      article3Date: "منذ أسبوعين",
    },
    en: {
      title: "Perfume Articles & Tips",
      description: "Discover the latest articles and tips about the world of perfumes",
      readMore: "Read More",
      viewAll: "View All Articles",
      article1Title: "How to Choose the Right Perfume for Summer",
      article1Excerpt: "Important tips for choosing the right perfumes for summer and different occasions...",
      article1Date: "3 days ago",
      article2Title: "Best Oriental Perfumes for 2025",
      article2Excerpt: "A list of the best luxury oriental perfumes released this year...",
      article2Date: "1 week ago",
      article3Title: "Your Complete Guide to Understanding Perfume Notes",
      article3Excerpt: "Learn about top, middle and base notes and how they affect the perfume scent...",
      article3Date: "2 weeks ago",
    },
  }

  const t = translations[language]

  const articles = [
    {
      id: 1,
      title: t.article1Title,
      excerpt: t.article1Excerpt,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laura-chouette-4sKdeIMiFEI-unsplash.jpg-5bXjBd1vgv4pWB8Q39t71clodVqNlI.jpeg", // Chanel Coco Noir
      date: t.article1Date,
    },
    {
      id: 2,
      title: t.article2Title,
      excerpt: t.article2Excerpt,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laura-chouette-gbT2KAq1V5c-unsplash.jpg-ZsWCxNLoiBvT2vyV5y8Gjvz7Jx4tFf.jpeg", // Versace Eros
      date: t.article2Date,
    },
    {
      id: 3,
      title: t.article3Title,
      excerpt: t.article3Excerpt,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lera-ginzburg-N8WxMVijPKw-unsplash.jpg-Cvgx7Uiy62jw6EFmskgJSXqI6WSVJ0.jpeg", // Minimalist perfume collection
      date: t.article3Date,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mint-700 mb-4 drop-shadow-sm">{t.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.description}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-[0_15px_35px_-15px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_45px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 border border-sage-50">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Date badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-mint-700 text-sm font-medium px-3 py-1.5 rounded-full shadow-md flex items-center">
                    <Calendar className="h-3.5 w-3.5 ml-1.5" />
                    {article.date}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-sage-800 mb-3 group-hover:text-mint-600 transition-colors drop-shadow-sm">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-5 flex-1">{article.excerpt}</p>

                  <motion.button
                    className="mt-auto flex items-center text-sm font-medium text-mint-500 group-hover:text-mint-600 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {t.readMore}
                    <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            className="px-6 py-3 rounded-full border border-mint-200 text-mint-700 font-medium hover:bg-mint-50 transition-all shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(37, 207, 113, 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            {t.viewAll}
          </motion.button>
        </div>
      </div>
    </section>
  )
}
