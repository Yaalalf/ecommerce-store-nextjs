import connectDB from "@/db/connection";
import ProductServices from "@/db/services/productServices";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  await connectDB();
  //Hack para inicializar el squema de los recursos
  const { getAllProducts } = new ProductServices();
  const allProducts = await getAllProducts();

  return NextResponse.json({ data: allProducts });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const { addProduct } = new ProductServices();
  const data = await request.json();
  console.log(data);

  const result = await addProduct(data);

  if (result) {
    return NextResponse.json({ status: 200, message: "product created" });
  } else {
    return NextResponse.json({ status: 200, message: "error in product" });
  }
}
