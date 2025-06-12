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
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    const contentType = imageResponse.headers.get("content-type");
    const arrayBuffer = await imageResponse.arrayBuffer();

    const response = new Response(arrayBuffer, {
      headers: {
        "Content-Type": contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=2592000, immutable",
        Vary: "Accept-Encoding",
      },
      status: 200,
    });

    response.headers.delete("pragma"); // Elimina el header Pragma
    response.headers.delete("expires"); // Elimina el header Expires

    return response;
  } catch (error) {
    console.error("Error al proxy la imagen:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al obtener la imagen." },
      { status: 500 }
    );
  }
}
