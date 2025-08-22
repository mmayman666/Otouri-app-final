"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Check, Bot, Upload, Database, Sparkles, ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useTranslation } from "@/lib/translations/context"

export default function FeaturesPage() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      // Hero Section
      advancedTech: "تقنيات متطورة",
      platformFeatures: "مميزات منصة عُطوري",
      heroDescription:
        "اكتشف المميزات الفريدة التي تجعل منصة عطوري الخيار الأمثل لعشاق العطور والباحثين عن التوصيات المثالية",
      startNowFree: "ابدأ الآن مجاناً",
      viewPricing: "عرض الأسعار",

      // Main Features Section
      coreFeatures: "المميزات الأساسية",
      advancedTechForUnique: "تقنيات متطورة لتجربة فريدة",
      aiTechDescription: "نستخدم أحدث تقنيات الذكاء الاصطناعي لتقديم تجربة مخصصة ومتطورة في عالم العطور",
      exclusiveFeature: "ميزة حصرية",

      // Features Data
      aiAssistantTitle: "عطوري AI - مساعدك الذكي",
      aiAssistantDesc: "استشر عطوري AI للحصول على توصيات مخصصة تناسب ذوقك وتفضيلاتك الشخصية في عالم العطور",
      aiAssistantBenefits: [
        "إجابات فورية على جميع استفساراتك",
        "توصيات مخصصة بناءً على تفضيلاتك",
        "نصائح من خبراء العطور المدعومة بالذكاء الاصطناعي",
        "اقتراحات لعطور مشابهة لعطورك المفضلة",
      ],
      aiAssistantButton: "استشر عطوري AI الآن",

      customRecommendationsTitle: "توصيات مخصصة حسب تفضيلاتك",
      customRecommendationsDesc:
        "حدد تفضيلاتك من الميزانية والنوع والمناسبة والموسم وقوة العطر ومدة بقائه والنوتات المفضلة لديك",
      customRecommendationsBenefits: [
        "تحليل شخصي لذوقك في العطور",
        "تصفية متقدمة حسب معايير متعددة",
        "اكتشاف عطور جديدة تناسب ذوقك",
        "مقارنة بين العطور المختلفة بسهولة",
      ],
      customRecommendationsButton: "احصل على توصيات مخصصة",

      imageAnalysisTitle: "تحليل صورة العطر بالذكاء الاصطناعي",
      imageAnalysisDesc: "قم بتحميل صورة لعبوة العطر وسيقوم نظامنا بالتعرف عليها وتقديم معلومات مفصلة عنها",
      imageAnalysisBenefits: [
        "التعرف على العطر من خلال صورة العبوة",
        "معلومات تفصيلية عن مكونات العطر",
        "اقتراح عطور مشابهة بناءً على الصورة",
        "تحليل النوتات العطرية بدقة عالية",
      ],
      imageAnalysisButton: "جرب تحليل الصورة",

      databaseTitle: "قاعدة بيانات شاملة للعطور",
      databaseDesc: "استكشف قاعدة بياناتنا الشاملة التي تضم أكثر من 500 عطر من مختلف الماركات العالمية والعربية",
      databaseBenefits: [
        "معلومات تفصيلية عن كل عطر",
        "تصنيف العطور حسب الفئات والماركات",
        "تقييمات وآراء المستخدمين",
        "تحديثات مستمرة لأحدث الإصدارات",
      ],
      databaseButton: "استكشف قاعدة البيانات",

      // Additional Features
      additionalFeatures: "مميزات إضافية",
      additionalFeaturesDesc: "استمتع بمميزات إضافية تجعل تجربتك أكثر تميزاً وفائدة",

      favoritesTitle: "تتبع العطور المفضلة",
      favoritesDesc: "احفظ عطورك المفضلة وتتبع تقييماتك وملاحظاتك الشخصية عليها لتكوين مجموعتك الخاصة",
      favoritesFeatures: ["حفظ غير محدود", "تقييمات شخصية", "ملاحظات مفصلة"],

      notificationsTitle: "تنبيهات العروض والخصومات",
      notificationsDesc: "احصل على إشعارات فورية عند توفر عروض وخصومات على عطورك المفضلة من المتاجر المختلفة",
      notificationsFeatures: ["إشعارات فورية", "مقارنة أسعار", "عروض حصرية"],

      communityTitle: "مجتمع عشاق العطور",
      communityDesc: "انضم لمجتمع نشط من عشاق العطور وشارك تجاربك واكتشف آراء الآخرين حول العطور المختلفة",
      communityFeatures: ["تقييمات المجتمع", "مناقشات تفاعلية", "خبراء العطور"],

      // CTA Sections
      readyToDiscover: "جاهز لاكتشاف عطرك المثالي؟",
      joinThousands: "انضم إلى آلاف المستخدمين الذين اكتشفوا عطورهم المفضلة معنا",
      startJourney: "ابدأ رحلتك الآن",
      browsePlans: "تصفح الباقات",

      tryAllFeatures: "جرب جميع المميزات الآن",
      startJourneyDesc: "ابدأ رحلتك في اكتشاف العطر المثالي مع أقوى منصة توصيات ذكية",
      startFreeNow: "ابدأ مجاناً الآن",
      viewPlansAndPricing: "عرض الخطط والأسعار",
    },
    en: {
      // Hero Section
      advancedTech: "Advanced Technology",
      platformFeatures: "Otouri Platform Features",
      heroDescription:
        "Discover the unique features that make Otouri the perfect choice for perfume lovers and those seeking ideal recommendations",
      startNowFree: "Start Now for Free",
      viewPricing: "View Pricing",

      // Main Features Section
      coreFeatures: "Core Features",
      advancedTechForUnique: "Advanced Technology for Unique Experience",
      aiTechDescription:
        "We use the latest AI technologies to provide a personalized and advanced experience in the world of perfumes",
      exclusiveFeature: "Exclusive Feature",

      // Features Data
      aiAssistantTitle: "Otouri AI - Your Smart Assistant",
      aiAssistantDesc:
        "Consult Otouri AI for personalized recommendations that suit your taste and personal preferences in the world of perfumes",
      aiAssistantBenefits: [
        "Instant answers to all your questions",
        "Personalized recommendations based on your preferences",
        "AI-powered expert perfume advice",
        "Suggestions for perfumes similar to your favorites",
      ],
      aiAssistantButton: "Consult Otouri AI Now",

      customRecommendationsTitle: "Custom Recommendations Based on Your Preferences",
      customRecommendationsDesc:
        "Set your preferences for budget, type, occasion, season, perfume strength, longevity, and your favorite notes",
      customRecommendationsBenefits: [
        "Personal analysis of your perfume taste",
        "Advanced filtering by multiple criteria",
        "Discover new perfumes that suit your taste",
        "Easy comparison between different perfumes",
      ],
      customRecommendationsButton: "Get Custom Recommendations",

      imageAnalysisTitle: "AI Perfume Image Analysis",
      imageAnalysisDesc:
        "Upload an image of the perfume bottle and our system will recognize it and provide detailed information about it",
      imageAnalysisBenefits: [
        "Recognize perfume from bottle image",
        "Detailed information about perfume components",
        "Suggest similar perfumes based on image",
        "Analyze fragrance notes with high accuracy",
      ],
      imageAnalysisButton: "Try Image Analysis",

      databaseTitle: "Comprehensive Perfume Database",
      databaseDesc:
        "Explore our comprehensive database containing over 500 perfumes from various international and Arabic brands",
      databaseBenefits: [
        "Detailed information about each perfume",
        "Perfume classification by categories and brands",
        "User ratings and reviews",
        "Continuous updates for latest releases",
      ],
      databaseButton: "Explore Database",

      // Additional Features
      additionalFeatures: "Additional Features",
      additionalFeaturesDesc: "Enjoy additional features that make your experience more distinctive and beneficial",

      favoritesTitle: "Track Favorite Perfumes",
      favoritesDesc:
        "Save your favorite perfumes and track your ratings and personal notes to build your own collection",
      favoritesFeatures: ["Unlimited saves", "Personal ratings", "Detailed notes"],

      notificationsTitle: "Deals and Discounts Alerts",
      notificationsDesc:
        "Get instant notifications when deals and discounts are available on your favorite perfumes from different stores",
      notificationsFeatures: ["Instant notifications", "Price comparison", "Exclusive offers"],

      communityTitle: "Perfume Lovers Community",
      communityDesc:
        "Join an active community of perfume lovers and share your experiences and discover others' opinions about different perfumes",
      communityFeatures: ["Community ratings", "Interactive discussions", "Perfume experts"],

      // CTA Sections
      readyToDiscover: "Ready to Discover Your Perfect Perfume?",
      joinThousands: "Join thousands of users who discovered their favorite perfumes with us",
      startJourney: "Start Your Journey Now",
      browsePlans: "Browse Plans",

      tryAllFeatures: "Try All Features Now",
      startJourneyDesc:
        "Start your journey to discover the perfect perfume with the most powerful smart recommendations platform",
      startFreeNow: "Start Free Now",
      viewPlansAndPricing: "View Plans and Pricing",
    },
  }

  const t = translations[language]

  const features = [
    {
      id: 1,
      title: t.aiAssistantTitle,
      description: t.aiAssistantDesc,
      benefits: t.aiAssistantBenefits,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2022-59-30%20%D8%B9%D9%8F%D8%B7%D9%88%D8%B1%D9%8A%20%D8%A7%D9%83%D8%AA%D8%B4%D9%81%20%D8%B9%D8%B7%D8%B1%D9%83%20%D8%A7%D9%84%D9%85%D8%AB%D8%A7%D9%84%D9%8A-GUUWZSCQSjcRtTSXPeoWwBz45hSBqi.png",
      icon: <Bot className="h-6 w-6 text-white" />,
      color: "from-mint-500 to-mint-400",
      buttonText: t.aiAssistantButton,
    },
    {
      id: 2,
      title: t.customRecommendationsTitle,
      description: t.customRecommendationsDesc,
      benefits: t.customRecommendationsBenefits,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2023-00-09%20%D8%B9%D9%8F%D8%B7%D9%88%D8%B1%D9%8A%20%D8%A7%D9%83%D8%AA%D8%B4%D9%81%20%D8%B9%D8%B7%D8%B1%D9%83%20%D8%A7%D9%84%D9%85%D8%AB%D8%A7%D9%84%D9%8A-eMnTw7Fg4s8a6t3WZQrHnpobojRRaN.png",
      icon: <Sparkles className="h-6 w-6 text-white" />,
      color: "from-amber-500 to-amber-400",
      buttonText: t.customRecommendationsButton,
    },
    {
      id: 3,
      title: t.imageAnalysisTitle,
      description: t.imageAnalysisDesc,
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
      description: t.databaseDesc,
      benefits: t.databaseBenefits,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2023-00-20%20%D8%B9%D9%8F%D8%B7%D9%88%D8%B1%D9%8A%20%D8%A7%D9%83%D8%AA%D8%B4%D9%81%20%D8%B9%D8%B7%D8%B1%D9%83%20%D8%A7%D9%84%D9%85%D8%AB%D8%A7%D9%84%D9%8A-BFEJG5gfUSKAn1mrs1iXbU9ZJGa4yz.png",
      icon: <Database className="h-6 w-6 text-white" />,
      color: "from-sage-500 to-sage-400",
      buttonText: t.databaseButton,
    },
  ]

  const additionalFeatures = [
    {
      title: t.favoritesTitle,
      description: t.favoritesDesc,
      icon: <Star className="h-8 w-8" />,
      color: "from-amber-500 to-amber-400",
      features: t.favoritesFeatures,
    },
    {
      title: t.notificationsTitle,
      description: t.notificationsDesc,
      icon: <Sparkles className="h-8 w-8" />,
      color: "from-mint-500 to-mint-400",
      features: t.notificationsFeatures,
    },
    {
      title: t.communityTitle,
      description: t.communityDesc,
      icon: <Bot className="h-8 w-8" />,
      color: "from-rose-500 to-rose-400",
      features: t.communityFeatures,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-sage-100 to-mint-100">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <Badge className="mb-6 bg-mint-500 text-white px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {t.advancedTech}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6">{t.platformFeatures}</h1>
              <p className="text-xl text-sage-600 mb-8">{t.heroDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-gradient-to-r from-mint-500 to-mint-400 text-white px-8 py-4">
                    {t.startNowFree}
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-sage-300 text-sage-700 px-8 py-4 bg-transparent"
                  >
                    {t.viewPricing}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20 bg-white overflow-hidden relative">
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
                <Sparkles className="inline-block h-4 w-4 mr-1" /> {t.coreFeatures}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-sm bg-gradient-to-r from-mint-600 to-mint-400 bg-clip-text text-transparent">
                {t.advancedTechForUnique}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.aiTechDescription}</p>
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

        {/* Additional Features */}
        <section className="py-20 bg-gradient-to-r from-sage-50 to-mint-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-sage-800 mb-4">{t.additionalFeatures}</h2>
              <p className="text-sage-600 max-w-2xl mx-auto">{t.additionalFeaturesDesc}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="relative overflow-hidden border-sage-200 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`}></div>

                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-sage-800 mb-3">{feature.title}</h3>
                        <p className="text-sage-600 leading-relaxed">{feature.description}</p>
                      </div>

                      <div className="space-y-3">
                        {feature.features.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                            >
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm text-sage-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* New CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-gradient-to-r from-mint-50 to-sage-50 rounded-3xl p-12 border border-mint-100 shadow-lg">
                <h2 className="text-3xl font-bold text-sage-800 mb-4">{t.readyToDiscover}</h2>
                <p className="text-xl text-sage-600 mb-8">{t.joinThousands}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/signup">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-mint-500 to-mint-400 text-white px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {t.startJourney}
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-sage-300 text-sage-700 px-8 py-4 bg-transparent"
                    >
                      {t.browsePlans}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-mint-500 to-sage-500">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl mx-auto text-white"
            >
              <h2 className="text-3xl font-bold mb-4">{t.tryAllFeatures}</h2>
              <p className="text-xl mb-8 opacity-90">{t.startJourneyDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-white text-mint-600 hover:bg-gray-100 px-8 py-4">
                    {t.startFreeNow}
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-mint-600 px-8 py-4 bg-transparent"
                  >
                    {t.viewPlansAndPricing}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
