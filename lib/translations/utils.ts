// Utility functions for translations
export function getDirection(language: string): "ltr" | "rtl" {
  return language === "ar" ? "rtl" : "ltr"
}

export function getTextAlign(language: string): "left" | "right" {
  return language === "ar" ? "right" : "left"
}

export function getFlexDirection(language: string): "row" | "row-reverse" {
  return language === "ar" ? "row-reverse" : "row"
}

// Helper for conditional classes based on language
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function rtlClass(isRTL: boolean, rtlClass: string, ltrClass = ""): string {
  return isRTL ? rtlClass : ltrClass
}

// Number formatting for different locales
export function formatNumber(num: number, language: string): string {
  return new Intl.NumberFormat(language === "ar" ? "ar-SA" : "en-US").format(num)
}

// Currency formatting
export function formatCurrency(amount: number, language: string, currency = "SAR"): string {
  return new Intl.NumberFormat(language === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}
