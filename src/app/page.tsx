import Link from "next/link"
import { Lightbulb, Users, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

/**
 * Landing Page - Главная страница NextSeed
 * Inspired by modern SaaS landing pages
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-50">
      {/* Header */}
      <header className="border-b border-surface-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">🌱</span>
            </div>
            <span className="text-2xl font-bold text-surface-900">NextSeed</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-surface-700">
                Войти
              </Button>
            </Link>
            <Link href="/register">
              <Button className="shadow-lg shadow-brand-500/30">Регистрация</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-surface-900 mb-6 leading-tight">
            <span className="block mb-2">Plant ideas.</span>
            <span className="bg-gradient-to-r from-brand-500 via-brand-600 to-accent-sky bg-clip-text text-transparent">
              Grow founders.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-surface-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Образовательная платформа, где дети создают проекты, получают поддержку менторов и находят
            инвесторов для своих идей
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 - Создавайте проекты */}
            <Card
              variant="bento"
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-8 text-center">
                <div className="mb-6 mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-xl shadow-brand-500/30 group-hover:shadow-2xl group-hover:shadow-brand-500/50 transition-all group-hover:scale-110">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3">Создавайте проекты</h3>
                <p className="text-surface-600 leading-relaxed">
                  Воплощайте идеи в реальность
                </p>
              </div>
            </Card>

            {/* Card 2 - Найдите ментора */}
            <Card
              variant="bento"
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-8 text-center">
                <div className="mb-6 mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/30 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all group-hover:scale-110">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3">Найдите ментора</h3>
                <p className="text-surface-600 leading-relaxed">
                  Советы от опытных предпринимателей
                </p>
              </div>
            </Card>

            {/* Card 3 - Развивайте бизнес */}
            <Card
              variant="bento"
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-8 text-center">
                <div className="mb-6 mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-xl shadow-pink-500/30 group-hover:shadow-2xl group-hover:shadow-pink-500/50 transition-all group-hover:scale-110">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3">Развивайте бизнес</h3>
                <p className="text-surface-600 leading-relaxed">
                  Подготовка к инвестициям и росту
                </p>
              </div>
            </Card>
          </div>

          {/* CTA Button */}
          <Link href="/register">
            <Button
              size="lg"
              className="text-lg px-10 py-7 shadow-2xl shadow-brand-500/40 hover:shadow-brand-500/60 transition-all hover:scale-105 gap-2"
            >
              Начать путешествие
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface-50 border-y border-surface-200 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">500+</div>
              <div className="text-surface-600">Проектов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">100+</div>
              <div className="text-surface-600">Менторов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">50+</div>
              <div className="text-surface-600">Инвесторов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">$1M+</div>
              <div className="text-surface-600">Инвестиций</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
            Как это работает?
          </h2>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Простой путь от идеи до успешного проекта
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-surface-900 mb-2">Регистрация</h3>
            <p className="text-surface-600">
              Создайте аккаунт и выберите свою роль: студент, ментор или инвестор
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-surface-900 mb-2">Создание проекта</h3>
            <p className="text-surface-600">
              Опишите свою идею, добавьте презентацию и начните развивать проект
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-surface-900 mb-2">Рост и развитие</h3>
            <p className="text-surface-600">
              Получайте поддержку менторов, участвуйте в конкурсах и привлекайте инвестиции
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card
          variant="bento"
          className="bg-gradient-to-br from-brand-500 via-brand-600 to-accent-sky border-0 text-white shadow-2xl shadow-brand-500/40"
        >
          <div className="p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы начать свой путь?</h2>
            <p className="text-xl text-brand-50 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к сообществу молодых предпринимателей и воплощайте свои идеи в жизнь
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-brand-600 hover:bg-brand-50 text-lg px-10 py-7 shadow-xl gap-2"
              >
                Начать бесплатно
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-200 bg-surface-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <span className="text-white text-lg font-bold">🌱</span>
              </div>
              <span className="text-lg font-bold text-surface-900">NextSeed</span>
            </div>
            <p className="text-surface-600">© 2026 NextSeed. Plant ideas. Grow founders.</p>
            <div className="flex items-center gap-6 text-sm text-surface-600">
              <Link href="/about" className="hover:text-brand-600 transition-colors">
                О нас
              </Link>
              <Link href="/contact" className="hover:text-brand-600 transition-colors">
                Контакты
              </Link>
              <Link href="/privacy" className="hover:text-brand-600 transition-colors">
                Конфиденциальность
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
