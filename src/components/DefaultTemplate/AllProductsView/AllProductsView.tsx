import "./style/base.css";
import { Box, Column, List, Row } from "@/lib/components";
import NColumn from "@/lib/components/structure/n-column";
import { H } from "@/lib/components/text";
import ProductCard from "../ProductCard";
import ProductServices from "@/db/services/productServices";
import Link from "next/link";
import CollectionServices from "@/db/services/collectionsServices";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import MaskedSVG from "@/lib/components/misc/masked-svg";

export default async function AllProductsView() {
  const { getAllProducts } = new ProductServices();
  const { getAllCollections } = new CollectionServices();
  const products = await getAllProducts();
  const collections = await getAllCollections();
  return (
    <Column className="AllProducts full-width full-height" gap="20">
      <List data={collections} className="CollectionContainer">
        {(collection) => (
          <Row className="CollectionItem">
            <MaskedSVG
              className="CollectionItemImage"
              src={collection.media.url}
            />
            <H type="h5">{collection.title}</H>
          </Row>
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
