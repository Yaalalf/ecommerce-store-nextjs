"use client";
import "./style/base.css";
import { Column } from "@/lib/components";
import NColumn from "@/lib/components/structure/n-column";
import { H } from "@/lib/components/text";
import ProductCard from "../ProductCard";
import Link from "next/link";
import { ICollectionPopulated } from "@/db/models/collections";
import CollectionTabs from "../CategoryTabs/CollectionTabs";
import { IProductPopulated } from "@/db/models/product";
import { useState } from "react";

export default function AllProductsView({
  collections,
  products,
}: {
  collections: ICollectionPopulated[];
  products: IProductPopulated[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    <Column className="AllProducts full-width full-height" gap="20">
      <CollectionTabs
        selectedIndex={selectedIndex}
        collections={allCollections}
        onTab={(collection, index) => {
          setSelectedIndex(index);
        }}
      ></CollectionTabs>
      <H type="h1" className="AllProductsHeader">
        Explora tu nuevo estilo
      </H>
      <NColumn
        className="ProductList"
        data={filteredProducts}
        columnsGap="12"
        itemsGap="40"
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
