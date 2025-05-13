import "./style/base.css";
import { Card } from "@/lib/components";
import { IProductCardProps } from "./types";
import Image from "next/image";
import { H } from "@/lib/components/text";

export default function ProductCard({ product }: IProductCardProps) {
  const { medias, title, price } = product;
  return (
    <Card className="ProductCard" flatted dense>
      <Image
        className="ProductImage"
        src={medias[0].url}
        alt="Un Producto de la tienda"
        fill
        priority
      />
      <H className="Header2" type="h2">
        {price}
      </H>
      <H className="Header3" type="h3">
        {title}
      </H>
    </Card>
  );
}
