import "./base.css";
import { ICollectionPopulated } from "@/db/models/collections";
import { Card, Center } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import { H } from "@/lib/components/text";

export default function CategoryCard({
  collection,
}: {
  collection: ICollectionPopulated;
}) {
  return (
    <Card
      className="CategoryCard"
      bordered
      dense
      slotHeader={
        <ImageLoader
          className="ProductImage"
          src={collection.media.url}
          alt={collection.media.name}
          width={100}
          height={100}
          priority
        />
      }
    >
      <Center className="w-full">
        <H className="CategoryName" type="h2">
          {collection.title}
        </H>
      </Center>
    </Card>
  );
}
