import { Flex, H } from "@/lib/components";

export default async function TestPage() {
  return (
    <div className="full-width full-height">
      hola mundo
      <Flex
        tag={{ component: H, props: { type: "h5", textStyle: "body2" } }}
        gap="4"
        direction="column"
      >
        <span> Hola mundo </span> <span>que tal </span> como va todo
      </Flex>
    </div>
  );
}
