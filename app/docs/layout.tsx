import { docs } from "../source"
import { DocsLayout } from "next-docs-ui/layout"
import type { ReactNode } from "react"
import type { PageTree } from "next-docs-zeta/server"
import { stripDocsLocalePrefix } from "@/lib/docs-tree"
export default function RootDocsLayout({ children }: { children: ReactNode }) {
  const baseTree =
    (docs.pageTree as Record<string, unknown>).en ?? docs.pageTree
  const tree = stripDocsLocalePrefix(
    baseTree as Record<string, unknown>,
    "en",
  ) as unknown as PageTree.Root

  return (
    <>
      <DocsLayout
        tree={tree}
        nav={{ enabled: false }}
        sidebar={{
          enabled: true,
        }}
      >
        {children}
      </DocsLayout>
    </>
  )
}
