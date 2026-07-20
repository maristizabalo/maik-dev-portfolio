"use client";

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-1 p-4">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}

export function BarList({
  title,
  items,
}: {
  title: string;
  items: { label: string; count: number }[];
}) {
  const max = Math.max(1, ...items.map((item) => item.count));
  return (
    <div className="rounded-xl border border-line bg-surface-1 p-4">
      <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
        {title}
      </p>
      <div className="space-y-2.5">
        {items.length === 0 ? (
          <p className="text-xs text-muted">Sin datos</p>
        ) : (
          items.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="truncate text-ink">{item.label}</span>
                <span className="font-mono text-muted">{item.count}</span>
              </div>
              <div className="h-1 rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-signal"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
