"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Target,
  CheckCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    breadcrumb: {
      home: "الرئيسية",
      blog: "المدونة",
    },
    post: {
      category: "نصائح الخبراء",
      title: "أسرار اختيار العطر المثالي لشخصيتك",
      excerpt: "دليل شامل يساعدك على اكتشاف العطر الذي يعبر عن شخصيتك الفريدة ويترك انطباعاً لا يُنسى",
      date: "20 يناير 2024",
      readTime: "8 دقائق",
      views: "15.2k",
      likes: "892",
      tags: ["عطور", "شخصية", "نصائح", "اختيار العطر", "أسلوب حياة"],
    },
    buttons: {
      share: "مشاركة",
      startNow: "ابدأ الآن",
      readArticle: "اقرأ المقال",
      backToBlog: "العودة للمدونة",
      previousArticle: "المقال السابق",
      nextArticle: "المقال التالي",
    },
    content: {
      introduction: "مقدمة",
      personalityTypesTitle: "أنواع الشخصيات العطرية",
      tipsTitle: "نصائح ذهبية لاختيار العطر المناسب",
      conclusion: "خاتمة",
      keywords: "الكلمات المفتاحية",
      tableOfContents: "محتويات المقال",
      relatedArticles: "مقالات ذات صلة",
      discoverPerfume: "اكتشف عطرك المثالي",
      discoverDesc: "جرب أدواتنا المتطورة لاكتشاف العطر المناسب لك",
      suitablePerfumes: "العطور المناسبة:",
      characteristics: "الخصائص:",
    },
    introductionContent: {
      paragraph1:
        "اختيار العطر المناسب ليس مجرد تفضيل شخصي، بل هو فن يعكس شخصيتك وأسلوب حياتك. العطر هو توقيعك الخفي الذي يترك انطباعاً دائماً في ذاكرة من حولك. في هذا المقال الشامل، سنكشف لك أسرار اختيار العطر المثالي الذي يناسب شخصيتك ويعبر عن هويتك الفريدة.",
      paragraph2:
        "هل تساءلت يوماً لماذا يبدو عطر معين رائعاً على صديقك بينما لا يناسبك أنت؟ السر يكمن في فهم شخصيتك وما يناسبها من تركيبات عطرية. دعنا نأخذك في رحلة لاكتشاف عطرك المثالي.",
    },
    personalityTypes: [
      {
        type: "الشخصية الكلاسيكية",
        description: "تفضل البساطة والأناقة الخالدة",
        perfumes: ["العود الطبيعي", "الصندل", "المسك الأبيض", "الياسمين"],
        characteristics: ["محافظة", "أنيقة", "موثوقة", "راقية"],
      },
      {
        type: "الشخصية الرومانسية",
        description: "تحب الرقة والعاطفة والجمال",
        perfumes: ["الورد البلغاري", "الفريزيا", "البنفسج", "زهر البرتقال"],
        characteristics: ["حساسة", "عاطفية", "حالمة", "رقيقة"],
      },
      {
        type: "الشخصية المغامرة",
        description: "تحب التجديد والاكتشاف والتميز",
        perfumes: ["الحمضيات", "النعناع", "الأوكالبتوس", "الجريب فروت"],
        characteristics: ["جريئة", "نشيطة", "مبدعة", "متجددة"],
      },
      {
        type: "الشخصية القوية",
        description: "تفضل الثقة والحضور المؤثر",
        perfumes: ["العنبر", "الباتشولي", "الفانيليا", "التوابل"],
        characteristics: ["واثقة", "قيادية", "مؤثرة", "جذابة"],
      },
    ],
    tips: [
      {
        title: "اختبر العطر على بشرتك",
        description: "لا تعتمد على الرائحة من الزجاجة أو الورق، فكل بشرة تتفاعل مع العطر بطريقة مختلفة",
      },
      {
        title: "انتظر 30 دقيقة على الأقل",
        description: "دع العطر يتطور على بشرتك لتشم النوتات الوسطى والقاعدية الحقيقية",
      },
      {
        title: "لا تختبر أكثر من 3 عطور",
        description: "حاسة الشم تتعب بسرعة، لذا اكتفِ بـ 3 عطور كحد أقصى في المرة الواحدة",
      },
      {
        title: "جرب في أوقات مختلفة",
        description: "العطر يختلف في الصباح عن المساء، وفي الصيف عن الشتاء",
      },
      {
        title: "فكر في المناسبة",
        description: "اختر عطراً مناسباً للمكان والوقت - عطر العمل يختلف عن عطر السهرة",
      },
      {
        title: "استمع لآراء الآخرين",
        description: "اطلب رأي الأشخاص المقربين منك، فهم يشمون عطرك أكثر منك",
      },
    ],
    relatedPosts: [
      {
        title: "فن تطبيق العطر: نصائح من المحترفين",
      },
      {
        title: "أفضل العطور الشرقية لعام 2024",
      },
      {
        title: "العطور الطبيعية: دليل المبتدئين",
      },
    ],
    conclusionContent: {
      paragraph1:
        "اختيار العطر المناسب رحلة شخصية تتطلب الصبر والتجريب والفهم العميق لشخصيتك. تذكر أن العطر المثالي هو الذي يجعلك تشعر بالثقة والراحة، وليس بالضرورة الأغلى أو الأشهر.",
      paragraph2:
        "ابدأ رحلتك اليوم في اكتشاف عطرك المثالي، وتذكر أن كل شخص فريد وله عطره الخاص الذي يحكي قصته. استخدم النصائح التي تعلمتها في هذا المقال، وستجد عطرك المثالي قريباً.",
    },
  },
  en: {
    breadcrumb: {
      home: "Home",
      blog: "Blog",
    },
    post: {
      category: "Expert Tips",
      title: "Secrets of Choosing the Perfect Perfume for Your Personality",
      excerpt:
        "A comprehensive guide to help you discover the fragrance that expresses your unique personality and leaves an unforgettable impression",
      date: "January 20, 2024",
      readTime: "8 minutes",
      views: "15.2k",
      likes: "892",
      tags: ["Perfumes", "Personality", "Tips", "Perfume Selection", "Lifestyle"],
    },
    buttons: {
      share: "Share",
      startNow: "Start Now",
      readArticle: "Read Article",
      backToBlog: "Back to Blog",
      previousArticle: "Previous Article",
      nextArticle: "Next Article",
    },
    content: {
      introduction: "Introduction",
      personalityTypesTitle: "Fragrance Personality Types",
      tipsTitle: "Golden Tips for Choosing the Right Perfume",
      conclusion: "Conclusion",
      keywords: "Keywords",
      tableOfContents: "Table of Contents",
      relatedArticles: "Related Articles",
      discoverPerfume: "Discover Your Perfect Perfume",
      discoverDesc: "Try our advanced tools to discover the right perfume for you",
      suitablePerfumes: "Suitable Perfumes:",
      characteristics: "Characteristics:",
    },
    introductionContent: {
      paragraph1:
        "Choosing the right perfume is not just a personal preference, but an art that reflects your personality and lifestyle. A perfume is your hidden signature that always leaves an impression on those around you. In this comprehensive article, we will reveal the secrets of choosing the perfect perfume that suits your personality and expresses your unique identity.",
      paragraph2:
        "Have you ever wondered why a certain perfume smells great on your friend but not on you? The secret lies in understanding your personality and what fragrance notes suit it. Let's embark on a journey to discover your perfect perfume.",
    },
    personalityTypes: [
      {
        type: "Classic Personality",
        description: "Prefers simplicity and timeless elegance",
        perfumes: ["Natural Oud", "Sandalwood", "White Musk", "Jasmine"],
        characteristics: ["Conservative", "Elegant", "Reliable", "Sophisticated"],
      },
      {
        type: "Romantic Personality",
        description: "Loves tenderness, emotion, and beauty",
        perfumes: ["Bulgarian Rose", "Freesia", "Violet", "Orange Blossom"],
        characteristics: ["Sensitive", "Emotional", "Dreamy", "Gentle"],
      },
      {
        type: "Adventurous Personality",
        description: "Loves renewal, discovery, and distinction",
        perfumes: ["Citrus", "Mint", "Eucalyptus", "Grapefruit"],
        characteristics: ["Bold", "Active", "Creative", "Innovative"],
      },
      {
        type: "Strong Personality",
        description: "Prefers confidence and influential presence",
        perfumes: ["Amber", "Patchouli", "Vanilla", "Spices"],
        characteristics: ["Confident", "Leadership", "Influential", "Attractive"],
      },
    ],
    tips: [
      {
        title: "Test the perfume on your skin",
        description: "Don't rely on the scent from the bottle or paper, as each skin reacts differently with perfume",
      },
      {
        title: "Wait at least 30 minutes",
        description: "Let the perfume develop on your skin to smell the true middle and base notes",
      },
      {
        title: "Don't test more than 3 perfumes",
        description: "The sense of smell gets tired quickly, so limit yourself to 3 perfumes maximum at a time",
      },
      {
        title: "Try at different times",
        description: "Perfume differs in the morning from evening, and in summer from winter",
      },
      {
        title: "Think about the occasion",
        description: "Choose a perfume suitable for the place and time - work perfume differs from evening perfume",
      },
      {
        title: "Listen to others' opinions",
        description: "Ask for the opinion of people close to you, as they smell your perfume more than you do",
      },
    ],
    relatedPosts: [
      {
        title: "The Art of Applying Perfume: Tips from Professionals",
      },
      {
        title: "Best Oriental Perfumes for 2024",
      },
      {
        title: "Natural Perfumes: A Beginner's Guide",
      },
    ],
    conclusionContent: {
      paragraph1:
        "Choosing the right perfume is a personal journey that requires patience, experimentation, and a deep understanding of your personality. Remember that the perfect perfume is the one that makes you feel confident and comfortable, not necessarily the most expensive or famous.",
      paragraph2:
        "Start your journey today in discovering your perfect perfume, and remember that every person is unique and has their own fragrance story. Use the tips you learned in this article, and you will find your perfect perfume soon.",
    },
  },
}

