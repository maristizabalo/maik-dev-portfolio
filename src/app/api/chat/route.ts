import { streamText } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/ai/provider";
import { buildSystemPrompt } from "@/data/knowledge/system-prompt";
import { localFallbackAnswer } from "@/data/knowledge/fallback";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
  locale: z.enum(["es", "en"]).default("es"),
  mode: z.enum(["standard", "recruiter"]).default("standard"),
  conversationId: z.string().uuid().optional(),
});

function encodedTextStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const words = text.split(" ");
  let index = 0;
  return new ReadableStream({
    start(controller) {
      const push = () => {
        if (index >= words.length) {
          controller.close();
          return;
        }
        const chunk = words[index] + (index < words.length - 1 ? " " : "");
        controller.enqueue(encoder.encode(chunk));
        index += 1;
        setTimeout(push, 16);
      };
      push();
    },
  });
}

async function persist(
  conversationId: string | undefined,
  locale: string,
  mode: string,
  userMessage: string,
  assistantMessage: string,
  latencyMs: number,
) {
  const supabase = getSupabaseAdmin();
  if (!supabase || !conversationId) return;
  try {
    await supabase
      .from("chat_conversations")
      .upsert({ id: conversationId, locale, mode }, { onConflict: "id", ignoreDuplicates: true });
    await supabase.from("chat_messages").insert([
      { conversation_id: conversationId, role: "user", content: userMessage },
      {
        conversation_id: conversationId,
        role: "assistant",
        content: assistantMessage,
        latency_ms: latencyMs,
        was_answered: assistantMessage.length > 0,
      },
    ]);
  } catch {
    /* best-effort persistence */
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!rateLimit(`chat:${ip}`, 25, 60_000)) {
    return new Response("Too many requests", { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return new Response("Bad request", { status: 400 });
  }

  const { messages, locale, mode, conversationId } = parsed.data;
  const lastUser =
    [...messages].reverse().find((message) => message.role === "user")?.content ?? "";

  const model = getModel();

  if (!model) {
    const answer = localFallbackAnswer(lastUser, locale);
    void persist(conversationId, locale, mode, lastUser, answer, 0);
    return new Response(encodedTextStream(answer), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const startedAt = Date.now();
  const result = streamText({
    model,
    system: buildSystemPrompt(locale, mode),
    messages,
    temperature: 0.4,
    maxOutputTokens: 900,
    onFinish: ({ text }) => {
      void persist(conversationId, locale, mode, lastUser, text, Date.now() - startedAt);
    },
  });

  return result.toTextStreamResponse({
    headers: { "Cache-Control": "no-store" },
  });
}
