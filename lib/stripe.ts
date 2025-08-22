import Stripe from "stripe"

let stripe: Stripe | null = null

export const getStripe = () => {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    })
  }
  return stripe
}

export const STRIPE_PRICE_IDS = {
  premium_monthly: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || "price_premium_monthly",
} as const

export const PLANS = {
  free: {
    name: "الباقة المجانية",
    price: 0,
    credits: 10,
    features: ["البحث بالنص", "البحث بالصورة", "توصيات مخصصة", "عطوري AI", "قاعدة بيانات العطور", "حفظ العطور المفضلة"],
    limitations: ["10 عمليات بحث شهرياً"],
  },
  premium: {
    name: "الباقة المميزة",
    price: 20,
    credits: -1, // unlimited
    features: ["البحث بالنص", "البحث بالصورة", "توصيات مخصصة", "عطوري AI", "قاعدة بيانات العطور", "حفظ العطور المفضلة"],
    limitations: ["عمليات بحث غير محدودة", "دعم أولوية", "AI متقدم"],
  },
} as const
