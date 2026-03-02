import { requireAdmin } from "@/app/actions/admin";
import { getSubmissions } from "@/lib/submissions";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Dashboard — Vertex Digital Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await requireAdmin();
  const submissions = getSubmissions();

  return <DashboardClient submissions={submissions} />;
}
