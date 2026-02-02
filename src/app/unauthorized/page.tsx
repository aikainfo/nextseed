import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

/**
 * Unauthorized Page
 * Shown when user tries to access a route they don't have permission for
 */
export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-brand-50/30 to-sky-50/30 flex items-center justify-center p-4">
            <Card variant="bento" className="max-w-md w-full">
                <CardContent className="text-center py-12">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rose-500/30">
                        <ShieldAlert className="h-10 w-10 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold text-surface-900 mb-3">
                        Доступ запрещен
                    </h1>

                    <p className="text-surface-600 mb-8">
                        У вас нет прав для доступа к этой странице.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Link href="/">
                            <Button className="w-full">На главную</Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="w-full">Войти</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
