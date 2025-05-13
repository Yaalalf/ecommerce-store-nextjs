import connectDB from "@/db/connection";
import ResourceServices from "@/db/services/resourceServices";
import { GoogleCloudService } from "@/services/cloud";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const resourceServices = new ResourceServices();

  const { id } = await params;

  const resource = await resourceServices.getResourceById({ id });

  return NextResponse.json({ data: resource });
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
