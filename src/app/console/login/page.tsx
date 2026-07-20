import { getConsolePath } from "@/lib/env";
import { LoginForm } from "@/components/console/LoginForm";

export const dynamic = "force-dynamic";

export default function ConsoleLoginPage() {
  return <LoginForm redirectPath={`/${getConsolePath()}`} />;
}