export default function PerfumePersonalityGuidePage() {
  const { language } = useTranslation()
  const t = translations[language]

  const post = {
    id: 1,
    title: t.post.title,
    excerpt: t.post.excerpt,
    category: t.post.category,
    date: t.post.date,
    readTime: t.post.readTime,
    views: t.post.views,
    likes: t.post.likes,
    image: "/blog-images/artistic-perfume-bottles.jpg",
    tags: t.post.tags,
  }

  const personalityTypes = t.personalityTypes

  const tips = t.tips

  const relatedPosts = t.relatedPosts.map((relatedPost, index) => ({
    id: index + 2,
    title: relatedPost.title,
    image: `/blog-images/${relatedPost.title.replace(/\s+/g, "-").toLowerCase()}.jpg`,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50">
      <Header />

      <main>
        {/* Breadcrumb */}
        <nav className="py-6 bg-white border-b border-sage-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-sage-600">
              <Link href="/" className="hover:text-mint-600">
                {t.breadcrumb.home}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-mint-600">
                {t.breadcrumb.blog}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sage-800">{post.title}</span>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <section className="py-12 bg-gradient-to-r from-sage-100 to-mint-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="bg-mint-500 text-white mb-4">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-6 leading-tight">{post.title}</h1>
              <p className="text-xl text-sage-600 mb-8">{post.excerpt}</p>

              <div className="flex items-center justify-center gap-6 text-sage-600 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {post.views}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="sm" className="border-sage-300 text-sage-700 bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="outline" size="sm" className="border-sage-300 text-sage-700 bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  {t.buttons.share}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Introduction */}
                  <div className="prose prose-lg max-w-none text-sage-800 leading-relaxed mb-12">
                    <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.content.introduction}</h2>
                    <p className="text-lg leading-relaxed mb-6">{t.introductionContent.paragraph1}</p>
                    <p className="text-lg leading-relaxed">{t.introductionContent.paragraph2}</p>
                  </div>

                  {/* Article Image */}
                  <div className="mb-12">
                    <img
                      src="/blog-images/perfume-collection-gorilla.jpg"
                      alt="A variety of perfume bottles"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>

                  {/* Personality Types */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-sage-800 mb-8">{t.content.personalityTypesTitle}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {personalityTypes.map((personality, index) => (
                        <motion.div
                          key={personality.type}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="h-full border-sage-200 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div
                                className={`w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white mb-4`}
                              >
                                <Target className="w-6 h-6" />
                              </div>
                              <h3 className="text-xl font-bold text-sage-800 mb-3">{personality.type}</h3>
                              <p className="text-sage-600 mb-4">{personality.description}</p>

                              <div className="mb-4">
                                <h4 className="font-semibold text-sage-800 mb-2">{t.content.suitablePerfumes}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {personality.perfumes.map((perfume) => (
                                    <Badge key={perfume} variant="outline" className="border-mint-300 text-mint-700">
                                      {perfume}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-sage-800 mb-2">{t.content.characteristics}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {personality.characteristics.map((char) => (
                                    <Badge key={char} variant="secondary" className="bg-sage-100 text-sage-700">
                                      {char}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tips Section */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-sage-800 mb-8">{t.content.tipsTitle}</h2>
                    <div className="space-y-4">
                      {tips.map((tip, index) => (
                        <motion.div
                          key={tip.title}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="border-sage-200">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <CheckCircle className="w-5 h-5 text-mint-500" />
                                <div>
                                  <h3 className="text-lg font-semibold text-sage-800 mb-2">{tip.title}</h3>
                                  <p className="text-sage-600">{tip.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="prose prose-lg max-w-none text-sage-800 leading-relaxed mb-12">
                    <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.content.conclusion}</h2>
                    <p className="text-lg leading-relaxed mb-6">{t.conclusionContent.paragraph1}</p>
                    <p className="text-lg leading-relaxed">{t.conclusionContent.paragraph2}</p>
                  </div>

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-sage-200">
                    <h3 className="text-lg font-semibold text-sage-800 mb-4">{t.content.keywords}</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-mint-300 text-mint-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    {/* Table of Contents */}
                    <Card className="mb-8 border-sage-200">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-sage-800 mb-4">{t.content.tableOfContents}</h3>
                        <nav className="space-y-2">
                          <a href="#intro" className="block text-sage-600 hover:text-mint-600">
                            {t.content.introduction}
                          </a>
                          <a href="#types" className="block text-sage-600 hover:text-mint-600">
                            {t.content.personalityTypesTitle}
                          </a>
                          <a href="#tips" className="block text-sage-600 hover:text-mint-600">
                            {t.content.tipsTitle}
                          </a>
                          <a href="#conclusion" className="block text-sage-600 hover:text-mint-600">
                            {t.content.conclusion}
                          </a>
                        </nav>
                      </CardContent>
                    </Card>

                    {/* CTA */}
                    <Card className="border-sage-200">
                      <CardContent className="p-6 text-center">
                        <h3 className="text-lg font-semibold text-sage-800 mb-4">{t.content.discoverPerfume}</h3>
                        <p className="text-sage-600 mb-4">{t.content.discoverDesc}</p>
                        <Button
                          className="bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white w-full"
                          onClick={() => (window.location.href = "/auth/signup")}
                        >
                          {t.buttons.startNow}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-sage-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <Button variant="outline" className="border-sage-300 text-sage-700 bg-transparent">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {t.buttons.previousArticle}
                </Button>
                <Link href="/blog">
                  <Button variant="outline" className="border-sage-300 text-sage-700 bg-transparent">
                    {t.buttons.backToBlog}
                  </Button>
                </Link>
                <Button variant="outline" className="border-sage-300 text-sage-700 bg-transparent">
                  {t.buttons.nextArticle}
                  <ArrowLeft className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-sage-800 mb-8 text-center">{t.content.relatedArticles}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden shadow-lg border-sage-200 hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-sage-800 mb-4 line-clamp-2">{relatedPost.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-mint-300 text-mint-700 hover:bg-mint-50 bg-transparent"
                      >
                        {t.buttons.readArticle}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
