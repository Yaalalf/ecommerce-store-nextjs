import { auth0 } from "@/auth/auth0";
import Header from "@/features/dashboard/header";
import Dashboard from "@/lib/components/layout/dashboard";
import { NotificationProvider } from "@/lib/components/popups/components/notification/notification-context";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();

  if (!session) {
    await redirect("auth/login");
  }

  return (
    <>
      {session && (
        <NotificationProvider position="top-right">
          <Dashboard slotHeader={<Header />}>{children}</Dashboard>
        </NotificationProvider>
      )}
    </>
  );
}
