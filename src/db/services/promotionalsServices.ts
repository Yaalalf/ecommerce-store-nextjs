import { Model } from "mongoose";
import PromotionalModel, {
  IPromotional,
  IPromotionalPopulated,
} from "../models/promotionals";
import ResourceServices from "./resourceServices";

export default class PromotionalServices {
  public model: Model<IPromotional>;

  constructor() {
    this.model = PromotionalModel;
  }
  async getAllPromotionals(): Promise<IPromotionalPopulated[]> {
    try {
      new ResourceServices();
      const promotional = await PromotionalModel.find({}).populate("medias");
      return promotional as unknown as IPromotionalPopulated[];
    } catch (error) {
      console.error(
        `Error en la operacion de obtener los promotionals: ${error}`
      );
    }
    return [];
  }
  async getPromotionalById({
    id,
  }: {
    id: string;
  }): Promise<IPromotionalPopulated | undefined> {
    try {
      new ResourceServices();
      const promotional = await PromotionalModel.findById(id).populate(
        "medias"
      );

      return promotional as unknown as IPromotionalPopulated;
    } catch (error) {
      console.error(
        `Error en la operacion de obtener la promotional: ${error}`
      );
    }
  }
  async addPromotional(promotional: IPromotional) {
    try {
      const promotionalDocument = new PromotionalModel(promotional);
      const resultDocument = await promotionalDocument.save({
        validateBeforeSave: true,
      });
      return resultDocument._id;
    } catch (error) {
      console.error(
        `Error en la operacion de guardar la promotional: ${error}`
      );
    }
  }
  async updatePromotionalById(
    filter: { _id: string },
    update: Partial<IPromotional>
  ) {
    try {
      const result = await PromotionalModel.findOneAndUpdate(filter, update);
      return result;
    } catch (error) {
      console.error(`Error en la operacion de editar la coleccion: ${error}`);
    }
  }
  async deletePromotionalById({ id }: { id: string }) {
    try {
      const result = await PromotionalModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(`Error en la operacion de guardar la coleccion: ${error}`);
    }
  }
}
