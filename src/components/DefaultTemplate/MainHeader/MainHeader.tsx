"use client";

import { Column } from "@/lib/components";
import "./base.css";
import { H } from "@/lib/components/text";
import VisibilityObserver from "@/lib/components/misc/visibility-observer/visibility-observer";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

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
        <Column className="Center" align="center" gap="4">
          <H className="Header" type="h1">
            Catálogo de Olivia Shop
          </H>
          {isMiniState || (
            <H className="SubHeader" type="h2">
              Todos nuestros productos en un solo lugar
            </H>
          )}
          {isMiniState || (
            <H className="Cheap" type="h3">
              <FiPlusCircle /> de 100 productos para tu confort y calidad
            </H>
          )}
        </Column>
      </header>
    </>
  );
}
