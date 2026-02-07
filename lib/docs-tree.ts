type DocsTreeNode = {
  type?: string
  url?: string
  index?: DocsTreeNode
  children?: DocsTreeNode[]
  [key: string]: unknown
}

function prefixDocsUrl(url: string, locale: string) {
  if (url.startsWith(`/${locale}/docs`)) return url
  if (url.startsWith("/en/docs") || url.startsWith("/fr/docs")) {
    return `/${locale}${url.slice(3)}`
  }
  if (url.startsWith("/docs")) return `/${locale}${url}`
  return url
}

export function prefixDocsTreeUrls(tree: DocsTreeNode, locale: string) {
  const clone: DocsTreeNode = { ...tree }

  if (clone.url) {
    clone.url = prefixDocsUrl(clone.url, locale)
  }

  if (clone.index) {
    clone.index = prefixDocsTreeUrls(clone.index, locale)
  }

  if (clone.children) {
    clone.children = clone.children.map((child) =>
      prefixDocsTreeUrls(child, locale),
    )
  }

  return clone
}

export function stripDocsLocalePrefix(tree: DocsTreeNode, locale: string) {
  const clone: DocsTreeNode = { ...tree }

  if (clone.url) {
    const prefix = `/${locale}/docs`
    if (clone.url.startsWith(prefix)) {
      clone.url = `/docs${clone.url.slice(prefix.length)}`
    }
  }

  if (clone.index) {
    clone.index = stripDocsLocalePrefix(clone.index, locale)
  }

  if (clone.children) {
    clone.children = clone.children.map((child) =>
      stripDocsLocalePrefix(child, locale),
    )
  }

  return clone
}
