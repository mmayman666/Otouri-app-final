"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, Search, Clock, Eye, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    blogTitle: "مدونة عُطوري",
    blogSubtitle: "اكتشف أحدث المقالات والنصائح حول عالم العطور والتقنيات المتطورة من خبراء المجال",
    searchPlaceholder: "ابحث في المقالات...",
    updatedDaily: "محدث يومياً",
    featuredArticle: "المقال المميز",
    latestArticles: "أحدث المقالات",
    readFullArticle: "اقرأ المقال كاملاً",
    readMore: "اقرأ المزيد",
    viewMoreArticles: "عرض المزيد من المقالات",
    subscribeNewsletter: "اشترك في نشرتنا الإخبارية",
    newsletterDescription: "احصل على أحدث المقالات والنصائح حول العطور والعروض الحصرية مباشرة في بريدك الإلكتروني",
    emailPlaceholder: "بريدك الإلكتروني",
    subscribeNow: "اشترك الآن",
    privacyNote: "نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.",
    categories: {
      all: "الكل",
      tips: "نصائح",
      trends: "اتجاهات",
      technology: "تقنية",
      culture: "ثقافة",
      educational: "تعليمي",
    },
    readTime: "دقائق",
    views: "مشاهدة",
    featuredPost: {
      title: "دليل شامل لاختيار العطر المناسب لشخصيتك في 2024",
      excerpt:
        "تعرف على كيفية اختيار العطر الذي يعبر عن شخصيتك ويناسب أسلوب حياتك من خلال هذا الدليل المفصل الذي يغطي جميع جوانب اختيار العطر المثالي.",
      category: "نصائح",
      author: "فريق عُطوري",
      date: "15 يناير 2024",
      readTime: "8 دقائق",
    },
    blogPosts: [
      {
        title: "أحدث اتجاهات العطور لعام 2024: ما الجديد؟",
        excerpt: "استكشف أحدث صيحات العطور وما يميز عطور هذا العام من روائح وتركيبات مبتكرة تواكب العصر.",
        category: "اتجاهات",
        author: "سارة أحمد",
        date: "12 يناير 2024",
        readTime: "6 دقائق",
      },
      {
        title: "كيف يعمل الذكاء الاصطناعي في توصيات العطور؟",
        excerpt: "تعمق في فهم التقنيات المتطورة التي نستخدمها لتقديم توصيات دقيقة ومخصصة لكل مستخدم.",
        category: "تقنية",
        author: "محمد علي",
        date: "10 يناير 2024",
        readTime: "10 دقائق",
      },
      {
        title: "فن تطبيق العطر: نصائح من الخبراء",
        excerpt: "تعلم الطريقة الصحيحة لتطبيق العطر للحصول على أفضل النتائج وثبات أطول مع نصائح الخبراء.",
        category: "نصائح",
        author: "ليلى محمد",
        date: "8 يناير 2024",
        readTime: "5 دقائق",
      },
      {
        title: "تاريخ العطور في الثقافة العربية",
        excerpt: "رحلة عبر التاريخ لاستكشاف دور العطور في الثقافة العربية وتطورها عبر العصور.",
        category: "ثقافة",
        author: "أحمد حسن",
        date: "5 يناير 2024",
        readTime: "12 دقائق",
      },
      {
        title: "العطور الطبيعية مقابل الصناعية: دليل المقارنة",
        excerpt: "مقارنة شاملة بين العطور الطبيعية والصناعية ومتى تختار كل نوع حسب احتياجاتك.",
        category: "تعليمي",
        author: "فاطمة علي",
        date: "3 يناير 2024",
        readTime: "7 دقائق",
      },
      {
        title: "أفضل العطور للمناسبات الخاصة",
        excerpt: "اكتشف أفضل العطور التي تناسب المناسبات المختلفة من الأعراس إلى اجتماعات العمل.",
        category: "نصائح",
        author: "عمر خالد",
        date: "1 يناير 2024",
        readTime: "6 دقائق",
      },
    ],
  },
  en: {
    blogTitle: "Otouri Blog",
    blogSubtitle:
      "Discover the latest articles and tips about the world of perfumes and advanced technologies from industry experts",
    searchPlaceholder: "Search articles...",
    updatedDaily: "Updated Daily",
    featuredArticle: "Featured Article",
    latestArticles: "Latest Articles",
    readFullArticle: "Read Full Article",
    readMore: "Read More",
    viewMoreArticles: "View More Articles",
    subscribeNewsletter: "Subscribe to Our Newsletter",
    newsletterDescription: "Get the latest articles and perfume tips plus exclusive offers directly in your inbox",
    emailPlaceholder: "Your email address",
    subscribeNow: "Subscribe Now",
    privacyNote: "We respect your privacy. You can unsubscribe at any time.",
    categories: {
      all: "All",
      tips: "Tips",
      trends: "Trends",
      technology: "Technology",
      culture: "Culture",
      educational: "Educational",
    },
    readTime: "minutes",
    views: "views",
    featuredPost: {
      title: "A Comprehensive Guide to Choosing the Right Perfume for Your Personality in 2024",
      excerpt:
        "Learn how to choose a perfume that reflects your personality and suits your lifestyle through this detailed guide that covers all aspects of selecting the perfect perfume.",
      category: "Tips",
      author: "Otouri Team",
      date: "January 15, 2024",
      readTime: "8 minutes",
    },
    blogPosts: [
      {
        title: "Latest Perfume Trends for 2024: What's New?",
        excerpt:
          "Explore the latest perfume trends and what makes this year's perfumes unique with innovative scents and compositions that keep up with the times.",
        category: "Trends",
        author: "Sarah Ahmed",
        date: "January 12, 2024",
        readTime: "6 minutes",
      },
      {
        title: "How Does Artificial Intelligence Work in Perfume Recommendations?",
        excerpt:
          "Dive into understanding the advanced technologies we use to provide accurate and personalized recommendations for each user.",
        category: "Technology",
        author: "Mohamed Ali",
        date: "January 10, 2024",
        readTime: "10 minutes",
      },
      {
        title: "The Art of Applying Perfume: Expert Tips",
        excerpt:
          "Learn the correct way to apply perfume for the best results and longest-lasting effect with expert tips.",
        category: "Tips",
        author: "Layla Mohammed",
        date: "January 8, 2024",
        readTime: "5 minutes",
      },
      {
        title: "The History of Perfumes in Arab Culture",
        excerpt:
          "A journey through history to explore the role of perfumes in Arab culture and their evolution over the ages.",
        category: "Culture",
        author: "Ahmed Hassan",
        date: "January 5, 2024",
        readTime: "12 minutes",
      },
      {
        title: "Natural Perfumes vs. Synthetic Perfumes: A Comparison Guide",
        excerpt:
          "A comprehensive comparison between natural and synthetic perfumes and when to choose each type based on your needs.",
        category: "Educational",
        author: "Fatima Ali",
        date: "January 3, 2024",
        readTime: "7 minutes",
      },
      {
        title: "Best Perfumes for Special Occasions",
        excerpt: "Discover the best perfumes that suit various occasions from weddings to work meetings.",
        category: "Tips",
        author: "Omar Khalid",
        date: "January 1, 2024",
        readTime: "6 minutes",
      },
    ],
  },
}

