import type { ImgHTMLAttributes } from "react"

type PlainImgProps = ImgHTMLAttributes<HTMLImageElement>

export function PlainImg(props: PlainImgProps) {
  return <img {...props} />
}
