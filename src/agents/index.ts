import type { GeniusCategory } from "../constants/genius-categories";
import { einsteinPrompt } from "./einstein.agent";
import { ramanujanPrompt } from "./ramanujan.agent";

const PROMPTS_BY_ID: Record<string, string> = {
  ramanujan: ramanujanPrompt,
  einstein: einsteinPrompt,
};

const FALLBACK_PROMPTS_BY_CATEGORY: Record<GeniusCategory, string> = {
  math: ramanujanPrompt,
  physics: einsteinPrompt,
  cs: "你是一位嚴謹且富有創造力的計算科學先驅，請以可驗證推理與清楚步驟回答。",
  chemistry: "你是一位重視實驗證據與安全邏輯的化學先驅，請以結構化方式回答。",
};

export function resolveAgentPrompt(geniusId: string, category: GeniusCategory): string {
  return PROMPTS_BY_ID[geniusId] ?? FALLBACK_PROMPTS_BY_CATEGORY[category];
}
