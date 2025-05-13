import "./style/base.css";
import { Column } from "@/lib/components";
import NColumn from "@/lib/components/structure/n-column";
import { H } from "@/lib/components/text";
import ProductCard from "../ProductCard";
import ProductServices from "@/db/services/productServices";

export default async function AllProductsView() {
  const { getAllProducts } = new ProductServices();
  const products = await getAllProducts();
  return (
    <Column className="AllProducts full-width full-height" gap="20">
      <H type="h1" className="AllProductsHeader">
        Explora tu nuevo estilo
      </H>
      <NColumn className="ProductList" data={products}>
        {(product) => <ProductCard product={product} key={product.title} />}
      </NColumn>
    </Column>
  );
}
