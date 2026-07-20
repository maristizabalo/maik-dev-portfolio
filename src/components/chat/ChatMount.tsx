"use client";

import dynamic from "next/dynamic";

const ChatWidget = dynamic(
  () => import("./ChatWidget").then((module) => module.ChatWidget),
  { ssr: false },
);

export function ChatMount() {
  return <ChatWidget />;
}
