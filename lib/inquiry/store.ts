"use client";

/**
 * The visitor's inquiry list, kept in localStorage so it survives reloads and return visits.
 * A tiny external store read through useSyncExternalStore; stays in sync across tabs.
 */

import { useSyncExternalStore } from "react";
import { z } from "zod";
import { inquiryItemSchema } from "@/lib/inquiry/schema";
import type { InquiryItem } from "@/lib/types";

const STORAGE_KEY = "lefaon.inquiry.v1";

export type InquiryLine = InquiryItem & { id: string; addedAt: number };

const lineSchema = inquiryItemSchema.extend({ id: z.string().min(1), addedAt: z.number() });
const storedSchema = z.object({ version: z.literal(1), items: z.array(z.unknown()) });

const EMPTY: InquiryLine[] = [];
let lines: InquiryLine[] | null = null;
const listeners = new Set<() => void>();

/** Same piece, colorway and size = the same line. */
const sameLine = (a: Pick<InquiryItem, "productSlug" | "colorway" | "size">, b: typeof a) =>
  a.productSlug === b.productSlug && a.colorway === b.colorway && a.size === b.size;

function read(): InquiryLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = storedSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return EMPTY;
    // Keep every valid line; quietly drop anything malformed.
    return parsed.data.items.flatMap((item) => {
      const line = lineSchema.safeParse(item);
      return line.success ? [line.data] : [];
    });
  } catch {
    return EMPTY;
  }
}

function write(next: InquiryLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items: next }));
  } catch {
    // Private mode or storage full: the list still works for this visit.
  }
  listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
  if (e.key !== STORAGE_KEY && e.key !== null) return;
  lines = read();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): InquiryLine[] {
  if (lines === null) lines = read();
  return lines;
}

const getServerSnapshot = () => EMPTY;

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ── Actions ──────────────────────────────────────────────────────────────── */

export type AddResult = { status: "added" | "already-there"; line: InquiryLine };

/** Add a piece. The same piece in the same colorway and size is never duplicated. */
export function addToInquiry(item: Omit<InquiryItem, "note"> & { note?: string }): AddResult {
  const current = getSnapshot();
  const existing = current.find((l) => sameLine(l, item));
  if (existing) return { status: "already-there", line: existing };
  const line: InquiryLine = { ...item, note: item.note ?? "", id: newId(), addedAt: Date.now() };
  write([...current, line]);
  return { status: "added", line };
}

/**
 * Change a line's colorway, size or note in place.
 * If the change makes it identical to another line, the two merge (notes are kept).
 */
export function updateInquiryLine(id: string, patch: Partial<Pick<InquiryItem, "colorway" | "size" | "note">>) {
  const current = getSnapshot();
  const line = current.find((l) => l.id === id);
  if (!line) return;
  const updated = { ...line, ...patch };
  const twin = current.find((l) => l.id !== id && sameLine(l, updated));
  if (twin) {
    const note = [twin.note, updated.note].filter(Boolean).join("\n");
    write(current.filter((l) => l.id !== id).map((l) => (l.id === twin.id ? { ...l, note } : l)));
    return;
  }
  write(current.map((l) => (l.id === id ? updated : l)));
}

export function removeFromInquiry(id: string) {
  write(getSnapshot().filter((l) => l.id !== id));
}

export function clearInquiry() {
  write(EMPTY);
}

/* ── Hooks ────────────────────────────────────────────────────────────────── */

/** Lines in the inquiry. Empty during server rendering and the first hydration pass. */
export function useInquiryLines(): InquiryLine[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useInquiryCount(): number {
  return useInquiryLines().length;
}

const noop = () => () => {};
/** False on the server and during hydration; true once localStorage has been read. */
export function useInquiryReady(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
