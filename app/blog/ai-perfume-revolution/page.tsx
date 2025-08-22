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
  CheckCircle,
  Brain,
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
      category: "تكنولوجيا",
      title: "ثورة الذكاء الاصطناعي في صناعة العطور",
      excerpt: "كيف تغير التكنولوجيا الحديثة وجه صناعة العطور وتفتح آفاقاً جديدة للإبداع والابتكار",
      date: "15 يناير 2024",
      readTime: "12 دقيقة",
      views: "18.5k",
      likes: "1.2k",
      tags: ["ذكاء اصطناعي", "تكنولوجيا", "ابتكار", "مستقبل العطور", "علوم"],
    },
    buttons: {
      share: "مشاركة",
      startExperience: "ابدأ التجربة",
      readArticle: "اقرأ المقال",
      backToBlog: "العودة للمدونة",
      previousArticle: "المقال السابق",
      nextArticle: "المقال التالي",
    },
    content: {
      introduction: "مقدمة",
      aiApplicationsTitle: "تطبيقات الذكاء الاصطناعي في صناعة العطور",
      futureTrendsTitle: "اتجاهات المستقبل في عالم العطور الذكية",
      technologyImpactTitle: "تأثير التكنولوجيا على صناعة العطور",
      conclusion: "خاتمة",
      keywords: "الكلمات المفتاحية",
      tableOfContents: "محتويات المقال",
      relatedArticles: "مقالات ذات صلة",
      tryAdvancedTech: "جرب التكنولوجيا المتطورة",
      discoverPerfume: "اكتشف كيف يمكن للذكاء الاصطناعي أن يساعدك في العثور على عطرك المثالي",
      benefits: "الفوائد:",
    },
    introductionContent: {
      paragraph1:
        "تشهد صناعة العطور ثورة حقيقية بفضل التطورات المذهلة في مجال الذكاء الاصطناعي. من تحليل التفضيلات الشخصية إلى ابتكار تركيبات عطرية جديدة، تعيد التكنولوجيا تشكيل هذه الصناعة العريقة بطرق لم نتخيلها من قبل. في هذا المقال، سنستكشف كيف يغير الذكاء الاصطناعي وجه عالم العطور ويفتح آفاقاً جديدة للإبداع والابتكار.",
      paragraph2:
        "لم تعد صناعة العطور تعتمد فقط على الخبرة التقليدية وحاسة الشم المدربة، بل أصبحت تستفيد من قوة البيانات والخوارزميات المتطورة لفهم أعمق لتفضيلات العملاء وسلوكياتهم، مما يمكنها من تقديم تجارب مخصصة ومنتجات مبتكرة تلبي احتياجات كل فرد على حدة.",
    },
    technologyImpactContent: {
      paragraph1:
        "لقد أحدث الذكاء الاصطناعي نقلة نوعية في طريقة تطوير وتسويق العطور. فبدلاً من الاعتماد على التجربة والخطأ، أصبح بإمكان الشركات استخدام البيانات الضخمة لفهم تفضيلات العملاء بدقة متناهية وتطوير منتجات تلبي احتياجاتهم الفعلية.",
      paragraph2:
        "كما ساهمت التكنولوجيا في تسريع عملية الابتكار، حيث يمكن للخوارزميات تحليل آلاف التركيبات في وقت قصير واقتراح تركيبات جديدة قد لا تخطر على بال أمهر العطارين. هذا التطور لا يعني استبدال الخبرة البشرية، بل تعزيزها وتمكينها من تحقيق إنجازات أكبر.",
    },
    conclusionContent: {
      paragraph1:
        "إن ثورة الذكاء الاصطناعي في صناعة العطور ليست مجرد اتجاه مؤقت، بل تحول جذري يعيد تشكيل هذه الصناعة من الأساس. من المتوقع أن نشهد في السنوات القادمة تطورات أكثر إثارة، من العطور التفاعلية إلى التشخيص الجيني للروائح.",
      paragraph2:
        "المستقبل يحمل إمكانيات لا محدودة لعشاق العطور، حيث ستصبح تجربة اختيار العطر أكثر دقة وتخصيصاً، وستفتح التكنولوجيا آفاقاً جديدة للإبداع والابتكار في هذا العالم الساحر.",
    },
    aiApplications: [
      {
        type: "تحليل التفضيلات الشخصية",
        description: "خوارزميات متقدمة لفهم ذوق كل عميل وتقديم توصيات مخصصة",
        benefits: ["دقة عالية", "توفير الوقت", "تجربة شخصية", "رضا العملاء"],
      },
      {
        type: "تطوير تركيبات جديدة",
        description: "استخدام الذكاء الاصطناعي لابتكار تركيبات عطرية فريدة ومبتكرة",
        benefits: ["إبداع لا محدود", "سرعة التطوير", "تقليل التكاليف", "جودة عالية"],
      },
      {
        type: "التنبؤ بالاتجاهات",
        description: "تحليل البيانات للتنبؤ بالاتجاهات المستقبلية في عالم العطور",
        benefits: ["رؤية مستقبلية", "ميزة تنافسية", "تخطيط استراتيجي", "نجاح مضمون"],
      },
      {
        type: "تحسين تجربة العملاء",
        description: "منصات ذكية تفاعلية تقدم تجربة تسوق مميزة ومخصصة",
        benefits: ["تفاعل ذكي", "سهولة الاستخدام", "توصيات دقيقة", "رضا العملاء"],
      },
    ],
    futureTrends: [
      {
        title: "العطور الذكية التفاعلية",
        description: "عطور تتغير رائحتها حسب الحالة المزاجية والبيئة المحيطة",
      },
      {
        title: "التشخيص الجيني للعطور",
        description: "تحليل الحمض النووي لتحديد العطور الأنسب لكل شخص",
      },
      {
        title: "الواقع المعزز في التسوق",
        description: "تجربة العطور افتراضياً قبل الشراء باستخدام تقنيات الواقع المعزز",
      },
      {
        title: "العطور المستدامة بالذكاء الاصطناعي",
        description: "تطوير عطور صديقة للبيئة باستخدام خوارزميات التحسين",
      },
      {
        title: "التحليل العاطفي للروائح",
        description: "فهم تأثير الروائح على المشاعر وتطوير عطور علاجية",
      },
      {
        title: "الإنتاج الآلي المخصص",
        description: "مصانع ذكية تنتج عطور مخصصة حسب الطلب في دقائق",
      },
    ],
    relatedPosts: [
      {
        title: "أسرار اختيار العطر المثالي لشخصيتك",
      },
      {
        title: "أفضل العطور الشرقية لعام 2024",
      },
      {
        title: "العطور الطبيعية: دليل المبتدئين",
      },
    ],
  },
  en: {
    breadcrumb: {
      home: "Home",
      blog: "Blog",
    },
    post: {
      category: "Technology",
      title: "AI Revolution in the Perfume Industry",
      excerpt:
        "How modern technology is changing the face of the perfume industry and opening new horizons for creativity and innovation",
      date: "January 15, 2024",
      readTime: "12 min read",
      views: "18.5k",
      likes: "1.2k",
      tags: ["AI", "Technology", "Innovation", "Future of Perfumes", "Science"],
    },
    buttons: {
      share: "Share",
      startExperience: "Start Experience",
      readArticle: "Read Article",
      backToBlog: "Back to Blog",
      previousArticle: "Previous Article",
      nextArticle: "Next Article",
    },
    content: {
      introduction: "Introduction",
      aiApplicationsTitle: "AI Applications in the Perfume Industry",
      futureTrendsTitle: "Future Trends in Smart Perfumes",
      technologyImpactTitle: "Technology Impact on the Perfume Industry",
      conclusion: "Conclusion",
      keywords: "Keywords",
      tableOfContents: "Table of Contents",
      relatedArticles: "Related Articles",
      tryAdvancedTech: "Try Advanced Technology",
      discoverPerfume: "Discover how AI can help you find your perfect fragrance",
      benefits: "Benefits:",
    },
    introductionContent: {
      paragraph1:
        "The perfume industry is witnessing a real revolution thanks to amazing developments in artificial intelligence. From analyzing personal preferences to creating new fragrance compositions, technology is reshaping this ancient industry in ways we never imagined before. In this article, we will explore how AI is changing the face of the perfume world and opening new horizons for creativity and innovation.",
      paragraph2:
        "The perfume industry no longer relies only on traditional expertise and trained sense of smell, but has begun to benefit from the power of data and advanced algorithms for a deeper understanding of customer preferences and behaviors, enabling it to provide personalized experiences and innovative products that meet the needs of each individual.",
    },
    technologyImpactContent: {
      paragraph1:
        "Artificial intelligence has brought about a qualitative shift in the way perfumes are developed and marketed. Instead of relying on trial and error, companies can now use big data to understand customer preferences with extreme precision and develop products that meet their actual needs.",
      paragraph2:
        "Technology has also contributed to accelerating the innovation process, where algorithms can analyze thousands of compositions in a short time and suggest new compositions that may not occur to the most skilled perfumers. This development does not mean replacing human expertise, but enhancing it and enabling it to achieve greater accomplishments.",
    },
    conclusionContent: {
      paragraph1:
        "The AI revolution in the perfume industry is not just a temporary trend, but a fundamental transformation that is reshaping this industry from the ground up. We expect to see more exciting developments in the coming years, from interactive perfumes to genetic diagnosis of fragrances.",
      paragraph2:
        "The future holds unlimited possibilities for perfume lovers, where the experience of choosing a perfume will become more accurate and personalized, and technology will open new horizons for creativity and innovation in this enchanting world.",
    },
    aiApplications: [
      {
        type: "Personal Preference Analysis",
        description: "Advanced algorithms to understand each customer's taste and provide personalized recommendations",
        benefits: ["High Accuracy", "Time Saving", "Personal Experience", "Customer Satisfaction"],
      },
      {
        type: "New Formula Development",
        description: "Using AI to create unique and innovative fragrance compositions",
        benefits: ["Unlimited Creativity", "Fast Development", "Cost Reduction", "High Quality"],
      },
      {
        type: "Trend Prediction",
        description: "Data analysis to predict future trends in the perfume world",
        benefits: ["Future Vision", "Competitive Advantage", "Strategic Planning", "Guaranteed Success"],
      },
      {
        type: "Customer Experience Enhancement",
        description: "Smart interactive platforms providing exceptional and personalized shopping experience",
        benefits: ["Smart Interaction", "Ease of Use", "Accurate Recommendations", "Customer Satisfaction"],
      },
    ],
    futureTrends: [
      {
        title: "Interactive Smart Perfumes",
        description: "Perfumes that change their scent based on mood and surrounding environment",
      },
      {
        title: "Genetic Perfume Diagnosis",
        description: "DNA analysis to determine the most suitable perfumes for each person",
      },
      {
        title: "Augmented Reality in Shopping",
        description: "Virtual perfume experience before purchase using AR technology",
      },
      {
        title: "AI Sustainable Perfumes",
        description: "Developing eco-friendly perfumes using optimization algorithms",
      },
      {
        title: "Emotional Analysis of Scents",
        description: "Understanding the impact of scents on emotions and developing therapeutic perfumes",
      },
      {
        title: "Automated Custom Production",
        description: "Smart factories producing custom perfumes on demand in minutes",
      },
    ],
    relatedPosts: [
      {
        title: "Secrets of Choosing the Perfect Perfume for Your Personality",
      },
      {
        title: "Best Oriental Perfumes for 2024",
      },
      {
        title: "Natural Perfumes: A Beginner's Guide",
      },
    ],
  },
}

