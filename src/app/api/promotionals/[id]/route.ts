import connectDB from "@/db/connection";
import PromotionalServices from "@/db/services/promotionalsServices";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { getPromotionalById } = new PromotionalServices();

  const { id } = await params;

  const promotional = await getPromotionalById({ id });

  return NextResponse.json({ data: promotional });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { updatePromotionalById, getPromotionalById } =
    new PromotionalServices();

  const { id } = await params;

  // Get the data and validate with zod
  const updated = await request.json();

  const promotional = await getPromotionalById({ id });
  if (promotional) {
    try {
      const result = await updatePromotionalById({ _id: id }, updated);
      return NextResponse.json({ data: result });
    } catch (error) {
      console.error("Error in delete: " + error);
      return NextResponse.json({ message: "Error in update operation" });
    }
  } else {
    return NextResponse.json({ message: "The promotional not exist" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { getPromotionalById, deletePromotionalById } =
    new PromotionalServices();

  const { id } = await params;

  const promotional = await getPromotionalById({ id });

  if (promotional) {
    try {
      const result = await deletePromotionalById({ id });

      return NextResponse.json({ data: result });
    } catch (error) {
      console.error("Error in delete: " + error);
      return NextResponse.json({ message: "Error in delete operation" });
    }
  } else {
    return NextResponse.json({ message: "The resource not exist" });
  }
}
