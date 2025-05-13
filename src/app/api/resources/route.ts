import connectDB from "@/db/connection";
import ResourceServices from "@/db/services/resourceServices";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const resourceServices = new ResourceServices();
  const allResources = await resourceServices.getAllResources();

  return NextResponse.json({ data: allResources });
}
