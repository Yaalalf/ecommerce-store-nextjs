"use client";
import { Center, Column } from "@/lib/components";
import Autocomplete from "@/lib/components/inputs/autocomplete/autocomplete";
import { useState } from "react";

export default function ReactPage() {
  const [name, setName] = useState("");

  return (
    <Center className="w-screen h-screen">
      <Column>
        <Autocomplete
          value={name}
          suggestions={[0, 1, 2, 3, 4, 5]}
          onChange={(e) => setName(e)}
        ></Autocomplete>
      </Column>
    </Center>
  );
}
