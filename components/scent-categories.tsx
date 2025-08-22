"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

export function ScentCategories() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      title: "استكشف عالم العطور",
      description: "تعرف على مختلف أنواع العطور وخصائصها الفريدة واختر ما يناسب شخصيتك",
      oriental: "العطور الشرقية",
      orientalDesc: "عطور غنية بالتوابل والعود والمسك",
      floral: "العطور الزهرية",
      floralDesc: "عطور منعشة مستوحاة من الزهور والورود",
      woody: "العطور الخشبية",
      woodyDesc: "عطور دافئة بروائح الأخشاب والصنوبر",
      fruity: "العطور الفواكهية",
      fruityDesc: "عطور منعشة بروائح الفواكه والحمضيات",
      exploreMore: "استكشف المزيد",
    },
    en: {
      title: "Explore the World of Perfumes",
      description:
        "Discover different types of perfumes and their unique characteristics and choose what suits your personality",
      oriental: "Oriental Perfumes",
      orientalDesc: "Rich perfumes with spices, oud and musk",
      floral: "Floral Perfumes",
      floralDesc: "Fresh perfumes inspired by flowers and roses",
      woody: "Woody Perfumes",
      woodyDesc: "Warm perfumes with wood and pine scents",
      fruity: "Fruity Perfumes",
      fruityDesc: "Fresh perfumes with fruit and citrus scents",
      exploreMore: "Explore More",
    },
  }

  const t = translations[language]

  const categories = [
    {
      id: 1,
      name: t.oriental,
      description: t.orientalDesc,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pavlo-talpa-ADKsjO-uwpo-unsplash.jpg-ed79nQ94mECpX23v5hdMYePDFA5vo8.jpeg", // YSL gold perfume
      color: "from-amber-500/15 to-amber-700/15",
    },
    {
      id: 2,
      name: t.floral,
      description: t.floralDesc,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laura-chouette-4sKdeIMiFEI-unsplash.jpg-ZuuYaYOmoyKG11gFd4e922wErZRXg6.jpeg", // Chanel with red flowers
      color: "from-pink-500/15 to-rose-700/15",
    },
    {
      id: 3,
      name: t.woody,
      description: t.woodyDesc,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laura-chouette-gbT2KAq1V5c-unsplash.jpg-9jSHdH5ZoR2AvJF6Rcda4hoNblDClb.jpeg", // Versace Eros teal bottle
      color: "from-mint-500/15 to-mint-700/15",
    },
    {
      id: 4,
      name: t.fruity,
      description: t.fruityDesc,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lera-ginzburg-N8WxMVijPKw-unsplash.jpg-ZB9wDEbAoT1l67zVFNPWbBtEQYoJCy.jpeg", // Minimalist perfume collection
      color: "from-orange-500/15 to-orange-700/15",
    },
  ]

  return (
    <section className="py-20 bg-mint-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] group-hover:shadow-[0_25px_40px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-300">
                <div className={`absolute inset-0 bg-gradient-to-b ${category.color} mix-blend-multiply`} />

                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{category.name}</h3>
                  <p className="text-white/80 mb-4 drop-shadow">{category.description}</p>

                  <button className="flex items-center text-sm font-medium text-white group-hover:text-mint-200 transition-colors drop-shadow">
                    {t.exploreMore}
                    <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
