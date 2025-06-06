"use client";
import { Column, T } from "@/lib/components";
import Heading from "@/lib/components/blocks/headings/heading";
import { Page } from "@/lib/components/blocks/pages";
import Button from "@/lib/components/button";
import Input from "@/lib/components/inputs/input";
import Textarea from "@/lib/components/inputs/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import ResourcesSelectDialog from "../ResourcesSelectDialog/ResourcesSelectDialog";
import { IResource } from "@/db/models/resources";
import { createProduct } from "@/actions/products-actions";
import { useNotification } from "@/lib/components/popups/components/notification/use-notification";

export default function AddProductView({
  resources,
}: {
  resources: IResource[];
}) {
  const router = useRouter();
  const { addNotification } = useNotification();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [medias, setMedias] = useState<IResource[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Page
      pt={{ header: { className: "pt-4" } }}
      slotHeader={
        <Heading
          className="px-4 gap-2 text-primary"
          heading="Add Product"
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
              onValueChange={setTitle}
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
              onValueChange={(value) => setPrice(Number(value))}
              slotAppend="CUP"
              type="number"
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
              onValueChange={setDescription}
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
            ></ResourcesSelectDialog>
          </Column>
          <Button
            variant="surface"
            severity="primary"
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const result = await createProduct({
                title,
                description,
                medias: medias.map((media) => media._id),
                price,
              });
              if (result.status === 403) {
                addNotification({
                  type: "error",
                  title: "Error en la operacion",
                  subtitle: result.message,
                  duration: 5000,
                });
              } else if (result.status === 200) {
                router.push("/dashboard/products");
                addNotification({
                  type: "success",
                  title: "Producto creado con exito",
                  subtitle: "El Producto se guardo ya esta listo para usar",
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
