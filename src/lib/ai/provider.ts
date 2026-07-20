import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

export function getModel(): LanguageModel | null {
  const provider = process.env.AI_PROVIDER;
  const model = process.env.AI_MODEL;

  if (provider === "anthropic" && process.env.ANTHROPIC_API_KEY) {
    return anthropic(model || "claude-3-5-sonnet-latest");
  }
  if (provider === "openai" && process.env.OPENAI_API_KEY) {
    return openai(model || "gpt-4o-mini");
  }
  return null;
}

export function isModelConfigured(): boolean {
  return getModel() !== null;
}
