"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { Contributor } from "@/components/contributors";

const languageColors: Record<string, string> = {
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  PHP: "#777BB4",
  Ruby: "#CC342D",
  "C++": "#00599C",
  C: "#A8B9CC",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Java: "#ED8B00",
  Swift: "#FA7343",
  Kotlin: "#7F52FF",
  Dart: "#0175C2",
  "C#": "#239120",
  Bash: "#4EAA25",
};

const getGradientFromLanguages = (languages: string[]) => {
  if (languages.length === 0) return "from-purple-500/20 to-pink-500/20";

  const colorMap: Record<string, string> = {
    Python: "from-blue-500/30 to-cyan-500/30",
    JavaScript: "from-yellow-500/30 to-orange-500/30",
    TypeScript: "from-blue-600/30 to-blue-400/30",
    PHP: "from-purple-500/30 to-indigo-500/30",
    Ruby: "from-red-500/30 to-pink-500/30",
    "C++": "from-blue-700/30 to-blue-500/30",
    C: "from-gray-500/30 to-gray-400/30",
    Rust: "from-orange-600/30 to-red-500/30",
    Go: "from-cyan-500/30 to-blue-500/30",
    Java: "from-orange-600/30 to-red-500/30",
    Swift: "from-orange-500/30 to-red-500/30",
    Kotlin: "from-purple-600/30 to-violet-500/30",
    Dart: "from-blue-500/30 to-cyan-500/30",
    "C#": "from-green-600/30 to-emerald-500/30",
    Bash: "from-green-500/30 to-emerald-500/30",
  };

  return colorMap[languages[0]] || "from-purple-500/20 to-pink-500/20";
};

const normalizeColor = (language: string) =>
  languageColors[language] ?? "#a1a1aa";

export function ContributorsClient({
  contributors,
}: {
  contributors: Contributor[];
}) {
  const [activeLanguage, setActiveLanguage] = useState<string>("Tous");

  const languageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const contributor of contributors) {
      for (const language of contributor.languages) {
        counts[language] = (counts[language] ?? 0) + 1;
      }
    }
    return counts;
  }, [contributors]);

  const languages = useMemo(
    () =>
      Object.keys(languageCounts).sort((a, b) => a.localeCompare(b, "fr")),
    [languageCounts],
  );

  const filteredContributors = useMemo(() => {
    if (activeLanguage === "Tous") {
      return contributors;
    }
    return contributors.filter((contributor) =>
      contributor.languages.includes(activeLanguage),
    );
  }, [activeLanguage, contributors]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 rounded-3xl blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6">
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={activeLanguage === "Tous"}
              onClick={() => setActiveLanguage("Tous")}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-all duration-300",
                activeLanguage === "Tous"
                  ? "border-white/30 bg-white/15 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              Tous
              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] text-white/70">
                {contributors.length}
              </span>
            </button>

            {languages.map((language) => {
              const color = normalizeColor(language);
              const isActive = activeLanguage === language;
              return (
                <button
                  key={language}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveLanguage(language)}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-all duration-300",
                    isActive
                      ? "border-white/30 bg-white/15 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:bg-white/10 hover:text-white",
                  )}
                  style={
                    isActive
                      ? { boxShadow: `0 0 20px ${color}45` }
                      : undefined
                  }
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {language}
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px]"
                    style={{
                      backgroundColor: `${color}25`,
                      color,
                      border: `1px solid ${color}40`,
                    }}
                  >
                    {languageCounts[language]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
            {filteredContributors.length} / {contributors.length} affichés
          </div>
        </section>

        {filteredContributors.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/60">
            Aucun contributeur pour ce langage pour le moment.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredContributors.map((contributor, index) => (
              <a
                key={contributor.name}
                href={contributor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-sm p-6 hover:scale-[1.05] hover:rotate-1 transition-all duration-700 shadow-2xl hover:shadow-blue-500/25 hover:border-white/20 animate-fade-in-up cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-60 transition-opacity duration-700",
                    getGradientFromLanguages(contributor.languages),
                  )}
                />

                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-3 left-3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse group-hover:animate-ping" />
                  <div className="absolute top-6 right-4 w-0.5 h-0.5 bg-purple-400/50 rounded-full animate-pulse delay-200 group-hover:animate-ping" />
                  <div className="absolute top-12 left-6 w-1 h-1 bg-pink-400/40 rounded-full animate-pulse delay-400 group-hover:animate-ping" />
                  <div className="absolute top-16 right-8 w-0.5 h-0.5 bg-cyan-400/50 rounded-full animate-pulse delay-600 group-hover:animate-ping" />
                  <div className="absolute top-20 left-4 w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse delay-800 group-hover:animate-ping" />
                  <div className="absolute top-8 right-12 w-0.5 h-0.5 bg-green-400/50 rounded-full animate-pulse delay-1000 group-hover:animate-ping" />
                  <div className="absolute top-14 left-12 w-1 h-1 bg-orange-400/40 rounded-full animate-pulse delay-1200 group-hover:animate-ping" />
                  <div className="absolute top-18 right-16 w-0.5 h-0.5 bg-red-400/50 rounded-full animate-pulse delay-1400 group-hover:animate-ping" />
                </div>

                <div className="relative z-30 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 via-purple-500/20 to-pink-500/20 blur-md scale-0 group-hover:scale-120 transition-transform duration-1000" />
                    <div className="relative">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-20 h-20 rounded-full border-3 border-white/20 shadow-xl group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500 group-hover:shadow-blue-500/40"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500">
                    {contributor.name}
                  </h3>

                  <p className="text-xs text-blue-300/80 mb-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                    {contributor.role}
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5">
                    {contributor.languages.map((lang, langIndex) => (
                      <span
                        key={lang}
                        style={{
                          backgroundColor: `${normalizeColor(lang)}25`,
                          color: normalizeColor(lang),
                          border: `1px solid ${normalizeColor(lang)}40`,
                          boxShadow: `0 0 15px ${normalizeColor(lang)}30`,
                          animationDelay: `${langIndex * 100}ms`,
                        }}
                        className="text-xs px-2 py-1 rounded-full font-medium backdrop-blur-md hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default relative z-20"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-transparent via-white/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
