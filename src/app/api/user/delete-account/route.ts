import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Sign out first to clear auth cookies
        const { headers: authHeaders } = await auth.api.signOut({
            headers: await headers(),
            returnHeaders: true
        });

        // Remove user and related profiles (CASCADE)
        await prisma.user.delete({
            where: { id: session.user.id }
        });

        const response = NextResponse.json({ success: true });

        response.cookies.set("user_role", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0
        });

        response.cookies.set("user_id", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0
        });

        // Apply auth cookies returned by Better Auth
        // @ts-expect-error - runtime provides getSetCookie
        const getSetCookie = typeof authHeaders.getSetCookie === "function" ? authHeaders.getSetCookie.bind(authHeaders) : null;
        const setCookies = getSetCookie
            ? getSetCookie()
            : authHeaders.get("set-cookie")
                ? [authHeaders.get("set-cookie")]
                : [];

        setCookies.forEach((cookie) => {
            if (cookie) response.headers.append("set-cookie", cookie);
        });

        return response;
    } catch (error) {
        console.error('Delete account error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
