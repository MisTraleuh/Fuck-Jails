"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"
import { RootProvider } from "next-docs-ui/provider"

const LocalSearchDialog = dynamic(() => import("@/components/search/local-search-dialog"), {
  ssr: false,
})

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <RootProvider
      search={{
        SearchDialog: LocalSearchDialog,
      }}
    >
      {children}
    </RootProvider>
  )
}

