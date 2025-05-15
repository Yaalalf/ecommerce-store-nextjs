import Spinner from "@/lib/components/misc/spinner";
import "./base.css";
import { Center } from "@/lib/components";

export default function SearchLoading() {
  return (
    <Center className="SearchLoading">
      <Spinner></Spinner>
    </Center>
  );
}
