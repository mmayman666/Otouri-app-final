"use client"

import { Leaf, Sparkles, Droplets, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations/context"

export function FeaturesSection() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      badge: "ما يميزنا",
      title: "ميزات عُطوري",
      description: "اكتشف الميزات الفريدة التي تجعل منصة عطوري الخيار الأمثل لعشاق العطور",
      naturalPerfumes: "عطور طبيعية",
      naturalDescription: "مستخلصة من أجود أنواع النباتات والأزهار الطبيعية بدون إضافات كيميائية",
      smartRecommendations: "توصيات ذكية",
      smartDescription: "نظام توصيات متطور يقترح عليك العطور المناسبة لذوقك وشخصيتك",
      ingredientAnalysis: "تحليل المكونات",
      ingredientDescription: "تعرف على المكونات الدقيقة لكل عطر ونسب تركيزها وتأثيرها",
      imageAnalysis: "تحليل الصور",
      imageDescription: "التعرف على العطور من خلال تحليل صور العبوات باستخدام الذكاء الاصطناعي",
    },
    en: {
      badge: "What Makes Us Special",
      title: "Otouri Features",
      description: "Discover the unique features that make Otouri platform the perfect choice for perfume enthusiasts",
      naturalPerfumes: "Natural Perfumes",
      naturalDescription: "Extracted from the finest natural plants and flowers without chemical additives",
      smartRecommendations: "Smart Recommendations",
      smartDescription: "Advanced recommendation system that suggests perfumes suitable for your taste and personality",
      ingredientAnalysis: "Ingredient Analysis",
      ingredientDescription:
        "Learn about the precise ingredients of each perfume and their concentration ratios and effects",
      imageAnalysis: "Image Analysis",
      imageDescription: "Recognize perfumes by analyzing bottle images using artificial intelligence",
    },
  }

  const t = translations[language]

  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-white drop-shadow" />,
      title: t.naturalPerfumes,
      description: t.naturalDescription,
      color: "from-sage-500 to-sage-400",
      animation: "bounce-gentle",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-white drop-shadow" />,
      title: t.smartRecommendations,
      description: t.smartDescription,
      color: "from-mint-500 to-mint-400",
      animation: "pulse-gentle",
    },
    {
      icon: <Droplets className="h-6 w-6 text-white drop-shadow" />,
      title: t.ingredientAnalysis,
      description: t.ingredientDescription,
      color: "from-sage-500 to-mint-400",
      animation: "scale-up-down",
    },
    {
      icon: <Zap className="h-6 w-6 text-white drop-shadow" />,
      title: t.imageAnalysis,
      description: t.imageDescription,
      color: "from-mint-500 to-sage-400",
      animation: "spin-slow",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-pattern opacity-10 -z-10"></div>

      {/* زخارف متحركة */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-mint-100 opacity-30 blur-2xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-sage-100 opacity-30 blur-2xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="bg-mint-50 text-mint-600 text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.badge}</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4 drop-shadow-sm">{t.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.description}</p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} className="group" variants={itemVariants}>
              <div className="bg-white rounded-2xl p-6 h-full border border-mint-50 transition-all relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]">
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${feature.color} -translate-y-1/2 translate-x-1/2 opacity-15 group-hover:opacity-25 transition-opacity duration-500 -z-10`}
                />

                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(37, 207, 113, 0.3)" }}
                  animate={{ rotate: feature.animation === "spin-slow" ? [0, 360] : 0 }}
                  transition={
                    feature.animation === "spin-slow"
                      ? { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                      : { type: "spring", stiffness: 300, damping: 10 }
                  }
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg ${
                    feature.animation !== "spin-slow" ? `animate-${feature.animation}` : ""
                  }`}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-sage-900 mb-3 group-hover:text-mint-600 transition-colors drop-shadow-sm">
                  {feature.title}
                </h3>

                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
