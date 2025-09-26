// src/lib/gamification.ts
"use client";

export type Gamestate = {
  xp: number;          // Gesamt-XP
  streak: number;      // aufeinanderfolgende Tage
  badges: string[];    // erreichte Badges
  reports: number;     // erzeugte Reports
  lastDay: string;     // ISO-Tag "YYYY-MM-DD"
};

const KEY = "climetrics:gamestate";

/** Aktuellen Gamification-Status lesen (oder Default) */
export function getGamestate(): Gamestate {
  if (typeof window === "undefined") {
    // SSR-Schutz: Fallback, wird im Client sofort ersetzt
    return { xp: 0, streak: 0, badges: [], reports: 0, lastDay: "" };
  }
  const raw = localStorage.getItem(KEY);
  if (!raw) return { xp: 0, streak: 0, badges: [], reports: 0, lastDay: "" };
  try {
    return JSON.parse(raw) as Gamestate;
  } catch {
    return { xp: 0, streak: 0, badges: [], reports: 0, lastDay: "" };
  }
}

/**
 * Gamification aktualisieren:
 * - points: wie viele XP vergeben werden (z. B. 50 beim Report-Erstellen)
 * - newBadge: optionaler Badge-Name, wird hinzugefügt wenn noch nicht vorhanden
 */
export function bumpGamification(points: number, newBadge?: string): Gamestate {
  const g = getGamestate();
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD

  // Streak-Logik
  if (!g.lastDay) {
    g.streak = 1;
  } else {
    const prev = new Date(g.lastDay);
    const diffDays = Math.floor((+new Date(todayStr) - +prev) / 86400000);
    if (diffDays === 0) {
      // gleicher Tag → Streak bleibt gleich
    } else if (diffDays === 1) {
      g.streak += 1;
    } else {
      g.streak = 1;
    }
  }
  g.lastDay = todayStr;

  // XP & Reports
  g.xp += Math.max(0, points | 0);
  g.reports += 1;

  // Badge hinzufügen, wenn neu
  if (newBadge && !g.badges.includes(newBadge)) {
    g.badges.push(newBadge);
  }

  localStorage.setItem(KEY, JSON.stringify(g));
  return g;
}

/** Für Tests / Reset in der UI (optional) */
export function resetGamification(): void {
  if (typeof window === "undefined") return;
  const empty: Gamestate = { xp: 0, streak: 0, badges: [], reports: 0, lastDay: "" };
  localStorage.setItem(KEY, JSON.stringify(empty));
}
