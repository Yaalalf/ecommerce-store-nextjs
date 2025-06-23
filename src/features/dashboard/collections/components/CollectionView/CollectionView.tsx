"use client";

import ResourcesSelectDialog from "@/components/Dashboard/ResourcesSelectDialog/ResourcesSelectDialog";
import PaginatedList from "@/components/PaginatedList";
import { ICollectionPopulated } from "@/db/models/collections";
import { IResource } from "@/db/models/resources";
import DeleteDialog from "@/features/dashboard/dialogs/components/delete-dialog/DeleteDialog";
import { Chip, Column, Row, T } from "@/lib/components";
import Heading from "@/lib/components/blocks/headings/heading";
import { Page } from "@/lib/components/blocks/pages";
import Button from "@/lib/components/button";
import Input from "@/lib/components/inputs/input";
import Textarea from "@/lib/components/inputs/textarea";
import Space from "@/lib/components/layout/space";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import { useNotification } from "@/lib/components/popups/components/notification/use-notification";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { deleteCollectionProduct, editCollection } from "../../actions/actions";
import { IProduct } from "@/db/models/product";

export function CollectionView({
  collection,
  resources,
}: {
  resources: IResource[];
  collection: ICollectionPopulated;
}) {
  const router = useRouter();
  const { addNotification } = useNotification();

  const [title, setTitle] = useState(collection.title);
  const [description, setDescription] = useState(collection.description);
  const [media, setMedia] = useState<IResource>(collection.media);

  const onDeleteProduct = useCallback(
    async (item: IProduct) => {
      const result = await deleteCollectionProduct({
        id: collection._id,
        productId: item._id,
      });

      if (result.status === 403) {
        addNotification({
          type: "error",
          title: "Error en la operacion",
          subtitle: result.message,
          duration: 5000,
        });
      } else if (result.status === 200) {
        if (result.data) {
          addNotification({
            type: "success",
            title: "Recurso Eliminado con exito",
            subtitle: "El elemento se elimino correctamente",
            duration: 5000,
          });
        }
      }
    },
    [addNotification, collection._id]
  );

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Page
      className="pb-4"
      pt={{ header: { className: "pt-4" } }}
      slotHeader={
        <Heading
          className="px-4 gap-2 text-primary"
          heading="Edit Collection"
          slotBefore={
            <Button
              className="text-2xl"
              variant="flatted"
              severity="primary"
              dense
              onClick={() => router.back()}
              icon={<IoIosArrowRoundBack />}
            />
          }
        />
      }
      slotBody={
        <Column className="pt-4 px-8 gap-3">
          <Column>
            <T type="label" textVariant="label">
              Title
            </T>
            <Input
              className="w-full"
              variant="outlined"
              severity="primary"
              value={title}
              onChange={setTitle}
            />
          </Column>

          <Column>
            <T type="label" textVariant="label">
              Description
            </T>
            <Textarea
              variant="outlined"
              severity="primary"
              value={description}
              onChange={setDescription}
            />
          </Column>
          <Column>
            <T type="label" textVariant="label">
              Media
            </T>
            <ResourcesSelectDialog
              onSelectedResources={(resources) => {
                setMedia(resources[0]);
              }}
              resources={resources}
              initResources={[media]}
            ></ResourcesSelectDialog>
          </Column>
          <PaginatedList
            className="mt-4"
            data={collection.products}
            pageSize={9}
          >
            {(item) => (
              <Row className="w-[100%] gap-3" key={item.title}>
                {!(item.medias.length > 0) ? (
                  <div className="w-[60px] h-[60px] bg-primary rounded-2xl"></div>
                ) : (
                  <ImageLoader
                    className="w-[60px] h-[60px] rounded-2xl"
                    src={(item.medias[0] as IResource).url}
                    alt={(item.medias[0] as IResource).name}
                    width={80}
                    height={80}
                  ></ImageLoader>
                )}
                <Column className="gap-1">
                  <T type="span" className="text-primary-100 font-[500]">
                    {item.title.length > 20
                      ? item.title.substring(0, 20) + "..."
                      : item.title}
                  </T>
                  <Row className="gap-1">
                    <Chip className="border-1 text-xs" variant="outlined">
                      {item.price} CUP
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
                    heading="Eliminar el producto"
                    subheading="Estas seguro esta accion no se puede echar atras?"
                    onDelete={async () => {
                      await onDeleteProduct(item);
                    }}
                  />
                </Button>
              </Row>
            )}
          </PaginatedList>
          <Button
            variant="surface"
            severity="primary"
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const result = await editCollection({
                _id: collection._id,
                title,
                description,
                media: media._id,
              });
              if (result.status === 403) {
                addNotification({
                  type: "error",
                  title: "Error en la operacion",
                  subtitle: result.message,
                  duration: 5000,
                });
              } else if (result.status === 200) {
                // router.push("/dashboard/products");
                addNotification({
                  type: "success",
                  title: "Coleccion Editada con exito",
                  subtitle: "La Coleccion se edito correctamente",
                  duration: 5000,
                });
              }
              setIsLoading(false);
            }}
          >
            Save
          </Button>
        </Column>
      }
    />
  );
}
