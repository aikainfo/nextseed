import Link from "next/link"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sprout, Lightbulb, Users, TrendingUp, ArrowRight } from "lucide-react"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-brand-50/40 to-sky-50/30">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-premium">
                            <Sprout className="h-9 w-9 text-white" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-surface-900">
                            <span className="bg-gradient-to-r from-brand-500 to-sky-500 bg-clip-text text-transparent">
                                NextSeed
                            </span>
                        </h1>
                    </div>

                    <p className="mt-6 text-2xl md:text-3xl font-medium italic text-surface-700">
                        Plant ideas. Grow founders.
                    </p>

                    <p className="mt-4 max-w-2xl text-lg text-surface-600">
                        Образовательная платформа, где дети создают проекты, получают
                        поддержку менторов и находят инвесторов для своих идей.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    <Card variant="bento" className="text-center">
                        <CardContent className="p-8">
                            <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                <Lightbulb className="h-6 w-6 text-brand-600" />
                            </div>
                            <CardTitle className="text-lg">Создавайте проекты</CardTitle>
                            <p className="mt-2 text-sm text-surface-600">
                                Воплощайте свои идеи в реальность с поддержкой AI.
                            </p>
                        </CardContent>
                    </Card>

                    <Card variant="bento" className="text-center">
                        <CardContent className="p-8">
                            <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <CardTitle className="text-lg">Найдите ментора</CardTitle>
                            <p className="mt-2 text-sm text-surface-600">
                                Получайте советы от опытных предпринимателей.
                            </p>
                        </CardContent>
                    </Card>

                    <Card variant="bento" className="text-center">
                        <CardContent className="p-8">
                            <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-amber-600" />
                            </div>
                            <CardTitle className="text-lg">Развивайте бизнес</CardTitle>
                            <p className="mt-2 text-sm text-surface-600">
                                Привлекайте инвестиции для роста вашего проекта.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 flex flex-col items-center gap-4">
                    <Link href="/role-select">
                        <Button className="h-14 px-10 rounded-full text-lg font-semibold shadow-premium">
                            Начать путешествие
                            <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                    </Link>
                    <p className="text-sm text-surface-500">
    Уже есть аккаунт?{' '}
    <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 underline">
        Войти
    </Link>
</p>
                </div>
            </div>
        </div>
    )
}
