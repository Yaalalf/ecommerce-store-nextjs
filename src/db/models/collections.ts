import type { Model, ObjectId } from "mongoose";
import { model, Schema } from "mongoose";
import { IResource } from "./resources";
import { IProductPopulated } from "./product";

export interface ICollection {
  _id: ObjectId;
  title: string;
  description: string;

  media: ObjectId;
  products: ObjectId[] | [];
}

export interface ICollectionPopulated {
  _id: ObjectId;
  title: string;
  description: string;

  media: IResource;
  products: IProductPopulated[];
}

const collectionSchema = new Schema<ICollection>({
  title: { type: String, required: true },
  description: { type: String },
  media: { type: Schema.Types.ObjectId, ref: "resources" },
  products: {
    type: [{ type: Schema.Types.ObjectId, ref: "products" }],
    default: [],
  },
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
