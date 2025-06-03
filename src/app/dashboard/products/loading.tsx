"use client";
import Spinner from "@/lib/components/misc/spinner";
import "./base.css";
import { Center } from "@/lib/components";

export default function InitLoading() {
  return (
    <Center className="InitLoading">
      <Spinner></Spinner>
    </Center>
  );
}
