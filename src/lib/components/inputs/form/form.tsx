import { IFromProps } from "./types";

export default function Form({ className, children, ...domProps }: IFromProps) {
  return (
    <form className={className} {...domProps}>
      {children}
    </form>
  );
}
