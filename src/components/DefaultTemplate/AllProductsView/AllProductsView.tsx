import "./style/base.css";
import { Column, Separator } from "@/lib/components";
import { H } from "@/lib/components/text";
import { ICollectionPopulated } from "@/db/models/collections";
import CollectionTabs from "../CollectionTabs/CollectionTabs";
import { IProductPopulated } from "@/db/models/product";
import { IPromotionalPopulated } from "@/db/models/promotionals";
import Carrousel from "@/lib/components/misc/carrousel";
import ProductList from "../ProductList/ProductList";

export default function AllProductsView({
  collections,
  products,
  promotionals,
  isMobile,
}: {
  collections: ICollectionPopulated[];
  products: IProductPopulated[];
  promotionals: IPromotionalPopulated[];
  isMobile?: boolean;
}) {
  return (
    <Column className="AllProducts w-full h-full" gap="gap-[8px]">
      <Carrousel
        className="PromotionalBanner"
        imgUrls={promotionals[0].medias}
        autoplay
      ></Carrousel>
      <CollectionTabs collections={collections}></CollectionTabs>
      <Column className="AllProductBody" gap="gap-[20px]">
        <H type="h1" className="AllProductsHeader">
          <span className="SubSpan">
            <span className="SubSpanText">Novedades</span>
            <Separator className="HeaderSeparator" />
          </span>
        </H>
        <ProductList products={products} isMobile={isMobile}></ProductList>
      </Column>
    </Column>
  );
}
