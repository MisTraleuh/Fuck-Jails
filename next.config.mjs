import createNextDocsMDX from "next-docs-mdx/config"
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
// import fs from "node:fs"
// import { jsx, toJs } from "estree-util-to-js"
// function recmaPlugin() {
//   return (tree) => {
//     const result = toJs(tree, { handlers: jsx })
//     // console.log("```js")
//     // console.log(result.value)
//     // console.log("```")
//     fs.writeFileSync("recma.js", result.value)
//   }
// }

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: {
    code: "Code",
    inlineCode: "InlineCode",
  },
  // ignoreCode: (codeblock) => codeblock.lang === "mermaid",
  // syntaxHighlighting: {
  //   theme: "github-dark",
  // },
}

const withMDX = createNextDocsMDX({
  mdxOptions: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    // jsx: true,
  },
})

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Configuration pour GitHub Pages
  // Si votre repo n'est pas username.github.io, définissez BASE_PATH dans le workflow
  // Exemple: BASE_PATH=/nom-de-votre-repo
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.BASE_PATH || '',
  assetPrefix: process.env.BASE_PATH || '',
  images: {
    unoptimized: true, // Requis pour l'export statique
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // fix https://github.com/microsoft/TypeScript-Website/pull/3022
    config.module.exprContextCritical = false
    return config
  },
}

export default withMDX(config)
