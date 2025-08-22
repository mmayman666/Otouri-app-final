"use client"

import { motion } from "framer-motion"
import { Check, X, Sparkles, Crown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslation } from "@/lib/translations/context"

export function PricingSection() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      badge: "باقات الاشتراك",
      title: "اختر الباقة المناسبة لاحتياجاتك",
      description: "باقات مرنة تناسب جميع المستخدمين سواء كنت تبحث عن تجربة مجانية أو تجربة كاملة بدون قيود",
      freePlan: "الباقة المجانية",
      freeDescription: "ابدأ رحلتك في عالم العطور مع باقتنا المجانية",
      premiumPlan: "الباقة المميزة",
      premiumDescription: "استمتع بتجربة كاملة بدون قيود مع باقتنا المميزة",
      monthly: "شهرياً",
      currency: "ر.س",
      textSearch: "البحث بالنص",
      imageSearch: "البحث بالصورة",
      customRecommendations: "توصيات مخصصة",
      aiAssistant: "عطوري AI",
      perfumeDatabase: "قاعدة بيانات العطور",
      favorites: "حفظ العطور المفضلة",
      freeLimitation: "10 عمليات بحث شهرياً",
      unlimitedSearches: "عمليات بحث غير محدودة",
      startFree: "ابدأ الآن مجاناً",
      subscribeNow: "اشترك الآن",
      disclaimer: "يمكنك إلغاء الاشتراك في أي وقت. جميع الأسعار تشمل ضريبة القيمة المضافة.",
    },
    en: {
      badge: "Subscription Plans",
      title: "Choose the Right Plan for Your Needs",
      description:
        "Flexible plans suitable for all users whether you're looking for a free experience or a complete experience without limits",
      freePlan: "Free Plan",
      freeDescription: "Start your journey in the world of perfumes with our free plan",
      premiumPlan: "Premium Plan",
      premiumDescription: "Enjoy a complete experience without limits with our premium plan",
      monthly: "monthly",
      currency: "SAR",
      textSearch: "Text Search",
      imageSearch: "Image Search",
      customRecommendations: "Custom Recommendations",
      aiAssistant: "Otouri AI",
      perfumeDatabase: "Perfume Database",
      favorites: "Save Favorite Perfumes",
      freeLimitation: "10 searches per month",
      unlimitedSearches: "Unlimited searches",
      startFree: "Start Free Now",
      subscribeNow: "Subscribe Now",
      disclaimer: "You can cancel your subscription at any time. All prices include VAT.",
    },
  }

  const t = translations[language]

  const plans = [
    {
      id: "free",
      name: t.freePlan,
      price: "0",
      description: t.freeDescription,
      features: [
        { name: t.textSearch, included: true },
        { name: t.imageSearch, included: true },
        { name: t.customRecommendations, included: true },
        { name: t.aiAssistant, included: true },
        { name: t.perfumeDatabase, included: true },
        { name: t.favorites, included: true },
      ],
      limitations: t.freeLimitation,
      icon: <Sparkles className="h-5 w-5" />,
      color: "from-sage-500 to-sage-400",
      buttonText: t.startFree,
      popular: false,
    },
    {
      id: "premium",
      name: t.premiumPlan,
      price: "20",
      period: t.monthly,
      description: t.premiumDescription,
      features: [
        { name: t.textSearch, included: true },
        { name: t.imageSearch, included: true },
        { name: t.customRecommendations, included: true },
        { name: t.aiAssistant, included: true },
        { name: t.perfumeDatabase, included: true },
        { name: t.favorites, included: true },
      ],
      limitations: t.unlimitedSearches,
      icon: <Crown className="h-5 w-5" />,
      color: "from-mint-500 to-mint-400",
      buttonText: t.subscribeNow,
      popular: true,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-mint-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-sage-100 rounded-full opacity-20 blur-3xl -z-10"></div>

      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 bg-mint-50 text-mint-600 rounded-full text-sm font-medium mb-4 shadow-sm">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4 drop-shadow-sm">{t.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative"
            >
              <div
                className={`h-full rounded-2xl border ${
                  plan.popular ? "border-mint-200 shadow-xl" : "border-sage-100 shadow-lg"
                } bg-white overflow-hidden transition-all duration-300 hover:shadow-xl relative z-10`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-mint-400 to-mint-500"></div>
                )}

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-sage-900">{plan.name}</h3>
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center text-white shadow-md`}
                    >
                      {plan.icon}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-sage-900">{plan.price}</span>
                      <span className="text-lg text-gray-500 mb-1">{t.currency}</span>
                      {plan.period && <span className="text-gray-500 mb-1">/{plan.period}</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <div
                            className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center shadow-sm`}
                          >
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                            <X className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                        <p className="text-gray-700 text-sm">{feature.name}</p>
                      </div>
                    ))}

                    <div className="pt-2 pb-1">
                      <div
                        className={`py-2 px-3 rounded-lg ${
                          plan.popular ? "bg-mint-50 text-mint-700" : "bg-sage-50 text-sage-700"
                        } text-sm font-medium text-center`}
                      >
                        {plan.limitations}
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/auth/signup">
                      <Button
                        className={`w-full py-6 rounded-xl bg-gradient-to-r ${
                          plan.popular ? "from-mint-500 to-mint-400" : "from-sage-500 to-sage-400"
                        } text-white font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2 text-base`}
                      >
                        {plan.buttonText}
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Background decoration for the card */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-mint-50 to-transparent rounded-2xl -m-1 -z-10"></div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">{t.disclaimer}</p>
        </div>
      </div>
    </section>
  )
}
