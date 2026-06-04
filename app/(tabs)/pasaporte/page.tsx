"use client";

import { useState } from "react";
import { Settings, CreditCard, Receipt, Share2, Plus, MapPin, IdCard, MessageCircle, ChevronDown, Lock, Pencil } from "lucide-react";
import { showToast } from "@/lib/toast";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { MisReservas } from "@/components/common/MisReservas";
import { TimelineVisita } from "@/components/common/TimelineVisita";

const INITIAL_PHONE = "+57 310 772 0361";
const INITIAL_DOC = "1.014.****.892";

export default function PasaportePage() {
  const [phone, setPhone] = useState(INITIAL_PHONE);
  const [doc, setDoc] = useState(INITIAL_DOC);
  const [docType, setDocType] = useState("Cédula ciudadanía");
  const [loaded, setLoaded] = useState(true);

  // Edit-mode states (false = read-only, true = editable)
  const [phoneEditable, setPhoneEditable] = useState(false);
  const [docEditable, setDocEditable] = useState(false);

  // Confirm dialogs
  const [confirmingField, setConfirmingField] = useState<"phone" | "doc" | "docType" | "save" | null>(null);
  const [confirmingDocType, setConfirmingDocType] = useState(false);

  const requestEdit = (field: "phone" | "doc") => setConfirmingField(field);

  const handleConfirm = () => {
    if (confirmingField === "phone") setPhoneEditable(true);
    if (confirmingField === "doc") setDocEditable(true);
    if (confirmingField === "docType") {
      setDocType(docType === "Cédula ciudadanía" ? "Tarjeta de identidad" : "Cédula ciudadanía");
      showToast({ tone: "success", title: "Tipo de documento actualizado" });
    }
    if (confirmingField === "save") {
      setLoaded(true);
      setPhoneEditable(false);
      setDocEditable(false);
      showToast({ tone: "success", title: "Pasaporte actualizado", message: "Sincronizado con tu pulsera NFC" });
    }
    setConfirmingField(null);
  };

  const confirmConfig = {
    phone: {
      title: "Editar WhatsApp",
      message: `Vas a modificar el número de WhatsApp vinculado a tu pasaporte (actualmente ${phone}). Asegúrate de tener acceso al nuevo número porque ahí recibirás las confirmaciones de tu compra.`,
      confirmLabel: "Sí, editar",
    },
    doc: {
      title: "Editar documento",
      message: `Vas a modificar el número de documento vinculado a tu pasaporte. Este dato es sensible y se usa para validar tu identidad en el parque.`,
      confirmLabel: "Sí, editar",
    },
    docType: {
      title: "Cambiar tipo de documento",
      message: `Vas a cambiar el tipo de documento. Asegúrate de que coincida con el documento físico que vas a presentar en el parque.`,
      confirmLabel: "Sí, cambiar",
    },
    save: {
      title: "Actualizar pasaporte",
      message: "Vas a guardar los cambios en tu pasaporte. La información quedará sincronizada con tu pulsera NFC y todos los servicios del parque.",
      confirmLabel: "Confirmar y guardar",
    },
  };

  return (
    <div className="pb-6">
      <header className="flex items-center justify-between px-4 pt-2 pb-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-col-600 font-semibold">Mi pasaporte</p>
          <h1 className="text-lg font-semibold text-ink-900">Identidad digital</h1>
        </div>
        <button
          onClick={() => showToast({ tone: "info", title: "Configuración", message: "Próximamente disponible" })}
          className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-col-600 active:scale-95 transition-transform"
        >
          <Settings size={15} strokeWidth={2} />
        </button>
      </header>

      <section className="mx-4 rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #002D6E 0%, #1565C0 55%, #00897B 100%)" }}>
        <div className="absolute -top-10 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-5 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative p-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/85 font-semibold">Pulsera Familia · NFC</p>
              <p className="text-[14px] font-semibold mt-0.5">PSL · 4892 · A</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[8px] bg-status-green/85 px-2 py-1 rounded-md font-bold uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Activa
            </span>
          </div>

          <div className="my-4">
            <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <defs>
                <linearGradient id="band-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#90CAF9" />
                  <stop offset="0.5" stopColor="#1565C0" />
                  <stop offset="1" stopColor="#002D6E" />
                </linearGradient>
              </defs>
              <rect x="10" y="22" width="260" height="36" rx="18" fill="url(#band-grad)" />
              <rect x="10" y="22" width="260" height="18" rx="18" fill="rgba(255,255,255,0.18)" />
              <rect x="115" y="30" width="50" height="20" rx="4" fill="#F5F5F5" />
              <g transform="translate(132,33)" stroke="#003478" strokeWidth="1.2" fill="none" strokeLinecap="round">
                <path d="M2 7 Q 2 2 7 2 Q 12 2 12 7" />
                <path d="M0 9 Q 0 0 7 0 Q 14 0 14 9" />
                <circle cx="7" cy="11" r="1.3" fill="#003478" stroke="none" />
              </g>
              <text x="48" y="48" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.95)" letterSpacing="1.5">PISCILAGO</text>
              <text x="195" y="48" fontSize="7" fontWeight="500" fill="rgba(255,255,255,0.75)" letterSpacing="1">4892·A</text>
            </svg>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/85 font-semibold">Saldo en pulsera</p>
              <p className="text-[22px] font-bold leading-none mt-1">$ 45.200</p>
            </div>
            <div className="text-right text-[9px] text-white/85">
              Última recarga
              <p className="text-[11px] font-semibold text-white">hoy 9:14 am</p>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 mt-3 grid grid-cols-3 gap-2">
        {[
          { icon: CreditCard, label: "Recargar", tone: "col", action: "Recarga de $20.000 simulada" },
          { icon: Receipt, label: "Historial", tone: "sun", action: "12 movimientos hoy" },
          { icon: Share2, label: "Compartir", tone: "wild", action: "QR de pulsera generado" },
        ].map(({ icon: Icon, label, tone, action }) => (
          <button
            key={label}
            onClick={() => showToast({ tone: "success", title: label, message: action })}
            className="bg-white rounded-2xl p-3 text-center shadow-card active:scale-95 transition-transform"
          >
            <div className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center ${
              tone === "col" ? "bg-col-50 text-col-600" :
              tone === "sun" ? "bg-sun-50 text-sun-700" : "bg-wild-50 text-wild-600"
            }`}>
              <Icon size={16} strokeWidth={2} />
            </div>
            <p className="text-[11px] font-semibold text-ink-900 mt-1.5">{label}</p>
          </button>
        ))}
      </div>

      <MisReservas />

      <TimelineVisita />

      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-col-50 text-col-600 flex items-center justify-center">
            <IdCard size={16} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h3 className="text-[12px] font-semibold text-ink-900">Cargar pasaporte oficial</h3>
            <p className="text-[9px] text-ink-500">Vincula tu compra con cédula + WhatsApp</p>
          </div>
          {loaded && (
            <span className="text-[8px] font-bold bg-status-green-soft text-status-green px-2 py-1 rounded uppercase">
              Vinculado
            </span>
          )}
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="text-[9px] font-medium text-ink-500 uppercase tracking-wide">WhatsApp de compra</label>
            <div className={`mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 ${phoneEditable ? "bg-white border border-col-400" : "bg-ink-50"}`}>
              <MessageCircle size={14} className="text-status-green shrink-0" strokeWidth={2} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly={!phoneEditable}
                placeholder="Ingresa tu celular"
                className="flex-1 bg-transparent text-[12px] text-ink-900 outline-none placeholder:text-ink-300"
              />
              {!phoneEditable ? (
                <button
                  type="button"
                  onClick={() => requestEdit("phone")}
                  className="text-[10px] inline-flex items-center gap-0.5 text-col-600 font-semibold active:scale-95 transition-transform"
                >
                  <Pencil size={11} strokeWidth={2.2} />
                  Editar
                </button>
              ) : (
                <Lock size={12} className="text-status-green" strokeWidth={2.2} />
              )}
            </div>
          </div>

          <div>
            <label className="text-[9px] font-medium text-ink-500 uppercase tracking-wide">Tipo de documento</label>
            <button
              type="button"
              onClick={() => setConfirmingField("docType")}
              className="mt-1 w-full flex items-center justify-between bg-ink-50 rounded-xl px-3 py-2.5 active:scale-[0.98] transition-transform"
            >
              <span className="text-[12px] text-ink-900">{docType}</span>
              <ChevronDown size={14} className="text-ink-500" />
            </button>
          </div>

          <div>
            <label className="text-[9px] font-medium text-ink-500 uppercase tracking-wide">Número de documento</label>
            <div className={`mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 ${docEditable ? "bg-white border border-col-400" : "bg-ink-50"}`}>
              <input
                type="text"
                value={doc}
                onChange={(e) => setDoc(e.target.value)}
                readOnly={!docEditable}
                placeholder="Ingresa tu documento"
                className="flex-1 bg-transparent text-[12px] text-ink-900 outline-none placeholder:text-ink-300"
              />
              {!docEditable ? (
                <button
                  type="button"
                  onClick={() => requestEdit("doc")}
                  className="text-[10px] inline-flex items-center gap-0.5 text-col-600 font-semibold active:scale-95 transition-transform"
                >
                  <Pencil size={11} strokeWidth={2.2} />
                  Editar
                </button>
              ) : (
                <Lock size={12} className="text-status-green" strokeWidth={2.2} />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setConfirmingField("save")}
            className="w-full bg-ink-900 text-white rounded-xl py-3 text-[12px] font-semibold active:scale-[0.98] transition-transform"
          >
            {loaded ? "Actualizar pasaporte" : "Cargar pasaporte"}
          </button>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-semibold text-ink-900">Grupo familiar</h3>
          <button
            onClick={() => showToast({ tone: "info", title: "Mapa del grupo", message: "Ubicación de todos los miembros en el parque" })}
            className="text-[9px] text-col-600 font-semibold uppercase active:scale-95 transition-transform"
          >
            Ver mapa
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {[
            { name: "DR", bg: "bg-col-600" },
            { name: "LR", bg: "bg-sun-500" },
            { name: "MR", bg: "bg-aqua-500" },
          ].map((m) => (
            <div key={m.name} className={`w-9 h-9 rounded-full ${m.bg} text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white`}>
              {m.name}
            </div>
          ))}
          <button
            onClick={() => showToast({ tone: "info", title: "Invitar miembro", message: "Genera un QR para vincular otra pulsera" })}
            className="w-9 h-9 rounded-full bg-col-50 border border-dashed border-col-400 text-col-600 flex items-center justify-center active:scale-95 transition-transform"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] text-ink-500">
            <MapPin size={11} strokeWidth={2} className="text-status-green" />
            Todos cerca
          </div>
        </div>
      </div>

      {confirmingField && (
        <ConfirmDialog
          open={!!confirmingField}
          title={confirmConfig[confirmingField].title}
          message={confirmConfig[confirmingField].message}
          confirmLabel={confirmConfig[confirmingField].confirmLabel}
          tone={confirmingField === "save" ? "default" : "warning"}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmingField(null)}
        />
      )}
    </div>
  );
}
