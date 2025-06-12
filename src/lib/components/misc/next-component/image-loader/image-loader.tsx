"use client";
import { Center } from "@/lib/components/layout";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { StyledBox } from "@/lib/components/structure";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import customImageLoader from "@/image_loader_strategy/image_loader_strategy";

export default function ImageLoader({
  isCustomLoader = true,
  style,
  ...imageProps
}: ImageProps & { isCustomLoader?: boolean }) {
  const [loading, setLoading] = useState(true);

  const imageLoaderClassName = clsx(
    "image_loader",
    twMerge("w-[100%] relative overflow-hidden", imageProps.className)
  );

  const imageLoaderItem = clsx(
    "image_loader_item",
    "w-[100%] h-[100%] object-cover"
  );

  const imageLoaderLoading = clsx(
    "image_loader_loading",
    "absolute top-0 left-0 w-full h-full bg-[#eee] bg-linear-[90deg,#eee,#f5f5f5,#eee] bg-size-[200px_100%] bg-no-repeat inline-block leading-none rounded-[4px] animate-[skeleton-animation_1.5s_ease-in-out_infinite]"
  );

  return (
    <Center className={imageLoaderClassName} style={style}>
      <Image
        {...imageProps}
        src={imageProps.src}
        alt={imageProps.alt}
        width={imageProps.width}
        height={imageProps.height}
        className={imageLoaderItem}
        loader={
          isCustomLoader ? imageProps.loader || customImageLoader : undefined
        }
        onLoad={() => {
          setLoading(false);
        }}
      ></Image>
      {loading && <StyledBox className={imageLoaderLoading}></StyledBox>}
    </Center>
  );
}
