import { classifySource, parseUtm } from "./events";

type EventInput = {
  category?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
};
type QueuedEvent = { name: string; path: string } & EventInput;

let sessionId = "";
let started = false;
let startTime = 0;
let queue: QueuedEvent[] = [];

function isDnt(): boolean {
  const nav = navigator as Navigator & { doNotTrack?: string; msDoNotTrack?: string };
  const win = window as Window & { doNotTrack?: string };
  return nav.doNotTrack === "1" || win.doNotTrack === "1" || nav.msDoNotTrack === "1";
}

function getSessionId(): string {
  try {
    let id = window.sessionStorage.getItem("aid");
    if (!id) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem("aid", id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function meta() {
  return {
    locale: document.documentElement.lang || "es",
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    referrer: document.referrer || null,
    source: classifySource(document.referrer || null),
    screenW: window.screen.width,
    screenH: window.screen.height,
    viewportW: window.innerWidth,
    viewportH: window.innerHeight,
    entryPath: location.pathname,
    ...parseUtm(location.search),
  };
}

function post(url: string, body: unknown, beacon = false) {
  try {
    const payload = JSON.stringify(body);
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
      return;
    }
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* fail silently */
  }
}

function flush() {
  if (!started || queue.length === 0) return;
  const events = queue;
  queue = [];
  post("/api/track", { sessionId, meta: meta(), events }, true);
}

export function initAnalytics() {
  if (started || typeof window === "undefined" || isDnt()) return;
  started = true;
  startTime = Date.now();
  sessionId = getSessionId();
  post("/api/session", { sessionId, event: "start", meta: meta() });
  window.setInterval(flush, 8000);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) flush();
  });
  window.addEventListener("pagehide", () => {
    flush();
    post(
      "/api/session",
      {
        sessionId,
        event: "end",
        duration: Math.round((Date.now() - startTime) / 1000),
      },
      true,
    );
  });
}

export function track(name: string, input: EventInput = {}) {
  if (!started) return;
  queue.push({ name, path: location.pathname, ...input });
  if (queue.length >= 12) flush();
}

export function trackPageView(path: string) {
  if (!started) return;
  queue.push({ name: "page_view", path });
  flush();
}
