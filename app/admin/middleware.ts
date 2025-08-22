import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function adminMiddleware(req: NextRequest) {
  // Create a response object
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  // Get the pathname
  const pathname = req.nextUrl.pathname

  // Only run on admin routes
  if (!pathname.startsWith("/admin")) {
    return response
  }

  // Allow access to admin login page without authentication
  if (pathname === "/admin/auth/login") {
    return response
  }

  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Get the session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session, redirect to admin login
  if (!session) {
    const url = new URL("/admin/auth/login", req.url)
    return NextResponse.redirect(url)
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single()

  // If not an admin, redirect to the main dashboard
  if (!profile || !profile.is_admin) {
    const url = new URL("/dashboard", req.url)
    return NextResponse.redirect(url)
  }

  // Allow access to admin routes
  return response
}

// Export the checkAdminAccess function for compatibility
export async function checkAdminAccess() {
  // This is a stub for compatibility - actual auth happens in middleware
  return {
    user: null,
    profile: { is_admin: false, full_name: "" },
  }
}
