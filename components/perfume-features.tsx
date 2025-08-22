"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Check, Bot, Upload, Database, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/translations/context"

export function PerfumeFeatures() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      badge: "اكتشف مميزاتنا",
      title: "مميزات منصة عُطوري",
      description: "اكتشف المميزات الفريدة التي تجعل منصة عطوري الخيار الأمثل لعشاق العطور",
      exclusiveFeature: "ميزة حصرية",
      aiTitle: "عطوري AI - مساعدك الذكي",
      aiDescription: "استشر عطوري AI للحصول على توصيات مخصصة تناسب ذوقك وتفضيلاتك الشخصية في عالم العطور",
      aiBenefits: [
        "إجابات فورية على جميع استفساراتك",
        "توصيات مخصصة بناءً على تفضيلاتك",
        "نصائح من خبراء العطور المدعومة بالذكاء الاصطناعي",
        "اقتراحات لعطور مشابهة لعطورك المفضلة",
      ],
      aiButton: "استشر عطوري AI الآن",
      recommendationsTitle: "توصيات مخصصة حسب تفضيلاتك",
      recommendationsDescription:
        "حدد تفضيلاتك من الميزانية والنوع والمناسبة والموسم وقوة العطر ومدة بقائه والنوتات المفضلة لديك",
      recommendationsBenefits: [
        "تحليل شخصي لذوقك في العطور",
        "تصفية متقدمة حسب معايير متعددة",
        "اكتشاف عطور جديدة تناسب ذوقك",
        "مقارنة بين العطور المختلفة بسهولة",
      ],
      recommendationsButton: "احصل على توصيات مخصصة",
      imageAnalysisTitle: "تحليل صورة العطر بالذكاء الاصطناعي",
      imageAnalysisDescription: "قم بتحميل صورة لعبوة العطر وسيقوم نظامنا بالتعرف عليها وتقديم معلومات مفصلة عنها",
      imageAnalysisBenefits: [
        "التعرف على العطر من خلال صورة العبوة",
        "معلومات تفصيلية عن مكونات العطر",
        "اقتراح عطور مشابهة بناءً على الصورة",
        "تحليل النوتات العطرية بدقة عالية",
      ],
      imageAnalysisButton: "جرب تحليل الصورة",
      databaseTitle: "قاعدة بيانات شاملة للعطور",
      databaseDescription: "استكشف قاعدة بياناتنا الشاملة التي تضم أكثر من 500 عطر من مختلف الماركات العالمية والعربية",
      databaseBenefits: [
        "معلومات تفصيلية عن كل عطر",
        "تصنيف العطور حسب الفئات والماركات",
        "تقييمات وآراء المستخدمين",
        "تحديثات مستمرة لأحدث الإصدارات",
      ],
      databaseButton: "استكشف قاعدة البيانات",
    },
    en: {
      badge: "Discover Our Features",
      title: "Otouri Platform Features",
      description: "Discover the unique features that make Otouri platform the perfect choice for perfume enthusiasts",
      exclusiveFeature: "Exclusive Feature",
      aiTitle: "Otouri AI - Your Smart Assistant",
      aiDescription:
        "Consult Otouri AI to get personalized recommendations that suit your taste and personal preferences in the world of perfumes",
      aiBenefits: [
        "Instant answers to all your questions",
        "Personalized recommendations based on your preferences",
        "AI-powered expert perfume advice",
        "Suggestions for perfumes similar to your favorites",
      ],
      aiButton: "Consult Otouri AI Now",
      recommendationsTitle: "Personalized Recommendations Based on Your Preferences",
      recommendationsDescription:
        "Set your preferences for budget, type, occasion, season, perfume strength, longevity and your favorite notes",
      recommendationsBenefits: [
        "Personal analysis of your perfume taste",
        "Advanced filtering by multiple criteria",
        "Discover new perfumes that suit your taste",
        "Easy comparison between different perfumes",
      ],
      recommendationsButton: "Get Personalized Recommendations",
      imageAnalysisTitle: "AI Perfume Image Analysis",
      imageAnalysisDescription:
        "Upload an image of the perfume bottle and our system will recognize it and provide detailed information about it",
      imageAnalysisBenefits: [
        "Recognize perfume through bottle image",
        "Detailed information about perfume ingredients",
        "Suggest similar perfumes based on image",
        "Analyze fragrance notes with high accuracy",
      ],
      imageAnalysisButton: "Try Image Analysis",
      databaseTitle: "Comprehensive Perfume Database",
      databaseDescription:
        "Explore our comprehensive database containing over 500 perfumes from various international and Arabic brands",
      databaseBenefits: [
        "Detailed information about each perfume",
        "Classify perfumes by categories and brands",
        "User ratings and reviews",
        "Continuous updates for latest releases",
      ],
      databaseButton: "Explore Database",
    },
  }

  const t = translations[language]

  const features = [
    {
      id: 1,
      title: t.aiTitle,
      description: t.aiDescription,
      benefits: t.aiBenefits,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2022-59-30%20%D8%B9%D9%8F%D8%B7%D9%88%D8%B1%D9%8A%20%D8%A7%D9%83%D8%AA%D8%B4%D9%81%20%D8%B9%D8%B7%D8%B1%D9%83%20%D8%A7%D9%84%D9%85%D8%AB%D8%A7%D9%84%D9%8A-GUUWZSCQSjcRtTSXPeoWwBz45hSBqi.png",
      icon: <Bot className="h-6 w-6 text-white" />,
      color: "from-mint-500 to-mint-400",
      buttonText: t.aiButton,
    },
    {
      id: 2,
      title: t.recommendationsTitle,
      description: t.recommendationsDescription,
      benefits: t.recommendationsBenefits,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2023-00-09%20%D8%B9%D9%8F%D8%B7%D9%88%D8%B1%D9%8A%20%D8%A7%D9%83%D8%AA%D8%B4%D9%81%20%D8%B9%D8%B7%D8%B1%D9%83%20%D8%A7%D9%84%D9%85%D8%AB%D8%A7%D9%84%D9%8A-eMnTw7Fg4s8a6t3WZQrHnpobojRRaN.png",
      icon: <Sparkles className="h-6 w-6 text-white" />,
      color: "from-amber-500 to-amber-400",
      buttonText: t.recommendationsButton,
    },
    {
      id: 3,
      title: t.imageAnalysisTitle,
      description: t.imageAnalysisDescription,
      benefits: t.imageAnalysisBenefits,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2022-59-48%20%D8%B9%D9%8F%D8%B7%D9%88%D8%B1%D9%8A%20%D8%A7%D9%83%D8%AA%D8%B4%D9%81%20%D8%B9%D8%B7%D8%B1%D9%83%20%D8%A7%D9%84%D9%85%D8%AB%D8%A7%D9%84%D9%8A-EN3IRfoNZxv2NDt1UIagaSTNs6RNfN.png",
      icon: <Upload className="h-6 w-6 text-white" />,
      color: "from-rose-500 to-rose-400",
      buttonText: t.imageAnalysisButton,
    },
    {
      id: 4,
      title: t.databaseTitle,
      description: t.databaseDescription,
      benefits: t.databaseBenefits,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2023-00-20%20%D8%B9%D9%8F%D8%B7%D9%88%D8%B1%D9%8A%20%D8%A7%D9%83%D8%AA%D8%B4%D9%81%20%D8%B9%D8%B7%D8%B1%D9%83%20%D8%A7%D9%84%D9%85%D8%AB%D8%A7%D9%84%D9%8A-BFEJG5gfUSKAn1mrs1iXbU9ZJGa4yz.png",
      icon: <Database className="h-6 w-6 text-white" />,
      color: "from-sage-500 to-sage-400",
      buttonText: t.databaseButton,
    },
  ]

  return (
    <section id="features" className="py-20 bg-white overflow-hidden relative">
      <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-mint-100 rounded-full blur-3xl opacity-30 -z-10"></div>
          <span className="inline-block px-4 py-1.5 bg-mint-50 text-mint-600 rounded-full text-sm font-medium mb-4 shadow-sm">
            <Sparkles className="inline-block h-4 w-4 mr-1" /> {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-sm bg-gradient-to-r from-mint-600 to-mint-400 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.description}</p>
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-mint-200 to-transparent mt-8"></div>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-mint-50/30 to-transparent rounded-3xl -m-6 p-6 pointer-events-none"></div>
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Image Section - Alternating sides */}
                <motion.div
                  className={`relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] order-1 ${
                    index % 2 === 0 ? "md:order-1" : "md:order-2"
                  } group`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sage-900/30 via-transparent to-transparent z-10" />
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${feature.color} opacity-20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl`}
                  />

                  <div className="relative w-full h-full bg-gradient-to-br from-white to-mint-50/30 p-4 border border-mint-100 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 via-white/40 to-transparent"></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        fill
                        className="object-contain p-4 transition-all duration-700 group-hover:scale-105 drop-shadow-md"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>

                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-mint-200 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-mint-200 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-mint-200 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-mint-200 rounded-br-lg"></div>
                  </div>

                  {/* Feature badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div
                      className={`bg-gradient-to-r ${feature.color} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-sm`}
                    >
                      {feature.icon}
                      <span>{t.exclusiveFeature}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Content Section - Alternating sides */}
                <motion.div
                  className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-sage-900 mb-6 drop-shadow-sm relative inline-block">
                    {feature.title}
                    <div
                      className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                    ></div>
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">{feature.description}</p>

                  <div className="space-y-4 mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-sage-50 shadow-sm">
                    {feature.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-sm`}
                        >
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <p className="text-gray-700">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/auth/signup">
                      <Button
                        className={`px-8 py-6 rounded-full bg-gradient-to-r ${feature.color} text-white font-medium shadow-lg hover:shadow-xl transition-shadow text-base`}
                      >
                        {feature.buttonText}
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
