"use server";

import { auth0 } from "@/auth/auth0";
import connectDB from "@/db/connection";
import { ICollection } from "@/db/models/collections";
import CollectionServices from "@/db/services/collectionsServices";
import { sanitatedClientData } from "@/utils/util";
import { ObjectId, UpdateWriteOpResult } from "mongoose";
import { ICollectionsAdd } from "../types/dto";

export interface ActionResponseError {
  status: 403;
  data: null;
  message: string;
}
export interface ActionResponseSuccess<T> {
  status: 200;
  data: T;
  message: string;
}

export async function createCollection({
  collection,
}: {
  collection: ICollectionsAdd;
}): Promise<ActionResponseError | ActionResponseSuccess<ObjectId>> {
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
        "Error en la operacion de agregar la coleccion por favor intentalo de nuevo",
    };
  }

  const { addCollection } = new CollectionServices();
  try {
    const result = await addCollection(collection);

    return {
      status: 200,
      data: sanitatedClientData(result) as ObjectId,
      message: "Coleccion Agregada correctamente",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de agregar la coleccion por favor intentalo de nuevo",
    };
  }
}

export async function editCollection(
  collection: Partial<ICollection>
): Promise<{
  status: number;
  data: UpdateWriteOpResult | null;
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

  const { updateCollectionById } = new CollectionServices();
  try {
    const productResult = await updateCollectionById(
      { _id: collection._id as ObjectId },
      {
        description: collection.description,
        media: collection.media,
        title: collection.title,
      }
    );

    return {
      status: 200,
      data: sanitatedClientData(productResult) as UpdateWriteOpResult,
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

export async function deleteCollection({
  id,
}: {
  id: ObjectId;
}): Promise<ActionResponseError | ActionResponseSuccess<ICollection>> {
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
        "Error en la operacion de eliminar la coleccion por favor intentalo de nuevo",
    };
  }

  const { deleteCollectionById } = new CollectionServices();
  try {
    const result = await deleteCollectionById({ id });

    return {
      status: 200,
      data: sanitatedClientData(result) as ICollection,
      message: "Coleccion eliminada correctamente",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de eliminar la coleccion por favor intentalo de nuevo",
    };
  }
}
export async function deleteCollectionProduct({
  id,
  productId,
}: {
  id: ObjectId;
  productId: ObjectId;
}): Promise<ActionResponseError | ActionResponseSuccess<UpdateWriteOpResult>> {
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
        "Error en la operacion de eliminar la coleccion por favor intentalo de nuevo",
    };
  }

  const { updateCollectionById } = new CollectionServices();
  try {
    const result = await updateCollectionById(
      {
        _id: id,
      },
      { $pull: { products: productId } }
    );

    return {
      status: 200,
      data: sanitatedClientData(result) as UpdateWriteOpResult,
      message: "Producto de la Coleccion eliminado correctamente",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 403,
      data: null,
      message:
        "Error en la operacion de eliminar la coleccion por favor intentalo de nuevo",
    };
  }
}
