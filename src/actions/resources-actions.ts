"use server";
// TODO: falta agregar un mecanismo para transacciones y poder hacer rollback

import { auth0 } from "@/auth/auth0";
import connectDB from "@/db/connection";
import { IResource } from "@/db/models/resources";
import ResourceServices from "@/db/services/resourceServices";
import { GoogleCloudService } from "@/services/cloud";
import { sanitatedClientData } from "@/utils/util";
import { formDataSchema } from "@/utils/validations/form-data-images";
import { ObjectId } from "mongoose";

export async function getAllResources() {
  const { getAllResources } = new ResourceServices();
  return sanitatedClientData(await getAllResources());
}

export async function createResource(files: FileList): Promise<{
  status: number;
  data: (string | IResource)[] | null;
  message: string;
}> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      status: 403,
      data: null,
      message: "No estas autorizado para acceder a este recurso",
    };
  }

  try {
    await connectDB();
  } catch (error) {
    console.error("Error tratando de conectar a la base de datos: " + error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de crear el recurso por favor intentalo de nuevo",
    };
  }
  // Get the form data from the request and get the images of the data
  const images = files;

  try {
    const validatedImages = formDataSchema.parse({ images });
    console.info("Datos validados:", validatedImages);
  } catch (error) {
    console.error("Error de validación:", error);
    return {
      status: 403,
      data: null,
      message: "Revisa los archivos, al parecer algunos no son imagenes",
    };
  }

  // Init google cloud service and mongoose connection

  const gcService = new GoogleCloudService();
  const { addResource } = new ResourceServices();

  // Safe the image in google cloud and retrieve the url
  try {
    const processedFiles: (string | IResource)[] = [];

    for (const image of images) {
      const isFileInCloud = await gcService.existResource(image, true);

      if (isFileInCloud) {
        processedFiles.push(image.name);
      } else {
        const { publicUrl, fileName, size } = await gcService.uploadResource(
          image
        );

        const resource = await addResource({
          name: fileName,
          url: publicUrl,
          size,
        });
        if (resource) {
          processedFiles.push(resource);
        }
      }
    }
    return {
      status: 200,
      data: sanitatedClientData(processedFiles),
      message: "All Images Saves",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de crear el recurso por favor intentalo de nuevo",
    };
  }
}

export async function deleteResource(id: ObjectId): Promise<{
  status: number;
  data: IResource | null;
  message: string;
}> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      status: 403,
      data: null,
      message: "No estas autorizado para acceder a este recurso",
    };
  }

  try {
    await connectDB();
  } catch (error) {
    console.error("Error tratando de conectar a la base de datos: " + error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de eliminar el recurso por favor intentalo de nuevo",
    };
  }

  const gcService = new GoogleCloudService();

  const { deleteResourceById, getResourceById } = new ResourceServices();

  const resource = await getResourceById({ id });

  if (resource) {
    try {
      await gcService.deleteResource(resource.name);
      const result = await deleteResourceById({ id });

      return sanitatedClientData({
        status: 200,
        data: sanitatedClientData(result),
        message: "Recurso eliminado correctamente",
      });
    } catch (error) {
      console.error("Error eliminando el recurso: " + error);
      return {
        status: 403,
        data: null,
        message: "Error eliminando el recurso",
      };
    }
  } else {
    return { status: 403, data: null, message: "El recurso no existe" };
  }
}
