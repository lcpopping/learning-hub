import { NextResponse } from "next/server";
import { resources } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get("tool");
  const type = searchParams.get("type");
  const difficulty = searchParams.get("difficulty");
  const language = searchParams.get("language");

  let filtered = [...resources];

  if (tool) {
    filtered = filtered.filter((r) => r.tool === tool);
  }
  if (type) {
    filtered = filtered.filter((r) => r.type === type);
  }
  if (difficulty) {
    filtered = filtered.filter((r) => r.difficulty === difficulty);
  }
  if (language) {
    filtered = filtered.filter((r) => r.language === language);
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
}