"use client";

export function saveLocal<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocal<T>(key: string): T | null {
  const s = localStorage.getItem(key);
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}
