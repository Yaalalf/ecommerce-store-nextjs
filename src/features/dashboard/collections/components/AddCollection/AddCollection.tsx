"use client";
import ResourcesSelectDialog from "@/components/Dashboard/ResourcesSelectDialog/ResourcesSelectDialog";
import { IResource } from "@/db/models/resources";
import { Column, T } from "@/lib/components";
import Heading from "@/lib/components/blocks/headings/heading";
import { Page } from "@/lib/components/blocks/pages";
import Button from "@/lib/components/button";
import Input from "@/lib/components/inputs/input";
import Textarea from "@/lib/components/inputs/textarea";
import { useNotification } from "@/lib/components/popups/components/notification/use-notification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { createCollection } from "../../actions/actions";

export default function AddCollection({
  resources,
}: {
  resources: IResource[];
}) {
  const router = useRouter();
  const { addNotification } = useNotification();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<IResource | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Page
      pt={{ header: { className: "pt-4" } }}
      slotHeader={
        <Heading
          className="px-4 gap-2 text-primary"
          heading="Add Collection"
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
            ></ResourcesSelectDialog>
          </Column>
          <Button
            variant="surface"
            severity="primary"
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              if (media) {
                const result = await createCollection({
                  collection: {
                    title: title,
                    description: description,
                    media: media?._id,
                  },
                });
                if (result.status === 403) {
                  addNotification({
                    type: "error",
                    title: "Error en la operacion",
                    subtitle: result.message,
                    duration: 5000,
                  });
                } else if (result.status === 200) {
                  router.push("/dashboard/collections");
                  addNotification({
                    type: "success",
                    title: "La coleccion se ha creado con exito",
                    subtitle: "La Coleccion se creo ya esta lista para usar",
                    duration: 5000,
                  });
                }
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
