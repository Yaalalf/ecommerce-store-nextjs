import connectDB from "@/db/connection";
import ResourceServices from "@/db/services/resourceServices";
import { GoogleCloudService } from "@/services/cloud";
import { formDataSchema } from "@/utils/validations/form-data-images";
import { NextResponse, type NextRequest } from "next/server";

// Desactivar el body parser interno de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  // Init google cloud service and mongoose connection
  await connectDB();
  const gcService = new GoogleCloudService();
  const resourceServices = new ResourceServices();

  // Get the form data from the request and get the images of the data
  const formData = await request.formData();
  const images = formData.getAll("images") as File[];

  try {
    const validatedImages = formDataSchema.parse({ images });
    console.info("Datos validados:", validatedImages);
  } catch (error) {
    console.error("Error de validación:", error);
    return NextResponse.json({
      status: 200,
      message: "Error in the images",
    });
  }

  // Safe the image in google cloud and retrieve the url
  let wasDuplicate = false;
  for (const image of images) {
    const isFileInCloud = await gcService.existResource(image);
    if (!isFileInCloud) {
      const publicUrl = await gcService.uploadResource(image);
      resourceServices.addResource({ name: image.name, url: publicUrl });
    } else {
      wasDuplicate = true;
    }
  }

  if (wasDuplicate) {
    console.info("File already exists");
    return NextResponse.json({ status: 200, message: "files already exist" });
  } else {
    return NextResponse.json({ status: 200, message: "All Images Saves" });
  }
}
