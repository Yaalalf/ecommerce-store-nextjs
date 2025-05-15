import type { Model, Types } from "mongoose";
import { model, Schema } from "mongoose";
import { IResource } from "./resource";

export interface IPromotional {
  medias: Types.ObjectId[];
}

export interface IPromotionalPopulated {
  _id: string;
  medias: IResource[];
}

const promotionalSchema = new Schema<IPromotional>({
  medias: [{ type: Schema.Types.ObjectId, ref: "resources" }],
});

let PromotionalModel: Model<IPromotional>;

try {
  PromotionalModel = model<IPromotional>("promotionals"); // Try to retrieve the existing model
} catch (error) {
  if ((error as Error).name === "MissingSchemaError") {
    PromotionalModel = model<IPromotional>("promotionals", promotionalSchema); // Define the model if it doesn't exist
  } else {
    throw error; // Handle other potential errors
  }
}

export default PromotionalModel;
