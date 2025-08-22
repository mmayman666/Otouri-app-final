"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  // Skip auth check for login page
  const isLoginPage = pathname === "/admin/auth/login"

  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false)
      return
    }

    const checkAdminAccess = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/admin/auth/login")
          return
        }

        // Check if user is an admin
        const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single()

        if (!profile || !profile.is_admin) {
          // Not an admin, redirect to dashboard
          router.push("/dashboard")
          return
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error checking admin access:", error)
        router.push("/admin/auth/login")
      }
    }

    checkAdminAccess()
  }, [router, supabase, isLoginPage])

  if (isLoading && !isLoginPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  // Return just the children for the login page
  if (isLoginPage) {
    return children
  }

  // Return the admin layout for all other admin pages
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full" dir="rtl">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
