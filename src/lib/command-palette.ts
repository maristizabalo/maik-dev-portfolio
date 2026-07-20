export const COMMAND_PALETTE_EVENT = "commandpalette:open";

export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
  }
}
