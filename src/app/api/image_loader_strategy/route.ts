import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("imageUrl");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "URL de imagen no proporcionada" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": contentType || "application/octet-stream",
        "Cache-Control": "private, max-age=2592000",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error al proxy la imagen:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al obtener la imagen." },
      { status: 500 }
    );
  }
}
