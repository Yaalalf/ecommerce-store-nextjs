import { Model, ObjectId } from "mongoose";
import ProductModel, { IProduct, IProductPopulated } from "../models/product";
import ResourceServices from "./resourceServices";

export default class ProductServices {
  public model: Model<IProduct>;

  constructor() {
    this.model = ProductModel;
  }
  async getAllProducts(): Promise<IProductPopulated[]> {
    try {
      new ResourceServices();
      const products = await ProductModel.find({}).populate("medias");
      return products as unknown as IProductPopulated[];
    } catch (error) {
      console.error(`Error en la operacion de obtener los productos: ${error}`);
    }
    return [];
  }
  async getProductById({
    id,
  }: {
    id: ObjectId;
  }): Promise<IProductPopulated | undefined> {
    try {
      new ResourceServices();
      const product = await ProductModel.findById(id).populate("medias");

      return product as unknown as IProductPopulated;
    } catch (error) {
      console.error(`Error en la operacion de obtener el producto: ${error}`);
    }
  }
  async addProduct(product: Omit<IProduct, "_id">) {
    try {
      const productDocument = new ProductModel(product);
      const resultDocument = await productDocument.save({
        validateBeforeSave: true,
      });
      return resultDocument._id;
    } catch (error) {
      console.error(`Error en la operacion de guardar el producto: ${error}`);
    }
  }
  async updateProductById(
    filter: { _id: ObjectId },
    update: Partial<IProduct>
  ) {
    try {
      const result = await ProductModel.findOneAndUpdate(filter, update);
      return result;
    } catch (error) {
      console.error(`Error en la operacion de editar el producto: ${error}`);
    }
  }
  async deleteProductById({ id }: { id: ObjectId }) {
    try {
      const result = await ProductModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(`Error en la operacion de guardar el recurso: ${error}`);
    }
  }
}
