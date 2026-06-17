import { notFound } from "next/navigation";
import PrivateVisitsDashboard from "@/components/analytics/private/PrivateVisitsDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivateVisitsPage({ params }) {
  const { secret } = await params;
  const secretPath = process.env.ANALYTICS_SECRET_PATH;

  if (!secretPath || secret !== secretPath) {
    notFound();
  }

  return <PrivateVisitsDashboard />;
}
