"use client";
import { IProductPopulated } from "@/db/models/product";
import NColumn from "@/lib/components/structure/n-column";
import ProductCard from "../ProductCard";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

export default function ProductList({
  products,
  selectedIndex,
}: {
  products: IProductPopulated[];
  selectedIndex: number;
}) {
  const [isMatch, setIsMatch] = useState(false);
  useLayoutEffect(() => {
    const mql = window.matchMedia("(width >= 900px)");
    setIsMatch(mql.matches);
  }, []);
  return (
    <NColumn
      className="ProductList"
      data={products}
      columnsGap="20"
      itemsGap="20"
      columns={isMatch ? 6 : 2}
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
  );
}
