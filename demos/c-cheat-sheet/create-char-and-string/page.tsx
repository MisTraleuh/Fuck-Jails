import {
  RawCode,
  Pre,
  highlight,
  AnnotationHandler,
  InnerLine,
  BlockAnnotation,
  InlineAnnotation,
} from "codehike/code"
import Content from "./content.md"

export default function Page() {
  return <Content components={{ Code }} />
}

const diff: AnnotationHandler = {
  name: "diff",
  onlyIfAnnotated: true,
  transform: (annotation: BlockAnnotation) => {
    const color = annotation.query == "-" ? "#f85149" : "#3fb950"
    return [
      annotation,
      {
        ...annotation,
        name: "mark",
        query: color,
      },
    ]
  },
  Line: ({ annotation, ...props }) => {
    return (
      <>
        <div className="min-w-[1ch] box-content opacity-70 pl-2 select-none">
          {annotation?.query}
        </div>
        <InnerLine merge={props} />
      </>
    )
  },
}

const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, ...props }) => {
    const color = annotation?.query || "rgb(14 165 233)"
    return (
      <div
        style={{
          borderLeft: "solid 2px transparent",
          borderLeftColor: annotation && color,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.2)`,
        }}
        className="flex"
      >
        <InnerLine merge={props} className="px-2 flex-1" />
      </div>
    )
  },
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      className="m-0 px-0 bg-zinc-950/90"
      code={highlighted}
      handlers={[mark, diff, callout]}
    />
  )
}


const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    }
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data
    return (
      <>
        {children}
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="w-fit border bg-zinc-800 border-current rounded px-2 relative -ml-[1ch] mt-1 whitespace-break-spaces"
        >
          <div
            style={{ left: `${column}ch` }}
            className="absolute border-l border-t border-current w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-zinc-800"
          />
          {annotation.query}
        </div>
      </>
    )
  },
}
