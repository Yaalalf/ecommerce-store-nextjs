import { Column } from "@/lib/components";
import "./base.css";
import { ICollectionPopulated } from "@/db/models/collections";
import NColumn from "@/lib/components/structure/n-column";
import Link from "next/link";
import CategoryCard from "../CategoryCard/CategoryCard";
import MainHeader from "../MainHeader/MainHeader";

export default function CategoriesView({
  collections,
}: {
  collections: ICollectionPopulated[];
}) {
  return (
    <Column className="CategoriesView">
      <MainHeader
        slotsH2={"Colecciones para tu agrado y deleite"}
        slotsH3={"Piensa en grande con nosotros nunca te vistas igual"}
      ></MainHeader>

      <NColumn
        className="CategoryList"
        data={collections}
        columnsGap="20"
        itemsGap="40"
        columns={2}
      >
        {(collection) => (
          <Link className="ProductLink" href={`/categories/${collection._id}`}>
            <CategoryCard collection={collection} key={collection._id} />
          </Link>
        )}
      </NColumn>
    </Column>
  );
}
