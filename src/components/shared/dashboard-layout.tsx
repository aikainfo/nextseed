"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import {
    Menu,
    X,
    Bell,
    Settings,
    LogOut,
    User,
    ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface DashboardLayoutProps {
    children: ReactNode
    navigation: {
        name: string
        href: string
        icon: ReactNode
    }[]
    user: {
        name: string
        email: string
        role: string
        image?: string
    }
}

/**
 * DashboardLayout - Universal layout for all role dashboards
 * Ensures consistent UI across student, mentor, and business dashboards
 */
export function DashboardLayout({ children, navigation, user }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-surface-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-surface-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-surface-200 transform transition-transform duration-200 lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between px-6 border-b border-surface-200">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600" />
                        <span className="text-xl font-bold text-surface-900">NextSeed</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-surface-500 hover:text-surface-900"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-brand-50 text-brand-700"
                                        : "text-surface-700 hover:bg-surface-100 hover:text-surface-900"
                                )}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* User section */}
                <div className="border-t border-surface-200 p-4">
                    <div className="relative">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-surface-100 transition-colors"
                        >
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-semibold text-surface-900">{user.name}</p>
                                <p className="text-xs text-surface-500 capitalize">{user.role}</p>
                            </div>
                            <ChevronDown className={cn(
                                "h-4 w-4 text-surface-400 transition-transform",
                                userMenuOpen && "rotate-180"
                            )} />
                        </button>

                        {/* User dropdown */}
                        {userMenuOpen && (
                            <Card className="absolute bottom-full left-0 right-0 mb-2 p-2">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 transition-colors"
                                >
                                    <User className="h-4 w-4" />
                                    Профиль
                                </Link>
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 transition-colors"
                                >
                                    <Settings className="h-4 w-4" />
                                    Настройки
                                </Link>
                                <button
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Выйти
                                </button>
                            </Card>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-200 bg-white/80 backdrop-blur-md px-4 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-surface-500 hover:text-surface-900"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex-1" />

                    {/* Notifications */}
                    <button className="relative rounded-xl p-2 text-surface-500 hover:bg-surface-100 hover:text-surface-900 transition-colors">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    </button>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
