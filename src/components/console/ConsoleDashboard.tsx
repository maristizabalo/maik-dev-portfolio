"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowClockwise, SignOut, Sparkle } from "@phosphor-icons/react";
import { StatCard, BarList } from "./ui";

type Bar = { label: string; count: number };

type Overview = {
  totals: {
    visitors: number;
    sessions: number;
    pageViews: number;
    events: number;
    conversions: number;
    avgSessionSeconds: number;
    bounceRate: number;
    avgScrollDepth: number;
  };
  byCountry: Bar[];
  bySource: Bar[];
  byDevice: Bar[];
  topPages: Bar[];
  byEvent: Bar[];
  chat: { conversations: number; messages: number; unanswered: number };
  contact: { total: number; unread: number };
};

type Submission = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: string;
  created_at: string;
};

const EMPTY: Overview = {
  totals: {
    visitors: 0,
    sessions: 0,
    pageViews: 0,
    events: 0,
    conversions: 0,
    avgSessionSeconds: 0,
    bounceRate: 0,
    avgScrollDepth: 0,
  },
  byCountry: [],
  bySource: [],
  byDevice: [],
  topPages: [],
  byEvent: [],
  chat: { conversations: 0, messages: 0, unanswered: 0 },
  contact: { total: 0, unread: 0 },
};

const PERIODS = [
  { id: "7d", label: "7 días" },
  { id: "30d", label: "30 días" },
  { id: "90d", label: "90 días" },
  { id: "year", label: "Año" },
  { id: "all", label: "Histórico" },
];

function seconds(value: number) {
  const m = Math.floor(value / 60);
  const s = Math.round(value % 60);
  return `${m}m ${s}s`;
}

export function ConsoleDashboard({ loginPath }: { loginPath: string }) {
  const router = useRouter();
  const [period, setPeriod] = useState("30d");
  const [data, setData] = useState<Overview>(EMPTY);
  const [messages, setMessages] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [overview, inbox] = await Promise.all([
        fetch(`/api/console/overview?period=${period}`).then((r) => r.json()),
        fetch(`/api/console/messages`).then((r) => r.json()),
      ]);
      setData({ ...EMPTY, ...overview });
      setMessages(inbox.submissions ?? []);
    } catch {
      setData(EMPTY);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    const id = setTimeout(() => void load(), 0);
    return () => clearTimeout(id);
  }, [load]);

  const logout = async () => {
    await fetch("/api/console/logout", { method: "POST" });
    router.push(loginPath);
    router.refresh();
  };

  const generateReport = async () => {
    setReportLoading(true);
    try {
      const response = await fetch("/api/console/ai-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ period }),
      });
      const json = await response.json();
      setReport(json.summary ?? "");
    } catch {
      setReport("");
    } finally {
      setReportLoading(false);
    }
  };

  const t = data.totals;

  return (
    <div className="mx-auto max-w-[1440px] space-y-5 px-4 py-6 md:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
            Command Center
          </p>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Panel privado
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PERIODS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPeriod(item.id)}
              className={
                "rounded-full border px-3 py-1.5 text-xs transition-colors " +
                (period === item.id
                  ? "border-signal bg-signal/10 text-signal"
                  : "border-line text-muted hover:text-ink")
              }
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={load}
            aria-label="Actualizar"
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted hover:text-ink"
          >
            <ArrowClockwise size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted hover:text-ink"
          >
            <SignOut size={14} /> Salir
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <StatCard label="Visitantes" value={t.visitors} />
        <StatCard label="Sesiones" value={t.sessions} />
        <StatCard label="Páginas vistas" value={t.pageViews} />
        <StatCard label="Duración media" value={seconds(t.avgSessionSeconds)} />
        <StatCard label="Rebote" value={`${t.bounceRate}%`} />
        <StatCard label="Contactos" value={data.contact.total} sub={`${data.contact.unread} sin leer`} />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <BarList title="Países" items={data.byCountry} />
        <BarList title="Fuentes de tráfico" items={data.bySource} />
        <BarList title="Dispositivos" items={data.byDevice} />
        <BarList title="Páginas más vistas" items={data.topPages} />
        <BarList title="Eventos" items={data.byEvent} />
        <div className="rounded-xl border border-line bg-surface-1 p-4">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
            Asistente IA
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="font-display text-xl font-semibold text-ink">
                {data.chat.conversations}
              </p>
              <p className="text-[0.65rem] text-muted">Conversaciones</p>
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-ink">
                {data.chat.messages}
              </p>
              <p className="text-[0.65rem] text-muted">Mensajes</p>
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-live">
                {data.chat.unanswered}
              </p>
              <p className="text-[0.65rem] text-muted">Sin responder</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-surface-1 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-signal">
            <Sparkle size={14} weight="duotone" /> Resumen con IA
          </p>
          <button
            type="button"
            onClick={generateReport}
            disabled={reportLoading}
            className="rounded-full bg-signal px-4 py-1.5 text-xs font-medium text-on-signal disabled:opacity-40"
          >
            {reportLoading ? "Generando…" : "Generar"}
          </button>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
          {report || "Genera un resumen en lenguaje natural del periodo seleccionado."}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-surface-1">
        <p className="border-b border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-faint">
          Formulario de contacto
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-faint">
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Nombre</th>
                <th className="px-5 py-3">Correo</th>
                <th className="px-5 py-3">Empresa</th>
                <th className="px-5 py-3">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-muted">
                    Sin envíos todavía.
                  </td>
                </tr>
              ) : (
                messages.map((submission) => (
                  <tr key={submission.id} className="border-b border-line/60 text-muted">
                    <td className="px-5 py-3 font-mono text-xs">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-ink">{submission.name}</td>
                    <td className="px-5 py-3">{submission.email}</td>
                    <td className="px-5 py-3">{submission.company ?? "—"}</td>
                    <td className="max-w-[280px] truncate px-5 py-3">
                      {submission.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
