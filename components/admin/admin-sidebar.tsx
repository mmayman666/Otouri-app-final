"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LayoutDashboard, Users, Settings, Crown, Menu, X, LogOut, Shield, Camera, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]"
          : "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:transform hover:scale-[1.01]",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    // Clear any admin session data
    localStorage.removeItem("admin_session")
    // Redirect to login
    window.location.href = "/admin/auth/login"
  }

  const navItems = [
    {
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "لوحة التحكم",
    },
    {
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
      label: "إدارة المستخدمين",
    },
    {
      href: "/admin/image-analysis",
      icon: <Camera className="h-5 w-5" />,
      label: "تحليلات الصور",
    },
    {
      href: "/admin/recommendations",
      icon: <Target className="h-5 w-5" />,
      label: "التوصيات",
    },
    {
      href: "/admin/subscriptions",
      icon: <Crown className="h-5 w-5" />,
      label: "الاشتراكات",
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl md:hidden hover:from-blue-700 hover:to-purple-700 h-14 w-14 border-2 border-white/20"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-l border-slate-700/50 transition-all duration-300 ease-in-out shadow-2xl backdrop-blur-sm",
          isMobileMenuOpen
            ? "fixed inset-y-0 right-0 z-40 overflow-y-auto"
            : "hidden md:block md:sticky md:top-0 md:h-screen md:overflow-y-auto",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">عُطوري</h2>
                <p className="text-sm text-slate-400">لوحة الإدارة</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6 space-y-2">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">الإدارة الرئيسية</h3>
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
          </div>

          {/* Settings & Logout */}
          <div className="p-6 border-t border-slate-700/50 space-y-2">
            <NavItem
              href="/admin/settings"
              icon={<Settings className="h-5 w-5" />}
              label="الإعدادات"
              isActive={pathname === "/admin/settings"}
              onClick={closeMobileMenu}
            />

            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-red-600/20 hover:border-red-500/20 rounded-xl transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={closeMobileMenu} />
      )}
    </>
  )
}
