import { auth0 } from "@/auth/auth0";
import connectDB from "@/db/connection";
import ResourceServices from "@/db/services/resourceServices";
import { GoogleCloudService } from "@/services/cloud";
import { formDataSchema } from "@/utils/validations/form-data-images";
import { NextResponse, type NextRequest } from "next/server";
import sharp from "sharp";

// Desactivar el body parser interno de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  console.log(Boolean(process.env.ACTIVE_AUTH));
  if (Boolean(process.env.ACTIVE_AUTH)) {
    if (session) {
      return await saveResource(request);
    } else {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }
  } else {
    return await saveResource(request);
  }
}

async function saveResource(request: NextRequest) {
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
        resourceServices.addResource({
          name: fileName,
          url: publicUrl,
          size,
        });
      } else {
        wasDuplicate = true;
      }
    }

    if (wasDuplicate) {
      console.info("File already exists");
      return NextResponse.json({
        status: 200,
        message: "files already exist",
      });
    } else {
      return NextResponse.json({ status: 200, message: "All Images Saves" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: error });
  }
}
