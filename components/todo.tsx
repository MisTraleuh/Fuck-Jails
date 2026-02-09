type TodoStatus = "done" | "in-progress" | "needs-definition" | "todo"

interface TodoItem {
  label: string
  status?: TodoStatus
  url?: string
  done?: boolean
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

function resolveStatus(item: TodoItem): TodoStatus {
  if (item.status) return item.status
  if (item.done) return "done"
  return "todo"
}

function StatusDot({ status }: { status: TodoStatus }) {
  if (status === "done") {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-emerald-300/40 bg-emerald-500/20">
        <span className="h-2 w-2 rounded-sm bg-emerald-400" />
      </span>
    )
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-sky-300/40 bg-sky-500/20">
        <span className="h-2 w-2 rounded-sm bg-sky-400" />
      </span>
    )
  }
  if (status === "needs-definition") {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-amber-300/40 bg-amber-500/20">
        <span className="h-2 w-2 rounded-sm bg-amber-400" />
      </span>
    )
  }
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded border border-indigo-300/40 bg-indigo-500/20">
      <span className="h-2 w-2 rounded-sm bg-indigo-400" />
    </span>
  )
}

export function TodoSections({ sections }: { sections: TodoSection[] }) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-3xl border border-black/10 bg-black/5 px-6 pb-2 pt-2 dark:border-white/10 dark:bg-white/5"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 dark:text-white/70">
            {section.title}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-white/70">
            {section.items.map((item) => {
              const status = resolveStatus(item)
              return (
                <li
                  key={item.label}
                  className="grid grid-cols-[auto_1fr] items-center gap-2"
                >
                  <StatusDot status={status} />
                  {item.url ? (
                    <span className="flex min-w-0 flex-wrap items-center gap-2 font-medium leading-snug text-slate-800 dark:text-white/80">
                      <span className="min-w-0 break-words">
                        {item.label}
                      </span>
                      <a
                        className="inline-flex items-center gap-1 rounded-full border border-slate-300/40 bg-slate-200/50 px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:text-slate-800 dark:border-white/15 dark:bg-white/10 dark:text-white/60 dark:hover:text-white/80"
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open issue for ${item.label}`}
                        title="Open issue"
                      >
                        issue
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className="h-3 w-3"
                        >
                          <path
                            fill="currentColor"
                            d="M11 4a1 1 0 0 0 0 2h2.59L8.3 11.3a1 1 0 1 0 1.4 1.4L15 7.42V10a1 1 0 1 0 2 0V4h-6z"
                          />
                          <path
                            fill="currentColor"
                            d="M5 6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V8h3a1 1 0 1 0 0-2H5z"
                          />
                        </svg>
                      </a>
                    </span>
                  ) : (
                    <span className="min-w-0 break-words">{item.label}</span>
                  )}
                </li>
              )
            })}
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
        {items.map((item) => {
          const status = resolveStatus(item)
          return (
            <li key={item.label} className="flex items-center gap-3">
              <StatusDot status={status} />
              {item.url ? (
                <a
                  className="font-medium text-slate-800 transition hover:text-slate-950 dark:text-white/80 dark:hover:text-white"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
