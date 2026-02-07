"use client"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Nav } from "next-docs-ui/nav"
import { cn } from "../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ExternalLink = {
  href: string
  label: string
  icon: ReactNode
  external?: boolean
}

export function NavBar({ version }: { version: string }) {
  const pathname = usePathname()
  const { currentLocale, nextLocale, nextHref } = getLocaleSwitch(pathname)
  const languageLink: ExternalLink = {
    href: nextHref,
    label: `Switch to ${nextLocale.toUpperCase()}`,
    icon: <LocaleBadge label={currentLocale.toUpperCase()} />,
  }
  const socialLinks: ExternalLink[] = [
    {
      href: "https://discord.com/users/474143573928050710",
      label: "Discord",
      icon: <DiscordIcon className="h-5 w-5" />,
      external: true,
    },
    {
      href: "https://github.com/MisTraleuh/Fuck-Jails",
      label: "GitHub",
      icon: <GitHubIcon className="h-5 w-5" />,
      external: true,
    },
  ]
  const navLinks = [languageLink, ...socialLinks]

  return (
    <Nav
      title={
        <span className="flex">
          <CodeHikeLogo /> Fuck Jails
        </span>
      }
      enableSidebar={isDocsPath(pathname)}
      collapsibleSidebar={true}
      links={navLinks}
      items={[
        /*
        {
          url: "/docs",
          text: "Docs",
        },
        {
          url: "/blog",
          text: "Blog",
        },
        */
      ]}
    >
      <MobileLinks links={navLinks} />
    </Nav>
  )
}

