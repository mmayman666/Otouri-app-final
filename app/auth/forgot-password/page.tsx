"use client"

import { useState } from "react"
import Link from "next/link"
import { resetPassword } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    brandName: "عُطوري",
    resetTitle: "استعادة كلمة المرور",
    resetSubtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    resetButton: "إرسال رابط إعادة التعيين",
    resetButtonLoading: "جاري إرسال الرابط...",
    backToLogin: "العودة إلى تسجيل الدخول",
  },
  en: {
    brandName: "Otouri",
    resetTitle: "Reset Password",
    resetSubtitle: "Enter your email and we'll send you a link to reset your password",
    email: "Email",
    emailPlaceholder: "Enter your email",
    resetButton: "Send Reset Link",
    resetButtonLoading: "Sending link...",
    backToLogin: "Back to Login",
  },
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { language } = useTranslation()
  const t = translations[language]

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      await resetPassword(formData)
    } catch (error) {
      console.error("Reset password error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-mint-50/30 p-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sage-100">
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-mint-500 to-mint-400 bg-clip-text text-transparent">
                  {t.brandName}
                </h1>
              </Link>
              <h2 className="text-2xl font-bold text-sage-900 mt-6 mb-2">{t.resetTitle}</h2>
              <p className="text-gray-600">{t.resetSubtitle}</p>
            </div>

            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.email}
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    className={`${language === "ar" ? "pr-10 text-right" : "pl-10 text-left"} border-sage-200 focus:border-mint-400 rounded-lg`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-gradient-to-r from-mint-500 to-mint-400 hover:from-mint-600 hover:to-mint-500 text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                {isLoading ? t.resetButtonLoading : t.resetButton}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <Link href="/auth/login" className="text-mint-600 hover:text-mint-700 font-medium">
                  {t.backToLogin}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
