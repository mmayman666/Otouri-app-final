"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translations/context"

export default function PricingPage() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      // Hero Section
      flexiblePlans: "خطط مرنة لكل احتياجاتك",
      chooseRightPlan: "اختر الخطة المناسبة لك",
      heroDescription: "ابدأ رحلتك في عالم العطور مع خططنا المصممة خصيصاً لتلبية احتياجاتك",
      noLongTerm: "بدون التزام طويل المدى",
      cancelAnytime: "إلغاء في أي وقت",
      support24: "دعم على مدار الساعة",

      // Plans
      freePlan: "الباقة المجانية",
      freePlanDesc: "ابدأ رحلتك في عالم العطور مع باقتنا المجانية",
      premiumPlan: "الباقة المميزة",
      premiumPlanDesc: "استمتع بتجربة كاملة بدون قيود مع باقتنا المميزة",
      monthly: "شهرياً",
      mostPopular: "الأكثر شيوعاً ⭐",

      // Features
      featuresIncluded: "المميزات المشمولة:",
      textSearch: "البحث بالنص",
      imageSearch: "البحث بالصورة",
      customRecommendations: "توصيات مخصصة",
      otouriAI: "عطوري AI",
      perfumeDatabase: "قاعدة بيانات العطور",
      saveFavorites: "حفظ العطور المفضلة",

      // Limitations
      limitations: "القيود:",
      tenSearchesMonthly: "10 عمليات بحث شهرياً",
      unlimitedSearches: "عمليات بحث غير محدودة",

      // Buttons
      startFreeNow: "ابدأ الآن مجاناً",
      subscribeNow: "اشترك الآن",

      // Comparison Section
      comprehensiveComparison: "مقارنة شاملة بين الخطط",
      comparisonDesc: "اكتشف الفروقات بين خططنا واختر ما يناسب احتياجاتك",
      features: "المميزات",
      free: "المجانية",
      premium: "المميزة",

      // FAQ Section
      frequentQuestions: "الأسئلة الشائعة",
      faqDesc: "إجابات على أكثر الأسئلة شيوعاً حول خططنا",
      anotherQuestion: "لديك سؤال آخر؟",
      contactUs: "تواصل معنا",

      // FAQ Data
      faqQuestions: [
        "هل يمكنني إلغاء الاشتراك في أي وقت؟",
        "هل هناك فترة تجريبية مجانية؟",
        "كيف يتم الدفع؟",
        "هل البيانات آمنة؟",
      ],
      faqAnswers: [
        "نعم، يمكنك إلغاء اشتراكك في أي وقت من خلال إعدادات الحساب. لن يتم تجديد الاشتراك تلقائياً بعد الإلغاء.",
        "نعم، نقدم فترة تجريبية مجانية لمدة 7 أيام للخطة المميزة لجميع المستخدمين الجدد.",
        "نقبل جميع بطاقات الائتمان الرئيسية وطرق الدفع الإلكترونية المحلية مثل مدى وأبل باي.",
        "نعم، نستخدم أحدث تقنيات التشفير لحماية بياناتك الشخصية ومعلومات الدفع.",
      ],

      // CTA Section
      startJourneyToday: "ابدأ رحلتك اليوم",
      joinThousands: "انضم إلى آلاف المستخدمين الذين اكتشفوا عطورهم المثالية معنا",
      startFree: "ابدأ مجاناً",
    },
    en: {
      // Hero Section
      flexiblePlans: "Flexible Plans for All Your Needs",
      chooseRightPlan: "Choose the Right Plan for You",
      heroDescription:
        "Start your journey in the world of perfumes with our plans designed specifically to meet your needs",
      noLongTerm: "No long-term commitment",
      cancelAnytime: "Cancel anytime",
      support24: "24/7 support",

      // Plans
      freePlan: "Free Plan",
      freePlanDesc: "Start your journey in the world of perfumes with our free plan",
      premiumPlan: "Premium Plan",
      premiumPlanDesc: "Enjoy a complete experience without restrictions with our premium plan",
      monthly: "monthly",
      mostPopular: "Most Popular ⭐",

      // Features
      featuresIncluded: "Features Included:",
      textSearch: "Text Search",
      imageSearch: "Image Search",
      customRecommendations: "Custom Recommendations",
      otouriAI: "Otouri AI",
      perfumeDatabase: "Perfume Database",
      saveFavorites: "Save Favorites",

      // Limitations
      limitations: "Limitations:",
      tenSearchesMonthly: "10 searches per month",
      unlimitedSearches: "Unlimited searches",

      // Buttons
      startFreeNow: "Start Free Now",
      subscribeNow: "Subscribe Now",

      // Comparison Section
      comprehensiveComparison: "Comprehensive Plan Comparison",
      comparisonDesc: "Discover the differences between our plans and choose what suits your needs",
      features: "Features",
      free: "Free",
      premium: "Premium",

      // FAQ Section
      frequentQuestions: "Frequently Asked Questions",
      faqDesc: "Answers to the most common questions about our plans",
      anotherQuestion: "Have another question?",
      contactUs: "Contact Us",

      // FAQ Data
      faqQuestions: [
        "Can I cancel my subscription at any time?",
        "Is there a free trial period?",
        "How is payment processed?",
        "Is the data secure?",
      ],
      faqAnswers: [
        "Yes, you can cancel your subscription at any time through account settings. The subscription will not be automatically renewed after cancellation.",
        "Yes, we offer a 7-day free trial for the premium plan for all new users.",
        "We accept all major credit cards and local electronic payment methods such as Mada and Apple Pay.",
        "Yes, we use the latest encryption technologies to protect your personal data and payment information.",
      ],

      // CTA Section
      startJourneyToday: "Start Your Journey Today",
      joinThousands: "Join thousands of users who discovered their perfect perfumes with us",
      startFree: "Start Free",
    },
  }

  const t = translations[language]

  const plans = [
    {
      id: "free",
      name: t.freePlan,
      price: "0",
      description: t.freePlanDesc,
      features: [
        { name: t.textSearch, included: true },
        { name: t.imageSearch, included: true },
        { name: t.customRecommendations, included: true },
        { name: t.otouriAI, included: true },
        { name: t.perfumeDatabase, included: true },
        { name: t.saveFavorites, included: true },
      ],
      limitations: t.tenSearchesMonthly,
      icon: <Sparkles className="h-5 w-5" />,
      color: "from-sage-500 to-sage-400",
      buttonText: t.startFreeNow,
      popular: false,
    },
    {
      id: "premium",
      name: t.premiumPlan,
      price: "20",
      period: t.monthly,
      description: t.premiumPlanDesc,
      features: [
        { name: t.textSearch, included: true },
        { name: t.imageSearch, included: true },
        { name: t.customRecommendations, included: true },
        { name: t.otouriAI, included: true },
        { name: t.perfumeDatabase, included: true },
        { name: t.saveFavorites, included: true },
      ],
      limitations: t.unlimitedSearches,
      icon: <Crown className="h-5 w-5" />,
      color: "from-mint-500 to-mint-400",
      buttonText: t.subscribeNow,
      popular: true,
    },
  ]

  const faqs = [
    {
      question: t.faqQuestions[0],
      answer: t.faqAnswers[0],
    },
    {
      question: t.faqQuestions[1],
      answer: t.faqAnswers[1],
    },
    {
      question: t.faqQuestions[2],
      answer: t.faqAnswers[2],
    },
    {
      question: t.faqQuestions[3],
      answer: t.faqAnswers[3],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-sage-100 to-mint-100">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Badge className="mb-6 bg-mint-500 text-white px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                {t.flexiblePlans}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6">{t.chooseRightPlan}</h1>
              <p className="text-xl text-sage-600 mb-8">{t.heroDescription}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-sage-600">
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-mint-500" />
                  {t.noLongTerm}
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-mint-500" />
                  {t.cancelAnytime}
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-mint-500" />
                  {t.support24}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              className="mx-auto grid max-w-md gap-8 md:max-w-4xl md:grid-cols-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delayChildren: 0.2, staggerChildren: 0.1 }}
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                    plan.popular ? "border-mint-300 shadow-xl scale-105" : "border-sage-200 hover:border-sage-300"
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-mint-500 to-mint-400 text-center text-sm font-bold text-white py-2">
                      {t.mostPopular}
                    </div>
                  )}
                  <CardContent className={`p-8 ${plan.popular ? "pt-16" : ""}`}>
                    <div className="mb-8 text-center">
                      <div
                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${plan.color} text-white shadow-lg`}
                      >
                        {plan.icon}
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-sage-800">{plan.name}</h3>
                      <p className="text-sage-600">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-sage-800">{plan.price}</span>
                        {plan.period && <span className="text-sage-600 mr-2">{plan.period}</span>}
                      </div>
                    </div>
                    <div className="mb-8 space-y-4">
                      <h4 className="mb-3 flex items-center gap-2 font-bold text-sage-800">
                        <Check className="h-5 w-5 text-mint-500" />
                        {t.featuresIncluded}
                      </h4>
                      {plan.features.map((feature) => (
                        <div key={feature.name} className="flex items-center gap-3">
                          <Check className="h-5 w-5 flex-shrink-0 text-mint-500" />
                          <span className="text-sage-700">{feature.name}</span>
                        </div>
                      ))}
                      <div className="mt-6 pt-4 border-t border-sage-200">
                        <h4 className="mb-3 font-bold text-sage-600">{t.limitations}</h4>
                        <div className="flex items-center gap-3 text-sage-500">
                          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-sage-300">
                            <div className="h-2 w-2 rounded-full bg-sage-300"></div>
                          </div>
                          <span>{plan.limitations}</span>
                        </div>
                      </div>
                    </div>
                    <Link href="/auth/signup">
                      <Button
                        className={`w-full rounded-xl bg-gradient-to-r ${plan.color} py-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </CardContent>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-gradient-to-r from-sage-50 to-mint-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sage-800 mb-4">{t.comprehensiveComparison}</h2>
              <p className="text-sage-600 max-w-2xl mx-auto">{t.comparisonDesc}</p>
            </div>

            <Card className="max-w-4xl mx-auto border-sage-200">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-sage-100 to-mint-100">
                      <tr>
                        <th className="text-right p-6 font-bold text-sage-800">{t.features}</th>
                        <th className="text-center p-6 font-bold text-sage-800">{t.free}</th>
                        <th className="text-center p-6 font-bold text-sage-800">{t.premium}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sage-200">
                      {[
                        [t.textSearch, "✅", "✅"],
                        [t.imageSearch, "✅", "✅"],
                        [t.customRecommendations, "✅", "✅"],
                        [t.otouriAI, "✅", "✅"],
                        [t.perfumeDatabase, "✅", "✅"],
                        [t.saveFavorites, "✅", "✅"],
                      ].map(([feature, free, premium], idx) => (
                        <tr key={idx} className="hover:bg-sage-50">
                          <td className="p-6 font-medium text-sage-800">{feature}</td>
                          <td className="p-6 text-center text-sage-600">{free}</td>
                          <td className="p-6 text-center text-mint-600 font-bold">{premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sage-800 mb-4">{t.frequentQuestions}</h2>
              <p className="text-sage-600">{t.faqDesc}</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-sage-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-sage-800 mb-3">{faq.question}</h3>
                    <p className="text-sage-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-sage-600 mb-4">{t.anotherQuestion}</p>
              <Link href="/contact">
                <Button variant="outline" className="border-mint-300 text-mint-700 hover:bg-mint-50 bg-transparent">
                  {t.contactUs}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-mint-500 to-sage-500">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto text-white">
              <h2 className="text-3xl font-bold mb-4">{t.startJourneyToday}</h2>
              <p className="text-xl mb-8 opacity-90">{t.joinThousands}</p>
              <div className="flex justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-white text-mint-600 hover:bg-gray-100 px-8 py-4">
                    {t.startFree}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
