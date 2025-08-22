"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ar" | "en"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  isRTL: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

interface TranslationProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export function TranslationProvider({ children, defaultLanguage = "ar" }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [translations, setTranslations] = useState<Record<string, any>>({})

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Load translations for current language
    const loadTranslations = async () => {
      try {
        const translations = await import(`./locales/${language}.json`)
        setTranslations(translations.default)
      } catch (error) {
        console.error("Failed to load translations:", error)
      }
    }
    loadTranslations()
  }, [language])

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem("language", language)

    // Update document direction and lang
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      value = value?.[k]
    }

    if (typeof value !== "string") {
      return key // Return key if translation not found
    }

    // Replace parameters
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match
      })
    }

    return value
  }

  const isRTL = language === "ar"

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
