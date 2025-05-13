import connectDB from "@/db/connection";
import ProductServices from "@/db/services/productServices";
import { productSchemaZod } from "@/utils/validations/product";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { getProductById } = new ProductServices();

  const { id } = await params;

  const resource = await getProductById({ id });

  return NextResponse.json({ data: resource });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { updateProductById, getProductById } = new ProductServices();

  const { id } = await params;

  // Get the data and validate with zod
  const updated = await request.json();
  console.log(updated);
  try {
    const validateProduct = productSchemaZod.parse(updated);
    console.info("Datos validados:", validateProduct);
  } catch (error) {
    console.error("Error de validación:", error);
    return NextResponse.json({
      status: 200,
      message: "Error in the product",
    });
  }
  const product = await getProductById({ id });
  if (product) {
    try {
      const result = await updateProductById({ _id: id }, updated);
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
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { getProductById, deleteProductById } = new ProductServices();

  const { id } = await params;

  const product = await getProductById({ id });

  if (product) {
    try {
      const result = await deleteProductById({ id });

      return NextResponse.json({ data: result });
    } catch (error) {
      console.error("Error in delete: " + error);
      return NextResponse.json({ message: "Error in delete operation" });
    }
  } else {
    return NextResponse.json({ message: "The resource not exist" });
  }
}
