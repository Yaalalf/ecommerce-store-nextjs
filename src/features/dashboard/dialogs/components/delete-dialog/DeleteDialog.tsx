"use client";

import { Column, StyledBox } from "@/lib/components";
import Heading from "@/lib/components/blocks/headings/heading";
import Button from "@/lib/components/button";
import Dialog from "@/lib/components/popups/components/dialog";
import { IDialog } from "@/lib/components/popups/components/dialog/types";
import { useRef, useState } from "react";
import { IoIosWarning } from "react-icons/io";

export default function DeleteDialog({
  heading,
  subheading,
  onDelete,
}: {
  heading: string;
  subheading: string;
  onDelete: () => Promise<void>;
}) {
  const [deleteSelectedButton, setDeleteSelectedButton] = useState(false);
  const dialogRef = useRef<IDialog | null>(null);

  return (
    <Dialog ref={dialogRef} canTriggerParent>
      <StyledBox
        className="w-[360px]"
        variant="surface"
        severity="error-container"
      >
        <Column className="gap-2">
          <Heading
            className="gap-2 items-start"
            slotBefore={<IoIosWarning className="text-[60px]" />}
            heading={heading}
            subheading={subheading}
            pt={{ subheading: { className: "text-[14px]" } }}
          ></Heading>
          <Button
            loading={deleteSelectedButton}
            severity="error"
            onClick={async () => {
              setDeleteSelectedButton(true);
              await onDelete();
              dialogRef.current?.close();
              setDeleteSelectedButton(false);
            }}
          >
            Eliminar
          </Button>
        </Column>
      </StyledBox>
    </Dialog>
  );
}
