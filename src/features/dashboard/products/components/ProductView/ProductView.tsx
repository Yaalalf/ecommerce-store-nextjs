"use client";
import ResourcesSelectDialog from "@/components/Dashboard/ResourcesSelectDialog/ResourcesSelectDialog";
import { ICollectionPopulated } from "@/db/models/collections";
import { IProductPopulated } from "@/db/models/product";
import { IResource } from "@/db/models/resources";
import { Column, T } from "@/lib/components";
import Heading from "@/lib/components/blocks/headings/heading";
import { Page } from "@/lib/components/blocks/pages";
import Button from "@/lib/components/button";
import Autocomplete from "@/lib/components/inputs/autocomplete/autocomplete";
import Input from "@/lib/components/inputs/input";
import Textarea from "@/lib/components/inputs/textarea";
import { useNotification } from "@/lib/components/popups/components/notification/use-notification";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { editProduct } from "../../actions/actions";

export default function ProductView({
  product,
  resources,
  collections,
}: {
  resources: IResource[];
  product: IProductPopulated;
  collections: ICollectionPopulated[];
}) {
  const lastCollection = useMemo(
    () =>
      collections.filter((collection) =>
        collection.products.find((p) => p._id === product._id)
      ),
    [collections, product._id]
  );

  const router = useRouter();
  const { addNotification } = useNotification();

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState<number>(product.price);
  const [collection, setCollections] =
    useState<ICollectionPopulated[]>(lastCollection);
  const [description, setDescription] = useState(product.description);
  const [medias, setMedias] = useState<IResource[]>(product.medias);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Page
      pt={{ header: { className: "pt-4" } }}
      slotHeader={
        <Heading
          className="px-4 gap-2 text-primary"
          heading="Edit Product"
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
              Price
            </T>
            <Input
              className="w-full"
              variant="outlined"
              severity="primary"
              value={price.toString()}
              onChange={(value) => setPrice(Number(value))}
              slotAppend="CUP"
              type="number"
            />
          </Column>
          <Column>
            <T type="label" textVariant="label">
              Collection
            </T>
            <Autocomplete
              className="w-full"
              value={collection}
              suggestions={collections}
              field="title"
              multiple
              suggestedItemsSlots={(c) => c.title}
              onSuggest={(c) => {
                setCollections([...collection, c]);
              }}
              onDeleteSuggest={(c) => {
                setCollections(collection.filter((col) => col._id !== c._id));
              }}
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
                setMedias(resources);
              }}
              resources={resources}
              initResources={medias}
            ></ResourcesSelectDialog>
          </Column>
          <Button
            variant="surface"
            severity="primary"
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);

              const result = await editProduct({
                _id: product._id,
                title,
                description,
                medias: medias.map((media) => media._id),
                price,
                collections: collection.map((c) => c._id),
                lastCollections: lastCollection.map((c) => c._id),
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
                  title: "Producto Editado con exito",
                  subtitle: "El Producto se edito correctamente",
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
