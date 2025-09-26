"use client";
import { useEffect, useMemo, useState } from "react";
import { decodeId, computeReport, type Report } from "@/lib/compute";
import { loadLocal } from "@/lib/storage";
import Header from "@/components/Header";
import ScoreRing from "@/components/ScoreRing";
import TrendChart from "@/components/TrendChart";
import Badge from "@/components/Badge";
import Link from "next/link";

export default function ReportPage({ params }:{ params:{ id:string } }){
  const [report, setReport] = useState<Report|null>(null);

  useEffect(()=>{
    try{
      const input = decodeId(params.id);
      const local = loadLocal<Report>(`climetrics:report:${params.id}`, null);
      setReport(local ?? computeReport(input));
    }catch{
      setReport(null);
    }
  },[params.id]);

  if(!report){
    return (
      <div className="min-h-screen">
        <Header/>
        <div className="mx-auto max-w-3xl p-6">
          <div className="card">
            <div className="font-semibold mb-2">Report nicht gefunden</div>
            <p className="text-sm text-slate-600">Die ID ist ungültig. Erstelle einen neuen Report.</p>
            <Link className="btn btn-primary mt-3 w-fit" href="/dashboard">Zum Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const { input, score, metrics, trend } = report;

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Mein Climetrics-Report (${input.address}) – Score ${score}/100`;
    if (navigator.share) await navigator.share({ title:"Climetrics Report", text, url });
    else { await navigator.clipboard.writeText(url); alert("Link in Zwischenablage kopiert!"); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-cloud)] text-[var(--brand-graphite)]">
      <Header/>
      <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div className="card">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div>
              <div className="text-sm uppercase tracking-wide text-slate-500">Report</div>
              <h1 className="text-2xl font-bold">{input.address || "Unbenannter Standort"}</h1>
              <div className="text-sm text-slate-600">Zeithorizont: {input.horizon} • Gebäudetyp: {input.homeType}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-quiet" onClick={()=>window.print()}>Drucken/PDF</button>
              <button className="btn btn-primary" onClick={share}>Teilen</button>
              <Link className="btn btn-quiet" href="/dashboard">Neuer Report</Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card">
            <ScoreRing score={score}/>
            <div className="mt-2 text-sm text-slate-600">Höher = besser. Steigere den Score mit Maßnahmen.</div>
          </div>
          <div className="lg:col-span-2 card">
            <div className="font-semibold mb-2">Trend Hitzetage</div>
            <TrendChart data={trend}/>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Metric k={`${metrics.heatDays}`} t="Hitzetage >35°C" />
          <Metric k={`${metrics.rainChangePct}%`} t="Starkregen (Δ)" />
          <Metric k={`${metrics.snowChangePct}%`} t="Schneetage (Δ)" />
          <Metric k={`${metrics.coolingCostDeltaEur}€`} t="Kühlkosten/Jahr (Δ)" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <div className="font-semibold mb-2">Empfohlene Maßnahmen</div>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Sonnenschutz/Markisen anbringen</li>
              <li>Begrünung (zwei Schattenbäume)</li>
              <li>Drainagen/Abfluss prüfen (Starkregen)</li>
              <li>Versicherungsschutz checken</li>
            </ul>
          </div>
          <div className="card">
            <div className="font-semibold mb-2">Badges</div>
            <div className="flex gap-2 flex-wrap">
              <Badge>Heat Survivor</Badge>
              {score>=70 && <Badge>Resilience Starter</Badge>}
              {metrics.rainChangePct>=20 && <Badge>Flood Aware</Badge>}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="font-semibold mb-2">Leaderboard (Demo)</div>
          <div className="text-sm text-slate-600">Dein Score: <b>{score}</b></div>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-slate-500">
                <th className="py-2">#</th><th>Ort</th><th>Score</th></tr></thead>
              <tbody>
                {[["1","Wien 19",78],["2","Wien 13",74],["3","Wien 1",71],["—", input.address||"Dein Ort", score]].map((r,i)=>(
                  <tr key={i} className="border-t">
                    <td className="py-2 pr-2">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

function Metric({k,t}:{k:string;t:string}){
  return (
    <div className="p-4 border rounded-xl bg-white">
      <div className="text-2xl font-extrabold">{k}</div>
      <div className="text-slate-600 text-sm">{t}</div>
    </div>
  );
}