export default function AIPerfumeRevolutionPage() {
  const { language } = useTranslation()
  const t = translations[language]

  const post = {
    id: 2,
    title: t.post.title,
    excerpt: t.post.excerpt,
    category: t.post.category,
    date: t.post.date,
    readTime: t.post.readTime,
    views: t.post.views,
    likes: t.post.likes,
    image: "/blog-images/chanel-bleu-perfume.jpg",
    tags: t.post.tags,
  }

  const aiApplications = t.aiApplications.map((application, index) => ({
    ...application,
    icon: <Brain className="w-6 h-6" />,
    color:
      index === 0
        ? "from-blue-500 to-cyan-500"
        : index === 1
          ? "from-purple-500 to-pink-500"
          : index === 2
            ? "from-green-500 to-emerald-500"
            : "from-orange-500 to-red-500",
  }))

  const futureTrends = t.futureTrends.map((trend, index) => ({
    ...trend,
    icon: <CheckCircle className="w-5 h-5 text-mint-500" />,
  }))

  const relatedPosts = [
    {
      id: 1,
      title: t.relatedPosts[0].title,
      image: "/blog-images/artistic-perfume-bottles.jpg",
    },
    {
      id: 3,
      title: t.relatedPosts[1].title,
      image: "/blog-images/luxury-perfume-collection.jpg",
    },
    {
      id: 4,
      title: t.relatedPosts[2].title,
      image: "/blog-images/perfume-bottles-shadows.jpg",
    },
  ]

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
                      src="/blog-images/luxury-perfume-collection.jpg"
                      alt="مجموعة عطور فاخرة"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>

                  {/* AI Applications */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-sage-800 mb-8">{t.content.aiApplicationsTitle}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {aiApplications.map((application, index) => (
                        <motion.div
                          key={application.type}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="h-full border-sage-200 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div
                                className={`w-12 h-12 rounded-full bg-gradient-to-r ${application.color} flex items-center justify-center text-white mb-4`}
                              >
                                {application.icon}
                              </div>
                              <h3 className="text-xl font-bold text-sage-800 mb-3">{application.type}</h3>
                              <p className="text-sage-600 mb-4">{application.description}</p>

                              <div>
                                <h4 className="font-semibold text-sage-800 mb-2">{t.content.benefits}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {application.benefits.map((benefit) => (
                                    <Badge key={benefit} variant="outline" className="border-mint-300 text-mint-700">
                                      {benefit}
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

                  {/* Future Trends Section */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-sage-800 mb-8">{t.content.futureTrendsTitle}</h2>
                    <div className="space-y-4">
                      {futureTrends.map((trend, index) => (
                        <motion.div
                          key={trend.title}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="border-sage-200">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                {trend.icon}
                                <div>
                                  <h3 className="text-lg font-semibold text-sage-800 mb-2">{trend.title}</h3>
                                  <p className="text-sage-600">{trend.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Impact */}
                  <div className="prose prose-lg max-w-none text-sage-800 leading-relaxed mb-12">
                    <h2 className="text-2xl font-bold text-sage-800 mb-4">{t.content.technologyImpactTitle}</h2>
                    <p className="text-lg leading-relaxed mb-6">{t.technologyImpactContent.paragraph1}</p>
                    <p className="text-lg leading-relaxed">{t.technologyImpactContent.paragraph2}</p>
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
                          <a href="#applications" className="block text-sage-600 hover:text-mint-600">
                            {t.content.aiApplicationsTitle}
                          </a>
                          <a href="#trends" className="block text-sage-600 hover:text-mint-600">
                            {t.content.futureTrendsTitle}
                          </a>
                          <a href="#impact" className="block text-sage-600 hover:text-mint-600">
                            {t.content.technologyImpactTitle}
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
                        <h3 className="text-lg font-semibold text-sage-800 mb-4">{t.buttons.startExperience}</h3>
                        <p className="text-sage-600 mb-4">{t.content.discoverPerfume}</p>
                        <Button
                          className="bg-gradient-to-r from-mint-500 to-sage-500 hover:from-mint-600 hover:to-sage-600 text-white w-full"
                          onClick={() => (window.location.href = "/auth/signup")}
                        >
                          {t.buttons.startExperience}
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
