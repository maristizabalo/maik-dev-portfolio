"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ChatCircleDots,
  X,
  PaperPlaneRight,
  Broom,
  ArrowsOut,
  ArrowsIn,
  Sparkle,
} from "@phosphor-icons/react";
import { ChatMessage } from "./ChatMessage";
import { CHAT_OPEN_EVENT } from "@/lib/chat";
import { springSnappy } from "@/lib/easings";
import { cn } from "@/lib/utils";

type Message = { id: string; role: "user" | "assistant"; content: string };

const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export function ChatWidget() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const conversationId = useRef(newId());
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener(CHAT_OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(CHAT_OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  const suggestions = [1, 2, 3, 4].map((index) => t(`chat.suggestion${index}`));

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMessage: Message = { id: newId(), role: "user", content: trimmed };
    const assistantId = newId();
    const history = [...messages, userMessage];
    setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((message) => ({
            role: message.role,
            content: message.content,
          })),
          locale,
          mode: recruiter ? "recruiter" : "standard",
          conversationId: conversationId.current,
        }),
      });
      if (!response.ok || !response.body) throw new Error("request failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? { ...message, content: accumulated }
              : message,
          ),
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? { ...message, content: t("chat.error") }
            : message,
        ),
      );
    } finally {
      setStreaming(false);
    }
  };

  const clear = () => {
    setMessages([]);
    conversationId.current = newId();
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("chat.launcher")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="print-hide fixed bottom-5 right-5 z-modal grid h-14 w-14 place-items-center rounded-full bg-signal text-on-signal shadow-signal-glow md:bottom-6 md:right-6"
          >
            <ChatCircleDots size={26} weight="duotone" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t("chat.title")}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={springSnappy}
            className={cn(
              "print-hide fixed z-modal flex flex-col overflow-hidden border border-line bg-surface-1 shadow-soft-2",
              expanded
                ? "inset-3 rounded-2xl md:inset-8"
                : "bottom-4 right-4 left-4 h-[70vh] rounded-2xl sm:left-auto sm:w-[400px] md:bottom-6 md:right-6",
            )}
          >
            <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-signal/10 text-signal">
                  <Sparkle size={16} weight="duotone" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {t("chat.title")}
                  </p>
                  <p className="text-[0.7rem] text-muted">{t("chat.subtitle")}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clear}
                  aria-label={t("chat.clear")}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:text-ink"
                >
                  <Broom size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  aria-label={expanded ? t("chat.collapse") : t("chat.expand")}
                  className="hidden h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:text-ink sm:grid"
                >
                  {expanded ? <ArrowsIn size={16} /> : <ArrowsOut size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("chat.close")}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:text-ink"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            <div
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-muted">
                    {t("chat.subtitle")}.
                  </p>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                    {t("chat.suggestionsTitle")}
                  </p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => send(suggestion)}
                        className="rounded-xl border border-line px-3 py-2 text-left text-sm text-muted transition-colors hover:border-signal/40 hover:text-ink"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={
                      message.content ||
                      (streaming ? t("chat.thinking") : "")
                    }
                  />
                ))
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-line px-4 py-3">
              <button
                type="button"
                onClick={() => setRecruiter((value) => !value)}
                aria-pressed={recruiter}
                className={cn(
                  "mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] transition-colors",
                  recruiter
                    ? "border-signal bg-signal/10 text-signal"
                    : "border-line text-muted hover:text-ink",
                )}
              >
                {t("chat.recruiter")}
              </button>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder={
                    recruiter ? t("chat.recruiterHint") : t("chat.placeholder")
                  }
                  className="max-h-28 flex-1 resize-none rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-signal"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  aria-label={t("chat.send")}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signal text-on-signal transition-opacity disabled:opacity-40"
                >
                  <PaperPlaneRight size={18} weight="fill" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
