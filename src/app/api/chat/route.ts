import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return NextResponse.json({ error: "No API key provided" }, { status: 401 });
  }

  const body = await req.json();
  const { messages, systemPrompt } = body;

  if (!messages || !systemPrompt) {
    return NextResponse.json({ error: "Missing messages or systemPrompt" }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: systemPrompt,
      messages: messages.slice(-10),
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 502 });
    }

    return NextResponse.json({ content: content.text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.toLowerCase().includes("authentication") || message.toLowerCase().includes("invalid api key") ? 401 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
