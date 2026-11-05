import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: "Not configured" }, { status: 503 });
  const s = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const ev = s.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature")!, process.env.STRIPE_WEBHOOK_SECRET);
    // TODO: persist subscription state to DB on checkout.session.completed / customer.subscription.* events
    console.log("stripe event", ev.type);
    return NextResponse.json({ received: true });
  } catch { return NextResponse.json({ error: "Bad signature" }, { status: 400 }); }
}
