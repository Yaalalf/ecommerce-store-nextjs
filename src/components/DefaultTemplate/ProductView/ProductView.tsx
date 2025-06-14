"use client";
import "./style/base.css";
import { IProductPopulated } from "@/db/models/product";
import { StyledBox, Card, Column, List, Row } from "@/lib/components";
import Button from "@/lib/components/button";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import { H } from "@/lib/components/text";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
export default function ProductView({
  product,
}: {
  product: IProductPopulated;
}) {
  const [fullUrl, setFullUrl] = useState("");
  const router = useRouter();
  const { medias, title, price, description } = product;
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const phoneNumber = "+5353301720";
  const whatsAppMessage = useMemo(
    () => `Buenas me gustaria este producto ${fullUrl}`,
    [fullUrl]
  );

  useEffect(() => {
    setFullUrl(window.location.href);
  }, []);

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
          <Button
            className="BackIconLink"
            onClick={() => {
              router.back();
            }}
          >
            <IoChevronBack className="BackIcon" />
          </Button>
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
      <Column className="ProductInfo" gap="gap-[12px]">
        <Row className="ImagesTabs">
          <List className="ImageList" data={medias} gap="gap-[20px]">
            {(media, index) => (
              <StyledBox
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
              </StyledBox>
            )}
          </List>
        </Row>
        <Row className="HeaderInfo w-full" justify="space-between">
          <H type="h2" className="TagName">
            {title}
          </H>
          <H className="PriceTag" type="h2">
            {price} CUP
          </H>
        </Row>
        <Column
          className="ProductDescription"
          dangerouslySetInnerHTML={{ __html: description }}
          gap="gap-[12px]"
        ></Column>
        <a
          href={`https://wa.me/${phoneNumber}?text=${whatsAppMessage}`}
          className="WhatsappAnchor"
        >
          <FaWhatsapp className="Icon" /> Compra Ahora
        </a>
      </Column>
    </Card>
  );
}
