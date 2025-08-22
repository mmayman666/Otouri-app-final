import type React from "react"
import type { Metadata } from "next"
import { Almarai } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/lib/translations/context"

// استخدام خط Almarai العربي
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
})

export const metadata: Metadata = {
  title: "عُطوري | اكتشف عطرك المثالي",
  description: "منصة عطوري - اكتشف عطرك المثالي من خلال البحث بالنص أو الصورة واحصل على توصيات مخصصة",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${almarai.variable} font-almarai`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TranslationProvider defaultLanguage="ar">{children}</TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
