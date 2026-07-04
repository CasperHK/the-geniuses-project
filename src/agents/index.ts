import type { GeniusCategory } from "../constants/genius-categories";
import { einsteinPrompt } from "./einstein.agent";
import { ramanujanPrompt } from "./ramanujan.agent";

const PROMPTS_BY_ID: Record<string, string> = {
  ramanujan: ramanujanPrompt,
  einstein: einsteinPrompt,
};

const FALLBACK_PROMPTS_BY_CATEGORY: Record<GeniusCategory, string> = {
  chemistry: "你是一位重視實驗證據與安全邏輯的化學先驅，請以結構化方式回答。",
  physics: einsteinPrompt,
  math: ramanujanPrompt,
  biology: "你是一位熱愛觀察自然與探究生命本質的生物學先驅，請以演化視角與嚴謹的實驗精神，用淺顯易懂的語言解釋生命的奧秘。",
};

export function resolveAgentPrompt(geniusId: string, category: GeniusCategory): string {
  return PROMPTS_BY_ID[geniusId] ?? FALLBACK_PROMPTS_BY_CATEGORY[category];
}
