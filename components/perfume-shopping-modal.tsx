"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingCart, ExternalLink, Copy, CheckCircle, Store, Gift } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations/context"

interface ShoppingStore {
  id: string
  name: string
  nameAr: string
  logo: string
  baseUrl: string
  searchParam: string
  discountCode?: string
  discountText?: string
  color: string
  bgColor: string
  description: string
  descriptionEn: string
  features: string[]
  featuresEn: string[]
  tag?: string
}

const stores: ShoppingStore[] = [
  {
    id: "bloomingdales",
    name: "Bloomingdales",
    nameAr: "بلومينغديلز",
    logo: "🏪",
    baseUrl: "https://en.bloomingdales.sa/search",
    searchParam: "q",
    discountCode: "ADL139",
    discountText: "كود خصم بلومينغديلز: ADL139",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
    description: "متجر الأزياء والعطور الفاخرة",
    descriptionEn: "Luxury fashion and perfume store",
    features: ["توصيل مجاني للطلبات فوق 200 ريال", "ضمان الأصالة", "إرجاع مجاني خلال 14 يوم"],
    featuresEn: ["Free delivery for orders over 200 SAR", "Authenticity guarantee", "Free returns within 14 days"],
  },
  {
    id: "niceone",
    name: "Nice One",
    nameAr: "نايس وان",
    logo: "✨",
    baseUrl: "https://niceonesa.com/ar/search",
    searchParam: "q",
    discountCode: "FY273",
    discountText: "كود خصم نايس وان: FY273",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    description: "العطور الأصلية بأفضل الأسعار",
    descriptionEn: "Authentic perfumes at the best prices",
    features: ["خصومات حصرية", "تشكيلة واسعة من العطور", "خدمة عملاء متميزة"],
    featuresEn: ["Exclusive discounts", "Wide selection of perfumes", "Excellent customer service"],
  },
  {
    id: "amazon",
    name: "Amazon Saudi Arabia",
    nameAr: "أمازون السعودية",
    logo: "📦",
    baseUrl: "https://www.amazon.sa/s",
    searchParam: "k",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
    description: "أكبر متجر إلكتروني في المملكة",
    descriptionEn: "The largest online store in the Kingdom",
    features: ["توصيل سريع", "تنوع كبير في المنتجات", "أسعار تنافسية"],
    featuresEn: ["Fast delivery", "Wide variety of products", "Competitive prices"],
    tag: "otouri-21",
  },
  {
    id: "perfumeco",
    name: "Perfume Co",
    nameAr: "بيرفيوم كو",
    logo: "🌸",
    baseUrl: "https://perfumeco.shop/products",
    searchParam: "search",
    color: "text-pink-700",
    bgColor: "bg-pink-50 border-pink-200",
    description: "متخصصون في العطور الفاخرة",
    descriptionEn: "Specialists in luxury perfumes",
    features: ["عطور أصلية 100%", "استشارة مجانية", "تغليف فاخر"],
    featuresEn: ["100% authentic perfumes", "Free consultation", "Luxury packaging"],
    tag: "1b6ebf9cb57bb7b61e5a394899d84c7e",
  },
]

interface PerfumeShoppingModalProps {
  perfumeName: string
  perfumeBrand: string
  triggerText?: string
  triggerClassName?: string
}

