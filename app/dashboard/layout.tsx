import type { ReactNode } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Almarai } from "next/font/google"
import ProtectedRoute from "@/components/auth/protected-route"
import { TranslationProvider } from "@/lib/translations/context"

// استخدام خط Almarai العربي
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
})

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <TranslationProvider defaultLanguage="ar">
        <div className={`${almarai.variable} font-almarai min-h-screen bg-sage-50/50 flex flex-col`}>
          <DashboardHeader />
          <div className="flex flex-1 overflow-hidden min-h-0">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto p-0 min-h-0 md:ml-52">{children}</main>
          </div>
        </div>
      </TranslationProvider>
    </ProtectedRoute>
  )
}
