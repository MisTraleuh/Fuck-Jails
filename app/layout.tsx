import "./global.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import { NavBar } from "../ui/nav"
import { Analytics } from "@vercel/analytics/react"
import { AppProviders } from "@/components/providers/app-provider"

const inter = Inter({
  subsets: ["latin"],
})

import ch from "codehike/package.json"
import { Metadata } from "next"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} snap-y`}
      suppressHydrationWarning
    >
      {/* <script src="https://unpkg.com/intersection-observer-debugger"></script> */}
      <body suppressHydrationWarning>
        <AppProviders>
          <NavBar version={ch.version} />
          {children}
        </AppProviders>
        <Analytics />
      </body>
    </html>
  )
}
const baseUrl = process.env.BASE_PATH 
  ? `https://mistraleuh.github.io${process.env.BASE_PATH}`
  : process.env.NODE_ENV === 'production'
  ? 'https://mistraleuh.github.io/Fuck-Jails'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Fuck Jails",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  description:
    "Fuck Jails is a playground, unapologetically dedicated to jailbreak tricks. It brings together all escape techniques in one place so that everyone can escape the most unpleasant prompts, shells, and sandboxes 🚀",
  openGraph: {
    title: "Fuck Jails",
    images: [`https://mistraleuh.github.io/Fuck-Jails/logo.png`, "/logo.png"],
    siteName: "Fuck Jails",
  },
  twitter: {
    card: "summary_large_image",
    site: "@codehike_",
    creator: "@pomber",
    images: `https://codehike.org/codehike.png`,
  },
  alternates: {
    types: {
      "application/rss+xml": "https://mistraleuh.github.io/Fuck-Jails/blog/feed.xml",
    },
  },
}
