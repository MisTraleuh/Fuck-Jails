import { Block, CodeBlock, parseRoot } from "codehike/blocks"
import { Code } from "../../components/code"

import CodeContent from "./demo.md"
console.log(CodeContent);
import localFont from "next/font/local"
import { AnnotationHandler } from "codehike/code"
import { CodeIcon } from "@/components/annotations/icons"

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

const myFont = localFont({
  src: "./placeholdifier.woff2",
  display: "swap",
})
const monoFont = localFont({
  src: "./placeholdifier-monospace.woff2",
  display: "swap",
})

const { content, page } = parseRoot(
  CodeContent,
  Block.extend({ page: CodeBlock, content: CodeBlock }),
)

console.log(page);
page.meta = "Pyjail  Cheatsheet";
(page as any).prefix = "py.py"

export function Demo() {
  return (
    <div className="grid grid-cols-2 md:[grid-template-columns:1fr_2fr_1fr] items-center gap-2 mt-12 max-w-3xl mx-auto w-96 md:w-auto px-3 md:px-2">
      <div className="col-span-1 flex items-center">
        <LeftSide />
      </div>
      <div className="col-span-2 md:col-span-1 md:order-none order-first">
        <Code
          className="min-w-0 m-0 flex-2"
          codeblock={page}
          extraHandlers={[rainbow, tooltip]}
        />
      </div>
      <div className="col-span-1 flex items-center">
        <Preview>
          <Scrolly />
        </Preview>
      </div>
    </div>
  )
}

function LeftSide() {
  return (
    <div
      className={
        "border border-editorGroup-border rounded overflow-y-auto no-scrollbar h-72 w-full"
      }
      style={{
        background: "#e6edff25",
        fontSize: "10px",
      }}
    >
      <div className="px-3 py-2 border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground text-sm text-tab-activeForeground flex items-center">
        <CodeIcon title="file.js" />
        <div className="flex gap-1 h-4 items-center ml-2 ">Js Cheatsheet</div>
      </div>
      <pre className={"flex-1 min-w-0 p-2"}>
        <div className="rounded -m-1 p-1 px-2 bg-teal-500/40">
          <span className="font-bold">
            // Without letters
            <br />
            [[]]+[]+!=[]
          </span>
        </div>
        <br />
        <div className="rounded -m-1 p-1 px-2 bg-sky-500/40">
          <span className="font-bold">
            // Equality
            <br />
            alert(1) == alert`1`
            <br />
            this == this.constructor
            <br />
            <br />
            global.car = 'DeLorean';
            <br />
            this.car === global.car
          </span>
        </div>
        <br />
        <div className="rounded -m-1 p-1 px-2 bg-violet-500/40">
          <span className="font-bold">
            {`// Prototype pollution`}
            <br />
            {`global.car = 'DeLorean';`}
            <br />
            {`this.car = 'Batmobile';`}
            <br />
            {`global.car === 'Batmobile';`}
          </span>
          <br />
          <br />
          <span className={""}>
            {`// Constructor injection`}
            <br />
            {`function Car() {`}
            <br />
            {`  this.car = 'Batmobile'`}
            <br />
            {`}`}
            <br />
            {`const car = new Car();`}
            <br />
            {`car.car === 'Batmobile';`}
          </span>
          <br />
        </div>
      </pre>
    </div>
  )
}

const bgs = [
  "bg-green-500/40",
  "bg-teal-500/40",
  "bg-sky-500/40",
  "bg-violet-500/40",
  "bg-fuchsia-500/40",
  "bg-pink-500/40",
]
function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "border border-editorGroup-border rounded overflow-hidden h-72 w-full"
      }
    >
      <div className="px-2 py-2 border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground text-sm text-tab-activeForeground flex">
        <CodeIcon title="file.php" />
        <div className="flex gap-1 h-4 items-center ml-2 ">Php Cheatsheet</div>
      </div>
      <div
        style={{
          background: "#e6edff25",
          backgroundImage: `url(/dark-grid.svg)`,
          backgroundPosition: "center",
          backgroundSize: "32px",
          fontSize: "8px",
          letterSpacing: "-0.8px",
        }}
        className={"flex-1 min-w-0 p-2 overflow-hidden "}
      >
        {children}
      </div>
    </div>
  )
}

