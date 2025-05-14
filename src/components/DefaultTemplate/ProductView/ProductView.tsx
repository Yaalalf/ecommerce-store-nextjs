"use client";
import "./style/base.css";
import { IProductPopulated } from "@/db/models/product";
import { Box, Card, Column, List, Row } from "@/lib/components";
import { H } from "@/lib/components/text";
import Image from "next/image";
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
          <Link className="BackIconLink" href={"/products"}>
            <IoChevronBack className="BackIcon" />
          </Link>
          <Image
            className="ProductImage"
            src={medias[selectedMediaIndex].url}
            alt={medias[selectedMediaIndex].name}
            fill
          ></Image>
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
                <Image
                  className="ImagesTabsItemImage"
                  key={media.name}
                  src={media.url}
                  alt={media.name}
                  width={56}
                  height={56}
                  onClick={() => setSelectedMediaIndex(index)}
                ></Image>
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
