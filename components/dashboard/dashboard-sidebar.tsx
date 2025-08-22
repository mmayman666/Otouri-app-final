"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Sparkles, ImageIcon, Database, Heart, Settings, HelpCircle, Menu, X, Bot, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useTranslation } from "@/lib/translations/context"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick?: () => void
}

function NavItem({ href, icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive ? "bg-mint-100 text-mint-700 shadow-sm" : "text-gray-600 hover:text-mint-600 hover:bg-mint-50",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, isRTL } = useTranslation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    {
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
      label: t("navigation.home"),
    },
    {
      href: "/dashboard/recommendations",
      icon: <Sparkles className="h-5 w-5" />,
      label: t("navigation.recommendations"),
    },
    {
      href: "/dashboard/image-search",
      icon: <ImageIcon className="h-5 w-5" />,
      label: t("navigation.imageSearch"),
    },
    {
      href: "/dashboard/ai-chat",
      icon: <Bot className="h-5 w-5" />,
      label: t("navigation.aiChat"),
    },
    {
      href: "/dashboard/perfume-database",
      icon: <Database className="h-5 w-5" />,
      label: t("navigation.perfumeDatabase"),
    },
    {
      href: "/dashboard/favorites",
      icon: <Heart className="h-5 w-5" />,
      label: t("navigation.favorites"),
    },
    {
      href: "/dashboard/subscription",
      icon: <Crown className="h-5 w-5" />,
      label: t("navigation.subscription"),
    },
  ]

  const secondaryNavItems = [
    {
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      label: t("navigation.settings"),
    },
    {
      href: "/dashboard/help",
      icon: <HelpCircle className="h-5 w-5" />,
      label: t("navigation.help"),
    },
  ]

  return (
    <>
      {/* زر القائمة للشاشات الصغيرة */}
      <Button
        variant="ghost"
        size="icon"
        className={`fixed bottom-4 ${isRTL ? "right-4" : "left-4"} z-50 rounded-full bg-mint-500 text-white shadow-lg md:hidden hover:bg-mint-600 h-12 w-12`}
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* الشريط الجانبي للشاشات الكبيرة */}
      <aside
        className={cn(
          "w-52 border-l bg-white transition-all duration-300 ease-in-out shadow-md",
          isMobileMenuOpen
            ? `fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-40 shadow-xl overflow-y-auto`
            : "hidden md:block md:fixed md:inset-y-0 md:overflow-y-auto",
        )}
      >
        <div className="flex flex-col min-h-full py-3 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={pathname === item.href}
                onClick={closeMobileMenu}
              />
            ))}
          </div>

          <div className="mt-auto pt-3 border-t border-sage-100 space-y-1">
            {secondaryNavItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={pathname === item.href}
                onClick={closeMobileMenu}
              />
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-sage-100">
            <div className="rounded-lg bg-gradient-to-br from-mint-50 to-sage-50 p-3 shadow-md">
              <h4 className="font-medium text-mint-700 mb-2 text-base">{t("dashboard.needHelp")}</h4>
              <p className="text-sm text-gray-600 mb-3">{t("dashboard.supportText")}</p>
              <Button size="default" className="w-full bg-mint-500 hover:bg-mint-600 text-white shadow-md text-base">
                {t("dashboard.contactUs")}
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* خلفية معتمة للشاشات الصغيرة عند فتح القائمة */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={closeMobileMenu} />}
    </>
  )
}
