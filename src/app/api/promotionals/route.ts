import connectDB from "@/db/connection";
import PromotionalServices from "@/db/services/promotionalsServices";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  await connectDB();
  //Hack para inicializar el squema de los recursos
  const { getAllPromotionals } = new PromotionalServices();
  const allPromotionals = await getAllPromotionals();

  return NextResponse.json({ data: allPromotionals });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const { addPromotional } = new PromotionalServices();
  const data = await request.json();
  console.log(data);

  const result = await addPromotional(data);

  if (result) {
    return NextResponse.json({ status: 200, message: "promotional created" });
  } else {
    return NextResponse.json({ status: 200, message: "error in promotional" });
  }
}
