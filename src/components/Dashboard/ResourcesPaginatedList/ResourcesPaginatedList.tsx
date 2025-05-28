"use client";
import { IResource } from "@/db/models/resources";
import { Chip, Column, List, Row, T } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import Pagination from "@/lib/components/pagination";
import {
  formatBytes,
  formatRelativeDate,
  getFileNameAndExtension,
} from "@/lib/utils/formaters";
import { clsx } from "clsx";
import { useState } from "react";

export default function ResourcesPaginatedList({
  resources,
  className,
}: {
  className: string;
  resources: IResource[];
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
        {(item) => (
          <Row className="w-[100%] gap-3" key={item.name}>
            {/* <div className="w-[60px] h-[60px] bg-primary"></div> */}
            <ImageLoader
              className="w-[60px] h-[60px] rounded-2xl"
              src={item.url}
              alt={item.name}
              width={80}
              height={80}
            ></ImageLoader>
            <Column className="gap-1">
              <T type="span" className="text-primary-100 font-[500]">
                {getFileNameAndExtension(item.name).name}
              </T>
              <Row className="gap-1">
                <Chip className="border-1 text-xs" variant="outlined">
                  {formatBytes(item.size)}
                </Chip>
                <Chip className="border-1 text-xs" variant="outlined">
                  {formatRelativeDate(item.createdAt as string)}
                </Chip>
                <Chip className="border-1 text-xs" variant="outlined">
                  {getFileNameAndExtension(item.name).extension}
                </Chip>
              </Row>
            </Column>
          </Row>
        )}
      </List>
      <Pagination
        length={paginationLength}
        onChange={setCurrentPageIndex}
      ></Pagination>
    </Column>
  );
}
