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
  Star,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  ChevronRight,
  Home,
  Sparkles,
  Crown,
  Flame,
  Gem,
  Award,
} from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    breadcrumb: {
      home: "الرئيسية",
      blog: "المدونة",
      current: "أفضل العطور الشرقية لعام 2024",
    },
    badges: {
      reviews: "مراجعات",
      featured: "مميز",
    },
    title: "أفضل العطور الشرقية لعام 2024",
    subtitle: "استكشف مجموعة مختارة من أروع العطور الشرقية التي تجمع بين الأصالة والحداثة",
    meta: {
      date: "16 يناير 2024",
      readTime: "6 دقائق قراءة",
      views: "12.1k مشاهدة",
    },
    buttons: {
      share: "مشاركة",
      save: "حفظ",
      readMore: "اقرأ المزيد",
      backToBlog: "العودة للمدونة",
      previousArticle: "المقال السابق",
      nextArticle: "المقال التالي",
      discoverPerfume: "اكتشف العطر",
      startDiscovery: "ابدأ رحلة الاكتشاف",
      subscribeNow: "اشترك الآن",
    },
    content: {
      introduction: "مقدمة",
      topPerfumesTitle: "قائمة أفضل العطور الشرقية لعام 2024",
      buyingGuideTitle: "دليل اختيار العطر الشرقي المثالي",
      conclusion: "الخلاصة",
      tableOfContents: "محتويات المقال",
      trendingTopics: "مواضيع رائجة",
      newsletter: "اشترك في النشرة الإخبارية",
      newsletterDesc: "احصل على أحدث مراجعات العطور والنصائح مباشرة في بريدك الإلكتروني",
      emailPlaceholder: "بريدك الإلكتروني",
      relatedArticles: "مقالات ذات صلة",
      mainIngredients: "المكونات الرئيسية:",
      discoverPerfumeTitle: "اكتشف عطرك الشرقي المثالي",
      discoverPerfumeDesc: "استخدم منصة عُطوري لاكتشاف العطر الشرقي الذي يناسب شخصيتك وذوقك",
      imageCaption: "مجموعة من أفخر العطور الشرقية المختارة بعناية",
    },
    introductionContent: {
      paragraph1:
        "تشهد صناعة العطور الشرقية نهضة حقيقية في عام 2024، حيث تتنوع الخيارات بين العطور التراثية الأصيلة والإبداعات الحديثة التي تحافظ على الهوية الشرقية. في هذا المقال، نستعرض أفضل العطور الشرقية التي تصدرت قوائم الأكثر مبيعاً وحازت على إعجاب خبراء العطور حول العالم.",
      paragraph2:
        "من العود الكمبودي الفاخر إلى الزعفران الإيراني الأصيل، ومن الورد الدمشقي العريق إلى المسك الأبيض النادر، تحتفي هذه المجموعة بأجود المكونات الطبيعية وأرقى تقنيات التركيب.",
    },
    conclusionContent: {
      paragraph1:
        "تمثل العطور الشرقية لعام 2024 قمة الإبداع في عالم العطور، حيث تجمع بين التراث العريق والتقنيات الحديثة. سواء كنت تبحث عن عطر للمناسبات الخاصة أو للاستخدام اليومي، فإن هذه المجموعة المختارة تقدم لك أفضل الخيارات.",
      paragraph2:
        "تذكر أن اختيار العطر المناسب يعتمد على شخصيتك وذوقك الخاص، لذا لا تتردد في تجربة عدة خيارات قبل اتخاذ قرارك النهائي.",
    },
    perfumeList: [
      {
        name: "عود الملوك الإمبراطوري",
        brand: "دار الطيب",
        price: "850 ريال",
        notes: ["عود كمبودي", "ورد دمشقي", "عنبر رمادي"],
        description: "تحفة فنية تجمع بين أجود أنواع العود الكمبودي والورد الدمشقي الأصيل",
        rating: 4.9,
      },
      {
        name: "ليالي الشرق الذهبية",
        brand: "عطور الحرمين",
        price: "650 ريال",
        notes: ["زعفران إيراني", "صندل هندي", "مسك أبيض"],
        description: "عطر شرقي فاخر يحتفي بتراث العطور العربية الأصيلة",
        rating: 4.8,
      },
      {
        name: "سلطان العنبر",
        brand: "بيت العطر",
        price: "720 ريال",
        notes: ["عنبر رمادي", "عود هندي", "ياسمين"],
        description: "مزيج ساحر من العنبر الفاخر والعود الهندي الأصيل",
        rating: 4.7,
      },
      {
        name: "أسرار الصحراء",
        brand: "عطور الشرق",
        price: "580 ريال",
        notes: ["عود تايلندي", "ورد بلغاري", "مسك أحمر"],
        description: "رحلة عطرية تأخذك إلى أعماق الصحراء العربية",
        rating: 4.6,
      },
    ],
    buyingGuide: [
      {
        title: "للمناسبات الخاصة",
        description:
          "اختر العطور الغنية بالعود والعنبر للمناسبات الرسمية والاحتفالات. هذه العطور تترك انطباعاً قوياً ومميزاً.",
      },
      {
        title: "للاستخدام اليومي",
        description: "للاستخدام اليومي، اختر العطور الخفيفة التي تحتوي على الورد والياسمين مع لمسة من المسك الأبيض.",
      },
      {
        title: "للرجال",
        description: "العطور الرجالية الشرقية تتميز بالعود والصندل والعنبر، مع نفحات من الزعفران والهيل.",
      },
      {
        title: "للنساء",
        description: "العطور النسائية الشرقية تجمع بين الورد والياسمين والعنبر، مع لمسات من الفانيليا والمسك.",
      },
    ],
    trendingTopics: [
      "العطور الشرقية الفاخرة",
      "عود كمبودي أصلي",
      "عطور نسائية شرقية",
      "مسك أبيض طبيعي",
      "زعفران إيراني",
    ],
    relatedPosts: [
      {
        title: "أسرار اختيار العطر المثالي لشخصيتك",
        category: "نصائح الخبراء",
        readTime: "8 دقائق",
        image: "/blog-images/artistic-perfume-bottles.jpg",
      },
      {
        title: "ثورة الذكاء الاصطناعي في عالم العطور",
        category: "تكنولوجيا",
        readTime: "12 دقيقة",
        image: "/blog-images/chanel-bleu-perfume.jpg",
      },
      {
        title: "فن تطبيق العطر: نصائح من المحترفين",
        category: "تعليمي",
        readTime: "5 دقائق",
        image: "/blog-images/perfume-bottles-shadows.jpg",
      },
    ],
  },
  en: {
    breadcrumb: {
      home: "Home",
      blog: "Blog",
      current: "Best Oriental Perfumes for 2024",
    },
    badges: {
      reviews: "Reviews",
      featured: "Featured",
    },
    title: "Best Oriental Perfumes for 2024",
    subtitle: "Explore a curated collection of the finest oriental perfumes that blend authenticity with modernity",
    meta: {
      date: "January 16, 2024",
      readTime: "6 min read",
      views: "12.1k views",
    },
    buttons: {
      share: "Share",
      save: "Save",
      readMore: "Read More",
      backToBlog: "Back to Blog",
      previousArticle: "Previous Article",
      nextArticle: "Next Article",
      discoverPerfume: "Discover Perfume",
      startDiscovery: "Start Discovery Journey",
      subscribeNow: "Subscribe Now",
    },
    content: {
      introduction: "Introduction",
      topPerfumesTitle: "Top Oriental Perfumes List for 2024",
      buyingGuideTitle: "Guide to Choosing the Perfect Oriental Perfume",
      conclusion: "Conclusion",
      tableOfContents: "Table of Contents",
      trendingTopics: "Trending Topics",
      newsletter: "Subscribe to Newsletter",
      newsletterDesc: "Get the latest perfume reviews and tips directly in your email",
      emailPlaceholder: "Your email",
      relatedArticles: "Related Articles",
      mainIngredients: "Main Ingredients:",
      discoverPerfumeTitle: "Discover Your Perfect Oriental Perfume",
      discoverPerfumeDesc: "Use Otouri platform to discover the oriental perfume that suits your personality and taste",
      imageCaption: "A carefully curated collection of the finest oriental perfumes",
    },
    introductionContent: {
      paragraph1:
        "The oriental perfume industry is witnessing a real renaissance in 2024, with options ranging from authentic heritage perfumes to modern creations that maintain oriental identity. In this article, we review the best oriental perfumes that topped the bestseller lists and won the admiration of perfume experts around the world.",
      paragraph2:
        "From luxurious Cambodian oud to authentic Iranian saffron, and from ancient Damascus rose to rare white musk, this collection celebrates the finest natural ingredients and the most refined composition techniques.",
    },
    conclusionContent: {
      paragraph1:
        "Oriental perfumes for 2024 represent the pinnacle of creativity in the world of fragrances, combining ancient heritage with modern techniques. Whether you're looking for a perfume for special occasions or daily use, this curated collection offers you the best options.",
      paragraph2:
        "Remember that choosing the right perfume depends on your personality and personal taste, so don't hesitate to try several options before making your final decision.",
    },
    perfumeList: [
      {
        name: "Imperial Kings Oud",
        brand: "Dar Al Tayyeb",
        price: "$230",
        notes: ["Cambodian Oud", "Damascus Rose", "Grey Amber"],
        description: "An artistic masterpiece combining the finest Cambodian oud with authentic Damascus rose",
        rating: 4.9,
      },
      {
        name: "Golden Eastern Nights",
        brand: "Haramain Perfumes",
        price: "$175",
        notes: ["Iranian Saffron", "Indian Sandalwood", "White Musk"],
        description: "A luxurious oriental perfume celebrating the heritage of authentic Arabic fragrances",
        rating: 4.8,
      },
      {
        name: "Sultan of Amber",
        brand: "House of Perfume",
        price: "$195",
        notes: ["Grey Amber", "Indian Oud", "Jasmine"],
        description: "An enchanting blend of luxurious amber and authentic Indian oud",
        rating: 4.7,
      },
      {
        name: "Desert Secrets",
        brand: "Eastern Perfumes",
        price: "$155",
        notes: ["Thai Oud", "Bulgarian Rose", "Red Musk"],
        description: "A fragrant journey taking you to the depths of the Arabian desert",
        rating: 4.6,
      },
    ],
    buyingGuide: [
      {
        title: "For Special Occasions",
        description:
          "Choose perfumes rich in oud and amber for formal occasions and celebrations. These perfumes leave a strong and distinctive impression.",
      },
      {
        title: "For Daily Use",
        description: "For daily use, choose light perfumes containing rose and jasmine with a touch of white musk.",
      },
      {
        title: "For Men",
        description: "Oriental men's perfumes feature oud, sandalwood, and amber, with hints of saffron and cardamom.",
      },
      {
        title: "For Women",
        description: "Oriental women's perfumes combine rose, jasmine, and amber, with touches of vanilla and musk.",
      },
    ],
    trendingTopics: [
      "Luxury Oriental Perfumes",
      "Authentic Cambodian Oud",
      "Oriental Women's Perfumes",
      "Natural White Musk",
      "Iranian Saffron",
    ],
    relatedPosts: [
      {
        title: "Secrets of Choosing the Perfect Perfume for Your Personality",
        category: "Expert Tips",
        readTime: "8 minutes",
        image: "/blog-images/artistic-perfume-bottles.jpg",
      },
      {
        title: "AI Revolution in the World of Perfumes",
        category: "Technology",
        readTime: "12 minutes",
        image: "/blog-images/chanel-bleu-perfume.jpg",
      },
      {
        title: "The Art of Applying Perfume: Tips from Professionals",
        category: "Educational",
        readTime: "5 minutes",
        image: "/blog-images/perfume-bottles-shadows.jpg",
      },
    ],
  },
}

