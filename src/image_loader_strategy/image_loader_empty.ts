import { ImageLoaderProps } from "next/image";

export default function emptyImageLoader({ src }: ImageLoaderProps) {
  console.log(src);
  const url = new URL(src);
  return encodeURIComponent(url.href);
}
