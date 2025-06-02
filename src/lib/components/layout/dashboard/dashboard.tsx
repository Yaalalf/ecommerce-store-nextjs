import { IChildren } from "@/lib/types/components-props";
import useStyledDashboard from "./use-styled-dashboard";
import { ReactNode } from "react";

export default function Dashboard({
  children,
  slotLeftDrawer,
}: { slotLeftDrawer?: ReactNode } & Partial<IChildren>) {
  const { container, content, leftDrawer, rightDrawer } =
    useStyledDashboard()();

  return (
    <div className={container({ className: "dashboard" })}>
      <div className={leftDrawer({ className: "dashboard-left-drawer" })}>
        {slotLeftDrawer}
      </div>
      <div className={content({ className: "dashboard-content" })}>
        {children}
      </div>
      <div
        className={rightDrawer({ className: "dashboard-right-drawer" })}
      ></div>
    </div>
  );
}
