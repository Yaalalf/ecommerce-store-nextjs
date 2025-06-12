import { ImageLoaderProps } from "next/image";

export default function customImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const url = new URL(src);
  return `/api/image_loader_strategy?imageUrl=${encodeURIComponent(
    url.href
  )}&w=${width}&q=${quality || 75}`;
}
