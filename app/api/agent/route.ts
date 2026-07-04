import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { GeniusService } from "../../../src/services/genius.service";
import { resolveAgentPrompt } from "../../../src/agents";

interface AgentMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AgentRequestBody {
  geniusId: string;
  messages: AgentMessage[];
}

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as AgentRequestBody;

  if (!body.geniusId || !Array.isArray(body.messages)) {
    return new Response("Invalid request body", { status: 400 });
  }

  const service = new GeniusService();
  const profile = await service.getFullProfile(body.geniusId);

  if (!profile) {
    return new Response("Genius not found", { status: 404 });
  }

  const systemPrompt = resolveAgentPrompt(profile.genius.id, profile.genius.category);
  const contextPrompt = `${systemPrompt}\n以下是資料庫中的精確記憶：${JSON.stringify(profile.achievements)}`;

  const result = await streamText({
    model: openai("gpt-4o"),
    system: contextPrompt,
    messages: body.messages,
  });

  return result.toDataStreamResponse();
}
