import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  container = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-24 md:py-32", className)}>
      {container ? (
        <div className="mx-auto max-w-content px-5 md:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
