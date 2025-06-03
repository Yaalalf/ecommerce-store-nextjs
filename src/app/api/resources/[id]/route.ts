import connectDB from "@/db/connection";
import ResourceServices from "@/db/services/resourceServices";
import { GoogleCloudService } from "@/services/cloud";
import { resourcesSchemaZod } from "@/utils/validations/resources";
import { ObjectId } from "mongoose";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: ObjectId }> }
) {
  await connectDB();
  const resourceServices = new ResourceServices();

  const { id } = await params;

  const resource = await resourceServices.getResourceById({ id });

  return NextResponse.json({ data: resource });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: ObjectId }> }
) {
  await connectDB();
  const { updateResourceById, getResourceById } = new ResourceServices();

  const { id } = await params;

  // Get the data and validate with zod
  const updated = await request.json();
  try {
    const validateResource = resourcesSchemaZod.parse(updated);
    console.info("Datos validados:", validateResource);
  } catch (error) {
    console.error("Error de validación:", error);
    return NextResponse.json({
      status: 200,
      message: "Error in the resource",
    });
  }
  const resource = await getResourceById({ id });
  if (resource) {
    try {
      const result = await updateResourceById({ _id: id }, updated);
      return NextResponse.json({ data: result });
    } catch (error) {
      console.error("Error in delete: " + error);
      return NextResponse.json({ message: "Error in update operation" });
    }
  } else {
    return NextResponse.json({ message: "The product not exist" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: ObjectId }> }
) {
  await connectDB();
  const gcService = new GoogleCloudService();
  const resourceServices = new ResourceServices();

  const { id } = await params;

  const resource = await resourceServices.getResourceById({ id });

  if (resource) {
    try {
      await gcService.deleteResource(resource.name);
      const result = await resourceServices.deleteResourceById({ id });

      return NextResponse.json({ data: result });
    } catch (error) {
      console.error("Error in delete: " + error);
      return NextResponse.json({ message: "Error in delete operation" });
    }
  } else {
    return NextResponse.json({ message: "The resource not exist" });
  }
}
