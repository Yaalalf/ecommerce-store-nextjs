"use client";
import "./style/base.css";
import { IProductPopulated } from "@/db/models/product";
import { Box, Card, Column, List, Row } from "@/lib/components";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import { H } from "@/lib/components/text";
import Link from "next/link";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
export default function ProductView({
  product,
}: {
  product: IProductPopulated;
}) {
  const { medias, title, price, description } = product;

  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  return (
    <Card
      dense
      className="ProductView"
      pt={{
        header: { className: "ProductViewHeaderContainer" },
        body: { className: "ProductInfoContainer" },
      }}
      slotHeader={
        <Column className="ProductViewHeader">
          <Link className="BackIconLink" href={"/"}>
            <IoChevronBack className="BackIcon" />
          </Link>
          <ImageLoader
            className="ProductImage"
            src={medias[selectedMediaIndex].url}
            alt={medias[selectedMediaIndex].name}
            width={1080}
            height={1080}
            priority
          ></ImageLoader>
        </Column>
      }
    >
      <Column className="ProductInfo" gap="12">
        <Row className="ImagesTabs">
          <List data={medias} gap="20">
            {(media, index) => (
              <Box
                dense
                className={`ImagesTabsItem ${
                  selectedMediaIndex === index ? "selected" : ""
                }`}
              >
                <ImageLoader
                  className="ImagesTabsItemImage"
                  key={media.name}
                  src={media.url}
                  alt={media.name}
                  width={1080}
                  height={1080}
                  priority
                  onClick={() => setSelectedMediaIndex(index)}
                ></ImageLoader>
              </Box>
            )}
          </List>
        </Row>
        <Row justify="space-between">
          <H type="h2">{title}</H>
          <H className="PriceTag" type="h2">
            ${price}
          </H>
        </Row>
        <Column
          className="ProductDescription"
          dangerouslySetInnerHTML={{ __html: description }}
          gap="12"
        ></Column>
      </Column>
    </Card>
  );
}
