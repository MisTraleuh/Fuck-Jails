import Link from "next/link"
import { cn } from "@/lib/utils"
import { Demo } from "@/app/landing/demo"

type HomeLocale = "en" | "fr"

const homeCopy: Record<HomeLocale, { docsLabel: string }> = {
  en: { docsLabel: "Docs" },
  fr: { docsLabel: "Docs" },
}

export function HomePage({ locale }: { locale: HomeLocale }) {
  const copy = homeCopy[locale]
  const docsHref = locale === "fr" ? "/fr/docs" : "/docs"

  return (
    <main className="min-h-screen max-w-3xl mx-auto">
      <h1 className="text-slate-900/80 text-4xl md:text-5xl lg:text-5xl tracking-tight text-center dark:text-white/80 pt-12 max-w-3xl mx-auto text-balance font-extrabold !leading-tight">
        <div className="sm:text-5xl md:text-[3.5rem]">
          Fuck{" "}
          <strong className=" dark:text-fuchsia-400 text-fuchsia-600/80">
            Jails
          </strong>{" "}
        </div>
      </h1>
      <Demo locale={locale} />

      <div className="flex w-full justify-center gap-4 my-12">
        <ButtonLink href={docsHref} className="w-32">
          {copy.docsLabel}
        </ButtonLink>
      </div>
    </main>
  )
}

function Bar({
  className,
  children,
  value,
}: {
  className?: string
  children: React.ReactNode
  value: number
}) {
  return (
    <div
      className={cn(
        "relative w-full px-4 py-0.5 text-base text-white bg-gradient-to-r from-violet-600  dark:from-violet-800 to-pink-500 dark:to-pink-500 rounded",
        className,
      )}
    >
      {children}
      <div
        className="absolute right-0 bg-zinc-50 dark:bg-zinc-900 opacity-80 inset-y-0"
        style={{ width: `${100 - value}%` }}
      ></div>
    </div>
  )
}

function ButtonLink({
  href,
  children,
  className,
}: {
  className?: string
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={
        "border border-primary/50 rounded p-2 text-center hover:border-primary transition-colors " +
        className
      }
    >
      {children}
    </Link>
  )
}
