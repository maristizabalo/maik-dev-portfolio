"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ctaVariants } from "@/components/ui/cta";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const projectTypes = ["web", "api", "dashboard", "ai", "other"] as const;
const budgets = ["undecided", "small", "mid", "large"] as const;

const typeKey: Record<(typeof projectTypes)[number], string> = {
  web: "typeWeb",
  api: "typeApi",
  dashboard: "typeDashboard",
  ai: "typeAi",
  other: "typeOther",
};
const budgetKey: Record<(typeof budgets)[number], string> = {
  undecided: "budgetUndecided",
  small: "budgetSmall",
  mid: "budgetMid",
  large: "budgetLarge",
};

export function ContactForm() {
  const t = useTranslations();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData) => {
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = t("contactForm.required");
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = t("contactForm.required");
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      next.email = t("contactForm.invalidEmail");
    if (!String(data.get("message") ?? "").trim())
      next.message = t("contactForm.required");
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") ?? "")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-line bg-surface-1 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-signal";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            {t("contactForm.name")}
          </label>
          <input id="name" name="name" className={fieldClass} />
          {errors.name && <span className="text-xs text-live">{errors.name}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            {t("contactForm.email")}
          </label>
          <input id="email" name="email" type="email" className={fieldClass} />
          {errors.email && <span className="text-xs text-live">{errors.email}</span>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-medium text-ink">
            {t("contactForm.company")}
          </label>
          <input id="company" name="company" className={fieldClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="text-sm font-medium text-ink">
            {t("contactForm.projectType")}
          </label>
          <select id="projectType" name="projectType" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("contactForm.selectOption")}
            </option>
            {projectTypes.map((value) => (
              <option key={value} value={value}>
                {t(`contactForm.${typeKey[value]}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm font-medium text-ink">
            {t("contactForm.budget")}
          </label>
          <select id="budget" name="budget" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("contactForm.selectOption")}
            </option>
            {budgets.map((value) => (
              <option key={value} value={value}>
                {t(`contactForm.${budgetKey[value]}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          {t("contactForm.message")}
        </label>
        <textarea id="message" name="message" rows={5} className={cn(fieldClass, "resize-y")} />
        {errors.message && <span className="text-xs text-live">{errors.message}</span>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={ctaVariants({ variant: "primary" })}
        >
          {status === "submitting" ? t("contactForm.submitting") : t("contactForm.submit")}
        </button>
        {status === "success" && (
          <span className="text-sm text-signal">{t("contactForm.success")}</span>
        )}
        {status === "error" && (
          <span className="text-sm text-live">{t("contactForm.error")}</span>
        )}
      </div>
    </form>
  );
}
