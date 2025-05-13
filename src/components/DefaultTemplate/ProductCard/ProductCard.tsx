import "./style/base.css";
import { Card, Column } from "@/lib/components";
import { IProductCardProps } from "./types";
import Image from "next/image";
import { H } from "@/lib/components/text";

export default function ProductCard({ product }: IProductCardProps) {
  const { medias, title, price } = product;
  return (
    <Card className="ProductCard" flatted dense>
      <Column gap="12">
        <Image
          className="ProductImage"
          src={medias[0].url}
          alt="Un Producto de la tienda"
          fill
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
