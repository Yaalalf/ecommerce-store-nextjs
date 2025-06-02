import { auth0 } from "@/auth/auth0";
import Dashboard from "@/lib/components/layout/dashboard";
import { NotificationProvider } from "@/lib/components/notification/notification-context";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();

  if (!session) {
    await redirect("auth/login?returnTo=/dashboard");
  }

  return (
    <div>
      {session && (
        <NotificationProvider position="top-right">
          <Dashboard>{children}</Dashboard>
        </NotificationProvider>
      )}
    </div>
  );
}
