"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, TrendingUp, ArrowRight, Sparkles, Crown, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    trendingPerfumes: "العطور الرائجة",
    viewAll: "عرض الكل",
    viewDetails: "عرض التفاصيل",
    mainNotes: "النوتات الرئيسية:",
    perfumes: {
      diorSauvage: "ديور سوفاج",
      chanelBleu: "شانيل بلو دو شانيل",
      diorOudIsfahan: "ديور عود إصفهان",
      lancomeLaVie: "لانكوم لا في إست بيل",
      tomFordOud: "توم فورد عود وود",
      creedAventus: "كريد أفينتوس",
    },
    brands: {
      dior: "ديور",
      chanel: "شانيل",
      lancome: "لانكوم",
      tomFord: "توم فورد",
      creed: "كريد",
    },
    categories: {
      mensPerfume: "عطر رجالي",
      orientalPerfume: "عطر شرقي",
      womensPerfume: "عطر نسائي",
      luxuryPerfume: "عطر فاخر",
    },
    notes: {
      bergamot: "البرغموت",
      pinkPepper: "الفلفل الوردي",
      ambroxan: "الأمبروكسان",
      lemon: "الليمون",
      mint: "النعناع",
      cedarwood: "خشب الأرز",
      oud: "العود",
      rose: "الورد",
      saffron: "الزعفران",
      blackcurrant: "الكشمش الأسود",
      jasmine: "الياسمين",
      vanilla: "الفانيليا",
      sandalwood: "خشب الصندل",
      pineapple: "الأناناس",
      birch: "البتولا",
      musk: "المسك",
    },
  },
  en: {
    trendingPerfumes: "Trending Perfumes",
    viewAll: "View All",
    viewDetails: "View Details",
    mainNotes: "Main Notes:",
    perfumes: {
      diorSauvage: "Dior Sauvage",
      chanelBleu: "Chanel Bleu de Chanel",
      diorOudIsfahan: "Dior Oud Ispahan",
      lancomeLaVie: "Lancome La Vie Est Belle",
      tomFordOud: "Tom Ford Oud Wood",
      creedAventus: "Creed Aventus",
    },
    brands: {
      dior: "Dior",
      chanel: "Chanel",
      lancome: "Lancome",
      tomFord: "Tom Ford",
      creed: "Creed",
    },
    categories: {
      mensPerfume: "Men's Perfume",
      orientalPerfume: "Oriental Perfume",
      womensPerfume: "Women's Perfume",
      luxuryPerfume: "Luxury Perfume",
    },
    notes: {
      bergamot: "Bergamot",
      pinkPepper: "Pink Pepper",
      ambroxan: "Ambroxan",
      lemon: "Lemon",
      mint: "Mint",
      cedarwood: "Cedarwood",
      oud: "Oud",
      rose: "Rose",
      saffron: "Saffron",
      blackcurrant: "Blackcurrant",
      jasmine: "Jasmine",
      vanilla: "Vanilla",
      sandalwood: "Sandalwood",
      pineapple: "Pineapple",
      birch: "Birch",
      musk: "Musk",
    },
  },
}

