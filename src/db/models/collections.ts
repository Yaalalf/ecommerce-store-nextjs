import type { Model, Types } from "mongoose";
import { model, Schema } from "mongoose";
import { IResource } from "./resource";
import { IProductPopulated } from "./product";

export interface ICollection {
  title: string;
  description: string;

  media: Types.ObjectId;
  products: Types.ObjectId[] | [];
}

export interface ICollectionPopulated {
  _id: string;
  title: string;
  description: string;

  media: IResource;
  products: IProductPopulated[];
}

const collectionSchema = new Schema<ICollection>({
  title: { type: String, required: true },
  description: { type: String },
  media: { type: Schema.Types.ObjectId, ref: "resources" },
  products: [{ type: Schema.Types.ObjectId, ref: "products" }],
});

let CollectionModel: Model<ICollection>;

try {
  CollectionModel = model<ICollection>("collections"); // Try to retrieve the existing model
} catch (error) {
  if ((error as Error).name === "MissingSchemaError") {
    CollectionModel = model<ICollection>("collections", collectionSchema); // Define the model if it doesn't exist
  } else {
    throw error; // Handle other potential errors
  }
}

export default CollectionModel;
