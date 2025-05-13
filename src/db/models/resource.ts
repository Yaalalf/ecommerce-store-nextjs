import type { Model } from "mongoose";
import { model, Schema } from "mongoose";

export interface IResource {
  name: string;
  url: string;
}

const resourceSchema = new Schema<IResource>({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

let ResourceModel: Model<IResource>;

try {
  ResourceModel = model<IResource>("resources"); // Try to retrieve the existing model
} catch (error) {
  if ((error as Error).name === "MissingSchemaError") {
    ResourceModel = model<IResource>("resources", resourceSchema); // Define the model if it doesn't exist
  } else {
    throw error; // Handle other potential errors
  }
}

export default ResourceModel;
