import { Column } from "@/lib/components";
import "./base.css";
import { H } from "@/lib/components/text";
import { ICollectionPopulated } from "@/db/models/collections";
import NColumn from "@/lib/components/structure/n-column";
import Link from "next/link";
import CategoryCard from "../CategoryCard/CategoryCard";

export default function CategoriesView({
  collections,
}: {
  collections: ICollectionPopulated[];
}) {
  return (
    <Column className="CategoriesView">
      <H type="h2">Colecciones para tu agrado y deleite</H>

      <NColumn
        className="ProductList"
        data={collections}
        columnsGap="20"
        itemsGap="40"
      >
        {(collection) => (
          <Link className="ProductLink" href={`/collections/${collection._id}`}>
            <CategoryCard collection={collection} key={collection._id} />
          </Link>
        )}
      </NColumn>
    </Column>
  );
}
