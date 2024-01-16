import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

const protectedRoutes = ["/my_profile"]

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const { data } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // if protected route is hit, check for a session (if user is logged in)
    if (!data.session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return response
}
