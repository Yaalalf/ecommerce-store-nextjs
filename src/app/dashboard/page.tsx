import { Column } from "@/lib/components";

export default async function DashboardPage() {
  return (
    <>
      <Column className="DashboardPage w-[100%] h-[100vh] items-center justify-center gap-8">
        <a href="/auth/logout">Logout</a>
      </Column>
    </>
  );
}
