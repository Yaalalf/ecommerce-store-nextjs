"use client";
import PaginatedList from "@/components/PaginatedList";
import DeleteDialog from "@/features/dashboard/dialogs/components/delete-dialog/DeleteDialog";
import { Chip, Column, Row, T } from "@/lib/components";
import Heading from "@/lib/components/blocks/headings/heading";
import { Page } from "@/lib/components/blocks/pages";
import Button from "@/lib/components/button";
import Space from "@/lib/components/layout/space";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import { useNotification } from "@/lib/components/popups/components/notification/use-notification";
import RippledBox from "@/lib/components/rippled-box/rippled-box";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { deleteCollection } from "../../actions/actions";
import { ICollectionsView } from "../../types/dto";
import { MdCollectionsBookmark } from "react-icons/md";

export default function CollectionsView({
  collections,
}: {
  collections: ICollectionsView[];
}) {
  const router = useRouter();

  const { addNotification } = useNotification();

  const [collectionsList, setCollectionsList] = useState(collections);

  const onDeleteCollection = useCallback(
    async (item: ICollectionsView) => {
      const result = await deleteCollection({ id: item._id });

      if (result.status === 403) {
        addNotification({
          type: "error",
          title: "Error en la operacion",
          subtitle: result.message,
          duration: 5000,
        });
      } else if (result.status === 200) {
        addNotification({
          type: "success",
          title: "Recurso Eliminado con exito",
          subtitle: "El elemento se elimino correctamente",
          duration: 5000,
        });
        setCollectionsList(
          collectionsList.filter(
            (collection) => collection._id !== result.data._id
          )
        );
      }
    },
    [addNotification, collectionsList]
  );

  return (
    <Page
      pt={{ header: { className: "pt-4" } }}
      slotHeader={
        <Heading
          className="px-4 gap-2 text-primary"
          heading="Collections"
          slotBefore={<MdCollectionsBookmark />}
          slotAfter={
            <Button
              variant="surface"
              severity="primary"
              rounded="md"
              size="xs"
              dense
              icon={<FaPlusCircle />}
              label="Add Collection"
              onClick={() => {
                router.push("/dashboard/collections/new");
              }}
            />
          }
        />
      }
      slotBody={
        <PaginatedList className="mt-4" data={collectionsList} pageSize={9}>
          {(item) => (
            <RippledBox pt={{ ripple: { className: "bg-primary/50" } }}>
              <Row
                className="w-[100%] gap-3"
                key={item.title}
                onClick={() => {
                  router.push(`/dashboard/collections/${item._id}`);
                }}
              >
                {/* <div className="w-[60px] h-[60px] bg-primary"></div> */}
                <ImageLoader
                  className="w-[60px] h-[60px] rounded-2xl"
                  src={item.media.url}
                  alt={item.media.name}
                  width={80}
                  height={80}
                ></ImageLoader>
                <Column className="gap-1">
                  <T type="span" className="text-primary-100 font-[500]">
                    {item.title.length > 20
                      ? item.title.substring(0, 20) + "..."
                      : item.title}
                  </T>
                  <Row className="gap-1">
                    <Chip className="border-1 text-xs" variant="outlined">
                      {item.products.length} products
                    </Chip>
                  </Row>
                </Column>
                <Space />
                <Button
                  className="self-start text-xs"
                  variant="surface"
                  severity="error-container"
                  rounded="md"
                  dense
                  icon={<FaTrash />}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DeleteDialog
                    heading="Eliminar la coleccion"
                    subheading="Estas seguro esta accion no se puede echar atras?"
                    onDelete={async () => {
                      await onDeleteCollection(item);
                    }}
                  />
                </Button>
              </Row>
            </RippledBox>
          )}
        </PaginatedList>
      }
    />
  );
}
