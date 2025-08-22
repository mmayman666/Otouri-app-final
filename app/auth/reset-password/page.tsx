"use client"

import { useState } from "react"
import Link from "next/link"
import { updatePassword } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock } from "lucide-react"

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (formData: FormData) => {
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }

    setIsLoading(true)
    try {
      await updatePassword(formData)
    } catch (error) {
      console.error("Update password error:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
              <h2 className="text-2xl font-bold text-sage-900 mt-6 mb-2">تعيين كلمة مرور جديدة</h2>
              <p className="text-gray-600">أدخل كلمة المرور الجديدة الخاصة بك</p>
            </div>

            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="أدخل كلمة المرور الجديدة"
                    className="pr-10 text-right border-sage-200 focus:border-mint-400 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وتتضمن حرفًا كبيرًا ورقمًا
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="أدخل كلمة المرور مرة أخرى"
                    className={`pr-10 text-right border-sage-200 focus:border-mint-400 rounded-lg ${
                      !passwordMatch ? "border-red-500" : ""
                    }`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setPasswordMatch(true)
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {!passwordMatch && <p className="text-xs text-red-500 mt-1">كلمات المرور غير متطابقة</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-gradient-to-r from-mint-500 to-mint-400 hover:from-mint-600 hover:to-mint-500 text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                {isLoading ? "جاري تحديث كلمة المرور..." : "تحديث كلمة المرور"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <Link href="/auth/login" className="text-mint-600 hover:text-mint-700 font-medium">
                  العودة إلى تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
