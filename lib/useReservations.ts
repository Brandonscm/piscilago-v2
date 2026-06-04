"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "piscilago_reservas";

export interface Reserva {
  id: string;
  code: string;
  attractionName: string;
  attractionId?: string;
  timeSlot: string;
  people: number;
  accessibility: string[];
  comments: string;
  createdAt: number;
  status: "pendiente" | "activa" | "completada";
}

function load(): Reserva[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function save(items: Reserva[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useReservations() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    setReservas(load());
  }, []);

  const add = useCallback((r: Omit<Reserva, "id" | "createdAt" | "status">) => {
    const newReserva: Reserva = {
      ...r,
      id: `r-${Date.now()}`,
      createdAt: Date.now(),
      status: "pendiente",
    };
    const next = [...load(), newReserva];
    save(next);
    setReservas(next);
    return newReserva;
  }, []);

  const activate = useCallback((id: string) => {
    const next = load().map((r) => (r.id === id ? { ...r, status: "activa" as const } : r));
    save(next);
    setReservas(next);
  }, []);

  const complete = useCallback((id: string) => {
    const next = load().map((r) => (r.id === id ? { ...r, status: "completada" as const } : r));
    save(next);
    setReservas(next);
  }, []);

  const remove = useCallback((id: string) => {
    const next = load().filter((r) => r.id !== id);
    save(next);
    setReservas(next);
  }, []);

  const activeReserva = reservas.find((r) => r.status === "activa");
  const pendingReservas = reservas.filter((r) => r.status === "pendiente");

  return { reservas, activeReserva, pendingReservas, add, activate, complete, remove };
}

export function minutesUntilSlot(timeSlot: string): number {
  // timeSlot format: "10:30"
  const [hh, mm] = timeSlot.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hh, mm, 0, 0);
  if (target < now) target.setDate(target.getDate() + 1);
  return Math.round((target.getTime() - now.getTime()) / 60000);
}
