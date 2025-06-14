"use client";
import { List } from "@/lib/components";
import "./base.css";
import Link from "next/link";
import { MdStore } from "react-icons/md";
// import { IoMdSearch } from "react-icons/io";
import { TbCategory } from "react-icons/tb";
import { usePathname } from "next/navigation";
import FloatingWhatsappButton from "../FloatingWhatsappButton/FloatingWhatsappButton";
import FloatingDeliveryButton from "../FloatingDeliveryButton/FloatingDeliveryButton";

export default function MainFooter() {
  const pathName = usePathname();

  const listData = [
    { href: "/", icon: MdStore },
    // { href: "/search", icon: IoMdSearch },
    { href: "/categories", icon: TbCategory },
  ];

  return (
    <footer className="MainFooter">
      <List
        className="List"
        justify="space-evenly"
        align="center"
        data={listData}
      >
        {(item) => (
          <Link
            className={`ItemLink ${pathName === item.href ? "selected" : ""}`}
            href={item.href}
          >
            <item.icon className="Icon" />
          </Link>
        )}
      </List>
      <FloatingWhatsappButton />
      <FloatingDeliveryButton />
    </footer>
  );
}
