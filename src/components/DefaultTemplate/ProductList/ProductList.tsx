"use client";
import { IProductPopulated } from "@/db/models/product";
import NColumn from "@/lib/components/structure/n-column";
import ProductCard from "../ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductList({
  products,
  isMobile,
}: {
  products: IProductPopulated[];
  isMobile?: boolean;
}) {
  const [isMobileFirst, setIsMobile] = useState(isMobile);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(width >= 900px)");
    setIsMobile(!mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return (
    <NColumn
      className="ProductList"
      data={products}
      columnsGap="gap-[20px]"
      itemsGap="gap-[20px]"
      columns={isMobileFirst ? 2 : 5}
    >
      {(product) => (
        <Link className="ProductLink" href={`/products/${product._id}`}>
          <ProductCard product={product} key={product.title} />
        </Link>
      )}
    </NColumn>
  );
}