function VersionNav({ version }: { version: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm bg-secondary text-primary rounded-lg px-2 tabular-nums">
        {version}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[5rem]">
        <DropdownMenuItem className="p-0 text-center">
          <span className="w-full px-2 py-1 tabular-nums">{version}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 text-center">
          <a
            href="https://v0.codehike.org/docs"
            className="w-full px-2 py-1 tabular-nums"
          >
            0.9.0
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function CodeHikeLogo({ className }: { className?: string }) {
  return (
    <svg
      fill="currentColor"
      className={cn("block h-6 w-6 mr-2", className)}
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0,500) scale(0.1,-0.1)">
        <path d="M756 4184 c-14 -14 -16 -186 -16 -1683 0 -1430 2 -1670 14 -1680 11 -9 431 -12 1744 -13 951 -1 1734 2 1740 6 9 5 12 427 12 1686 0 1648 0 1679 -19 1690 -13 7 -578 10 -1740 10 -1544 0 -1721 -2 -1735 -16z m512 -1681 l-3 -1448 -140 0 -140 0 -3 1448 -2 1447 145 0 145 0 -2 -1447z m642 937 l0 -510 25 0 c24 0 25 2 26 68 1 37 0 83 -1 103 -1 20 4 83 10 140 13 119 49 209 118 296 l42 52 0 181 0 180 370 0 370 0 0 -180 0 -181 41 -51 c22 -28 50 -69 61 -91 47 -93 51 -117 57 -317 l6 -195 29 -3 28 -4 -3 509 -4 508 218 3 217 2 -2 -1447 -3 -1448 -204 -3 c-113 -1 -208 1 -213 6 -4 4 -8 164 -9 355 0 190 -4 349 -8 351 -4 3 -21 -9 -37 -26 -16 -16 -60 -53 -99 -80 l-70 -49 -5 -277 -5 -277 -365 0 -365 0 -3 277 -2 277 -55 37 c-30 20 -77 56 -105 81 -34 31 -51 41 -55 31 -3 -7 -6 -168 -7 -358 l-3 -345 -210 0 -210 0 -5 1350 c-3 743 -4 1394 -2 1448 l3 97 214 0 215 0 0 -510z m2105 -940 l0 -1445 -140 0 -140 0 -3 1448 -2 1448 142 -3 143 -3 0 -1445z"/>
        <path d="M2379 3641 c-130 -27 -259 -147 -312 -289 -19 -50 -22 -83 -25 -262 -2 -142 -7 -207 -15 -212 -7 -4 -41 -8 -77 -8 -77 0 -106 -13 -138 -60 l-24 -35 4 -300 c4 -294 5 -302 31 -380 116 -344 452 -553 793 -492 309 56 534 286 580 592 16 106 19 532 4 586 -18 64 -49 83 -148 89 l-87 5 -5 210 c-5 180 -9 218 -27 267 -42 114 -131 210 -241 261 -59 26 -80 30 -172 33 -58 2 -121 -1 -141 -5z m226 -195 c65 -30 131 -104 150 -169 21 -69 22 -379 1 -396 -9 -8 -88 -11 -267 -9 l-254 3 0 200 c0 186 2 203 22 240 71 133 223 190 348 131z m-41 -830 c18 -8 45 -29 60 -48 52 -70 47 -145 -16 -211 l-40 -42 20 -100 c12 -55 24 -121 28 -147 l6 -48 -121 0 c-143 0 -133 -18 -95 170 l26 130 -31 26 c-42 35 -61 74 -61 124 0 115 116 191 224 146z"/>
      </g>
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  )
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 71 55"
      fill="currentColor"
      className={className}
    >
      <g clipPath="url(#clip0)">
        <path d="M60.105 4.898A58.55 58.55 0 0045.653.415a.22.22 0 00-.233.11 40.784 40.784 0 00-1.8 3.697c-5.456-.817-10.886-.817-16.23 0-.485-1.164-1.201-2.587-1.828-3.697a.228.228 0 00-.233-.11 58.386 58.386 0 00-14.451 4.483.207.207 0 00-.095.082C1.578 18.73-.944 32.144.293 45.39a.244.244 0 00.093.167c6.073 4.46 11.955 7.167 17.729 8.962a.23.23 0 00.249-.082 42.08 42.08 0 003.627-5.9.225.225 0 00-.123-.312 38.772 38.772 0 01-5.539-2.64.228.228 0 01-.022-.378c.372-.279.744-.569 1.1-.862a.22.22 0 01.23-.03c11.619 5.304 24.198 5.304 35.68 0a.219.219 0 01.233.027c.356.293.728.586 1.103.865a.228.228 0 01-.02.378 36.384 36.384 0 01-5.54 2.637.227.227 0 00-.121.315 47.249 47.249 0 003.624 5.897.225.225 0 00.249.084c5.801-1.794 11.684-4.502 17.757-8.961a.228.228 0 00.092-.164c1.48-15.315-2.48-28.618-10.497-40.412a.18.18 0 00-.093-.084zm-36.38 32.427c-3.497 0-6.38-3.211-6.38-7.156 0-3.944 2.827-7.156 6.38-7.156 3.583 0 6.438 3.24 6.382 7.156 0 3.945-2.827 7.156-6.381 7.156zm23.593 0c-3.498 0-6.38-3.211-6.38-7.156 0-3.944 2.826-7.156 6.38-7.156 3.582 0 6.437 3.24 6.38 7.156 0 3.945-2.798 7.156-6.38 7.156z"></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path d="M0 0H71V55H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

function MobileLinks({ links }: { links: ExternalLink[] }) {
  if (!links.length) return null

  return (
    <div className="ml-auto flex flex-row items-center gap-2 border-l pl-2 md:hidden">
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-label={item.label}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {item.icon}
        </a>
      ))}
    </div>
  )
}

function getLocaleSwitch(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const localePrefix = segments[0] === "en" || segments[0] === "fr"

  if (localePrefix) {
    const currentLocale = segments[0]
    const nextLocale = currentLocale === "en" ? "fr" : "en"
    const nextSegments = [nextLocale, ...segments.slice(1)]
    const nextHref = `/${nextSegments.join("/")}`
    return { currentLocale, nextLocale, nextHref }
  }

  if (pathname.startsWith("/docs")) {
    return {
      currentLocale: "en",
      nextLocale: "fr",
      nextHref: `/fr${pathname}`,
    }
  }

  if (pathname === "/") {
    return {
      currentLocale: "en",
      nextLocale: "fr",
      nextHref: "/fr",
    }
  }

  return {
    currentLocale: "en",
    nextLocale: "fr",
    nextHref: `/fr${pathname}`,
  }

}

function LocaleBadge({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide">
      {label}
    </span>
  )
}

function isDocsPath(pathname: string) {
  return (
    pathname === "/docs" ||
    pathname.startsWith("/docs/") ||
    pathname.startsWith("/en/docs") ||
    pathname.startsWith("/fr/docs")
  )
}
