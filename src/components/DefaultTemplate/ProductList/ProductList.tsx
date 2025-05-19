"use client";
import { IProductPopulated } from "@/db/models/product";
import NColumn from "@/lib/components/structure/n-column";
import ProductCard from "../ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductList({
  products,
  selectedIndex,
}: {
  products: IProductPopulated[];
  selectedIndex: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(width >= 900px)");
    setIsMobile(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return (
    <NColumn
      className="ProductList"
      data={products}
      columnsGap="20"
      itemsGap="20"
      columns={isMobile ? 3 : 2}
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
