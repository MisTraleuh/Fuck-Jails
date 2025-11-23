"use client"

import { useMemo, useState } from "react"
import { SearchDialog, SearchDialogContent, type SharedProps } from "next-docs-ui/components/dialog/search"
import searchIndex from "@/generated/search-index.json"

type SearchIndexHeading = {
  id: string
  title: string
  normalizedTitle: string
}

type SearchIndexPage = {
  id: string
  title: string
  normalizedTitle: string
  url: string
  headings: SearchIndexHeading[]
  category: string
  categorySlug: string
  normalizedCategory: string
}

type SearchIndexFile = {
  generatedAt: string
  pages: SearchIndexPage[]
}

const MAX_RESULTS = 30
const searchData = searchIndex as SearchIndexFile

const SEARCH_PAGES: SearchIndexPage[] = searchData.pages.map((page) => ({
  id: page.id,
  title: page.title,
  normalizedTitle: page.normalizedTitle,
  url: page.url,
  headings: page.headings ?? [],
  category: page.category ?? "Docs",
  categorySlug: page.categorySlug ?? "docs",
  normalizedCategory: page.normalizedCategory ?? normalize("Docs"),
}))

const DIACRITIC_REGEX = /[\u0300-\u036f]/g

export default function LocalSearchDialog(props: SharedProps) {
  const [query, setQuery] = useState("")
  const results = useMemo(() => computeResults(query), [query])

  return (
    <SearchDialog {...props}>
      <SearchDialogContent search={query} onSearchChange={setQuery} results={results} />
    </SearchDialog>
  )
}

function computeResults(query: string): SearchResult[] | "empty" {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) {
    return "empty"
  }

  const matches: SearchResult[] = []
  for (const page of SEARCH_PAGES) {
    const pageMatch = includes(page.normalizedTitle, normalizedQuery)
    const categoryMatch = includes(page.normalizedCategory, normalizedQuery)
    const headingMatches = filterHeadings(page.headings, normalizedQuery)

    if (!pageMatch && !categoryMatch && headingMatches.length === 0) {
      continue
    }

    const label = formatPageLabel(page)

    matches.push({
      id: page.id,
      type: "page",
      url: page.url,
      content: label,
    })

    for (const heading of headingMatches) {
      const headingLabel = `${label} › ${heading.title}`
      matches.push({
        id: `${page.id}#${heading.id}`,
        type: "heading",
        url: `${page.url}#${heading.id}`,
        content: headingLabel,
      })

      if (matches.length >= MAX_RESULTS) {
        return matches
      }
    }

    if (matches.length >= MAX_RESULTS) {
      break
    }
  }

  return matches.length > 0 ? matches.slice(0, MAX_RESULTS) : []
}

function filterHeadings(headings: SearchIndexHeading[], query: string) {
  return headings.filter((heading) => includes(heading.normalizedTitle, query))
}

function includes(target: string, query: string) {
  return target.includes(query)
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITIC_REGEX, "")
}

function formatPageLabel(page: SearchIndexPage) {
  const prefix = page.category && page.category !== "Docs" ? `${page.category} » ` : ""
  return `${prefix}${page.title}`
}

type SearchResult = {
  id: string
  url: string
  type: "page" | "heading"
  content: string
}

