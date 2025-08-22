import type { NextRequest } from "next/server"
import { updateSession } from "@/utils/supabase/middleware"
import { adminMiddleware } from "./app/admin/middleware"

export async function middleware(request: NextRequest) {
  // Handle admin routes with admin middleware
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return adminMiddleware(request)
  }

  // Handle all other routes with your original working middleware
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
