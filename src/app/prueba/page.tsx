import { Center, List } from "@/lib/components";
import { Chip } from "@/lib/components/";
import { ChipVariant } from "@/lib/components/structure/chip/types";

export default async function TestPage() {
  const data: ChipVariant[] = [
    "elevated",
    "filled",
    "ghost",
    "outlined",
    "outlined-ghost",
  ];

  return (
    <div className="w-full h-full">
      <Center className="w-full h-screen">
        <List data={data} gap="20">
          {(item) => <Chip variant={item}> {item}</Chip>}
        </List>
      </Center>
    </div>
  );
}
