import Spinner from "@/lib/components/misc/spinner";
import "./base.css";
import { Center } from "@/lib/components";

export default function CategoryLoading() {
  return (
    <Center className="CategoryLoading">
      <Spinner></Spinner>
    </Center>
  );
}
