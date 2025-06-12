import { ICollection } from "@/db/models/collections";
import { IProduct } from "@/db/models/product";
import { IResource } from "@/db/models/resources";

/**
 * All View
 */
export interface ICollectionsView
  extends Omit<ICollection, "media" | "products"> {
  media: IResource;
  products: IProduct[];
}
/**
 * Add
 */
export type ICollectionsAdd = Omit<ICollection, "products" | "_id">;
