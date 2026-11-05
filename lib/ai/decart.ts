import { createDecartClient } from "@decartai/sdk";
import type { AIProvider } from "./provider";
export const decart: AIProvider = {
  name: "decart",
  async createClientToken() {
    const key = process.env.DECART_API_KEY;
    if (!key) throw new Error("DECART_API_KEY is not set");
    const client = createDecartClient({ apiKey: key });
    const t: any = await client.tokens.create(); // short-lived token; permanent key stays on server
    return { apiKey: t.apiKey, expiresAt: String(t.expiresAt) };
  },
};
