"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "@phosphor-icons/react";

export function LoginForm({ redirectPath }: { redirectPath: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/console/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(
          response.status === 429
            ? "Demasiados intentos. Espera unos minutos."
            : "Contraseña incorrecta.",
        );
        setLoading(false);
        return;
      }
      router.push(redirectPath);
      router.refresh();
    } catch {
      setError("Error de red. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[100dvh] place-items-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-line bg-surface-1 p-8"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal/10 text-signal">
          <ShieldCheck size={20} weight="duotone" />
        </span>
        <h1 className="mt-5 font-display text-xl font-semibold text-ink">
          Command Center
        </h1>
        <p className="mt-1 text-sm text-muted">Panel privado de analítica.</p>

        <label htmlFor="password" className="mt-6 block text-xs text-muted">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none focus:border-signal"
        />
        {error && <p className="mt-3 text-xs text-live">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 w-full rounded-full bg-signal py-3 text-sm font-medium text-on-signal transition-opacity disabled:opacity-40"
        >
          {loading ? "Verificando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
