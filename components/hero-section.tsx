"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Search, Upload, ArrowRight, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/translations/context"

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiStep, setAiStep] = useState(0)
  const [showAiProcess, setShowAiProcess] = useState(false)
  const [searchValue, setSearchValue] = useState("") // New state for search input value
  const router = useRouter()
  const { language } = useTranslation()

  const translations = {
    ar: {
      badge: "اكتشف عالم العطور الفاخرة",
      title: "عطرك المثالي",
      titleHighlight: "بين يديك الآن",
      description:
        "منصة متخصصة تساعدك في العثور على العطر المناسب لشخصيتك وذوقك من خلال تقنيات الذكاء الاصطناعي المتطورة",
      textSearchTab: "البحث بالنص",
      imageSearchTab: "البحث بالصورة",
      searchPlaceholder: "اكتب اسم العطر والماركة والنوع (رجالي/نسائي)...",
      searchButton: "ابحث الآن",
      imageSearchButton: "ابحث بالصورة",
      uploadText: "قم بسحب وإفلات صورة العطر هنا",
      uploadSubtext: "أو انقر لاختيار ملف",
      mensPerfumes: "عطور رجالية",
      womensPerfumes: "عطور نسائية",
      orientalPerfumes: "عطور شرقية",
      frenchPerfumes: "عطور فرنسية",
      luxuryPerfumes: "عطور فاخرة",
      luxuryDescription: "مجموعة متنوعة من أرقى العطور العالمية والعربية",
      accuracy: "دقة التوصيات",
      accuracyDescription: "توصيات مخصصة تناسب ذوقك الشخصي بدقة عالية",
      aiTechnology: "تقنية متطورة",
      aiDescription: "ذكاء اصطناعي متطور لتحليل وتصنيف العطور",
    },
    en: {
      badge: "Discover the World of Luxury Perfumes",
      title: "Your Perfect Fragrance",
      titleHighlight: "At Your Fingertips",
      description:
        "A specialized platform that helps you find the perfect fragrance for your personality and taste using advanced artificial intelligence technologies",
      textSearchTab: "Text Search",
      imageSearchTab: "Image Search",
      searchPlaceholder: "Enter perfume name, brand, and type (men's/women's)...",
      searchButton: "Search Now",
      imageSearchButton: "Search by Image",
      uploadText: "Drag and drop perfume image here",
      uploadSubtext: "Or click to select file",
      mensPerfumes: "Men's Perfumes",
      womensPerfumes: "Women's Perfumes",
      orientalPerfumes: "Oriental Perfumes",
      frenchPerfumes: "French Perfumes",
      luxuryPerfumes: "Luxury Perfumes",
      luxuryDescription: "A diverse collection of the finest international and Arabic perfumes",
      accuracy: "Recommendation Accuracy",
      accuracyDescription: "Personalized recommendations that match your personal taste with high accuracy",
      aiTechnology: "Advanced Technology",
      aiDescription: "Advanced AI for analyzing and classifying perfumes",
    },
  }

  const t = translations[language]

  const simulateAiProcess = () => {
    setIsProcessing(true)
    setShowAiProcess(true)
    setAiStep(0)

    const steps = [
      "تحليل المدخلات...",
      "معالجة البيانات بالذكاء الاصطناعي...",
      "مطابقة التفضيلات...",
      "إنشاء التوصيات المخصصة...",
      "جاهز!",
    ]

    steps.forEach((_, index) => {
      setTimeout(() => {
        setAiStep(index)
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsProcessing(false)
            setShowAiProcess(false)
          }, 1000)
        }
      }, index * 800)
    })
  }

  return (
    <section className="relative overflow-hidden pt-10 pb-24 md:pt-16 md:pb-32 lg:pt-20 lg:pb-40">
      {/* خلفية متحركة أفتح */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-mint-50 via-white to-white"></div>
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at center, #25cf71 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "30px 30px"],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      {/* أشكال زخرفية متحركة أفتح وأكثر حيوية */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-mint-100 to-mint-50 opacity-50 blur-3xl -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.6, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-sage-200 to-sage-50 opacity-50 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* زخارف هندسية */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-mint-100 rounded-lg opacity-30 -z-10 hidden md:block shadow-lg" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border-2 border-sage-100 rounded-full opacity-30 -z-10 hidden md:block shadow-lg" />
      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-mint-200 rotate-45 opacity-30 -z-10 hidden md:block shadow-lg"
        animate={{ rotate: 405 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container relative">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block mb-3"
          >
            <span className="bg-sage-100 text-sage-700 text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.badge}</span>
            </span>
          </motion.div>

          <motion.h1
            className="font-almarai text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gradient mb-6 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t.title}
            <br />
            <span className="bg-gradient-to-r from-sage-600 to-mint-500 bg-clip-text text-transparent drop-shadow">
              {t.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-600 md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {t.description}
          </motion.p>
        </div>

        {/* نموذج البحث المدمج */}
        <motion.div
          className="max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div
            className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
              isSearchFocused
                ? "border-mint-400 shadow-[0_10px_40px_-15px_rgba(37,207,113,0.3)]"
                : "border-sage-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)]"
            }`}
          >
            {/* تبويبات البحث */}
            <div className="flex border-b border-sage-100">
              <button
                className={`flex-1 py-4 text-center font-medium transition-all ${
                  activeTab === "text"
                    ? "bg-mint-50 text-sage-800 border-b-2 border-mint-400"
                    : "text-gray-500 hover:bg-sage-50/50"
                }`}
                onClick={() => setActiveTab("text")}
              >
                {t.textSearchTab}
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-all ${
                  activeTab === "image"
                    ? "bg-mint-50 text-sage-800 border-b-2 border-mint-400"
                    : "text-gray-500 hover:bg-sage-50/50"
                }`}
                onClick={() => setActiveTab("image")}
              >
                {t.imageSearchTab}
              </button>
            </div>

            {/* محتوى البحث بالنص */}
            <AnimatePresence mode="wait">
              {activeTab === "text" && (
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  key="text-search"
                >
                  <div className="space-y-6">
                    <div className="relative">
                      <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        value={searchValue} // Controlled input
                        onChange={(e) => setSearchValue(e.target.value)} // Controlled input
                        placeholder={t.searchPlaceholder}
                        className="pr-10 py-6 text-right border-sage-200 focus:border-mint-400 rounded-lg shadow-inner"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <motion.span
                        className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm cursor-pointer hover:bg-sage-100 shadow-sm hover:shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchValue(t.mensPerfumes)} // New onClick handler
                      >
                        {t.mensPerfumes}
                      </motion.span>
                      <motion.span
                        className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm cursor-pointer hover:bg-sage-100 shadow-sm hover:shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchValue(t.womensPerfumes)} // New onClick handler
                      >
                        {t.womensPerfumes}
                      </motion.span>
                      <motion.span
                        className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm cursor-pointer hover:bg-sage-100 shadow-sm hover:shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchValue(t.orientalPerfumes)} // New onClick handler
                      >
                        {t.orientalPerfumes}
                      </motion.span>
                      <motion.span
                        className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm cursor-pointer hover:bg-sage-100 shadow-sm hover:shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchValue(t.frenchPerfumes)} // New onClick handler
                      >
                        {t.frenchPerfumes}
                      </motion.span>
                    </div>

                    <motion.button
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-mint-500 to-mint-400 text-white font-medium flex items-center justify-center gap-2 group shadow-[0_8px_20px_-6px_rgba(37,207,113,0.5)]"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(37, 207, 113, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.preventDefault()
                        simulateAiProcess()
                        setTimeout(() => router.push("/auth/signup"), 4000)
                      }}
                    >
                      {t.searchButton}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* محتوى البحث بالصورة */}
              {activeTab === "image" && (
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  key="image-search"
                >
                  <div className="space-y-6">
                    <motion.div
                      className="border-2 border-dashed border-sage-200 rounded-lg p-8 text-center cursor-pointer hover:bg-sage-50/50 transition-colors shadow-inner"
                      whileHover={{
                        scale: 1.01,
                        borderColor: "#48e590",
                        boxShadow: "0 5px 15px -3px rgba(37, 207, 113, 0.2)",
                      }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => router.push("/auth/signup")}
                    >
                      <Upload className="h-12 w-12 mx-auto text-mint-400 mb-4 drop-shadow" />
                      <p className="text-gray-600 mb-2">{t.uploadText}</p>
                      <p className="text-sm text-gray-500">{t.uploadSubtext}</p>
                    </motion.div>

                    <motion.button
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-sage-600 to-mint-500 text-white font-medium flex items-center justify-center gap-2 group shadow-[0_8px_20px_-6px_rgba(37,207,113,0.5)]"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(31, 205, 110, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.preventDefault()
                        simulateAiProcess()
                        setTimeout(() => router.push("/auth/signup"), 4000)
                      }}
                    >
                      {t.imageSearchButton}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Process Animation Overlay */}
          <AnimatePresence>
            {showAiProcess && (
              <motion.div
                className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center space-y-6">
                  {/* AI Brain Animation */}
                  <motion.div
                    className="relative mx-auto w-20 h-20"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-mint-400 to-sage-500 rounded-full opacity-20 animate-pulse" />
                    <div className="absolute inset-2 bg-gradient-to-r from-mint-500 to-sage-600 rounded-full opacity-40 animate-pulse" />
                    <div className="absolute inset-4 bg-gradient-to-r from-mint-600 to-sage-700 rounded-full opacity-60 animate-pulse" />
                    <div className="absolute inset-6 bg-gradient-to-r from-mint-700 to-sage-800 rounded-full animate-pulse" />
                  </motion.div>

                  {/* Processing Steps */}
                  <div className="space-y-3">
                    <motion.h3
                      className="text-lg font-bold text-sage-900"
                      key={aiStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {language === "ar"
                        ? [
                            "تحليل المدخلات...",
                            "معالجة البيانات بالذكاء الاصطناعي...",
                            "مطابقة التفضيلات...",
                            "إنشاء التوصيات المخصصة...",
                            "جاهز!",
                          ][aiStep]
                        : [
                            "Analyzing inputs...",
                            "Processing with AI...",
                            "Matching preferences...",
                            "Creating personalized recommendations...",
                            "Ready!",
                          ][aiStep]}
                    </motion.h3>

                    {/* Progress Dots */}
                    <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                      {[0, 1, 2, 3, 4].map((step) => (
                        <motion.div
                          key={step}
                          className={`w-2 h-2 rounded-full ${step <= aiStep ? "bg-mint-500" : "bg-gray-300"}`}
                          animate={{
                            scale: step === aiStep ? [1, 1.3, 1] : 1,
                            backgroundColor: step <= aiStep ? "#10b981" : "#d1d5db",
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: step === aiStep ? Number.POSITIVE_INFINITY : 0,
                          }}
                        />
                      ))}
                    </div>

                    {/* AI Particles Animation */}
                    <div className="relative h-8 overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-mint-400 rounded-full"
                          animate={{
                            x: [0, 100, 200],
                            y: [0, -10, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.3,
                            ease: "easeInOut",
                          }}
                          style={{
                            left: `${20 + i * 10}%`,
                            top: "50%",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* بطاقات معلومات متحركة */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-xl p-5 border border-sage-100 relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ y: -5, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-mint-100 to-mint-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-mint-100 flex items-center justify-center shrink-0 shadow-md">
                <span className="text-mint-700 text-lg font-bold">+500</span>
              </div>
              <div>
                <h3 className="font-bold text-sage-900 mb-1">{t.luxuryPerfumes}</h3>
                <p className="text-sm text-gray-600">{t.luxuryDescription}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-5 border border-sage-100 relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ y: -5, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sage-100 to-sage-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center shrink-0 shadow-md">
                <span className="text-sage-700 text-lg font-bold">98%</span>
              </div>
              <div>
                <h3 className="font-bold text-sage-900 mb-1">{t.accuracy}</h3>
                <p className="text-sm text-gray-600">{t.accuracyDescription}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-5 border border-sage-100 relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ y: -5, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-mint-100 to-sage-100 rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mint-100 to-sage-100 flex items-center justify-center shrink-0 shadow-md">
                <span className="text-sage-700 text-lg font-bold">AI</span>
              </div>
              <div>
                <h3 className="font-bold text-sage-900 mb-1">{t.aiTechnology}</h3>
                <p className="text-sm text-gray-600">{t.aiDescription}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
