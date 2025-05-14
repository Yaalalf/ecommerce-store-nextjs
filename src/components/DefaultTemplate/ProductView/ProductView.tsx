import "./style/base.css";
import { IProductPopulated } from "@/db/models/product";
import { Card, Column, Row } from "@/lib/components";
import { H } from "@/lib/components/text";
import Image from "next/image";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
export default function ProductView({
  product,
}: {
  product: IProductPopulated;
}) {
  const { medias, title, price, description } = product;

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
            src={medias[0].url}
            alt={medias[0].name}
            fill
          ></Image>
        </Column>
      }
    >
      <Column className="ProductInfo" gap="12">
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
