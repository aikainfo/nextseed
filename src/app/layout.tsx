import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "NextSeed — Платформа для молодых предпринимателей",
    template: "%s | NextSeed",
  },
  description:
    "Создавай проекты, находи менторов, получай инвестиции. Платформа для детей и подростков 8-16 лет.",
  keywords: [
    "предпринимательство",
    "стартапы",
    "менторство",
    "инвестиции",
    "проекты",
    "дети",
    "подростки",
  ],
  authors: [{ name: "NextSeed Team" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://nextseed.kz",
    siteName: "NextSeed",
    title: "NextSeed — Платформа для молодых предпринимателей",
    description: "Создавай проекты, находи менторов, получай инвестиции",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
