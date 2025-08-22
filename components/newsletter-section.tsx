"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

export function NewsletterSection() {
  const { language } = useTranslation()

  const translations = {
    ar: {
      title: "انضم إلى مجتمع عُطوري",
      description: "اشترك في نشرتنا البريدية للحصول على آخر الأخبار والعروض الحصرية على العطور",
      emailPlaceholder: "البريد الإلكتروني",
      subscribeButton: "اشترك الآن",
      privacyNote: "نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.",
    },
    en: {
      title: "Join the Otouri Community",
      description: "Subscribe to our newsletter to get the latest news and exclusive offers on perfumes",
      emailPlaceholder: "Email Address",
      subscribeButton: "Subscribe Now",
      privacyNote: "We respect your privacy. You can unsubscribe at any time.",
    },
  }

  const t = translations[language]

  return (
    <section className="py-20 bg-mint-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20 -z-10"></div>

      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden relative p-8 md:p-12 border border-sage-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-mint-100 to-mint-50 opacity-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-sage-200 to-sage-50 opacity-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl -z-10"></div>

            <div className="relative text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-mint-700 mb-4 drop-shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {t.title}
              </motion.h2>
              <motion.p
                className="text-gray-600 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {t.description}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Input
                  placeholder={t.emailPlaceholder}
                  className="text-right bg-mint-50/70 border-mint-100 focus:border-mint-400 shadow-inner"
                />
                <Button className="bg-gradient-to-r from-mint-500 to-mint-400 hover:from-mint-600 hover:to-mint-500 text-white flex items-center gap-2 shadow-[0_8px_20px_-6px_rgba(37,207,113,0.4)] hover:shadow-[0_12px_25px_-5px_rgba(37,207,113,0.5)]">
                  {t.subscribeButton}
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.p
                className="mt-4 text-xs text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {t.privacyNote}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
