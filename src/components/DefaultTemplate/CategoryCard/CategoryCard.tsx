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
      slotHeader={
        <ImageLoader
          className="ProductImage"
          src={collection.media.url}
          alt={collection.media.name}
          width={1080}
          height={1080}
          priority
        />
      }
    >
      <Center>
        <H className="CategoryName" type="h2">
          {collection.title}
        </H>
      </Center>
    </Card>
  );
}
