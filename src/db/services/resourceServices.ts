import { Model } from "mongoose";
import ResourceModel, { IResource } from "../models/resource";

export default class ResourceServices {
  public model: Model<IResource>;
  constructor() {
    this.model = ResourceModel;
  }
  async getAllResources() {
    try {
      const resources = await ResourceModel.find({});
      return resources;
    } catch (error) {
      console.error(`Error en la operacion de obtener los recursos: ${error}`);
    }
  }
  async getResourceById({ id }: { id: string }) {
    try {
      const resource = await ResourceModel.findById(id);

      return resource;
    } catch (error) {
      console.error(`Error en la operacion de obtener los recursos: ${error}`);
    }
  }
  async addResource(resource: IResource) {
    try {
      const resourceDocument = new ResourceModel(resource);
      const resultDocument = await resourceDocument.save({
        validateBeforeSave: true,
      });
      return resultDocument._id;
    } catch (error) {
      console.error(`Error en la operacion de guardar el recurso: ${error}`);
    }
  }

  async deleteResourceById({ id }: { id: string }) {
    try {
      const result = await ResourceModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(`Error en la operacion de guardar el recurso: ${error}`);
    }
  }
}