export default function BestOrientalPerfumes2024() {
  const { language } = useTranslation()
  const t = translations[language]

  const perfumeList = t.perfumeList
  const trendingTopics = t.trendingTopics
  const relatedPosts = t.relatedPosts

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50">
      <Header />

      <main>
        {/* Breadcrumb */}
        <section className="py-4 bg-white border-b border-sage-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-sage-600">
              <Home className="w-4 h-4" />
              <span>{t.breadcrumb.home}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{t.breadcrumb.blog}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sage-800 font-medium">{t.breadcrumb.current}</span>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge className="bg-amber-500 text-white px-4 py-2">
                    <Crown className="w-4 h-4 mr-2" />
                    {t.badges.reviews}
                  </Badge>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    <Star className="w-4 h-4 mr-2" />
                    {t.badges.featured}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sage-800 mb-6 leading-tight">
                  {t.title}
                </h1>

                <p className="text-xl md:text-2xl text-sage-600 mb-8 leading-relaxed">{t.subtitle}</p>

                <div className="flex items-center justify-center gap-6 text-sage-500 mb-8">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-5 h-5" />
                    <span>{t.meta.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>{t.meta.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-5 h-5" />
                    <span>{t.meta.views}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {t.buttons.share}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    {t.buttons.save}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    678
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <img
                src="/blog-images/luxury-perfume-collection.jpg"
                alt={t.title}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Article */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="prose prose-lg max-w-none"
                >
                  {/* Introduction */}
                  <div className="mb-12">
                    <p className="text-xl text-sage-700 leading-relaxed mb-6">{t.introductionContent.paragraph1}</p>
                    <p className="text-lg text-sage-600 leading-relaxed">{t.introductionContent.paragraph2}</p>
                  </div>

                  {/* Content Image */}
                  <div className="my-12">
                    <img
                      src="/blog-images/perfume-collection-gorilla.jpg"
                      alt="Collection of Luxury Oriental Perfumes"
                      className="w-full h-[350px] object-cover rounded-xl shadow-lg"
                    />
                    <p className="text-center text-sm text-sage-500 mt-3">{t.content.imageCaption}</p>
                  </div>

                  {/* Top Perfumes List */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-sage-800 mb-8 flex items-center gap-3">
                      <Crown className="w-8 h-8 text-amber-500" />
                      {t.content.topPerfumesTitle}
                    </h2>

                    <div className="space-y-8">
                      {perfumeList.map((perfume, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden shadow-lg border-sage-200 hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-8">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl font-bold text-amber-600">#{index + 1}</span>
                                    <h3 className="text-2xl font-bold text-sage-800">{perfume.name}</h3>
                                  </div>
                                  <p className="text-lg text-sage-600 mb-2">{perfume.brand}</p>
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < Math.floor(perfume.rating)
                                              ? "text-amber-400 fill-current"
                                              : "text-sage-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-sage-600">({perfume.rating})</span>
                                  </div>
                                </div>
                                <div className="text-left">
                                  <div className="text-2xl font-bold text-mint-600">{perfume.price}</div>
                                </div>
                              </div>

                              <p className="text-sage-700 mb-4 leading-relaxed">{perfume.description}</p>

                              <div className="mb-4">
                                <h4 className="font-semibold text-sage-800 mb-2">{t.content.mainIngredients}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {perfume.notes.map((note, noteIndex) => (
                                    <Badge
                                      key={noteIndex}
                                      variant="outline"
                                      className="border-amber-300 text-amber-700 bg-amber-50"
                                    >
                                      <Gem className="w-3 h-3 mr-1" />
                                      {note}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                                <Sparkles className="w-4 h-4 mr-2" />
                                {t.buttons.discoverPerfume}
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Buying Guide */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-sage-800 mb-8 flex items-center gap-3">
                      <Award className="w-8 h-8 text-mint-500" />
                      {t.content.buyingGuideTitle}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      {t.buyingGuide.map((guide, index) => (
                        <Card key={index} className="border-sage-200 shadow-md">
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-sage-800 mb-4 flex items-center gap-2">
                              {index === 0 && <Flame className="w-5 h-5 text-red-500" />}
                              {index === 1 && <Sparkles className="w-5 h-5 text-mint-500" />}
                              {index === 2 && <Crown className="w-5 h-5 text-amber-500" />}
                              {index === 3 && <Gem className="w-5 h-5 text-pink-500" />}
                              {guide.title}
                            </h3>
                            <p className="text-sage-600 leading-relaxed">{guide.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-sage-800 mb-6">{t.content.conclusion}</h2>
                    <p className="text-lg text-sage-700 leading-relaxed mb-4">{t.conclusionContent.paragraph1}</p>
                    <p className="text-lg text-sage-700 leading-relaxed">{t.conclusionContent.paragraph2}</p>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-sage-800 mb-4">{t.content.discoverPerfumeTitle}</h3>
                        <p className="text-sage-600 mb-6">{t.content.discoverPerfumeDesc}</p>
                        <Button
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
                          onClick={() => (window.location.href = "/dashboard/recommendations")}
                        >
                          <Crown className="w-5 h-5 mr-2" />
                          {t.buttons.startDiscovery}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Table of Contents */}
                  <Card className="border-sage-200 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-sage-800 mb-4">{t.content.tableOfContents}</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <a href="#introduction" className="text-sage-600 hover:text-mint-600 transition-colors">
                            {t.content.introduction}
                          </a>
                        </li>
                        <li>
                          <a href="#top-perfumes" className="text-sage-600 hover:text-mint-600 transition-colors">
                            {t.content.topPerfumesTitle}
                          </a>
                        </li>
                        <li>
                          <a href="#buying-guide" className="text-sage-600 hover:text-mint-600 transition-colors">
                            {t.content.buyingGuideTitle}
                          </a>
                        </li>
                        <li>
                          <a href="#conclusion" className="text-sage-600 hover:text-mint-600 transition-colors">
                            {t.content.conclusion}
                          </a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Trending Topics */}
                  <Card className="border-sage-200 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-sage-800 mb-4">{t.content.trendingTopics}</h3>
                      <div className="space-y-2">
                        {trendingTopics.map((topic, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="block w-full text-right border-sage-300 text-sage-700 hover:bg-sage-50 cursor-pointer"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Newsletter */}
                  <Card className="border-sage-200 shadow-md bg-gradient-to-br from-mint-50 to-sage-50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-sage-800 mb-4">{t.content.newsletter}</h3>
                      <p className="text-sm text-sage-600 mb-4">{t.content.newsletterDesc}</p>
                      <div className="space-y-3">
                        <input
                          type="email"
                          placeholder={t.content.emailPlaceholder}
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent text-sm"
                        />
                        <Button className="w-full bg-mint-500 hover:bg-mint-600 text-white text-sm">
                          {t.buttons.subscribeNow}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-gradient-to-r from-sage-50/50 to-mint-50/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-sage-800 mb-8 text-center">{t.content.relatedArticles}</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden shadow-lg border-sage-200 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-mint-500 text-white shadow-md">{post.category}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-sage-800 mb-3 line-clamp-2 leading-tight group-hover:text-mint-700 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-sage-500">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-mint-300 text-mint-700 hover:bg-mint-50 bg-transparent"
                        >
                          {t.buttons.readMore}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-white border-t border-sage-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <Button variant="outline" className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent">
                <ArrowRight className="w-4 h-4 mr-2" />
                {t.buttons.previousArticle}
              </Button>
              <Button
                className="bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white"
                onClick={() => (window.location.href = "/blog")}
              >
                {t.buttons.backToBlog}
              </Button>
              <Button variant="outline" className="border-sage-300 text-sage-700 hover:bg-sage-50 bg-transparent">
                {t.buttons.nextArticle}
                <ArrowLeft className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
