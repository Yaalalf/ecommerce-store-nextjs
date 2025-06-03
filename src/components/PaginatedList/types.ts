import { IListProps } from "@/lib/components/structure/list/types";

export interface IPaginatedList<T> extends IListProps<T> {
  pageSize: number;
}