export function TrendingPerfumes() {
  const { language } = useTranslation()
  const t = translations[language]

  const trendingPerfumes = [
    {
      id: 1,
      name: t.perfumes.diorSauvage,
      brand: t.brands.dior,
      price: "٧٩٩ ر.س",
      rating: 4.9,
      sales: "+٢٣٪",
      category: t.categories.mensPerfume,
      notes: [t.notes.bergamot, t.notes.pinkPepper, t.notes.ambroxan],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: t.perfumes.chanelBleu,
      brand: t.brands.chanel,
      price: "٨٥٠ ر.س",
      rating: 4.8,
      sales: "+١٨٪",
      category: t.categories.mensPerfume,
      notes: [t.notes.lemon, t.notes.mint, t.notes.cedarwood],
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      id: 3,
      name: t.perfumes.diorOudIsfahan,
      brand: t.brands.dior,
      price: "٩٢٠ ر.س",
      rating: 4.7,
      sales: "+١٥٪",
      category: t.categories.orientalPerfume,
      notes: [t.notes.oud, t.notes.rose, t.notes.saffron],
      gradient: "from-amber-500 to-orange-600",
    },
    {
      id: 4,
      name: t.perfumes.lancomeLaVie,
      brand: t.brands.lancome,
      price: "٦٩٩ ر.س",
      rating: 4.6,
      sales: "+١٢٪",
      category: t.categories.womensPerfume,
      notes: [t.notes.blackcurrant, t.notes.jasmine, t.notes.vanilla],
      gradient: "from-pink-500 to-rose-600",
    },
    {
      id: 5,
      name: t.perfumes.tomFordOud,
      brand: t.brands.tomFord,
      price: "١٢٥٠ ر.س",
      rating: 4.9,
      sales: "+٢٠٪",
      category: t.categories.luxuryPerfume,
      notes: [t.notes.oud, t.notes.sandalwood, t.notes.vanilla],
      gradient: "from-purple-600 to-indigo-700",
    },
    {
      id: 6,
      name: t.perfumes.creedAventus,
      brand: t.brands.creed,
      price: "١٤٥٠ ر.س",
      rating: 4.8,
      sales: "+١٦٪",
      category: t.categories.luxuryPerfume,
      notes: [t.notes.pineapple, t.notes.birch, t.notes.musk],
      gradient: "from-emerald-500 to-teal-600",
    },
  ]

  return (
    <Card
      className="border-sage-100 shadow-md hover:shadow-lg transition-shadow"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <CardHeader className="pb-2 pt-4 px-6">
        <div className="flex items-center justify-between" dir={language === "ar" ? "rtl" : "ltr"}>
          <div className={`flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}>
            <CardTitle className="text-xl font-bold text-sage-900">{t.trendingPerfumes}</CardTitle>
            <TrendingUp className="h-5 w-5 text-mint-600" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-mint-600 hover:text-mint-700 hover:bg-mint-50 -mr-2 flex items-center gap-1 h-9 text-base"
          >
            {t.viewAll}
            <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-1 rtl:rotate-180" : "ml-1"}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir={language === "ar" ? "rtl" : "ltr"}>
          {trendingPerfumes.map((perfume, index) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              <div
                className="relative bg-white rounded-xl border border-sage-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:scale-105"
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                {/* Gradient Header */}
                <div className={`h-20 bg-gradient-to-r ${perfume.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div
                    className={`absolute top-2 ${language === "ar" ? "right-2" : "left-2"}`}
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {perfume.sales}
                    </span>
                  </div>
                  <div className={`absolute bottom-2 ${language === "ar" ? "right-3" : "left-3"}`}>
                    <Sparkles className="h-6 w-6 text-white/80" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
                  <div className="mb-3" dir={language === "ar" ? "rtl" : "ltr"}>
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={`font-bold text-sage-900 group-hover:text-mint-600 transition-colors text-lg ${language === "ar" ? "text-right" : "text-left"}`}
                      >
                        {perfume.name}
                      </h3>
                      <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                    <p
                      className={`text-sm text-gray-600 font-medium ${language === "ar" ? "text-right" : "text-left"}`}
                    >
                      {perfume.brand}
                    </p>
                    <span className="inline-block bg-mint-50 text-mint-700 text-xs px-2 py-1 rounded-full mt-1">
                      {perfume.category}
                    </span>
                  </div>

                  {/* Fragrance Notes */}
                  <div className="mb-3" dir={language === "ar" ? "rtl" : "ltr"}>
                    <p className={`text-xs text-gray-500 mb-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                      {t.mainNotes}
                    </p>
                    <div className={`flex flex-wrap gap-1 ${language === "ar" ? "justify-end" : "justify-start"}`}>
                      {perfume.notes.slice(0, 3).map((note, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto" dir={language === "ar" ? "rtl" : "ltr"}>
                    <div className={`flex flex-col ${language === "ar" ? "items-end" : "items-start"}`}>
                      <span className="text-mint-700 font-bold text-lg">{perfume.price}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className={`text-sm text-gray-600 ${language === "ar" ? "mr-1" : "ml-1"}`}>
                          {perfume.rating}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700 text-white shadow-md"
                    >
                      {t.viewDetails}
                    </Button>
                  </div>
                </div>

                {/* Luxury indicator for premium perfumes */}
                {perfume.price.includes("١٢٥٠") || perfume.price.includes("١٤٥٠") ? (
                  <div className={`absolute top-2 ${language === "ar" ? "left-2" : "right-2"}`}>
                    <Crown className="h-4 w-4 text-amber-500" />
                  </div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
