"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu, X, ShoppingBag, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    features: "المميزات",
    pricing: "الأسعار",
    search: "البحث",
    favorites: "المفضلة",
    account: "الحساب",
    cart: "السلة",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    menu: "القائمة",
  },
  en: {
    home: "Home",
    about: "About Us",
    features: "Features",
    pricing: "Pricing",
    search: "Search",
    favorites: "Favorites",
    account: "Account",
    cart: "Cart",
    login: "Login",
    signup: "Sign Up",
    menu: "Menu",
  },
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useTranslation()
  const t = translations[language]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-3xl font-bold bg-gradient-to-r from-mint-500 to-mint-400 bg-clip-text text-transparent drop-shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              عُطوري
            </motion.span>
            <span className="sr-only">Otouri.com</span>
          </Link>
        </div>

        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} md:flex absolute md:relative top-20 md:top-0 right-0 left-0 md:right-auto md:left-auto flex-col md:flex-row items-center gap-1 md:gap-6 bg-white md:bg-transparent p-4 md:p-0 border-b md:border-0 shadow-md md:shadow-none z-50`}
        >
          <Link
            href="/"
            className="w-full md:w-auto py-2 md:py-0 px-4 md:px-0 text-sm font-medium hover:text-mint-500 flex items-center gap-1 hover:bg-mint-50 md:hover:bg-transparent rounded-md"
          >
            {t.home}
          </Link>
          <Link
            href="/about"
            className="w-full md:w-auto py-2 md:py-0 px-4 md:px-0 text-sm font-medium hover:text-mint-500 flex items-center gap-1 hover:bg-mint-50 md:hover:bg-transparent rounded-md"
          >
            {t.about}
          </Link>
          <Link
            href="/features"
            className="w-full md:w-auto py-2 md:py-0 px-4 md:px-0 text-sm font-medium hover:text-mint-500 flex items-center gap-1 hover:bg-mint-50 md:hover:bg-transparent rounded-md"
          >
            {t.features}
          </Link>
          <Link
            href="/pricing"
            className="w-full md:w-auto py-2 md:py-0 px-4 md:px-0 text-sm font-medium hover:text-mint-500 flex items-center gap-1 hover:bg-mint-50 md:hover:bg-transparent rounded-md"
          >
            {t.pricing}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="hidden rounded-full hover:bg-mint-50 text-mint-600 hover:shadow-sm"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">{t.search}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden rounded-full hover:bg-mint-50 text-mint-600 hover:shadow-sm"
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">{t.favorites}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden rounded-full hover:bg-mint-50 text-mint-600 hover:shadow-sm"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">{t.account}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-mint-50 text-mint-600 relative hover:shadow-sm hidden"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-mint-500 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
              2
            </span>
            <span className="sr-only">{t.cart}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
            asChild
          >
            <Link href="/auth/login">{t.login}</Link>
          </Button>
          <Button
            size="sm"
            className="flex bg-gradient-to-r from-mint-500 to-mint-400 hover:from-mint-600 hover:to-mint-500 border-none text-white shadow-md hover:shadow-lg"
            asChild
          >
            <Link href="/auth/signup">{t.signup}</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{t.menu}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export { Header }
export default Header
