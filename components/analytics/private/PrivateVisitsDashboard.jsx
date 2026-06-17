"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, AlertCircle, CalendarDays, Loader2, RefreshCw, Route, ShieldCheck, Smartphone } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";

const SESSION_TOKEN_KEY = "maicol-private-analytics-token";

const StatCard = ({ icon: Icon, label, value }) => (
  <GlassCard className="p-5">
    <div className="flex items-center gap-4">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan/10 text-cyan">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="gradient-text text-3xl font-bold">{value}</p>
        <p className="text-xs uppercase tracking-[0.14em] text-white/45">{label}</p>
      </div>
    </div>
  </GlassCard>
);

const PrivateVisitsDashboard = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stats = data?.stats;
  const visits = data?.visits || [];
  const hasToken = token.trim().length > 0;

  const routeCards = useMemo(() => stats?.topRoutes || [], [stats]);
  const deviceCards = useMemo(() => stats?.devices || [], [stats]);

  const fetchVisits = useCallback(async (tokenToUse = token) => {
    const cleanToken = tokenToUse.trim();

    if (!cleanToken) {
      setError("Ingresa el token privado para consultar las visitas.");
      return;
    }

    setLoading(true);
    setError("");
    window.sessionStorage.setItem(SESSION_TOKEN_KEY, cleanToken);

    try {
      const response = await fetch("/api/analytics/private/visits?limit=50&page=1", {
        headers: {
          "x-analytics-token": cleanToken,
        },
        cache: "no-store",
      });

      if (response.status === 401) {
        throw new Error("Token inválido o ausente.");
      }

      if (!response.ok) {
        throw new Error("No fue posible consultar las visitas.");
      }

      setData(await response.json());
    } catch (fetchError) {
      setData(null);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const savedToken = window.sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (savedToken) {
      setToken(savedToken);
      fetchVisits(savedToken);
    }
  }, [fetchVisits]);

  return (
    <div className="relative z-10 mx-auto max-w-[1440px] space-y-5 px-4 py-6 md:px-6">
      <GlassCard className="command-panel p-6 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
              <ShieldCheck className="h-4 w-4" />
              Private analytics
            </p>
            <h1 className="h2 text-white">Panel privado de visitas.</h1>
            <p className="mt-4 text-sm leading-7 text-white/58">
              Registro propio y simple del portafolio. La ruta no aparece en navegación y el acceso requiere secret path más token privado.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:max-w-[460px]">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45" htmlFor="analytics-token">
              Token privado
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="analytics-token"
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="Pega tu ANALYTICS_ADMIN_TOKEN"
                className="h-12 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan/40"
              />
              <GlowButton onClick={() => fetchVisits()} disabled={!hasToken || loading} icon={loading ? Loader2 : RefreshCw}>
                Actualizar
              </GlowButton>
            </div>
          </div>
        </div>
      </GlassCard>

      {error && (
        <GlassCard className="border-red-400/25 bg-red-500/10 p-5">
          <div className="flex items-center gap-3 text-sm text-red-100">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard icon={Activity} label="Total visitas" value={stats?.total ?? "-"} />
        <StatCard icon={CalendarDays} label="Visitas hoy" value={stats?.today ?? "-"} />
        <StatCard icon={Route} label="Últimos 7 días" value={stats?.last7Days ?? "-"} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_0.65fr]">
        <GlassCard className="overflow-hidden p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Visitas recientes</h2>
            {loading && <Loader2 className="h-5 w-5 animate-spin text-cyan" />}
          </div>

          {!loading && hasToken && visits.length === 0 && !error && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/52">
              Aún no hay visitas registradas en esta instancia.
            </div>
          )}

          {!hasToken && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/52">
              Ingresa el token para ver las visitas.
            </div>
          )}

          {visits.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-white/42">
                    <th className="py-3 pr-4">Fecha</th>
                    <th className="py-3 pr-4">Hora</th>
                    <th className="py-3 pr-4">Ruta</th>
                    <th className="py-3 pr-4">Idioma</th>
                    <th className="py-3 pr-4">Dispositivo</th>
                    <th className="py-3 pr-4">Navegador</th>
                    <th className="py-3 pr-4">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit) => (
                    <tr key={visit.id} className="border-b border-white/5 text-white/66">
                      <td className="py-3 pr-4">{visit.date}</td>
                      <td className="py-3 pr-4">{visit.time}</td>
                      <td className="py-3 pr-4 text-cyan">{visit.path}</td>
                      <td className="py-3 pr-4">{visit.locale}</td>
                      <td className="py-3 pr-4">{visit.device}</td>
                      <td className="py-3 pr-4">{visit.browser}</td>
                      <td className="max-w-[240px] truncate py-3 pr-4">{visit.referrer || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">Rutas más vistas</h2>
            <div className="space-y-3">
              {routeCards.length > 0 ? (
                routeCards.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="truncate text-sm text-white/68">{item.label}</span>
                    <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">{item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/45">Sin datos todavía.</p>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
              <Smartphone className="h-4 w-4 text-cyan" />
              Dispositivos
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {deviceCards.length > 0 ? (
                deviceCards.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="capitalize text-sm text-white/68">{item.label}</span>
                    <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet-100">{item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/45">Sin datos todavía.</p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default PrivateVisitsDashboard;
