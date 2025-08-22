"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useTranslation } from "@/lib/translations/context"

const translations = {
  ar: {
    brandName: "عُطوري",
    brandDescription: "منصتك المتخصصة لاكتشاف العطور المثالية والحصول على توصيات مخصصة تناسب ذوقك",
    quickLinks: "روابط سريعة",
    home: "الرئيسية",
    about: "من نحن",
    faq: "الأسئلة الشائعة",
    blog: "المدونة",
    support: "الدعم",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    contact: "اتصل بنا",
    contactUs: "تواصل معنا",
    email: "info@otouri.com",
    phone: "+966 123 456 789",
    address: "الرياض، المملكة العربية السعودية",
    copyright: "© 2025 عُطوري. جميع الحقوق محفوظة.",
    facebook: "فيسبوك",
    twitter: "تويتر",
    instagram: "انستغرام",
    youtube: "يوتيوب",
  },
  en: {
    brandName: "Otouri",
    brandDescription:
      "Your specialized platform for discovering perfect perfumes and getting personalized recommendations that suit your taste",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About Us",
    faq: "FAQ",
    blog: "Blog",
    support: "Support",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    contact: "Contact Us",
    contactUs: "Contact Us",
    email: "info@otouri.com",
    phone: "+966 123 456 789",
    address: "Riyadh, Saudi Arabia",
    copyright: "© 2025 Otouri. All rights reserved.",
    facebook: "Facebook",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "YouTube",
  },
}

function Footer() {
  const { language } = useTranslation()
  const t = translations[language]

  return (
    <footer className="bg-mint-700 text-mint-50 pt-16 pb-8 shadow-[inset_0_20px_30px_-20px_rgba(0,0,0,0.3)]">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-mint-200 to-mint-300 bg-clip-text text-transparent drop-shadow">
              {t.brandName}
            </h3>
            <p className="text-sage-200 text-sm leading-relaxed mb-6">{t.brandDescription}</p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="bg-mint-600 hover:bg-mint-500 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">{t.facebook}</span>
              </Link>
              <Link
                href="#"
                className="bg-mint-600 hover:bg-mint-500 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">{t.twitter}</span>
              </Link>
              <Link
                href="#"
                className="bg-mint-600 hover:bg-mint-500 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">{t.instagram}</span>
              </Link>
              <Link
                href="#"
                className="bg-mint-600 hover:bg-mint-500 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
              >
                <Youtube className="h-4 w-4" />
                <span className="sr-only">{t.youtube}</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-mint-200 drop-shadow">{t.quickLinks}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-mint-300 hover:text-white transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-mint-300 hover:text-white transition-colors">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-mint-300 hover:text-white transition-colors">
                  {t.faq}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-mint-300 hover:text-white transition-colors">
                  {t.blog}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-mint-200 drop-shadow">{t.support}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-sage-300 hover:text-white transition-colors">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sage-300 hover:text-white transition-colors">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sage-300 hover:text-white transition-colors">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-mint-200 drop-shadow">{t.contactUs}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-mint-300 drop-shadow" />
                <span className="text-sage-300">{t.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-mint-300 drop-shadow" />
                <span className="text-sage-300">{t.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-mint-300 drop-shadow" />
                <span className="text-sage-300">{t.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-mint-600 mt-12 pt-8 text-center text-sm text-mint-400">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
export default Footer
