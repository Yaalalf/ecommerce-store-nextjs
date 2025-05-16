import { Center } from "@/lib/components";
import { Chip } from "@/lib/components/";

export default async function TestPage() {
  return (
    <div className="w-full h-full">
      hola mundo
      <Center>
        <Chip> hola mundo como esta todo</Chip>
      </Center>
    </div>
  );
}
