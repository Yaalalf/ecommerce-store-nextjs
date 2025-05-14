import "./style/base.css";
import { Column, List } from "@/lib/components";
import NColumn from "@/lib/components/structure/n-column";
import { H } from "@/lib/components/text";
import ProductCard from "../ProductCard";
import ProductServices from "@/db/services/productServices";
import Link from "next/link";
import CollectionServices from "@/db/services/collectionsServices";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";

export default async function AllProductsView() {
  const { getAllProducts } = new ProductServices();
  const { getAllCollections } = new CollectionServices();
  const products = await getAllProducts();
  const collections = await getAllCollections();
  return (
    <Column className="AllProducts full-width full-height" gap="20">
      <List data={collections} className="CollectionContainer" gap="12">
        {(collection) => (
          <Column className="CollectionItem" align="center" justify="center">
            <ImageLoader
              className="CollectionItemImage"
              src={collection.media.url}
              alt={collection.media.name}
              width={500}
              height={500}
            />
            <H type="h5">{collection.title}</H>
          </Column>
        )}
      </List>
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
