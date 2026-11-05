import { NextRequest, NextResponse } from "next/server";
import { provider } from "@/lib/ai";
import { quota, addSession, rateOk } from "@/lib/usage";
export async function POST(req: NextRequest) {
  const id = req.headers.get("x-forwarded-for") ?? "local";
  if (!rateOk(id)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const q = quota(id, "demo");
  if (q.used >= q.limit) return NextResponse.json({ error: "Session limit reached. Upgrade your plan.", ...q }, { status: 402 });
  try { const t = await provider.createClientToken(); addSession(id); return NextResponse.json({ ...t, ...quota(id, "demo") }); }
  catch (e: any) { return NextResponse.json({ error: e.message }, { status: 503 }); }
}
