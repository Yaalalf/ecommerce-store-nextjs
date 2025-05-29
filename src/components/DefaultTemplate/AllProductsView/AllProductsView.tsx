"use client";
import "./style/base.css";
import { Column, Separator } from "@/lib/components";
import { H } from "@/lib/components/text";
import { ICollectionPopulated } from "@/db/models/collections";
import CollectionTabs from "../CollectionTabs/CollectionTabs";
import { IProductPopulated } from "@/db/models/product";
import { useState } from "react";
import { IPromotionalPopulated } from "@/db/models/promotionals";
import Carrousel from "@/lib/components/misc/carrousel";
import ProductList from "../ProductList/ProductList";

export default function AllProductsView({
  collections,
  products,
  promotionals,
  categoryIndex,
  isMobile,
}: {
  collections: ICollectionPopulated[];
  products: IProductPopulated[];
  promotionals: IPromotionalPopulated[];
  categoryIndex?: number;
  isMobile?: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(categoryIndex || 0);

  const allCollections: ICollectionPopulated[] = [
    {
      _id: "all",
      title: "All",
      media: { _id: "", name: "", url: "", size: 0 },
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
    <Column className="AllProducts w-full h-full" gap="gap-[8px]">
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
      <Column className="AllProductBody" gap="gap-[20px]">
        <H type="h1" className="AllProductsHeader">
          <span>Lo mas visto </span>
          <span className="SubSpan">
            <span className="SubSpanText"> en Olivia</span>{" "}
            <Separator className="HeaderSeparator" />
          </span>
        </H>
        <ProductList
          products={filteredProducts}
          selectedIndex={selectedIndex}
          isMobile={isMobile}
        ></ProductList>
      </Column>
    </Column>
  );
}
