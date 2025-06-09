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
    collection: ObjectId | null;
    lastCollection: ObjectId | null;
  }
): Promise<{
  status: number;
  data: (string | IProduct)[] | null;
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
    if (product.collection !== product.lastCollection) {
      if (product.collection != null) {
        await updateCollectionById(
          {
            _id: product.collection,
          },
          { $push: { products: product._id } }
        );
      }
      if (product.lastCollection != null) {
        await updateCollectionById(
          {
            _id: product.lastCollection,
          },
          { $pull: { products: product._id } }
        );
      }
    }

    return {
      status: 200,
      data: sanitatedClientData(productResult),
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
