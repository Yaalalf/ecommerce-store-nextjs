import { Center, Column, List, StyledBox } from "@/lib/components";
import { Chip } from "@/lib/components/";
import { ChipVariant } from "@/lib/components/structure/chip/types";
import {
  StyledBoxSeverity,
  StyledBoxVariant,
} from "@/lib/components/structure/styled-box/types";

export default async function TestPage() {
  const dataChip: ChipVariant[] = [
    "elevated",
    "filled",
    "ghost",
    "outlined",
    "outlined-ghost",
  ];

  const dataStyledBox: {
    variant: StyledBoxVariant;
    severity: StyledBoxSeverity;
  }[] = [
    { variant: "surface", severity: "base" },
    { variant: "surface", severity: "primary" },
    { variant: "surface", severity: "primary-container" },
    { variant: "surface", severity: "error" },
    { variant: "surface", severity: "error-container" },
  ];

  return (
    <div className="w-full h-full bg-[#eaeaea]">
      <Center className="w-full h-screen">
        <Column gap="20">
          <List data={dataChip} gap="20">
            {(item) => <Chip variant={item}> {item}</Chip>}
          </List>
          <List
            className="w-[100%]"
            data={dataStyledBox}
            gap="20"
            direction="column"
            pt={{ item: { className: "w-[100%]" } }}
          >
            {(item) => (
              <StyledBox
                className="w-[100%]"
                variant={item.variant}
                severity={item.severity}
              >
                {item.variant + " " + item.severity}
              </StyledBox>
            )}
          </List>
        </Column>
      </Center>
    </div>
  );
}
