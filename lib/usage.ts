// In-memory demo store. Replace with PostgreSQL/Supabase before production (state is lost on restart).
export const PLANS = { demo: 3, starter: 100, pro: 500, business: 1500 } as const;
export type Plan = keyof typeof PLANS;
const used = new Map<string, number>(), hits = new Map<string, number[]>();
const month = () => new Date().toISOString().slice(0, 7);
export const quota = (id: string, plan: Plan) => ({ used: used.get(id + month()) ?? 0, limit: PLANS[plan] });
export const addSession = (id: string) => used.set(id + month(), (used.get(id + month()) ?? 0) + 1);
export function rateOk(id: string, max = 10, ms = 60000) {
  const n = Date.now(), a = (hits.get(id) ?? []).filter(t => n - t < ms);
  a.push(n); hits.set(id, a); return a.length <= max;
}
