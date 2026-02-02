import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for role-based route protection
 * WITH LOGGING for debugging auth flow
 */

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Get user role from cookie
    const userRole = request.cookies.get('user_role')?.value as 'student' | 'mentor' | 'business' | undefined
    const userId = request.cookies.get('user_id')?.value

    console.log(`🔵 [MIDDLEWARE] Path: ${pathname}, Role: ${userRole || 'none'}, UserID: ${userId || 'none'}`)

    // Protected routes by role
    const studentRoutes = pathname.startsWith('/student')
    const mentorRoutes = pathname.startsWith('/mentor')
    const businessRoutes = pathname.startsWith('/business')

    // If accessing a protected route without authentication
    if ((studentRoutes || mentorRoutes || businessRoutes) && !userRole) {
        console.log(`❌ [MIDDLEWARE] No role found, redirecting to /login`)
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Role-based access control - STRICT ISOLATION
    if (studentRoutes && userRole !== 'student') {
        console.log(`❌ [MIDDLEWARE] Role mismatch: ${userRole} trying to access student route`)
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    if (mentorRoutes && userRole !== 'mentor') {
        console.log(`❌ [MIDDLEWARE] Role mismatch: ${userRole} trying to access mentor route`)
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    if (businessRoutes && userRole !== 'business') {
        console.log(`❌ [MIDDLEWARE] Role mismatch: ${userRole} trying to access business route`)
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    console.log(`✅ [MIDDLEWARE] Access granted to ${pathname}`)
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/student/:path*',
        '/mentor/:path*',
        '/business/:path*',
    ],
}
