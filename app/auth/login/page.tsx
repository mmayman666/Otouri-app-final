"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { login } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    brandName: "عُطوري",
    loginTitle: "تسجيل الدخول",
    loginSubtitle: "مرحباً بعودتك! قم بتسجيل الدخول للوصول إلى حسابك",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    loginButton: "تسجيل الدخول",
    loginButtonLoading: "جاري تسجيل الدخول...",
    orLoginWith: "أو تسجيل الدخول باستخدام",
    google: "Google",
    twitter: "X (Twitter)",
    noAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب جديد",
  },
  en: {
    brandName: "Otouri",
    loginTitle: "Login",
    loginSubtitle: "Welcome back! Please login to access your account",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot password?",
    loginButton: "Login",
    loginButtonLoading: "Logging in...",
    orLoginWith: "Or login with",
    google: "Google",
    twitter: "X (Twitter)",
    noAccount: "Don't have an account?",
    createAccount: "Create new account",
  },
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const message = searchParams.get("message")
  const supabase = createClient()
  const { language } = useTranslation()
  const t = translations[language]

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/confirm`,
        },
      })
      if (error) {
        console.error("Google login error:", error)
      }
    } catch (error) {
      console.error("Google login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTwitterLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: `${window.location.origin}/auth/confirm`,
        },
      })
      if (error) {
        console.error("Twitter login error:", error)
      }
    } catch (error) {
      console.error("Twitter login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      await login(formData)
    } catch (error) {
      console.error("Login error:", error)
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
              <h2 className="text-2xl font-bold text-sage-900 mt-6 mb-2">{t.loginTitle}</h2>
              <p className="text-gray-600">{t.loginSubtitle}</p>
            </div>

            {message && <div className="mb-6 p-4 bg-mint-50 text-mint-700 rounded-lg text-center">{message}</div>}

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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Link href="/auth/forgot-password" className="text-sm text-mint-600 hover:text-mint-700">
                    {t.forgotPassword}
                  </Link>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t.password}
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder={t.passwordPlaceholder}
                    className={`${language === "ar" ? "pr-10 text-right" : "pl-10 text-left"} border-sage-200 focus:border-mint-400 rounded-lg`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-gray-500`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-gradient-to-r from-mint-500 to-mint-400 hover:from-mint-600 hover:to-mint-500 text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                {isLoading ? t.loginButtonLoading : t.loginButton}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t.orLoginWith}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full py-3 border-sage-200 hover:bg-sage-50 bg-transparent"
                >
                  <svg className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t.google}
                </Button>

                <Button
                  type="button"
                  onClick={handleTwitterLogin}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full py-3 border-sage-200 hover:bg-sage-50 bg-transparent"
                >
                  <svg
                    className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  {t.twitter}
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t.noAccount}{" "}
                <Link href="/auth/signup" className="text-mint-600 hover:text-mint-700 font-medium">
                  {t.createAccount}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