export function PerfumeShoppingModal({
  perfumeName,
  perfumeBrand,
  triggerText,
  triggerClassName = "",
}: PerfumeShoppingModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { toast } = useToast()
  const { language } = useTranslation()

  const translations = {
    ar: {
      shopNow: "تسوق الآن",
      shopPerfume: "تسوق",
      chooseStore: "اختر المتجر المفضل لديك لشراء",
      from: "من",
      codeCopied: "تم نسخ الكود",
      codeSuccessCopied: "تم نسخ كود خصم",
      successfully: "بنجاح",
      error: "خطأ",
      failedToCopy: "فشل في نسخ الكود",
      storeOpened: "تم فتح المتجر",
      redirectedTo: "تم توجيهك إلى",
      clickToGoTo: "انقر للانتقال إلى",
      andSearchFor: "والبحث عن",
      smartShoppingTips: "نصائح للتسوق الذكي",
      tip1: "• قارن الأسعار بين المتاجر المختلفة",
      tip2: "• تأكد من استخدام أكواد الخصم المتاحة",
      tip3: "• اقرأ تقييمات المشترين قبل الشراء",
      tip4: "• تحقق من سياسة الإرجاع والاستبدال",
      discountCodePrefix: "كود خصم",
    },
    en: {
      shopNow: "Shop Now",
      shopPerfume: "Shop",
      chooseStore: "Choose your preferred store to buy",
      from: "from",
      codeCopied: "Code Copied",
      codeSuccessCopied: "Successfully copied discount code for",
      successfully: "",
      error: "Error",
      failedToCopy: "Failed to copy code",
      storeOpened: "Store Opened",
      redirectedTo: "Redirected to",
      clickToGoTo: "Click to go to",
      andSearchFor: "and search for",
      smartShoppingTips: "Smart Shopping Tips",
      tip1: "• Compare prices across different stores",
      tip2: "• Make sure to use available discount codes",
      tip3: "• Read buyer reviews before purchasing",
      tip4: "• Check return and exchange policy",
      discountCodePrefix: "Discount code",
    },
  }

  const t = translations[language]
  const isRTL = language === "ar"

  const generateShoppingUrl = (store: ShoppingStore): string => {
    const searchQuery = `${perfumeName} ${perfumeBrand}`.trim()
    const encodedQuery = encodeURIComponent(searchQuery)

    let url = `${store.baseUrl}?${store.searchParam}=${encodedQuery}`

    // Add specific parameters for each store
    switch (store.id) {
      case "bloomingdales":
        url += "&lang=en_SA"
        break
      case "niceone":
        url += `&rcode=${store.discountCode}`
        break
      case "amazon":
        url += `&tag=${store.tag}&language=ar_AE&ref_=as_li_ss_tl`
        break
      case "perfumeco":
        url += `&tagtag_uid=${store.tag}`
        break
    }

    return url
  }

  const copyDiscountCode = async (code: string, storeName: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      toast({
        title: t.codeCopied,
        description: `${t.codeSuccessCopied} ${storeName} ${t.successfully}`,
      })
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      toast({
        title: t.error,
        description: t.failedToCopy,
        variant: "destructive",
      })
    }
  }

  const handleStoreClick = (store: ShoppingStore) => {
    const url = generateShoppingUrl(store)
    window.open(url, "_blank", "noopener,noreferrer")

    const storeName = isRTL ? store.nameAr : store.name
    toast({
      title: t.storeOpened,
      description: `${t.redirectedTo} ${storeName}`,
    })
  }

  const defaultTriggerText = triggerText || t.shopNow

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} dir={isRTL ? "rtl" : "ltr"}>
      <DialogTrigger asChild>
        <Button
          className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md ${triggerClassName}`}
          size="sm"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <ShoppingCart className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
          {defaultTriggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader className={isRTL ? "text-right" : "text-left"} dir={isRTL ? "rtl" : "ltr"}>
          <DialogTitle
            className={`text-2xl font-bold text-gray-900 flex items-center gap-2 ${isRTL ? "justify-start" : "justify-start"}`}
            dir={isRTL ? "rtl" : "ltr"}
            style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
          >
            <Store className="h-6 w-6 text-blue-600" />
            <span dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
              {t.shopPerfume} {perfumeName}
            </span>
          </DialogTitle>
          <DialogDescription
            className={`${isRTL ? "text-right" : "text-left"} text-gray-600`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <span dir={isRTL ? "rtl" : "ltr"}>
              {t.chooseStore} {perfumeName} {t.from} {perfumeBrand}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6" dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
          {stores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-6 rounded-lg border-2 ${store.bgColor} hover:shadow-lg transition-all cursor-pointer group`}
              onClick={() => handleStoreClick(store)}
              dir={isRTL ? "rtl" : "ltr"}
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <div
                className={`flex items-start justify-between gap-4`}
                dir={isRTL ? "rtl" : "ltr"}
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                <div
                  className={`flex items-center gap-3 ${isRTL ? "flex-row" : "flex-row"}`}
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  {isRTL && (
                    <span className="text-3xl" dir="rtl" style={{ direction: "rtl" }}>
                      {store.logo}
                    </span>
                  )}
                  <div
                    className={isRTL ? "text-right" : "text-left"}
                    dir={isRTL ? "rtl" : "ltr"}
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  >
                    <h3
                      className={`text-xl font-bold ${store.color} group-hover:underline`}
                      dir={isRTL ? "rtl" : "ltr"}
                      style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
                    >
                      {isRTL ? store.nameAr : store.name}
                    </h3>
                    <p
                      className={`text-gray-600 text-sm`}
                      dir={isRTL ? "rtl" : "ltr"}
                      style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
                    >
                      {isRTL ? store.description : store.descriptionEn}
                    </p>
                  </div>
                  {!isRTL && (
                    <span className="text-3xl" dir="ltr" style={{ direction: "ltr" }}>
                      {store.logo}
                    </span>
                  )}
                </div>

                <div
                  className={`flex items-center gap-2`}
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <ExternalLink className={`h-5 w-5 ${store.color} group-hover:scale-110 transition-transform`} />
                  {store.discountCode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyDiscountCode(store.discountCode!, isRTL ? store.nameAr : store.name)
                      }}
                      className="flex items-center gap-2 hover:bg-white"
                      dir={isRTL ? "rtl" : "ltr"}
                      style={{ direction: isRTL ? "rtl" : "ltr" }}
                    >
                      <span
                        className="font-mono text-sm"
                        dir={isRTL ? "rtl" : "ltr"}
                        style={{ direction: isRTL ? "rtl" : "ltr" }}
                      >
                        {store.discountCode}
                      </span>
                      {copiedCode === store.discountCode ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {store.discountText && (
                <div
                  className={`mt-4 flex items-center gap-2 ${isRTL ? "justify-start" : "justify-start"}`}
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 border-green-200"
                    dir={isRTL ? "rtl" : "ltr"}
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  >
                    <span dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                      {isRTL
                        ? store.discountText
                        : `${t.discountCodePrefix} ${isRTL ? store.nameAr : store.name}: ${store.discountCode}`}
                    </span>
                    <Gift className={`h-3 w-3 ${isRTL ? "mr-1" : "ml-1"}`} />
                  </Badge>
                </div>
              )}

              <div
                className={`mt-4 grid grid-cols-1 md:grid-cols-3 gap-2`}
                dir={isRTL ? "rtl" : "ltr"}
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                {(isRTL ? store.features : store.featuresEn).map((feature, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? "justify-start" : "justify-start"}`}
                    dir={isRTL ? "rtl" : "ltr"}
                    style={{ direction: isRTL ? "rtl" : "ltr" }}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    <span dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={`mt-4 pt-4 border-t border-gray-200`}
                dir={isRTL ? "rtl" : "ltr"}
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                <p
                  className={`text-xs text-gray-500 ${isRTL ? "text-right" : "text-left"}`}
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
                >
                  <span dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                    {t.clickToGoTo} {isRTL ? store.nameAr : store.name} {t.andSearchFor} {perfumeName}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className={`mt-6 bg-gradient-to-r from-mint-50 to-sage-50 p-4 rounded-lg border border-mint-200`}
          dir={isRTL ? "rtl" : "ltr"}
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          <div
            className={`flex items-start gap-3`}
            dir={isRTL ? "rtl" : "ltr"}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          >
            <div
              className={isRTL ? "text-right" : "text-left"}
              dir={isRTL ? "rtl" : "ltr"}
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <h4
                className={`font-semibold text-mint-700 mb-1 ${isRTL ? "text-right" : "text-left"}`}
                dir={isRTL ? "rtl" : "ltr"}
                style={{ direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}
              >
                {t.smartShoppingTips}
              </h4>
              <ul
                className={`text-sm text-gray-600 space-y-1`}
                dir={isRTL ? "rtl" : "ltr"}
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                <li dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                  {t.tip1}
                </li>
                <li dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                  {t.tip2}
                </li>
                <li dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                  {t.tip3}
                </li>
                <li dir={isRTL ? "rtl" : "ltr"} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                  {t.tip4}
                </li>
              </ul>
            </div>
            <div
              className={`w-10 h-10 rounded-full bg-mint-100 flex items-center justify-center shrink-0`}
              dir={isRTL ? "rtl" : "ltr"}
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <Gift className="h-5 w-5 text-mint-600" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Default export for backward compatibility
export default PerfumeShoppingModal
