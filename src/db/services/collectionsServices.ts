import ResourceServices from "./resourceServices";
import CollectionModel, {
  ICollection,
  ICollectionPopulated,
} from "../models/collections";
import { Model, ObjectId, UpdateQuery } from "mongoose";
import ProductServices from "./productServices";

export default class CollectionServices {
  public model: Model<ICollection>;

  constructor() {
    this.model = CollectionModel;
  }
  async getAllCollections(): Promise<ICollectionPopulated[]> {
    try {
      new ResourceServices();
      new ProductServices();
      const collections = await CollectionModel.find({})
        .populate("products")
        .populate("media");
      return collections as unknown as ICollectionPopulated[];
    } catch (error) {
      console.error(`Error en la operacion de obtener los productos: ${error}`);
    }
    return [];
  }
  async getCollectionById({
    id,
  }: {
    id: ObjectId;
  }): Promise<ICollectionPopulated | undefined> {
    try {
      new ResourceServices();
      const collection = await CollectionModel.findById(id)
        .populate("media")
        .populate({ path: "products", populate: { path: "medias" } });

      return collection as unknown as ICollectionPopulated;
    } catch (error) {
      console.error(`Error en la operacion de obtener la coleccion: ${error}`);
    }
  }
  async addCollection(collection: Omit<ICollection, "_id" | "products">) {
    try {
      const collectionDocument = new CollectionModel(collection);
      const resultDocument = await collectionDocument.save({
        validateBeforeSave: true,
      });
      return resultDocument._id;
    } catch (error) {
      console.error(`Error en la operacion de guardar la coleccion: ${error}`);
    }
  }
  async updateCollectionById(
    filter: { _id: ObjectId },
    update: UpdateQuery<Partial<ICollection>>
  ) {
    try {
      const result = await CollectionModel.updateOne(filter, update);
      return result;
    } catch (error) {
      console.error(`Error en la operacion de editar la coleccion: ${error}`);
    }
  }
  async deleteCollectionById({ id }: { id: ObjectId }) {
    try {
      const result = await CollectionModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(`Error en la operacion de guardar la coleccion: ${error}`);
    }
  }
}
