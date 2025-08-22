"use client"

import Link from "next/link"
import { Bell, Search, User, Settings, LogOut, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { logout } from "@/app/auth/actions"
import { useNotifications } from "@/hooks/use-notifications"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useActivityNotifications } from "@/hooks/use-activity-notifications"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/lib/translations/context"

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const { notifications, loading, error, unreadCount, markAsRead, markAllAsRead, formatRelativeTime, refetch } =
    useNotifications()
  const { triggerWelcome, triggerRecommendation, triggerImageSearch } = useActivityNotifications()
  const { t, isRTL } = useTranslation()

  const handleLogout = async () => {
    await logout()
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "⚠️"
      case "success":
        return "✅"
      case "recommendation":
        return "💡"
      case "update":
        return "🔄"
      default:
        return "ℹ️"
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm shadow-md">
      <div className="flex h-14 items-center justify-between px-3 md:px-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-mint-600 to-mint-400 bg-clip-text text-transparent drop-shadow-sm">
              عُطوري
            </span>
            <span className="sr-only">لوحة تحكم عُطوري</span>
          </Link>
        </div>

        <div className="flex-1 mx-6 hidden md:block max-w-md">
          <div className="relative">
            <Search
              className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
            />
            <Input
              placeholder={t("dashboard.searchPlaceholder")}
              className={`${isRTL ? "pr-10 text-right" : "pl-10 text-left"} border-sage-200 focus-visible:ring-mint-400 rounded-lg h-10 shadow-sm text-base`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-mint-50 text-mint-600 h-9 w-9 shadow-sm relative"
                disabled={loading}
              >
                {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Bell className="h-5 w-5" />}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
                <span className="sr-only">{t("dashboard.notifications")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`w-80 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="flex items-center justify-between p-3 border-b">
                <DropdownMenuLabel className="text-base font-semibold">
                  {t("dashboard.notifications")}
                </DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  {error && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={refetch}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      <RefreshCw className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                      {t("dashboard.reload")}
                    </Button>
                  )}
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-mint-600 hover:text-mint-700"
                    >
                      {t("dashboard.markAllRead")}
                    </Button>
                  )}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {error && (
                  <div className="p-3">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className={isRTL ? "text-right" : "text-left"}>{error}</AlertDescription>
                    </Alert>
                  </div>
                )}

                {loading && notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                    {t("dashboard.loadingNotifications")}
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    {t("dashboard.noNotifications")}
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`p-3 cursor-pointer border-b last:border-b-0 ${
                        !notification.read ? "bg-mint-50/50" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="text-lg flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            !notification.read ? "bg-mint-500" : "bg-gray-300"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`text-sm font-medium truncate ${
                                !notification.read ? "text-gray-900" : "text-gray-600"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <span className={`text-xs text-gray-400 flex-shrink-0 ${isRTL ? "mr-2" : "ml-2"}`}>
                              {formatRelativeTime(notification.created_at)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2">{notification.message}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-mint-600 hover:text-mint-700">
                    {t("dashboard.viewAllNotifications")}
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full overflow-hidden border border-sage-200 hover:bg-mint-50 shadow-sm"
              >
                <User className="h-5 w-5 text-mint-600" />
                <span className="sr-only">قائمة المستخدم</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className={`w-56 ${isRTL ? "text-right" : "text-left"}`}>
              <DropdownMenuLabel>{t("dashboard.myAccount")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/settings">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <Settings className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span>{t("navigation.settings")}</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-500 cursor-pointer" onClick={handleLogout}>
                <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                <span>{t("dashboard.logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
