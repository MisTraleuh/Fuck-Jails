import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import GithubSlugger from "github-slugger"

const ROOT_DIR = process.cwd()
const DOCS_DIR = path.join(ROOT_DIR, "content/docs")
const META_FILE = path.join(DOCS_DIR, "meta.json")
const OUTPUT_FILE = path.join(ROOT_DIR, "generated/search-index.json")
const HEADING_REGEX = /^(#{2,6})\s+(.*)$/
const DEFAULT_OPTIONS = {
  verbose: process.env.NODE_ENV !== "production",
}

const DIACRITIC_REGEX = /[\u0300-\u036f]/g

export async function generateSearchIndex(options = DEFAULT_OPTIONS) {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const files = await collectDocFiles(DOCS_DIR)
  const allowedEntries = await loadAllowedEntries()
  const shouldFilterByMeta = allowedEntries.size > 0

  const pages = []
  for (const file of files) {
    const relativePath = path.relative(DOCS_DIR, file).replace(/\\/g, "/")
    if (shouldFilterByMeta && !isAllowedByMeta(relativePath, allowedEntries)) {
      continue
    }

    const raw = await fs.readFile(file, "utf8")
    const { data, content } = matter(raw)
    const title = typeof data.title === "string" ? data.title.trim() : deriveTitleFromPath(relativePath)
    if (!title) {
      continue
    }

    const url = buildUrlFromPath(relativePath)
    const pageId = url === "/docs" ? "docs" : url.replace(/^\//, "")
    const { category, categorySlug, normalizedCategory } = resolveCategory(relativePath, data)
    const slugger = new GithubSlugger()
    const headings = extractHeadings(content, slugger)

    pages.push({
      id: pageId,
      title,
      normalizedTitle: normalizeForSearch(title),
      url,
      category,
      categorySlug,
      normalizedCategory,
      headings,
    })
  }

  pages.sort((a, b) => a.url.localeCompare(b.url))

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })
  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        pages,
      },
      null,
      2,
    ),
    "utf8",
  )

  if (opts.verbose) {
    console.log(`[search] index generated (${pages.length} pages, ${files.length} files scanned)`)
  }
}

async function collectDocFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectDocFiles(fullPath)))
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    const ext = path.extname(entry.name).toLowerCase()
    if (ext === ".md" || ext === ".mdx") {
      files.push(fullPath)
    }
  }

  return files
}

function extractHeadings(content, slugger) {
  const headings = []
  const lines = content.split(/\r?\n/)
  let inFence = false
  let fenceMarker = ""

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      const marker = trimmed.slice(0, 3)
      if (inFence && marker === fenceMarker) {
        inFence = false
        fenceMarker = ""
      } else if (!inFence) {
        inFence = true
        fenceMarker = marker
      }
      continue
    }

    if (inFence) {
      continue
    }

    const match = line.match(HEADING_REGEX)
    if (!match) {
      continue
    }

    let text = match[2].trim()
    if (!text) {
      continue
    }

    text = text.replace(/\s*\{#.+\}\s*$/, "").trim()
    const lowered = text.toLowerCase()
    if (lowered === "!demo") {
      continue
    }

    const id = slugger.slug(text)
    headings.push({
      id,
      title: text,
      normalizedTitle: normalizeForSearch(text),
    })
  }

  return headings
}

function buildUrlFromPath(relativePath) {
  const withoutExt = relativePath.replace(/\.(mdx?|md)$/i, "")
  const segments = withoutExt.split("/").filter(Boolean)
  if (segments[segments.length - 1] === "index") {
    segments.pop()
  }

  return segments.length ? `/docs/${segments.join("/")}` : "/docs"
}

function deriveTitleFromPath(relativePath) {
  const filename = relativePath.split("/").pop()
  if (!filename) return ""
  return filename
    .replace(/\.(mdx?|md)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}

function normalizeForSearch(value) {
  return value
    .toString()
    .trim()
    .normalize("NFD")
    .replace(DIACRITIC_REGEX, "")
    .toLowerCase()
}

function resolveCategory(relativePath, frontmatter) {
  if (typeof frontmatter.category === "string" && frontmatter.category.trim().length > 0) {
    const category = frontmatter.category.trim()
    return {
      category,
      categorySlug: slugify(category),
      normalizedCategory: normalizeForSearch(category),
    }
  }

  const [topLevel] = relativePath.split("/")
  if (!topLevel || topLevel === "index.mdx") {
    return {
      category: "Docs",
      categorySlug: "docs",
      normalizedCategory: normalizeForSearch("Docs"),
    }
  }

  const category = deriveTitleFromPath(topLevel)
  return {
    category,
    categorySlug: topLevel,
    normalizedCategory: normalizeForSearch(category),
  }
}

function slugify(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

async function loadAllowedEntries() {
  try {
    const raw = await fs.readFile(META_FILE, "utf8")
    const meta = JSON.parse(raw)
    if (!Array.isArray(meta.pages)) {
      return new Set()
    }

    const entries = meta.pages
      .filter((entry) => typeof entry === "string")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0 && !entry.startsWith("---"))

    return new Set(entries)
  } catch (error) {
    console.warn("[search] unable to read docs/meta.json, falling back to full scan:", error.message)
    return new Set()
  }
}

function isAllowedByMeta(relativePath, allowedEntries) {
  const normalizedPath = relativePath.replace(/\\/g, "/")
  const [firstSegment = ""] = normalizedPath.split("/")
  if (!firstSegment) {
    return false
  }

  if (!normalizedPath.includes("/")) {
    return allowedEntries.has(stripExtension(firstSegment))
  }

  return allowedEntries.has(firstSegment)
}

function stripExtension(value) {
  return value.replace(/\.(mdx?|md)$/i, "")
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSearchIndex({ verbose: true }).catch((error) => {
    console.error("[search] unable to generate index")
    console.error(error)
    process.exit(1)
  })
}

