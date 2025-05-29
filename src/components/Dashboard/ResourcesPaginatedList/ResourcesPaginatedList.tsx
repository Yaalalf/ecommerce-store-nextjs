"use client";
import { IResource } from "@/db/models/resources";
import { Column, List } from "@/lib/components";
import Pagination from "@/lib/components/pagination";

import { clsx } from "clsx";
import { ReactNode, useState } from "react";

export default function ResourcesPaginatedList({
  resources,
  className,
  children,
}: {
  className: string;
  resources: IResource[];
  children: (item: IResource, index: number) => ReactNode;
}) {
  const pageSize = 9;
  const paginationLength = Math.ceil(resources.length / pageSize);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const paginatedList = clsx("paginated-list", "px-4 gap-2", className);

  const paginatedResources = resources.slice(
    currentPageIndex * pageSize,
    currentPageIndex * pageSize + pageSize
  );

  return (
    <Column className="gap-4">
      <List
        className={paginatedList}
        data={paginatedResources}
        direction="column"
      >
        {children}
      </List>
      <Pagination
        length={paginationLength}
        onChange={setCurrentPageIndex}
      ></Pagination>
    </Column>
  );
}
