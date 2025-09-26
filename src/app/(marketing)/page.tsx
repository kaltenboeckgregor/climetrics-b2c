"use client";
import Link from "next/link";
import Header from "@/components/Header";

export default function Page(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-cloud)] text-[var(--brand-graphite)]">
      <Header/>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
          style={{background:"radial-gradient(600px 300px at 20% 20%, var(--brand-cyan), transparent), radial-gradient(600px 300px at 80% 0%, var(--brand-emerald), transparent)"}}/>
        <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Verstehe, wie Klima deinen Alltag verändert.
            </h1>
            <p className="text-slate-600 text-lg">
              Hol dir deinen persönlichen <b>Climate Daily Life Report</b> – Score, Risiken und Maßnahmen.
            </p>
            <div className="flex gap-3">
              <Link href="/dashboard" className="btn btn-primary">Jetzt Report erstellen</Link>
              <a href="#features" className="btn btn-quiet">Mehr erfahren</a>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {["+23 Hitzetage", "+17% Starkregen", "−40% Schneetage", "+120€ Kühlkosten"].map((t,i)=>(
              <div key={i} className="card hover:shadow-md transition">
                <div className="text-2xl font-extrabold">{t.split(" ")[0]}</div>
                <div className="text-slate-600 text-sm mt-1">{t.split(" ").slice(1).join(" ")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-6xl px-4 pb-20 grid lg:grid-cols-3 gap-6">
        {[
          ["Resilienz-Score","Ein Wert (0–100) kombiniert Hitze, Starkregen, Schnee-Rückgang und Kosten."],
          ["Präzise Standortanalyse","Adresse → Koordinaten → voraggregierte Klimadaten (kein Rohdaten-Download im Browser)."],
          ["Gamification & Coaching","Challenges, Badges, Streaks und Tipps steigern deine Resilienz."]
        ].map(([h,p],i)=>(
          <div key={i} className="card">
            <div className="text-sm font-semibold mb-1">{h}</div>
            <p className="text-slate-600 text-sm">{p}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
