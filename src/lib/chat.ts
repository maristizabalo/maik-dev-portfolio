export const CHAT_OPEN_EVENT = "chat:open";

export function openChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHAT_OPEN_EVENT));
  }
}
