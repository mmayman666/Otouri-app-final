"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"

export default function CheckEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  return (
    <div className="min-h-screen flex items-center justify-center bg-mint-50/30 p-4" dir="rtl">
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
                  عُطوري
                </h1>
              </Link>
              <div className="w-20 h-20 bg-mint-100 rounded-full flex items-center justify-center mx-auto my-6">
                <Mail className="h-10 w-10 text-mint-600" />
              </div>
              <h2 className="text-2xl font-bold text-sage-900 mb-2">تحقق من بريدك الإلكتروني</h2>
              <p className="text-gray-600">
                لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى <span className="font-medium text-sage-800">{email}</span>
              </p>
              <p className="text-gray-600 mt-2">
                يرجى التحقق من بريدك الإلكتروني والنقر على الرابط لإعادة تعيين كلمة المرور
              </p>
            </div>

            <div className="bg-mint-50 rounded-lg p-4 text-mint-700 text-sm mb-6">
              <p>إذا لم تجد الرسالة في صندوق الوارد، يرجى التحقق من مجلد البريد غير المرغوب فيه (Spam)</p>
            </div>

            <div className="space-y-4">
              <Link href="/auth/login" className="block w-full">
                <Button className="w-full py-6 bg-gradient-to-r from-mint-500 to-mint-400 hover:from-mint-600 hover:to-mint-500 text-white font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
                  <span>العودة إلى تسجيل الدخول</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
