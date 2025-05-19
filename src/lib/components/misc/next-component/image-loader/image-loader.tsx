"use client";
import { Center } from "@/lib/components/layout";
import "./style/base.css";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { StyledBox } from "@/lib/components/structure";

export default function ImageLoader({ style, ...imageProps }: ImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Center
      className={`image_loader ${imageProps.className || ""}`}
      style={style}
    >
      <Image
        {...imageProps}
        src={imageProps.src}
        alt={imageProps.alt}
        className={`image_loader_item`}
        onLoad={() => {
          setLoading(false);
        }}
      ></Image>
      {loading && <StyledBox className="image_loader_loading"></StyledBox>}
    </Center>
  );
}
