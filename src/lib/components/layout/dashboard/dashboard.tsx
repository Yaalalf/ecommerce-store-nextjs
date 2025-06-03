import { IChildren } from "@/lib/types/components-props";
import useStyledDashboard from "./use-styled-dashboard";
import { ReactNode } from "react";

export default function Dashboard({
  children,
  slotLeftDrawer,
  slotHeader,
}: {
  slotLeftDrawer?: ReactNode;
  slotHeader?: ReactNode;
} & Partial<IChildren>) {
  const {
    cl_container,
    cl_content,
    cl_header,
    cl_left_drawer,
    cl_right_drawer,
  } = useStyledDashboard()();

  return (
    <div className={cl_container({ className: "dashboard" })}>
      <div className={cl_header({ className: "dashboard-header" })}>
        {slotHeader}
      </div>
      <div className={cl_left_drawer({ className: "dashboard-left-drawer" })}>
        {slotLeftDrawer}
      </div>
      <div className={cl_content({ className: "dashboard-content" })}>
        {children}
      </div>
      <div
        className={cl_right_drawer({ className: "dashboard-right-drawer" })}
      ></div>
    </div>
  );
}
