import "./style/base.css";
import { Card, Column } from "@/lib/components";
import { IProductCardProps } from "./types";
import { H } from "@/lib/components/text";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";

export default function ProductCard({ product }: IProductCardProps) {
  const { medias, title, price } = product;
  return (
    <Card className="ProductCard" flatted dense>
      <Column gap="12">
        <ImageLoader
          className="ProductImage"
          src={medias[0].url}
          alt="Un Producto de la tienda"
          width={1080}
          height={1080}
          priority
        />
        <Column className="ProductInfo" gap="4">
          <H className="ProductPrice" type="h2">
            ${price}
          </H>
          <H className="ProductTitle" type="h3">
            {title}
          </H>
        </Column>
      </Column>
    </Card>
  );
}
