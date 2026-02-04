import { docs } from "@/app/source"
import type { Metadata } from "next"
import { RollButton } from "next-docs-ui/components/roll-button"
import { DocsPage, DocsBody } from "next-docs-ui/page"
import { notFound } from "next/navigation"
import { LayoutExample } from "./layout-example"
import { CodeExample } from "./code-example"
import { PreviewImplementation } from "./preview-implementation"
import { AllCodeDemos, AllPythonCheatSheetDemos, AllCCheatSheetDemos, AllBashCheatSheetDemos } from "@/components/all-code-demos"

export default async function Page({
  params,
}: {
  params: { slug?: string[] }
}) {
  const page = docs.getPage(params.slug)

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
        <AllCodeDemos />
      </>
    )
  } else if (layout === "PythonCheatSheet") {
    children = (
      <>
        <MDX />
        <AllPythonCheatSheetDemos />
      </>
    )
  } else if (layout === "CCheatSheet") {
    children = (
      <>
        <MDX />
        <AllCCheatSheetDemos />
      </>
    )
  } else if (layout === "BashCheatSheet") {
    children = (
      <>
        <MDX />
        <AllBashCheatSheetDemos />
      </>
    )
  }
  else if (layout === "LayoutExample") {
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
        {/* <RollButton /> */}
        <h1>{page.data.title}</h1>
        {/* <Callout title="Unstable API" type="warn">
          This version of Code Hike is under development. Proceed at your own
          risk.
        </Callout> */}

        {children}
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return docs.getPages().map((page) => ({
    slug: page.slugs,
  }))
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = docs.getPage(params.slug)

  if (page == null) notFound()

  const baseUrl = process.env.BASE_PATH
    ? `https://mistraleuh.github.io${process.env.BASE_PATH}`
    : process.env.NODE_ENV === "production"
      ? "https://mistraleuh.github.io/Fuck-Jails"
      : "http://localhost:3000"

  const ogImage = `${baseUrl}/logo.png?v=2`

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
