"use server";
// TODO: falta agregar un mecanismo para transacciones y poder hacer rollback

import { auth0 } from "@/auth/auth0";
import connectDB from "@/db/connection";
import { IProduct } from "@/db/models/product";
import ProductServices from "@/db/services/productServices";
import { sanitatedClientData } from "@/utils/util";
import { ObjectId } from "mongoose";

export async function createProduct(product: Omit<IProduct, "_id">): Promise<{
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
        "Error en la operacion de crear el recurso por favor intentalo de nuevo",
    };
  }

  const { addProduct } = new ProductServices();

  try {
    const result = await addProduct({
      description: product.description,
      medias: product.medias,
      price: product.price,
      title: product.title,
    });
    return {
      status: 200,
      data: sanitatedClientData(result),
      message: "All Images Saves",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de crear el recurso por favor intentalo de nuevo",
    };
  }

  // return {
  //   status: 200,
  //   data: null,
  //   message: "Testeando",
  // };
}
export async function deleteProduct(id: ObjectId): Promise<{
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
        "Error en la operacion de eliminar el recurso por favor intentalo de nuevo",
    };
  }

  const { deleteProductById, getProductById } = new ProductServices();

  const product = await getProductById({ id });

  if (product) {
    try {
      const result = await deleteProductById({ id });

      return sanitatedClientData({
        status: 200,
        data: sanitatedClientData(result),
        message: "Producto eliminado correctamente",
      });
    } catch (error) {
      console.error("Error eliminando el producto: " + error);
      return {
        status: 403,
        data: null,
        message: "Error eliminando el producto",
      };
    }
  } else {
    return { status: 403, data: null, message: "El producto no existe" };
  }
}
