"use client";
import { List } from "@/lib/components";
import "./base.css";
import Link from "next/link";
import { MdStore } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { TbCategory } from "react-icons/tb";
import { usePathname } from "next/navigation";

export default function MainFooter() {
  const pathName = usePathname();
  console.log(pathName);
  const listData = [
    { href: "/", icon: MdStore },
    { href: "/categories", icon: IoMdSearch },
    { href: "/search", icon: TbCategory },
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
            className={`${pathName === item.href ? "selected" : ""}`}
            href={item.href}
          >
            <item.icon className="Icon" />
          </Link>
        )}
      </List>
    </footer>
  );
}
