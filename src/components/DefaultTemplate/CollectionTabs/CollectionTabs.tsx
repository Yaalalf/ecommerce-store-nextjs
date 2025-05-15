"useClient";

import "./style/base.css";
import { ICollectionPopulated } from "@/db/models/collections";
import { Column, List } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import VisibilityObserver from "@/lib/components/misc/visibility-observer/visibility-observer";
import { H } from "@/lib/components/text";
import { useState } from "react";
import { FaStore } from "react-icons/fa";

export default function CollectionTabs({
  collections,
  selectedIndex,
  onTab,
}: {
  collections: ICollectionPopulated[];
  selectedIndex: number;
  onTab?: (collection: ICollectionPopulated, index: number) => void;
}) {
  const [isMiniState, setIsMiniState] = useState(false);

  return (
    <>
      <VisibilityObserver
        className="CollectionTabsIntersector"
        onVisibility={(entry) => {
          setIsMiniState(!entry.isIntersecting);
        }}
      />
      <Column className={`CollectionTabs ${isMiniState ? "mini" : ""}`} gap="8">
        {isMiniState || (
          <H type="h2" className="CollectionTabsHeader">
            Categorias
          </H>
        )}
        <List data={collections} className="CollectionTabsList" gap="12">
          {(collection, index) => (
            <Column
              className={`CollectionTabsListItem ${
                selectedIndex === index ? "selected" : ""
              }`}
              align="center"
              justify="space-between"
              onClick={() => {
                if (onTab) {
                  onTab(collections[index], index);
                }
              }}
            >
              {index != 0 ? (
                <ImageLoader
                  className="CollectionTabsListItemImage"
                  src={collection.media.url}
                  alt={collection.media.name}
                  width={500}
                  height={500}
                />
              ) : (
                <FaStore className="CollectionTabsListItemInitIcon" />
              )}
              {isMiniState || (
                <H type="h5" className="CollectionTabsListItemLabel">
                  {collection.title}
                </H>
              )}
            </Column>
          )}
        </List>
      </Column>
    </>
  );
}
