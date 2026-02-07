import { HomePage } from "@/components/home-page"
import { notFound } from "next/navigation"

const SUPPORTED_LOCALES = ["en", "fr"] as const

export default function Page({ params }: { params: { locale: string } }) {
  const locale = SUPPORTED_LOCALES.includes(params.locale as "en" | "fr")
    ? (params.locale as "en" | "fr")
    : null

  if (!locale) {
    notFound()
  }

  return <HomePage locale={locale} />
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }]
}
