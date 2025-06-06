"use client";
import { createResource, deleteResource } from "@/actions/resources-actions";
import Heading from "@/lib/components/blocks/headings/heading";
import { Page } from "@/lib/components/blocks/pages";
import FileInput from "@/lib/components/inputs/file-input/file-input";
import { FaFileImage, FaPlusCircle, FaTrash } from "react-icons/fa";
import ResourcesPaginatedList from "../ResourcesPaginatedList/ResourcesPaginatedList";
import { IResource } from "@/db/models/resources";
import { useState } from "react";
import { Chip, Column, Row, T } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import {
  formatBytes,
  formatRelativeDate,
  getFileNameAndExtension,
} from "@/lib/utils/formaters";
import Space from "@/lib/components/layout/space";
import Button from "@/lib/components/button";
import { useNotification } from "@/lib/components/popups/components/notification/use-notification";

export default function ResourcesView({
  resources,
}: {
  resources: IResource[];
}) {
  const { addNotification } = useNotification();

  const [resourcesList, setResourcesList] = useState<IResource[]>(resources);
  const [deleteSelectedButton, setDeleteSelectedButton] = useState(-1);

  return (
    <Page
      pt={{ header: { className: "pt-4" } }}
      slotHeader={
        <Heading
          className="px-4 gap-2 text-primary"
          heading="Resources"
          slotAfter={
            <FileInput
              icon={<FaPlusCircle />}
              label="Add Resource"
              apiUrl="/api/resources/upload"
              onChange={async (files: FileList) => {
                const result = await createResource(files);
                if (result.status === 403) {
                  addNotification({
                    type: "error",
                    title: "Error en la operacion",
                    subtitle: result.message,
                    duration: 5000,
                  });
                } else if (result.status === 200) {
                  if (result.data) {
                    const createdResources: IResource[] = [];
                    result.data.forEach((item) => {
                      if (typeof item === "string") {
                        addNotification({
                          type: "warning",
                          title:
                            "Tratando de guardar recurso con nombre duplicado",
                          subtitle: `Un recurso con este nombre ${item} ya existe en el catalogo`,
                          duration: 5000,
                        });
                      } else {
                        addNotification({
                          type: "success",
                          title: "Recurso creado con exito",
                          subtitle:
                            "El elemento se guardo ya esta listo para usar",
                          duration: 5000,
                        });
                        createdResources.push(item);
                      }
                    });

                    setResourcesList([...resourcesList, ...createdResources]);
                  }
                }
              }}
            ></FileInput>
          }
          slotBefore={<FaFileImage />}
        />
      }
      slotBody={
        <ResourcesPaginatedList className="mt-4" resources={resourcesList}>
          {(item, index) => (
            <Row className="w-[100%] gap-3" key={item.name}>
              {/* <div className="w-[60px] h-[60px] bg-primary"></div> */}
              <ImageLoader
                className="w-[60px] h-[60px] rounded-2xl"
                src={item.url}
                alt={item.name}
                width={80}
                height={80}
              ></ImageLoader>
              <Column className="gap-1">
                <T type="span" className="text-primary-100 font-[500]">
                  {getFileNameAndExtension(item.name).name.length > 20
                    ? getFileNameAndExtension(item.name).name.substring(0, 20) +
                      "..."
                    : getFileNameAndExtension(item.name).name}
                </T>
                <Row className="gap-1">
                  <Chip className="border-1 text-xs" variant="outlined">
                    {formatBytes(item.size)}
                  </Chip>
                  <Chip className="border-1 text-xs" variant="outlined">
                    {formatRelativeDate(item.createdAt as string)}
                  </Chip>
                  <Chip className="border-1 text-xs" variant="outlined">
                    {getFileNameAndExtension(item.name).extension}
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
                loading={deleteSelectedButton === index}
                onClick={async () => {
                  setDeleteSelectedButton(index);
                  const result = await deleteResource(item._id);

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
                      setResourcesList(
                        resourcesList.filter(
                          (resource) => resource._id !== result.data?._id
                        )
                      );
                    }
                  }

                  setDeleteSelectedButton(-1);
                }}
              />
            </Row>
          )}
        </ResourcesPaginatedList>
      }
    />
  );
}
