"use server";

import { auth0 } from "@/auth/auth0";
import connectDB from "@/db/connection";
import { IProduct } from "@/db/models/product";
import CollectionServices from "@/db/services/collectionsServices";
import ProductServices from "@/db/services/productServices";
import { sanitatedClientData } from "@/utils/util";
import { ObjectId } from "mongoose";

export async function editProduct(
  product: IProduct & {
    collections: ObjectId[];
    lastCollections: ObjectId[];
  }
): Promise<{
  status: number;
  data: IProduct | null;
  message: string;
}> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      status: 403,
      data: null,
      message: "No estas autorizado para acceder a este recurso",
    };
  }

  try {
    await connectDB();
  } catch (error) {
    console.error("Error tratando de conectar a la base de datos: " + error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de editar el producto por favor intentalo de nuevo",
    };
  }

  const { updateProductById } = new ProductServices();
  const { updateCollectionById } = new CollectionServices();
  try {
    const productResult = await updateProductById(
      { _id: product._id },
      {
        description: product.description,
        medias: product.medias,
        price: product.price,
        title: product.title,
      }
    );

    const collectionsToAdd = product.collections.filter(
      (c) => !product.lastCollections.includes(c)
    );
    const collectionsToDelete = product.lastCollections.filter(
      (c) => !product.collections.includes(c)
    );

    for (const c of collectionsToAdd) {
      await updateCollectionById(
        {
          _id: c,
        },
        { $push: { products: product._id } }
      );
    }
    for (const c of collectionsToDelete) {
      await updateCollectionById(
        {
          _id: c,
        },
        { $pull: { products: product._id } }
      );
    }

    return {
      status: 200,
      data: sanitatedClientData(productResult) as IProduct,
      message: "All Images Saves",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de editar el producto por favor intentalo de nuevo",
    };
  }
}
