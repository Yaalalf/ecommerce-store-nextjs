import { EHType, HType, IHProps } from "./types";

export default function H({
  children,
  text,
  type = "h2",
  className = "",
  ...domProps
}: IHProps) {
  const Component = type;

  function selectTypeClass({ type = EHType.h1 }: { type: HType | undefined }) {
    switch (type) {
      case EHType.h1:
        return "text-h1";
      case EHType.h2:
        return "text-h2";
      case EHType.h3:
        return "text-h3";
      case EHType.h4:
        return "text-h4";
      case EHType.h5:
        return "text-h5";
      case EHType.h6:
        return "text-h6";
      default:
        throw new Error(
          `Invalid size prop: ${type}. Expected one of: ${Object.values(
            EHType
          ).join(", ")}`
        );
    }
  }

  return (
    <Component
      {...domProps}
      className={`${className} h ${selectTypeClass({ type })}`}
    >
      {children ? children : text}
    </Component>
  );
}
