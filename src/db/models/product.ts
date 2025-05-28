import type { Model, Types } from "mongoose";
import { model, Schema } from "mongoose";
import { IResource } from "./resources";

export enum EProductStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}
export interface IProduct {
  title: string;
  description: string;
  price: number;
  status: EProductStatus;
  medias: Types.ObjectId[];
}

export interface IProductPopulated extends Omit<IProduct, "medias"> {
  _id: string;
  medias: IResource[];
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 0 },
  description: { type: String },
  price: { type: Number, required: true },
  medias: [{ type: Schema.Types.ObjectId, ref: "resources" }],
});

let ProductModel: Model<IProduct>;

try {
  ProductModel = model<IProduct>("products"); // Try to retrieve the existing model
} catch (error) {
  if ((error as Error).name === "MissingSchemaError") {
    ProductModel = model<IProduct>("products", productSchema); // Define the model if it doesn't exist
  } else {
    throw error; // Handle other potential errors
  }
}

export default ProductModel;
