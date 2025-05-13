import "./style/base.css";
import { IProductPopulated } from "@/db/models/product";
import { Card, Column } from "@/lib/components";
import Image from "next/image";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
export default function ProductView({
  product,
}: {
  product: IProductPopulated;
}) {
  const { medias } = product;

  return (
    <Card
      dense
      className="ProductView"
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
    ></Card>
  );
}
