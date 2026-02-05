interface TodoItem {
  label: string
  done: boolean
}

interface TodoSection {
  title: string
  items: TodoItem[]
}

export interface TodoData {
  payload: {
    sections: TodoSection[]
  }
  site: {
    sections: TodoSection[]
  }
}

export function TodoSections({ sections }: { sections: TodoSection[] }) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-3xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 dark:text-white/70">
            {section.title}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-white/70">
            {section.items.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                {item.done ? (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-emerald-300/40 bg-emerald-500/20">
                    <span className="h-2 w-2 rounded-sm bg-emerald-400" />
                  </span>
                ) : (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-black/20 dark:border-white/20" />
                )}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function TodoList({ sections }: { sections: TodoSection[] }) {
  const items = sections.flatMap((section) => section.items)

  return (
    <div className="mt-3 rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
      <ul className="grid gap-2 text-sm text-slate-600 dark:text-white/70 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            {item.done ? (
              <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-emerald-300/40 bg-emerald-500/20">
                <span className="h-2 w-2 rounded-sm bg-emerald-400" />
              </span>
            ) : (
              <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-black/20 dark:border-white/20" />
            )}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
