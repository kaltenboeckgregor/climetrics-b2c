"use client";
export const saveLocal = (key:string, value:any) =>
  localStorage.setItem(key, JSON.stringify(value));
export const loadLocal = <T=any>(key:string, fallback:T|null=null):T|null => {
  const s = localStorage.getItem(key);
  return s ? JSON.parse(s) as T : fallback;
};
