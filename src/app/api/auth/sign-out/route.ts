import { NextResponse } from "next/server"
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

export async function POST() {
    try {
        const { headers: authHeaders } = await auth.api.signOut({
            headers: await headers(),
            returnHeaders: true,
        } as any)

        const response = NextResponse.json({ success: true })

        response.cookies.set("user_role", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
        })

        response.cookies.set("user_id", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0,
        })

        applyAuthCookies(response, authHeaders)

        return response
    } catch (error: any) {
        console.error("❌ [SIGN-OUT] Error:", error)
        return NextResponse.json(
            { success: false, error: error?.message || "Ошибка выхода" },
            { status: error?.statusCode || 500 }
        )
    }
}
