import { docs } from "@/app/source"
import { DocsLayout } from "next-docs-ui/layout"
import type { ReactNode } from "react"
import { prefixDocsTreeUrls } from "@/lib/docs-tree"

export default function LocaleDocsLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const baseTree =
    (docs.pageTree as Record<string, unknown>)[params.locale] ??
    (docs.pageTree as Record<string, unknown>).en ??
    docs.pageTree
  const tree = prefixDocsTreeUrls(
    baseTree as Record<string, unknown>,
    params.locale,
  )

  return (
    <DocsLayout
      tree={tree}
      nav={{ enabled: false }}
      sidebar={{
        enabled: true,
      }}
    >
      {children}
    </DocsLayout>
  )
}
