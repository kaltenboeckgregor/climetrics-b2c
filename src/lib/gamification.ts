"use client";
export type Gamestate = { xp:number; streak:number; badges:string[]; reports:number; lastDay:string };
const KEY = "climetrics:gamestate";

export function getGamestate():Gamestate{
  const raw = localStorage.getItem(KEY);
  if (!raw) return { xp:0, streak:0, badges:[], reports:0, lastDay:"" };
  return JSON.parse(raw);
}
export function bumpGamification(points:number, newBadge?:string){
  const g = getGamestate();
  const today = new Date().toISOString().slice(0,10);
  // Streak
  if(g.lastDay){
    const prev = new Date(g.lastDay);
    const diff = Math.round((+new Date(today) - +prev)/86400000);
    if(diff===1) g.streak += 1;
    else if(diff>1) g.streak = 1;
  } else g.streak = 1;
  g.lastDay = today;
  // XP & Reports
  g.xp += points;
  g.reports += 1;
  // Badges
  if(newBadge && !g.badges.includes(newBadge)) g.badges.push(newBadge);
  localStorage.setItem(KEY, JSON.stringify(g));
  return g;
}
