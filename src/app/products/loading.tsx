import Spinner from "@/lib/components/misc/spinner";
import "./base.css";
import { Center } from "@/lib/components";

export default function ProductLoading() {
  return (
    <Center className="ProductLoading">
      <Spinner></Spinner>
    </Center>
  );
}
