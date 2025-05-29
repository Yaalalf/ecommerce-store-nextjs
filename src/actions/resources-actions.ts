"use server";

import { IResource } from "@/db/models/resources";
import ResourceServices from "@/db/services/resourceServices";
import { GoogleCloudService } from "@/services/cloud";
import { sanitatedClientData } from "@/utils/util";
import { formDataSchema } from "@/utils/validations/form-data-images";
import sharp from "sharp";

export async function getAllResources() {
  const { getAllResources } = new ResourceServices();
  return sanitatedClientData(await getAllResources());
}

export async function createResource(files: FileList) {
  // Init google cloud service and mongoose connection

  const gcService = new GoogleCloudService();
  const { addResource, getAllResources } = new ResourceServices();

  // Get the form data from the request and get the images of the data

  const images = files;

  try {
    const validatedImages = formDataSchema.parse({ images });
    console.info("Datos validados:", validatedImages);
  } catch (error) {
    console.error("Error de validación:", error);
    return {
      status: 200,
      data: [],
      message: "Error in the images",
    };
  }
  const bytes = await images[0].arrayBuffer();
  const sharpImage = sharp(bytes);

  const webpImageBuffer = await sharpImage
    .resize(1080, 1080, { fit: "inside" })
    .webp({ quality: 75 })
    .toBuffer({ resolveWithObject: true });

  console.log(webpImageBuffer.info.size);

  // Safe the image in google cloud and retrieve the url
  try {
    let wasDuplicate = false;
    for (const image of images) {
      const isFileInCloud = await gcService.existResource(image, true);

      if (!isFileInCloud) {
        const { publicUrl, fileName, size } = await gcService.uploadResource(
          image
        );
        addResource({
          name: fileName,
          url: publicUrl,
          size,
        });
      } else {
        wasDuplicate = true;
      }
    }

    if (wasDuplicate) {
      return {
        status: 200,
        data: [],
        message: "files already exist",
      };
    } else {
      return {
        status: 200,
        data: sanitatedClientData(await getAllResources()) as IResource[],
        message: "All Images Saves",
      };
    }
  } catch (error) {
    return { status: 500, data: [], message: error };
  }
}

export async function deleteResource(id: string) {
  const gcService = new GoogleCloudService();

  const { deleteResourceById, getResourceById, getAllResources } =
    new ResourceServices();

  const resource = await getResourceById({ id });

  if (resource) {
    try {
      await gcService.deleteResource(resource.name);
      await deleteResourceById({ id });

      return sanitatedClientData({
        status: 200,
        data: sanitatedClientData(await getAllResources()) as IResource[],
        message: "All Images Saves",
      });
    } catch (error) {
      console.error("Error in delete: " + error);
      return { status: 500, data: [], message: "Error in delete operation" };
    }
  } else {
    return { status: 200, data: [], message: "The resource not exist" };
  }
}
