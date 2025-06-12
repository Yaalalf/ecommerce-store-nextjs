"use client";
import { Center, Column, StyledBox } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";

export default function CustomLoaderPage() {
  return (
    <Center className="w-screen h-screen">
      <Column>
        <StyledBox className="w-[200px] h-[200px]">
          <ImageLoader
            width={200}
            height={200}
            src="https://storage.googleapis.com/store-product-image/images/BA%C3%91O005-2.webp"
            alt="hola"
          ></ImageLoader>
        </StyledBox>
      </Column>
    </Center>
  );
}
