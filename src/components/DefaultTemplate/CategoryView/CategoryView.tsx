import "./base.css";

import { ICollectionPopulated } from "@/db/models/collections";
import { Column, H } from "@/lib/components";
import NColumn from "@/lib/components/structure/n-column";
import Link from "next/link";
import ProductCard from "../ProductCard";

export default function CategoryView({
  category,
}: {
  category: ICollectionPopulated;
}) {
  return (
    <Column className="CategoryView ">
      <Column className="CategoryHeader" align="center">
        <H className="Title">Coleccion de {category.title}</H>
        <H className="Subtitle">{category.description}</H>
      </Column>

      <NColumn
        className="ProductList"
        data={category.products}
        columnsGap="gap-[20px]"
        itemsGap="gap-[20px]"
        columns={2}
      >
        {(product) => (
          <Link className="ProductLink" href={`/products/${product._id}`}>
            <ProductCard product={product} key={product.title} />
          </Link>
        )}
      </NColumn>
    </Column>
  );
}
