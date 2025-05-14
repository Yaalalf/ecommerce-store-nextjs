"use client";
import { Box, Center } from "@/lib/components/layout";
import "./style/base.css";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function ImageLoader({ ...imageProps }: ImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Center className="image_loader">
      <Image
        {...imageProps}
        src={imageProps.src}
        alt={imageProps.alt}
        className={`image_loader_item ${imageProps.className}`}
        onLoad={() => {
          setLoading(false);
        }}
      ></Image>
      {loading && <Box className="image_loader_loading"></Box>}
    </Center>
  );
}
