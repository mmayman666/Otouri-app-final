"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { resendConfirmation } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertCircle, Mail, RefreshCw } from "lucide-react"

export default function ErrorPage() {
  const [isResending, setIsResending] = useState(false)
  const [canResend, setCanResend] = useState(true)
  const [countdown, setCountdown] = useState(0)
  const searchParams = useSearchParams()
  const message = searchParams.get("message")
  const type = searchParams.get("type")
  const email = searchParams.get("email")

  const isEmailNotConfirmed = type === "email_not_confirmed"

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleResendConfirmation = async (formData: FormData) => {
    if (!canResend) return

    setIsResending(true)
    setCanResend(false)
    setCountdown(60) // 60 seconds cooldown

    try {
      await resendConfirmation(formData)
    } catch (error) {
      console.error("Resend error:", error)
      setCanResend(true)
      setCountdown(0)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50/30 p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <Link href="/" className="inline-block">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
                  عُطوري
                </h1>
              </Link>
              <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
                {isEmailNotConfirmed ? "تأكيد البريد الإلكتروني مطلوب" : "حدث خطأ"}
              </h2>
            </div>

            {isEmailNotConfirmed ? (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Mail className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-amber-800">يجب تأكيد بريدك الإلكتروني أولاً</h3>
                      <p className="text-sm text-amber-700 mt-1">
                        لم يتم تأكيد بريدك الإلكتروني بعد. يرجى التحقق من صندوق الوارد الخاص بك والنقر على رابط التأكيد.
                      </p>
                      {email && <p className="text-sm text-amber-600 mt-2 font-medium">البريد الإلكتروني: {email}</p>}
                    </div>
                  </div>
                </div>

                {email && (
                  <form action={handleResendConfirmation} className="space-y-4">
                    <input type="hidden" name="email" value={email} />
                    <Button
                      type="submit"
                      disabled={isResending || !canResend}
                      className="w-full py-6 bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                    >
                      <RefreshCw className={`h-4 w-4 ml-2 ${isResending ? "animate-spin" : ""}`} />
                      {isResending
                        ? "جاري إرسال البريد..."
                        : !canResend
                          ? `إعادة الإرسال خلال ${countdown} ثانية`
                          : "إعادة إرسال بريد التأكيد"}
                    </Button>
                  </form>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">لم تجد البريد؟</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• تحقق من مجلد الرسائل غير المرغوب فيها (Spam)</li>
                    <li>• تأكد من صحة عنوان البريد الإلكتروني</li>
                    <li>• انتظر بضع دقائق قد يتأخر وصول البريد</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-center">{message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."}</p>
              </div>
            )}

            <div className="mt-8 text-center space-y-4">
              <Link
                href="/auth/login"
                className="block w-full py-3 px-4 border border-purple-300 rounded-lg text-purple-700 hover:bg-purple-50 transition-colors"
              >
                العودة لتسجيل الدخول
              </Link>
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
