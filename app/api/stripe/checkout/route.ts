import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST(req: NextRequest) {
  const { plan } = await req.json();
  const price = process.env["STRIPE_PRICE_" + String(plan).toUpperCase()];
  if (!process.env.STRIPE_SECRET_KEY || !price) return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  const s = new Stripe(process.env.STRIPE_SECRET_KEY);
  const c = await s.checkout.sessions.create({ mode: "subscription", line_items: [{ price, quantity: 1 }],
    success_url: process.env.SITE_URL + "/?paid=1", cancel_url: process.env.SITE_URL + "/" });
  return NextResponse.json({ url: c.url });
}
