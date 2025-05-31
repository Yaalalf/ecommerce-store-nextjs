"use client";

import "./style/base.css";
import { ICollectionPopulated } from "@/db/models/collections";
import { Column } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import NColumn from "@/lib/components/structure/n-column";
import { H } from "@/lib/components/text";
import Link from "next/link";

export default function CollectionTabs({
  collections,
  onTab,
}: {
  collections: ICollectionPopulated[];
  onTab?: (collection: ICollectionPopulated, index: number) => void;
}) {
  return (
    <>
      <Column className={`CollectionTabs`} gap="gap-[8px]">
        <H type="h2" className="CollectionTabsHeader">
          Categorias
        </H>
        <NColumn
          data={collections}
          className="CollectionTabsList"
          columns={2}
          columnsGap="gap-4"
          itemsGap="gap-4"
        >
          {(collection, index) => (
            <Link href={`/categories/${collection._id}`}>
              <Column
                className={`CollectionTabsListItem`}
                align="center"
                justify="space-between"
                gap="gap-2"
                onClick={() => {
                  if (onTab) {
                    onTab(collections[index], index);
                  }
                }}
              >
                <ImageLoader
                  className="CollectionTabsListItemImage"
                  src={collection.media.url}
                  alt={collection.media.name}
                  width={80}
                  height={80}
                />

                <H type="h5" className="CollectionTabsListItemLabel">
                  {collection.title}
                </H>
              </Column>
            </Link>
          )}
        </NColumn>
      </Column>
    </>
  );
}
