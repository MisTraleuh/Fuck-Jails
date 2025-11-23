# Fuck-Jails 🔓

<p align="center">
  <img src="public/logo.png" alt="Fuck Jails logo" width="48" height="48" />
</p>

**Fuck-Jails** is my personal, unapologetic playground for jailbreak tricks. I’m pouring every escape tactic I know into one place so that anyone can break out of the nastiest prompts, shells, and sandboxes. I’m extremely proud of how far this has come, and I’m even more excited about where it’s heading. 🚀

> Live right now at **https://mistraleuh.github.io/Fuck-Jails/**.

---

## 🎯 Focus
- Built for offensive tinkering and research — not bloated documentation.
- Clean enough to skim in seconds, actionable enough to drop into a payload immediately.
- Designed around seven core languages: **Python, C, C++, JavaScript, Ruby, PHP, Bash**.
- ✅ **Currently online:** C Cheatsheet, Python Cheatsheet.  
  ⏳ **Coming soon:** JS, Ruby, PHP, Bash, C++ (already drafted, polishing the payloads!).

---

## 🧱 What’s inside
| Section | Status | Notes |
|:---:|:---:|:---:|
| `content/docs/c-cheat-sheet` | ✅ Live | Low-level tricks, no alphabet mode, raw payloads. |
| `content/docs/python-cheat-sheet` | ✅ Live | Generators, globals, walrus hacks, @exec bypasses. |
| `content/docs/js-cheat-sheet` | 🛠 WIP | Prototype pollution & constructor injection coming. |
| `content/docs/ruby/php/bash/cpp` | 🛠 WIP | Each will ship with minimal theory + ready-to-paste exploits. |

No walls of explanations — just enough context to understand *why* the payload works and *when* it breaks.

---

## 🌐 Hosting & Stack
- Hosted with ❤️ on **GitHub Pages**: [mistraleuh.github.io/Fuck-Jails](https://mistraleuh.github.io/Fuck-Jails/).
- Next.js 14 (App Router) + React 18 + TypeScript.
- Tailwind + Next Docs UI + CodeHike for the smooth reading experience.
- Content lives in MDX so cheatsheets and blog entries stay easy to diff and edit.

```sh
.
├── app/          # Routes, demos, OG images, API helpers
├── content/      # MDX cheatsheets & blog posts
├── demos/        # Interactive CodeHike walkthroughs
├── ui/           # Custom nav + toggles
└── public/       # Assets (like that shiny logo 👆)
```

---

## ⚡ Quickstart
```bash
git clone https://github.com/MisTraleuh/Fuck-Jails
cd Fuck-Jails
npm install
npm run dev   # http://localhost:3000

# Production build
npm run build && npm start
```
There isn’t a 50-page technical manual (by design), but the structure is tidy and predictable so you can dive right into the MDX.

---

## 🗺 Roadmap vibes
- [ ] Publish the remaining language cheatsheets with curated payload bundles.
- [ ] Add animated payload timelines powered by CodeHike demos.
- [ ] Wire a submission flow so friends can drop their own payloads safely.

---

## ❤️ Thanks & Contribution
This project exists because I obsess over jailbreak creativity. If you have a trick no one else is talking about, I’d love to add it (with credit). PRs and issues are open — just keep them focused on real-world techniques.

> Fuck-Jails aims to be *the* payload vault for jailbreak fans. I’m thrilled to build it, and I can’t wait to see the rest of the languages light up. ✊💥
