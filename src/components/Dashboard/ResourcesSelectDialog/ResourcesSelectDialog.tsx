"use client";

import PaginatedList from "@/components/PaginatedList";
import { IResource } from "@/db/models/resources";
import { Center, Column, List, Row, StyledBox, T } from "@/lib/components";
import Button from "@/lib/components/button";
import Dialog from "@/lib/components/popups/components/dialog";
import Input from "@/lib/components/inputs/input";
import useStyledInput from "@/lib/components/inputs/input/use-styled-input";
import ImageLoader from "@/lib/components/misc/next-component/image-loader";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlinePermMedia } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export default function ResourcesSelectDialog({
  initResources = [],
  resources,
  onSelectedResources,
}: {
  initResources?: IResource[];
  resources: IResource[];
  onSelectedResources?: (selected: IResource[]) => void;
}) {
  const { inputContainer } = useStyledInput({
    variant: "outlined",
    severity: "primary",
  });

  const [search, setSearch] = useState("");

  const [selectedResources, setSelectedResources] =
    useState<IResource[]>(initResources);
  const [isDialog, setIsDialog] = useState(false);
  const filteredResources = resources.filter((resource) => {
    return resource.name.toLowerCase().match(search.toLowerCase());
  });

  return (
    <Row
      className={twMerge("h-[200px] ", inputContainer())}
      align="center"
      justify="center"
    >
      {selectedResources.length > 0 && (
        <List
          className="w-[100%] h-[100%] grid grid-cols-3 gap-4 auto-rows-[80px]"
          unwrap
          data={selectedResources}
        >
          {(selected, index) => (
            <>
              <div className="relative">
                <ImageLoader
                  className="w-[100%] h-[100%] rounded-2xl"
                  src={selected.url}
                  alt={selected.name}
                  width={80}
                  height={80}
                ></ImageLoader>
                <StyledBox
                  className="absolute bottom-0 bg-primary-container/80"
                  variant="surface"
                  severity="primary-container"
                >
                  <T className="text-[length:10px]">{selected.name}</T>
                </StyledBox>
              </div>

              {selectedResources.length === index + 1 && (
                <Button
                  variant="outlined"
                  severity="primary"
                  onClick={() => {
                    setIsDialog(true);
                  }}
                >
                  Change Selection
                </Button>
              )}
            </>
          )}
        </List>
      )}
      {selectedResources.length === 0 && (
        <Button
          rounded="md"
          icon={<MdOutlinePermMedia />}
          dense
          size="xs"
          variant="surface"
          severity="primary"
          onClick={() => {
            setIsDialog(true);
          }}
        >
          Select Resources
        </Button>
      )}

      <Dialog
        open={isDialog}
        onClose={() => {
          setIsDialog(false);
        }}
      >
        <StyledBox>
          <Column className="gap-2 relative ">
            <Center className="py-3 px-5 bg-white w-full ">
              <Input
                className="w-full"
                variant="outlined"
                severity="primary"
                value={search}
                onChange={setSearch}
                slotPrepend={<IoSearchSharp className="text-lg" />}
              ></Input>
            </Center>
            <PaginatedList
              className="p-5 pt-0 pb-0 w-full grid grid-cols-2 gap-3"
              data={filteredResources}
              direction="column"
              propKey="_id"
              pageSize={8}
            >
              {(resource) => (
                <StyledBox
                  onClick={() => {
                    const indexOfResource = selectedResources.findIndex(
                      (r) => r?._id == resource._id
                    );

                    if (indexOfResource >= 0) {
                      if (indexOfResource === 0) {
                        setSelectedResources([...selectedResources.slice(1)]);
                      } else if (
                        indexOfResource ===
                        selectedResources.length - 1
                      ) {
                        setSelectedResources([
                          ...selectedResources.slice(0, indexOfResource),
                        ]);
                      } else {
                        setSelectedResources([
                          ...selectedResources.slice(0, indexOfResource),
                          ...selectedResources.slice(indexOfResource + 1),
                        ]);
                      }
                    } else {
                      setSelectedResources([...selectedResources, resource]);
                    }
                  }}
                  dense
                  variant={
                    selectedResources.find((r) => r._id === resource._id)
                      ? "surface"
                      : "outlined"
                  }
                  severity="primary"
                >
                  <Column className="w-full " align="center">
                    <ImageLoader
                      className="w-[80px] h-[80px] rounded-2xl"
                      src={resource.url}
                      alt={resource.name}
                      width={80}
                      height={80}
                    ></ImageLoader>
                    <T type="p" className="w-[140px] truncate">
                      {resource.name}
                    </T>
                  </Column>
                </StyledBox>
              )}
            </PaginatedList>
            <Row className="gap-2 pb-4 px-5" justify="end">
              <Button
                onClick={() => {
                  if (onSelectedResources)
                    onSelectedResources(selectedResources);

                  setIsDialog(false);
                }}
                size="xs"
                variant="surface"
                severity="primary"
              >
                Select
              </Button>
              <Button
                onClick={() => {
                  setIsDialog(false);
                }}
                size="xs"
                variant="flatted"
                severity="base"
              >
                Cancel
              </Button>
            </Row>
          </Column>
        </StyledBox>
      </Dialog>
    </Row>
  );
}
