"use client";

import { useState } from "react";
import { X, Users, Clock, Accessibility, MessageSquare, Check, CalendarCheck, Plus, Minus } from "lucide-react";
import { showToast } from "@/lib/toast";

const TIME_SLOTS = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00", "14:30", "15:00", "15:30"];

export function ReservationModal({
  open,
  attractionName,
  onClose,
}: {
  open: boolean;
  attractionName: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [people, setPeople] = useState(3);
  const [timeSlot, setTimeSlot] = useState("10:30");
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [comments, setComments] = useState("");
  const [reservationCode, setReservationCode] = useState("");

  if (!open) return null;

  const toggleAccessibility = (option: string) => {
    setAccessibility((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const submit = () => {
    const code = `PSL-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 90) + 10}`;
    setReservationCode(code);
    setStep("confirm");
    showToast({
      tone: "success",
      title: "Turno reservado",
      message: `${attractionName} · ${timeSlot} · código ${code}`,
    });
  };

  const close = () => {
    setStep("form");
    setReservationCode("");
    onClose();
  };

  return (
    <>
      <div
        className="absolute inset-0 bg-ink-900/60 z-[60] backdrop-blur-sm"
        onClick={close}
      />
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-elevated z-[70] overflow-hidden" style={{ maxHeight: "90%" }}>
        <header className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-ink-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sun-50 text-sun-700 flex items-center justify-center">
              <CalendarCheck size={16} strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[13px] font-semibold text-ink-900 leading-tight">
                {step === "form" ? "Reservar turno" : "¡Reserva confirmada!"}
              </h2>
              <p className="text-[10px] text-ink-500">{attractionName}</p>
            </div>
          </div>
          <button onClick={close} className="w-8 h-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-700 active:scale-95">
            <X size={14} strokeWidth={2} />
          </button>
        </header>

        {step === "form" ? (
          <div className="px-5 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Users size={13} className="text-col-600" strokeWidth={2} />
                <p className="text-[11px] font-semibold text-ink-900">Personas en tu grupo</p>
              </div>
              <div className="bg-ink-50 rounded-xl p-3 flex items-center justify-between">
                <button
                  onClick={() => setPeople(Math.max(1, people - 1))}
                  disabled={people <= 1}
                  className="w-9 h-9 rounded-lg bg-white shadow-card text-col-600 flex items-center justify-center active:scale-95 disabled:opacity-40"
                >
                  <Minus size={15} strokeWidth={2.5} />
                </button>
                <div className="text-center">
                  <p className="text-2xl font-bold text-ink-900 leading-none">{people}</p>
                  <p className="text-[9px] text-ink-500 mt-0.5">{people === 1 ? "persona" : "personas"}</p>
                </div>
                <button
                  onClick={() => setPeople(Math.min(8, people + 1))}
                  disabled={people >= 8}
                  className="w-9 h-9 rounded-lg bg-white shadow-card text-col-600 flex items-center justify-center active:scale-95 disabled:opacity-40"
                >
                  <Plus size={15} strokeWidth={2.5} />
                </button>
              </div>
              <p className="text-[9px] text-ink-500 mt-1.5">Auto-precargado desde tu grupo familiar. Máximo 8 personas por reserva.</p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={13} className="text-col-600" strokeWidth={2} />
                <p className="text-[11px] font-semibold text-ink-900">Hora preferida</p>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {TIME_SLOTS.map((t) => {
                  const active = timeSlot === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setTimeSlot(t)}
                      className={`rounded-lg py-2 text-[11px] font-semibold border transition-colors active:scale-[0.96] ${
                        active ? "bg-col-600 border-col-600 text-white" : "bg-white border-ink-100 text-ink-700"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-2">
                <Accessibility size={13} className="text-col-600" strokeWidth={2} />
                <p className="text-[11px] font-semibold text-ink-900">Necesidades de accesibilidad</p>
              </div>
              <div className="space-y-1.5">
                {[
                  "Movilidad reducida",
                  "Embarazo o adulto mayor",
                  "Niños menores de 6 años",
                  "Apoyo especial requerido",
                ].map((opt) => {
                  const checked = accessibility.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleAccessibility(opt)}
                      className={`w-full flex items-center gap-2 p-2.5 rounded-xl border text-left transition-colors active:scale-[0.99] ${
                        checked ? "bg-col-50 border-col-300" : "bg-white border-ink-100"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                        checked ? "bg-col-600 border-col-600" : "border-ink-200"
                      }`}>
                        {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-[11px] text-ink-900">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={13} className="text-col-600" strokeWidth={2} />
                <p className="text-[11px] font-semibold text-ink-900">Comentarios (opcional)</p>
              </div>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Ej. Mi hijo tiene 5 años, necesitamos el carril familiar"
                rows={2}
                className="w-full bg-ink-50 rounded-xl px-3 py-2 text-[11px] text-ink-900 outline-none placeholder:text-ink-300 resize-none focus:bg-white focus:ring-2 focus:ring-col-100"
                maxLength={200}
              />
              <p className="text-[9px] text-ink-300 text-right mt-0.5">{comments.length}/200</p>
            </section>

            <button
              onClick={submit}
              className="w-full bg-ink-900 text-white rounded-xl py-3 text-[12px] font-semibold active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5"
            >
              Confirmar reserva
              <CalendarCheck size={13} strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <div className="px-5 py-5 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-status-green-soft text-status-green flex items-center justify-center mx-auto">
              <Check size={28} strokeWidth={3} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold mb-1">Código de reserva</p>
              <p className="text-2xl font-bold text-col-700 tracking-wider">{reservationCode}</p>
            </div>
            <div className="bg-ink-50 rounded-2xl p-3 text-left space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-ink-500">Atracción</span>
                <span className="font-semibold text-ink-900">{attractionName}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-ink-500">Hora</span>
                <span className="font-semibold text-ink-900">{timeSlot}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-ink-500">Personas</span>
                <span className="font-semibold text-ink-900">{people}</span>
              </div>
              {accessibility.length > 0 && (
                <div className="flex justify-between text-[11px]">
                  <span className="text-ink-500">Accesibilidad</span>
                  <span className="font-semibold text-ink-900 text-right">{accessibility.length} marcadas</span>
                </div>
              )}
            </div>
            <p className="text-[10px] text-ink-500 leading-relaxed">
              Te avisaremos 15 minutos antes con una notificación. Acerca tu pulsera NFC al ingreso para validar.
            </p>
            <button
              onClick={close}
              className="w-full bg-col-600 text-white rounded-xl py-3 text-[12px] font-semibold active:scale-[0.98] transition-transform"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
