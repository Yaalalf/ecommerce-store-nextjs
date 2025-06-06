"use client";

import { Column, H, List, Row, StyledBox } from "@/lib/components";
import Heading from "@/lib/components/blocks/headings/heading";
import Button from "@/lib/components/button";
import Drawer from "@/lib/components/popups/components/drawer";
import Space from "@/lib/components/layout/space";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaFileImage } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";

export default function Header() {
  const pathname = usePathname();

  const [isDrawer, setIsDrawer] = useState(false);
  return (
    <Row
      className="bg-primary-400 text-on-primary h-[60px] gap-2 items-center justify-between px-8"
      tag="header"
    >
      <Heading
        className="gap-1 items-end"
        pt={{
          headingContainer: {
            className: "gap-0",
          },
        }}
        slotBefore={
          <StyledBox dense>
            <ImageLoader
              className="w-[28px] h-[28px]"
              src="/logo.webp"
              alt="logo"
              width={40}
              height={40}
            ></ImageLoader>
          </StyledBox>
        }
        slotHeading={<H className="leading-[20px]">Jirehlix</H>}
        slotSubHeading={
          <H type="h3" className="text-xs font-bold">
            Catalog Builder
          </H>
        }
      />
      <Space />
      <Button
        className="w-[40px] h-[40px] text-lg"
        icon={<IoMenu className="text-primary-400" />}
        dense
        onClick={() => {
          setIsDrawer(true);
        }}
      >
        <Drawer
          open={isDrawer}
          onClose={() => {
            console.log("hice close");
            setIsDrawer(false);
          }}
        >
          <Column className="w-[200px] p-4 gap-5">
            <Row className="justify-between items-center">
              <H severity="primary" type="h3">
                Jirehlix
              </H>

              <Button
                dense
                rounded="md"
                variant="outlined"
                severity="primary"
                icon={<GrClose className="text-md" />}
                onClick={() => {
                  console.log("Cerrar", isDrawer);
                  setIsDrawer(false);
                }}
              />
            </Row>
            <List
              className="gap-2"
              direction="column"
              data={[
                {
                  label: "products",
                  to: "/dashboard/products",
                  icon: <AiFillProduct />,
                },
                {
                  label: "resources",
                  to: "/dashboard/resources",
                  icon: <FaFileImage />,
                },
              ]}
            >
              {(item) => (
                <Link
                  className="w-full h-full"
                  onNavigate={() => {
                    console.log("hice click");
                    setIsDrawer(false);
                  }}
                  href={item.to}
                >
                  <Button
                    dense
                    icon={item.icon}
                    variant={pathname.match(item.to) ? "surface" : "outlined"}
                    severity="primary"
                  >
                    {item.label}
                  </Button>
                </Link>
              )}
            </List>
          </Column>
        </Drawer>
      </Button>
    </Row>
  );
}
