"use client";
import "./style/base.css";
import { Column, Row, Separator } from "@/lib/components";
import NColumn from "@/lib/components/structure/n-column";
import { H } from "@/lib/components/text";
import ProductCard from "../ProductCard";
import Link from "next/link";
import { ICollectionPopulated } from "@/db/models/collections";
import CollectionTabs from "../CollectionTabs/CollectionTabs";
import { IProductPopulated } from "@/db/models/product";
import { useState } from "react";
import { IPromotionalPopulated } from "@/db/models/promotionals";
import Carrousel from "@/lib/components/misc/carrousel";

export default function AllProductsView({
  collections,
  products,
  promotionals,
  categoryIndex,
}: {
  collections: ICollectionPopulated[];
  products: IProductPopulated[];
  promotionals: IPromotionalPopulated[];
  categoryIndex?: number;
}) {
  const [selectedIndex, setSelectedIndex] = useState(categoryIndex || 0);

  const allCollections: ICollectionPopulated[] = [
    {
      _id: "all",
      title: "All",
      media: { name: "", url: "" },
      description: "",
      products: [],
    },
    ...collections,
  ];

  const filteredProducts = products.filter((item) => {
    if (selectedIndex === 0) {
      return true;
    } else {
      return (
        allCollections[selectedIndex].products.findIndex(
          (subItem) => subItem._id === item._id
        ) !== -1
      );
    }
  });

  return (
    <Column className="AllProducts full-width full-height" gap="8">
      <Carrousel
        className="PromotionalBanner"
        imgUrls={promotionals[0].medias}
        autoplay
      ></Carrousel>
      <CollectionTabs
        selectedIndex={selectedIndex}
        collections={allCollections}
        onTab={(collection, index) => {
          setSelectedIndex(index);
        }}
      ></CollectionTabs>
      <Column className="AllProductBody" gap="20">
        <H type="h1" className="AllProductsHeader">
          <span>Explora nuestros </span>
          <Row className="SubSpan" gap="8">
            productos <Separator />
          </Row>
        </H>
        <NColumn
          className="ProductList"
          data={filteredProducts}
          columnsGap="20"
          itemsGap="40"
        >
          {(product) => (
            <Link
              className="ProductLink"
              href={`/products/${product._id}?categoryIndex=${selectedIndex}`}
            >
              <ProductCard product={product} key={product.title} />
            </Link>
          )}
        </NColumn>
      </Column>
    </Column>
  );
}
