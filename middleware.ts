import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } =await supabase.auth.getSession()

    // If user is not logged in, redirect to login
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url))  
    }

    // If user is logged in, allow access
    return res
}

//Apply to all /dashboard routes
export const config = {
    matcher: ['/dashboard/:path*']
}