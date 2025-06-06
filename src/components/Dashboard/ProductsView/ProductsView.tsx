"use client";
import Heading from "@/lib/components/blocks/headings/heading";
import { Page } from "@/lib/components/blocks/pages";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Chip, Column, Row, T } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";

import Space from "@/lib/components/layout/space";
import Button from "@/lib/components/button";
import { useNotification } from "@/lib/components/popups/components/notification/use-notification";
import { IProduct } from "@/db/models/product";
import PaginatedList from "@/components/PaginatedList";
import { AiFillProduct } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { IResource } from "@/db/models/resources";
import { deleteProduct } from "@/actions/products-actions";

export default function ProductsView({ products }: { products: IProduct[] }) {
  const router = useRouter();

  const { addNotification } = useNotification();

  const [productsList, setProductList] = useState(products);
  const [deleteSelectedButton, setDeleteSelectedButton] = useState(-1);

  return (
    <Page
      pt={{ header: { className: "pt-4" } }}
      slotHeader={
        <Heading
          className="px-4 gap-2 text-primary"
          heading="Products"
          slotBefore={<AiFillProduct />}
          slotAfter={
            <Button
              variant="surface"
              severity="primary"
              rounded="md"
              size="xs"
              dense
              icon={<FaPlusCircle />}
              label="Add Product"
              onClick={() => {
                router.push("/dashboard/products/new");
              }}
            />
          }
        />
      }
      slotBody={
        <PaginatedList className="mt-4" data={productsList} pageSize={9}>
          {(item, index) => (
            <Row className="w-[100%] gap-3" key={item.title}>
              {/* <div className="w-[60px] h-[60px] bg-primary"></div> */}
              <ImageLoader
                className="w-[60px] h-[60px] rounded-2xl"
                src={(item.medias[0] as IResource).url}
                alt={(item.medias[0] as IResource).name}
                width={80}
                height={80}
              ></ImageLoader>
              <Column className="gap-1">
                <T type="span" className="text-primary-100 font-[500]">
                  {item.title.length > 20
                    ? item.title.substring(0, 20) + "..."
                    : item.title}
                </T>
                <Row className="gap-1">
                  <Chip className="border-1 text-xs" variant="outlined">
                    {item.price} CUP
                  </Chip>
                  {/* <Chip className="border-1 text-xs" variant="outlined">
                    {}
                  </Chip> */}
                  {/*<Chip className="border-1 text-xs" variant="outlined">
                    {getFileNameAndExtension(item.name).extension}
                  </Chip>*/}
                </Row>
              </Column>
              <Space />
              <Button
                className="self-start text-xs"
                variant="surface"
                severity="error-container"
                rounded="md"
                dense
                icon={<FaTrash />}
                loading={deleteSelectedButton === index}
                onClick={async () => {
                  setDeleteSelectedButton(index);
                  const result = await deleteProduct(item._id);

                  if (result.status === 403) {
                    addNotification({
                      type: "error",
                      title: "Error en la operacion",
                      subtitle: result.message,
                      duration: 5000,
                    });
                  } else if (result.status === 200) {
                    if (result.data) {
                      addNotification({
                        type: "success",
                        title: "Recurso Eliminado con exito",
                        subtitle: "El elemento se elimino correctamente",
                        duration: 5000,
                      });
                      setProductList(
                        productsList.filter(
                          (product) => product._id !== result.data?._id
                        )
                      );
                    }
                  }

                  setDeleteSelectedButton(-1);
                }}
              />
            </Row>
          )}
        </PaginatedList>
      }
    />
  );
}