export default function BlogNewPage() {
  const { language } = useTranslation()
  const t = translations[language]

  const featuredPost = {
    id: 1,
    title: t.featuredPost.title,
    excerpt: t.featuredPost.excerpt,
    category: t.featuredPost.category,
    author: t.featuredPost.author,
    date: t.featuredPost.date,
    image: "/placeholder.svg?height=400&width=600",
    readTime: t.featuredPost.readTime,
    views: "2.5k",
    featured: true,
  }

  const blogPosts = t.blogPosts.map((post, index) => ({
    id: index + 2,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    date: post.date,
    image: `/placeholder.svg?height=300&width=400&query=perfume article ${index + 1}`,
    readTime: post.readTime,
    views: ["1.8k", "3.2k", "1.5k", "2.1k", "1.9k", "1.3k"][index],
  }))

  const categories = [
    t.categories.all,
    t.categories.tips,
    t.categories.trends,
    t.categories.technology,
    t.categories.culture,
    t.categories.educational,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-sage-100 to-mint-100">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Badge className="mb-6 bg-mint-500 text-white px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                {t.updatedDaily}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-6">{t.blogTitle}</h1>
              <p className="text-xl text-sage-600 max-w-2xl mx-auto mb-8">{t.blogSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative max-w-md mx-auto sm:mx-0">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full pr-10 pl-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 border-b border-sage-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    variant={category === t.categories.all ? "default" : "outline"}
                    size="sm"
                    className={
                      category === t.categories.all
                        ? "bg-mint-500 hover:bg-mint-600 text-white"
                        : "border-sage-300 text-sage-700 hover:bg-sage-50"
                    }
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-gradient-to-r from-mint-500 to-sage-500 rounded"></div>
                <h2 className="text-2xl font-bold text-sage-800">{t.featuredArticle}</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden shadow-2xl border-sage-200 hover:shadow-3xl transition-all duration-500">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto group">
                    <img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-mint-500 text-white shadow-lg">
                      {featuredPost.category}
                    </Badge>
                    <div className="absolute bottom-4 right-4 flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        125
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-sage-800 mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-sage-600 mb-6 leading-relaxed text-lg">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-sage-500 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white w-fit px-8 py-3"
                      onClick={() => (window.location.href = "/auth/signup")}
                    >
                      {t.readFullArticle}
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-gradient-to-r from-sage-50/50 to-mint-50/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-gradient-to-r from-mint-500 to-sage-500 rounded"></div>
                <h2 className="text-2xl font-bold text-sage-800">{t.latestArticles}</h2>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg border-sage-200 hover:shadow-xl transition-all duration-300 group h-full">
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className="absolute top-3 right-3 bg-mint-500 text-white shadow-md">{post.category}</Badge>
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-sage-800 mb-3 line-clamp-2 leading-tight">{post.title}</h3>
                      <p className="text-sage-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-sage-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-sage-500">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-mint-300 text-mint-700 hover:bg-mint-50 bg-transparent"
                          onClick={() => (window.location.href = "/auth/signup")}
                        >
                          {t.readMore}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-sage-300 text-sage-700 hover:bg-sage-50 px-8 bg-transparent"
                onClick={() => (window.location.href = "/auth/signup")}
              >
                {t.viewMoreArticles}
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-20 bg-gradient-to-r from-mint-500 to-sage-500">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Card className="max-w-2xl mx-auto text-center border-0 shadow-2xl">
                <CardContent className="p-8 lg:p-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-sage-800 mb-4">{t.subscribeNewsletter}</h2>
                  <p className="text-sage-600 mb-8 text-lg">{t.newsletterDescription}</p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder={t.emailPlaceholder}
                      className="flex-1 px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                    />
                    <Button
                      className="bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white px-6 py-3"
                      onClick={() => (window.location.href = "/auth/signup")}
                    >
                      {t.subscribeNow}
                    </Button>
                  </div>
                  <p className="text-sm text-sage-500 mt-4">{t.privacyNote}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
