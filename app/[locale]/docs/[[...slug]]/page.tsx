import { docs } from "@/app/source"
import type { Metadata } from "next"
import { DocsPage, DocsBody } from "next-docs-ui/page"
import { notFound } from "next/navigation"
import { LayoutExample } from "@/app/docs/[[...slug]]/layout-example"
import { CodeExample } from "@/app/docs/[[...slug]]/code-example"
import { PreviewImplementation } from "@/app/docs/[[...slug]]/preview-implementation"
import {
  AllCodeDemos,
  AllPythonCheatSheetDemos,
  AllCCheatSheetDemos,
  AllBashCheatSheetDemos,
} from "@/components/all-code-demos"

const SUPPORTED_LOCALES = ["en", "fr"] as const

export default async function Page({
  params,
}: {
  params: { locale: string; slug?: string[] }
}) {
  const locale = SUPPORTED_LOCALES.includes(params.locale as "en" | "fr")
    ? params.locale
    : "en"

  const page = docs.getPage(params.slug, locale)

  if (page == null) {
    notFound()
  }

  const { default: MDX } = page.data.exports
  const layout = page.data.layout

  let children = <MDX />
  if (layout === "CodeIndex") {
    children = (
      <>
        <MDX />
        <AllCodeDemos locale={locale as "en" | "fr"} />
      </>
    )
  } else if (layout === "PythonCheatSheet") {
    children = (
      <>
        <MDX />
        <AllPythonCheatSheetDemos locale={locale as "en" | "fr"} />
      </>
    )
  } else if (layout === "CCheatSheet") {
    children = (
      <>
        <MDX />
        <AllCCheatSheetDemos locale={locale as "en" | "fr"} />
      </>
    )
  } else if (layout === "BashCheatSheet") {
    children = (
      <>
        <MDX />
        <AllBashCheatSheetDemos locale={locale as "en" | "fr"} />
      </>
    )
  } else if (layout === "LayoutExample") {
    children = <LayoutExample MDX={MDX} />
  } else if (layout === "CodeExample") {
    children = <CodeExample MDX={MDX} />
  } else if (layout === "PreviewAndImplementation") {
    children = <PreviewImplementation MDX={MDX} />
  }

  return (
    <DocsPage
      tableOfContent={{ enabled: false }}
      // toc={page.data.exports.toc}
    >
      <DocsBody className="min-h-screen">
        <h1>{page.data.title}</h1>
        {children}
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  const pages = docs.getPages("en")
  return SUPPORTED_LOCALES.flatMap((locale) =>
    pages.map((page) => ({
      locale,
      slug: page.slugs,
    })),
  )
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug?: string[] }
}) {
  const locale = SUPPORTED_LOCALES.includes(params.locale as "en" | "fr")
    ? params.locale
    : "en"
  const page = docs.getPage(params.slug, locale)

  if (page == null) notFound()

  const baseUrl = process.env.BASE_PATH
    ? `https://mistraleuh.github.io${process.env.BASE_PATH}`
    : process.env.NODE_ENV === "production"
      ? "https://mistraleuh.github.io/Fuck-Jails"
      : "http://localhost:3000"

  const ogImage = `${baseUrl}/logo.png?v=3`

  return {
    title: page.data.title + " | Fuck Jails",
    description: page.data.description,
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
    openGraph: {
      title: page.data.title + " | Fuck Jails",
      description: page.data.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  } satisfies Metadata
}