function Scrolly() {
  return (
    <div className="flex flex-col gap-2 h-full">
        <div className="bg-sky-500/40 rounded p-2 flex-1 h-full">
          <pre className={"bg-slate-100 dark:bg-slate-950 opacity-60 rounded m-0 mt-2 py-1"}>
            {code}
          </pre>
        </div>
        <div className="bg-green-500/40 rounded p-2 flex-1 h-full">
          <pre className={"bg-slate-100 dark:bg-slate-950 opacity-60 rounded m-0 mt-2 py-1"}>
            {code2}
          </pre>
        </div>
        <div className="bg-yellow-500/40 rounded p-2 flex-1 h-full">
          <pre className={"bg-slate-100 dark:bg-slate-950 opacity-60 rounded m-0 mt-2 py-1"}>
            {code3}
          </pre>
        </div>
    </div>
  )
}

const code = (
  <>
    <div className="border-l-2 border-transparent">
      <div className="px-1">
        <div>
          <span style={{ color: "var(--ch-2)" }}>// Is this a string ?</span>
          <br/>
          $obfs = "1"; <span style={{ color: "var(--ch-7)" }}>//string "1"</span>
          <br/>
          $obfs++; <span style={{ color: "var(--ch-7)" }}>//int 2</span>
          <br/>
          </div>
      </div>
    </div>
  </>
)


const code2 = (
  <>
    <div className="border-l-2 border-transparent">
      <div className="px-1">
        <div>
          <span style={{ color: "var(--ch-2)" }}>RCE via preg_replace()</span>
          <br/>
          preg_replace(pattern,replace,base);
          <br/>
          preg_replace("/a/e","phpinfo()","x")
          <br/>
          </div>
      </div>
    </div>
  </>
)


const code3 = (
  <>
    <div className="border-l-2 border-transparent">
      <div className="px-1">
        <div>
          <span style={{ color: "var(--ch-2)" }}>// Can we read /etc/passwd ?</span>
          <br/>
          file_get_contents("/etc/passwd");
          <br/>
          readfile("/etc/passwd");
          <br/>
          fopen("/etc/passwd","r");
          <br/>
          include("/etc/passwd");
          <br/>
          require_once("/etc/passwd");
          </div>
      </div>
    </div>
  </>
)

const rainbow: AnnotationHandler = {
  name: "rainbow",
  Block: ({ annotation, ...props }) => {
    const gradient = annotation?.query
      ? "bg-gradient-to-tr"
      : "bg-gradient-to-br"

    return (
      <div
        className={`${gradient} from-teal-500/20 via-sky-500/20 to-violet-500/20 -my-0.5 py-0.5`}
      >
        {props.children}
      </div>
    )
  },
}

const block: AnnotationHandler = {
  name: "block",
  Block: ({ annotation, ...props }) => {
    const n = Number(annotation?.query || "2") % bgs.length
    const bg = bgs[n]
    return (
      <div className={`${bg} rounded mx-1 my-0.5 overflow-hidden`}>
        {props.children}
      </div>
    )
  },
}

const tooltip: AnnotationHandler = {
  name: "tt",
  Inline: ({ children, annotation }) => {
    const { query, data } = annotation
    return (
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger className="underline decoration-dashed underline-offset-4">
            {children}
          </TooltipTrigger>
          <TooltipContent align="start" side="bottom" className="p-0">
            <Code
              className="m-0 p-0 border-none"
              style={{ fontSize: "13px", lineHeight: "1.2" }}
              codeblock={content}
              extraHandlers={[block]}
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
}
