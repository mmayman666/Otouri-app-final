"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/translations/context"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-mint-50 text-mint-600 h-9 w-9 shadow-sm">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("language.switchTo")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          className={`cursor-pointer ${language === "ar" ? "bg-mint-50" : ""}`}
          onClick={() => setLanguage("ar")}
        >
          <span className="ml-2">🇸🇦</span>
          {t("language.arabic")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`cursor-pointer ${language === "en" ? "bg-mint-50" : ""}`}
          onClick={() => setLanguage("en")}
        >
          <span className="ml-2">🇺🇸</span>
          {t("language.english")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
