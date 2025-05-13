import "./style/base.css";
import { Column } from "@/lib/components";
import NColumn from "@/lib/components/structure/n-column";
import { H } from "@/lib/components/text";
import ProductCard from "../ProductCard";
import ProductServices from "@/db/services/productServices";
import Link from "next/link";

export default async function AllProductsView() {
  const { getAllProducts } = new ProductServices();
  const products = await getAllProducts();
  return (
    <Column className="AllProducts full-width full-height" gap="20">
      <H type="h1" className="AllProductsHeader">
        Explora tu nuevo estilo
      </H>
      <NColumn
        className="ProductList"
        data={products}
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
