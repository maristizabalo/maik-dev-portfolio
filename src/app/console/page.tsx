import { getConsolePath } from "@/lib/env";
import { ConsoleDashboard } from "@/components/console/ConsoleDashboard";

export const dynamic = "force-dynamic";

export default function ConsolePage() {
  return <ConsoleDashboard loginPath={`/${getConsolePath()}/login`} />;
}
