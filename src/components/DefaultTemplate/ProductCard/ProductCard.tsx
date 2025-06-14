import "./style/base.css";
import { Card, Chip, Column } from "@/lib/components";
import { IProductCardProps } from "./types";
import { H } from "@/lib/components/text";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";

export default function ProductCard({ product }: IProductCardProps) {
  const { medias, title, price } = product;
  return (
    <Card className="ProductCard" variant="flatted" dense>
      <Column className="w-full" gap="gap-[12px]">
        <ImageLoader
          className="ProductImage"
          src={medias[0].url}
          alt="Un Producto de la tienda"
          width={1080}
          height={1080}
          priority
        />
        <Column className="ProductInfo" gap="gap-[4px]">
          <Chip tag={H} variant="ghost" className="ProductPrice">
            {price} CUP
          </Chip>
          <H className="ProductTitle" type="h3">
            {title}
          </H>
        </Column>
      </Column>
    </Card>
  );
}
