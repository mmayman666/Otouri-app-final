"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, Search, Clock, Eye, Heart, Star, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    blogTitle: "مدونة",
    blogSubtitle: "اكتشف عالم العطور من خلال مقالات حصرية ونصائح خبراء ومراجعات شاملة",
    searchPlaceholder: "ابحث في المقالات والنصائح...",
    searchButton: "بحث",
    popularSearch: "البحث الشائع:",
    updatedDaily: "محدث يومياً",
    exclusiveArticles: "مقالات حصرية",
    trending: "رائج",
    featuredArticles: "المقالات المميزة",
    categories: {
      all: "الكل",
      expertTips: "نصائح الخبراء",
      reviews: "مراجعات",
      trends: "اتجاهات",
      technology: "تقنية",
      educational: "تعليمي",
      history: "تاريخ",
    },
    searchTags: ["عطور شرقية", "نصائح العطور", "عطور طبيعية", "مراجعات"],
    featuredArticlesData: [
      {
        id: 1,
        title: "أسرار اختيار العطر المثالي لشخصيتك",
        excerpt: "دليل شامل يساعدك على اكتشاف العطر الذي يعبر عن شخصيتك الفريدة ويترك انطباعاً لا يُنسى",
        category: "نصائح الخبراء",
        author: "د. سارة العطار",
        date: "20 يناير 2024",
        readTime: "8 دقائق",
      },
      {
        id: 2,
        title: "ثورة الذكاء الاصطناعي في عالم العطور",
        excerpt: "كيف تغير التقنيات الحديثة طريقة اكتشاف وتطوير العطور الجديدة",
        category: "تقنية",
        author: "أحمد التقني",
        date: "18 يناير 2024",
        readTime: "12 دقيقة",
      },
    ],
  },
  en: {
    blogTitle: "Blog",
    blogSubtitle: "Discover the world of perfumes through exclusive articles, expert tips, and comprehensive reviews",
    searchPlaceholder: "Search articles and tips...",
    searchButton: "Search",
    popularSearch: "Popular searches:",
    updatedDaily: "Updated Daily",
    exclusiveArticles: "Exclusive Articles",
    trending: "Trending",
    featuredArticles: "Featured Articles",
    categories: {
      all: "All",
      expertTips: "Expert Tips",
      reviews: "Reviews",
      trends: "Trends",
      technology: "Technology",
      educational: "Educational",
      history: "History",
    },
    searchTags: ["Oriental Perfumes", "Perfume Tips", "Natural Perfumes", "Reviews"],
    featuredArticlesData: [
      {
        id: 1,
        title: "Secrets of Choosing the Perfect Perfume for Your Personality",
        excerpt:
          "A comprehensive guide to help you discover the fragrance that expresses your unique personality and leaves an unforgettable impression",
        category: "Expert Tips",
        author: "Dr. Sarah Al-Attar",
        date: "January 20, 2024",
        readTime: "8 minutes",
      },
      {
        id: 2,
        title: "The AI Revolution in the World of Perfumes",
        excerpt: "How modern technologies are changing the way we discover and develop new fragrances",
        category: "Technology",
        author: "Ahmed Al-Taqni",
        date: "January 18, 2024",
        readTime: "12 minutes",
      },
    ],
  },
}

export default function BlogPage() {
  const { language } = useTranslation()
  const t = translations[language]

  const featuredArticles = t.featuredArticlesData.map((article, index) => ({
    ...article,
    image: index === 0 ? "/blog-images/artistic-perfume-bottles.jpg" : "/blog-images/perfume-collection-gorilla.jpg",
    views: index === 0 ? "15.2k" : "8.7k",
    likes: index === 0 ? "892" : "543",
    featured: true,
    trending: index === 0,
    slug: index === 0 ? "perfume-personality-guide" : "ai-perfume-revolution",
  }))

  const categories = [
    { name: t.categories.all, count: 156, active: true },
    { name: t.categories.expertTips, count: 45 },
    { name: t.categories.reviews, count: 32 },
    { name: t.categories.trends, count: 28 },
    { name: t.categories.technology, count: 18 },
    { name: t.categories.educational, count: 22 },
    { name: t.categories.history, count: 11 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-sage-100 via-mint-50 to-sage-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge className="bg-mint-500 text-white px-4 py-2 text-sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t.updatedDaily}
                </Badge>
                <Badge className="bg-sage-500 text-white px-4 py-2 text-sm">
                  <Star className="w-4 h-4 mr-2" />
                  {t.exclusiveArticles}
                </Badge>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-sage-800 mb-6 leading-tight">
                {t.blogTitle}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint-600 to-sage-600">
                  Perfumery
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-sage-600 mb-8 leading-relaxed">{t.blogSubtitle}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                <div className="relative flex-1 w-full">
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full pr-12 pl-4 py-4 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-mint-500 focus:border-transparent text-lg"
                  />
                </div>
                <Button className="bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white px-8 py-4 text-lg rounded-xl">
                  {t.searchButton}
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <span className="text-sage-600 text-sm">{t.popularSearch}</span>
                {t.searchTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-sage-300 text-sage-600 hover:bg-sage-50 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b border-sage-200">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 flex-wrap justify-center">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    variant={category.active ? "default" : "outline"}
                    size="sm"
                    className={
                      category.active
                        ? "bg-mint-500 hover:bg-mint-600 text-white shadow-lg"
                        : "border-sage-300 text-sage-700 hover:bg-sage-50"
                    }
                  >
                    {category.name}
                    <Badge variant="secondary" className="mr-2 bg-sage-100 text-sage-700">
                      {category.count}
                    </Badge>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-1 bg-gradient-to-r from-mint-500 to-sage-500 rounded"></div>
                <h2 className="text-3xl font-bold text-sage-800">{t.featuredArticles}</h2>
                <Star className="w-6 h-6 text-mint-500" />
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden shadow-2xl border-sage-200 hover:shadow-3xl transition-all duration-500 group h-full">
                    <div className="relative">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge className="bg-mint-500 text-white shadow-lg">{article.category}</Badge>
                        {article.trending && (
                          <Badge className="bg-red-500 text-white shadow-lg">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {t.trending}
                          </Badge>
                        )}
                      </div>

                      <div className="absolute bottom-4 right-4 flex items-center gap-4 text-white text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {article.likes}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-sage-800 mb-4 leading-tight group-hover:text-mint-700 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sage-600 mb-6 leading-relaxed text-lg">{article.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-sage-500 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>

                      <Button
                        className="bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white w-full py-3"
                        onClick={() => (window.location.href = `/blog/${article.slug}`)}
                      >
                        {t.readFullArticle}
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
