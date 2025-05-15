import connectDB from "@/db/connection";
import CollectionServices from "@/db/services/collectionsServices";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { getCollectionById } = new CollectionServices();

  const { id } = await params;

  const collection = await getCollectionById({ id });

  return NextResponse.json({ data: collection });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { updateCollectionById, getCollectionById } = new CollectionServices();

  const { id } = await params;

  // Get the data and validate with zod
  const updated = await request.json();
  console.log(updated);
  const collection = await getCollectionById({ id });
  if (collection) {
    try {
      const result = await updateCollectionById({ _id: id }, updated);
      return NextResponse.json({ data: result });
    } catch (error) {
      console.error("Error in delete: " + error);
      return NextResponse.json({ message: "Error in update operation" });
    }
  } else {
    return NextResponse.json({ message: "The collection not exist" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { getCollectionById, deleteCollectionById } = new CollectionServices();

  const { id } = await params;

  const collection = await getCollectionById({ id });

  if (collection) {
    try {
      const result = await deleteCollectionById({ id });

      return NextResponse.json({ data: result });
    } catch (error) {
      console.error("Error in delete: " + error);
      return NextResponse.json({ message: "Error in delete operation" });
    }
  } else {
    return NextResponse.json({ message: "The resource not exist" });
  }
}
