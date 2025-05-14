import "./style/base.css";
import { ICollectionPopulated } from "@/db/models/collections";
import { Column, List } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import { H } from "@/lib/components/text";
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
  return (
    <Column className="CollectionTabs" gap="8">
      <H type="h2" className="CollectionTabsHeader">
        Categorias
      </H>
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
            <H type="h5" className="CollectionTabsListItemLabel">
              {collection.title}
            </H>
          </Column>
        )}
      </List>
    </Column>
  );
}
