"use client"

import Link from "next/link"
import { Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"

/**
 * Header component
 * Migrated from legacy header HTML structure
 */
export function Header() {
    const user = null as { name: string } | null

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border-light bg-white/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-green to-primary-green-dark shadow-green">
                        <Sprout className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="bg-gradient-to-r from-primary-blue to-primary-blue-dark bg-clip-text text-2xl font-bold text-transparent">
                        NextSeed
                    </h1>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/student">
                                <Button variant="ghost">Дашборд</Button>
                            </Link>
                            <Link href="/student/cabinet">
                                <Avatar name={user.name || "User"} size="sm" />
                            </Link>
                            <Button variant="ghost">Выйти</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">Войти</Button>
                            </Link>
                            <Link href="/role-select">
                                <Button variant="primary">Регистрация</Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
