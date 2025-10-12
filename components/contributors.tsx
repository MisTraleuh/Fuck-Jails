import fs from "fs";
import path from "path";

interface Contributor {
  name: string;
  url: string;
  avatar: string;
  role: string;
  languages: string[];
}

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
  };
  
  return colorMap[languages[0]] || "from-purple-500/20 to-pink-500/20";
};

export async function Contributors() {
  const filePath = path.join(process.cwd(), "contributors.json");
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContent) as { contributors: Contributor[] };

  return (
    <div className="relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 rounded-3xl blur-3xl" />
      
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 relative z-10">
        {data.contributors.map((contributor, index) => (
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
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getGradientFromLanguages(contributor.languages)} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            {/* Floating particles effect */}
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

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Avatar with enhanced effects */}
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

              {/* Name with glow effect */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500">
                {contributor.name}
              </h3>
              
              {/* Role with enhanced styling */}
              <p className="text-xs text-blue-300/80 mb-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                {contributor.role}
              </p>

              {/* Languages with improved design */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {contributor.languages.map((lang, langIndex) => (
                  <span
                    key={lang}
                    style={{
                      backgroundColor: `${languageColors[lang] ?? "#555"}15`,
                      color: languageColors[lang] ?? "#ddd",
                      border: `1px solid ${languageColors[lang] ?? "#666"}30`,
                      boxShadow: `0 0 10px ${languageColors[lang] ?? "#666"}20`,
                      animationDelay: `${langIndex * 100}ms`,
                    }}
                    className="text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-transparent via-white/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        ))}
      </div>

    </div>
  );
}
