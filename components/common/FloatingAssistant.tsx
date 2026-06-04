"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, X, Send, ArrowRight } from "lucide-react";
import { respond, INITIAL_GREETING, type AssistantResponse } from "@/lib/assistant";
import { PhonePortal } from "./PhonePortal";

interface Message {
  id: string;
  from: "user" | "assistant";
  text: string;
  link?: AssistantResponse["link"];
  suggestions?: string[];
  ts: number;
}

let counter = 0;
const mkId = () => `m-${++counter}-${Date.now()}`;

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: mkId(),
        from: "assistant",
        text: INITIAL_GREETING.text,
        suggestions: INITIAL_GREETING.suggestions,
        ts: Date.now(),
      }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: mkId(), from: "user", text: trimmed, ts: Date.now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const r = respond(trimmed);
      setMessages((prev) => [...prev, {
        id: mkId(), from: "assistant", text: r.text,
        link: r.link, suggestions: r.suggestions, ts: Date.now(),
      }]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      {!open && (
        <div className="absolute bottom-[92px] right-3 z-30">
          <button
            onClick={() => setOpen(true)}
            className="relative rounded-full shadow-hero flex items-center justify-center text-white active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #003478 0%, #C2185B 100%)", width: "44px", height: "44px" }}
            aria-label="Abrir asistente Piscilago"
          >
            <Sparkles size={17} strokeWidth={2.2} />
          </button>
          <span className="absolute -top-1 -left-2 bg-sun-400 text-ink-900 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider rounded-full shadow-card ring-2 ring-white">
            Nuevo
          </span>
        </div>
      )}

      {open && (
        <PhonePortal>
          <div
            className="absolute inset-0 bg-ink-900/50 z-40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-elevated z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: "82%" }}
          >
            <header className="flex items-center justify-between px-4 py-3 border-b border-ink-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-card"
                  style={{ background: "linear-gradient(135deg, #003478 0%, #C2185B 100%)" }}
                >
                  <Sparkles size={18} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[13px] font-semibold text-ink-900 leading-tight">Asistente Piscilago</h2>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
                    <p className="text-[9px] text-ink-500">En línea · Respuestas inmediatas</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-700 active:scale-95"
                aria-label="Cerrar"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-surface-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${m.from === "user" ? "items-end" : "items-start"} flex flex-col gap-2`}>
                    <div className={`px-3 py-2 rounded-2xl text-[12px] leading-relaxed ${
                      m.from === "user" ? "bg-col-600 text-white rounded-tr-md" : "bg-white text-ink-900 rounded-tl-md shadow-card"
                    }`}>
                      {m.text}
                    </div>
                    {m.link && (
                      <Link
                        href={m.link.href}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 bg-wild-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold active:scale-95 transition-transform"
                      >
                        {m.link.label}
                        <ArrowRight size={12} strokeWidth={2.5} />
                      </Link>
                    )}
                    {m.suggestions && m.from === "assistant" && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {m.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => send(s)}
                            className="text-[10px] bg-col-50 text-col-700 border border-col-100 px-2.5 py-1 rounded-full font-medium hover:bg-col-100 active:scale-95 transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-md shadow-card px-3 py-2.5 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}
            </div>

            <div className="px-3 py-3 border-t border-ink-100 bg-white shrink-0 safe-bottom">
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregúntale algo al asistente..."
                  className="flex-1 bg-ink-50 rounded-full px-4 py-2.5 text-[12px] text-ink-900 outline-none placeholder:text-ink-300 focus:bg-white focus:ring-2 focus:ring-col-100"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 active:scale-95 transition-transform ${
                    input.trim() ? "bg-col-600" : "bg-ink-200 cursor-not-allowed"
                  }`}
                  aria-label="Enviar"
                >
                  <Send size={15} strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>
        </PhonePortal>
      )}
    </>
  );
}
