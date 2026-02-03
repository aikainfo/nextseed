import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const applyAuthCookies = (response: NextResponse, authHeaders?: Headers) => {
    if (!authHeaders) return

    // @ts-expect-error - runtime provides getSetCookie
    const getSetCookie = typeof authHeaders.getSetCookie === "function" ? authHeaders.getSetCookie.bind(authHeaders) : null
    const setCookies = getSetCookie
        ? getSetCookie()
        : authHeaders.get("set-cookie")
            ? [authHeaders.get("set-cookie") as string]
            : []

    setCookies.forEach((cookie) => {
        if (cookie) response.headers.append("set-cookie", cookie)
    })
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password, role, rememberMe } = body

        const allowedRoles = ["student", "mentor", "business"]

        if (!email || !password) {
            return NextResponse.json({ success: false, error: "Введите email и пароль" }, { status: 400 })
        }
        if (role && !allowedRoles.includes(role)) {
            return NextResponse.json({ success: false, error: "Некорректная роль" }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser && role && existingUser.role !== role) {
            return NextResponse.json({ success: false, error: "Вы выбрали неверную роль для этого аккаунта" }, { status: 403 })
        }

        const { response: signInResult, headers: authHeaders } = await auth.api.signInEmail({
            headers: await headers(),
            body: {
                email,
                password,
                rememberMe,
            },
            returnHeaders: true,
        } as any)

        const resolvedRole = existingUser?.role || (signInResult?.user as any)?.role || "student"

        const response = NextResponse.json({
            success: true,
            redirectUrl: `/${resolvedRole}`,
            user: {
                id: signInResult.user.id,
                name: signInResult.user.name,
                email: signInResult.user.email,
                role: resolvedRole,
            },
        })

        response.cookies.set("user_role", resolvedRole, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        })

        response.cookies.set("user_id", signInResult.user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        })

        applyAuthCookies(response, authHeaders)

        return response
    } catch (error: any) {
        console.error("❌ [LOGIN] Error:", error)
        return NextResponse.json(
            { success: false, error: error?.message || "Ошибка входа" },
            { status: error?.statusCode || 401 }
        )
    }
}
