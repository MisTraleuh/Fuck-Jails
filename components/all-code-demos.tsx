import { docs } from "@/app/source"
import { Block, parseRoot } from "codehike/blocks"
import { Demo } from "@/components/demo"
import { CodeWithNotes } from "@/components/code/code-with-notes"
import Link from "next/link"

type DocsLocale = "en" | "fr"

function buildDocsHref(slugs: string[], locale?: DocsLocale) {
  const base = locale ? `/${locale}/docs` : "/docs"
  return `${base}/${slugs.join("/")}`
}

export function AllCodeDemos({ locale }: { locale?: DocsLocale }) {
  const p = docs.getPages(locale)
  const codePages = p.filter((page) => page.slugs[0] === "code")
  const demoPages = codePages.filter(
    (page) => page.data.layout === "PreviewAndImplementation",
  )

  return demoPages.map((page) => {
    const { title, exports } = page.data
    const { default: MDX } = exports
    const { demo } = parseRoot(MDX, Block.extend({ demo: Block }), {
      components: { Demo, CodeWithNotes },
    })
    const href = buildDocsHref(page.slugs, locale)

    return (
      <div key={title}>
        <h2>{title}</h2>
        {demo.children}
        <p>
          See <Link href={href}>{title} implementation</Link>.
        </p>
      </div>
    )
  })
}

export function AllPythonCheatSheetDemos({ locale }: { locale?: DocsLocale }) {
  const p = docs.getPages(locale)
  const codePages = p.filter((page) => {
    return page.slugs[0] === "python-cheat-sheet"
  })
  const demoPages = codePages.filter(
    (page) => page.data.layout === "PreviewAndImplementation",
  )

  return demoPages.map((page) => {
    const { title, exports } = page.data
    const { default: MDX } = exports
    const { demo } = parseRoot(MDX, Block.extend({ demo: Block }), {
      components: { Demo, CodeWithNotes },
    })
    const href = buildDocsHref(page.slugs, locale)

    return (
      <div key={title}>
        <h2>{title}</h2>
        {demo.children}
        <p>
          See <Link href={href}>{title} implementation</Link>.
        </p>
      </div>
    )
  })
}

export function AllCCheatSheetDemos({ locale }: { locale?: DocsLocale }) {
  const p = docs.getPages(locale)
  const codePages = p.filter((page) => {
    return page.slugs[0] === "c-cheat-sheet"
  })
  const demoPages = codePages.filter(
    (page) => page.data.layout === "PreviewAndImplementation",
  )

  return demoPages.map((page) => {
    const { title, exports } = page.data
    const { default: MDX } = exports
    const { demo } = parseRoot(MDX, Block.extend({ demo: Block }), {
      components: { Demo, CodeWithNotes },
    })
    const href = buildDocsHref(page.slugs, locale)

    return (
      <div key={title}>
        <h2>{title}</h2>
        {demo.children}
        <p>
          See <Link href={href}>{title} implementation</Link>.
        </p>
      </div>
    )
  })
}

export function AllBashCheatSheetDemos({ locale }: { locale?: DocsLocale }) {
  const p = docs.getPages(locale)
  const codePages = p.filter((page) => {
    return page.slugs[0] === "bash-cheat-sheet"
  })
  const demoPages = codePages.filter(
    (page) => page.data.layout === "PreviewAndImplementation",
  )

  return demoPages.map((page) => {
    const { title, exports } = page.data
    const { default: MDX } = exports
    const { demo } = parseRoot(MDX, Block.extend({ demo: Block }), {
      components: { Demo, CodeWithNotes },
    })
    const href = buildDocsHref(page.slugs, locale)

    return (
      <div key={title}>
        <h2>{title}</h2>
        {demo.children}
        <p>
          See <Link href={href}>{title} implementation</Link>.
        </p>
      </div>
    )
  })
}
