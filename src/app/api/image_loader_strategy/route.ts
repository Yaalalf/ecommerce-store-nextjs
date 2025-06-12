import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
    const imageResponse = await fetch(imageUrl, { cache: "force-cache" });

    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    console.log(imageResponse.headers);

    const contentType = imageResponse.headers.get("content-type");
    const arrayBuffer = await imageResponse.arrayBuffer();

    const response = new Response(arrayBuffer, {
      headers: imageResponse.headers || {
        "Content-Type": contentType || "application/octet-stream",
        "Cache-Control":
          "public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=3600, immutable",
        Vary: "Accept-Encoding",
      },
      status: 200,
    });

    return response;
  } catch (error) {
    console.error("Error al proxy la imagen:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al obtener la imagen." },
      { status: 500 }
    );
  }
}
