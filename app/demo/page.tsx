"use client";
import { useRef, useState } from "react";
import { createDecartClient, models } from "@decartai/sdk";
export default function Demo() {
  const out = useRef<HTMLVideoElement>(null), rt = useRef<any>(null), t0 = useRef(0);
  const [msg, setMsg] = useState("Idle"), [prompt, setPrompt] = useState("Substitute the current top with a black oversized hoodie");
  async function start() {
    setMsg("Requesting token...");
    const r = await fetch("/api/tokens", { method: "POST" }), t = await r.json();
    if (!r.ok) return setMsg(t.error);
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
    const client = createDecartClient({ apiKey: t.apiKey });
    rt.current = await client.realtime.connect(stream, { model: models.realtime("lucy-vton-latest"), mirror: "auto",
      onRemoteStream: (s: MediaStream) => { if (out.current) out.current.srcObject = s; } } as any);
    await rt.current.set({ prompt }); t0.current = Date.now(); setMsg(`Live. Sessions used: ${t.used}/${t.limit}`);
  }
  async function swap(f?: File) { await rt.current?.set(f ? { image: f, prompt } : { prompt }); }
  function stop() { rt.current?.disconnect(); setMsg(`Stopped after ${Math.round((Date.now() - t0.current) / 1000)}s`); }
  return <main style={{ maxWidth: 720, margin: "auto", padding: 20 }}>
    <h1>TRYVORA Live Try-On</h1>
    <video ref={out} autoPlay playsInline muted style={{ width: "100%", background: "#15151a", borderRadius: 16, aspectRatio: "3/4" }} />
    <input value={prompt} onChange={e => setPrompt(e.target.value)} style={{ width: "100%", margin: "10px 0", padding: 10 }} />
    <input type="file" accept="image/*" onChange={e => swap(e.target.files?.[0])} />
    <p><button onClick={start}>Start</button> <button onClick={() => swap()}>Apply prompt</button> <button onClick={stop}>Stop</button></p>
    <p>{msg}</p></main>;
}
