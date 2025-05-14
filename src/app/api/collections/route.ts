import connectDB from "@/db/connection";
import CollectionServices from "@/db/services/collectionsServices";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  await connectDB();
  //Hack para inicializar el squema de los recursos
  const { getAllCollections } = new CollectionServices();
  const allCollections = await getAllCollections();

  return NextResponse.json({ data: allCollections });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const { addCollection } = new CollectionServices();
  const data = await request.json();
  console.log(data);

  const result = await addCollection(data);

  if (result) {
    return NextResponse.json({ status: 200, message: "collection created" });
  } else {
    return NextResponse.json({ status: 200, message: "error in collection" });
  }
}
