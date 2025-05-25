// import { permanentRedirect } from "next/navigation";

import { auth0 } from "@/auth/auth0";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/dashboard/need-login");
  }

  return (
    <div className="DashboardPage">
      <a href="/auth/logout?returnTo=http://localhost:3000/dashboard">Logout</a>
      {session?.user.name} {session?.user.email}
    </div>
  );
}
