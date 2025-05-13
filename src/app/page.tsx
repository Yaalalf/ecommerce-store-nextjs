import ProductCard from "@/components/DefaultTemplate/ProductCard";
import ProductServices from "@/db/services/productServices";
import { Column } from "@/lib/components";
import NColumn from "@/lib/components/structure/n-column";

export default async function Home() {
  const { getAllProducts } = new ProductServices();
  const products = await getAllProducts();
  return (
    <div className="full-width full-height">
      <Column className="full-width full-height">
        Lista de productos
        <NColumn className="MyList" data={products}>
          {(product) => <ProductCard product={product} key={product.title} />}
        </NColumn>
      </Column>
    </div>
  );
}
