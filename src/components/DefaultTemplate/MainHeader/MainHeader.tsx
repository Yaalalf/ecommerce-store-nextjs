"use client";

import { Center } from "@/lib/components";
import "./base.css";
import { H } from "@/lib/components/text";
import VisibilityObserver from "@/lib/components/misc/visibility-observer/visibility-observer";
import { useState } from "react";

export default function MainHeader() {
  const [isMiniState, setIsMiniState] = useState(false);

  return (
    <>
      <VisibilityObserver
        className="HeaderIntersector"
        onVisibility={(entry) => {
          setIsMiniState(!entry.isIntersecting);
        }}
      />
      <header className={`MainHeader ${isMiniState ? "mini" : ""}`}>
        <Center className="Center">
          <H className="Header" type="h1">
            Catálogo de Olivia Shop
          </H>
        </Center>
      </header>
    </>
  );
}
