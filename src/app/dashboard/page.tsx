"use client";
import { useState } from "react";
import Header from "@/components/Header";
import { computeReport, encodeId, type InputPayload } from "@/lib/compute";
import { bumpGamification, getGamestate } from "@/lib/gamification";
import { saveLocal } from "@/lib/storage";
import { useRouter } from "next/navigation";
import ScoreRing from "@/components/ScoreRing";
import TrendChart from "@/components/TrendChart";
import Badge from "@/components/Badge";
import ChallengeList from "@/components/ChallengeList";

export default function Dashboard(){
  const [address, setAddress] = useState("");
  const [horizon, setHorizon] = useState(2050);
  const [homeType, setHomeType] = useState<"apartment"|"house"|"multi">("apartment");
  const router = useRouter();

  const preview = computeReport({address: address||"Wien 1070", horizon, homeType});

  const onSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const input: InputPayload = { address, horizon, homeType };
    const id = encodeId(input);
    const report = computeReport(input);
    // gamification
    bumpGamification(50, report.score>=70 ? "Resilience Starter" : undefined);
    saveLocal(`climetrics:report:${id}`, report);
    router.push(`/report/${id}`);
  };

  const g = typeof window !== "undefined" ? getGamestate() : {xp:0,streak:0,badges:[],reports:0,lastDay:""};

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-cloud)] text-[var(--brand-graphite)]">
      <Header/>
      <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={onSubmit} className="card space-y-4">
            <h2 className="text-xl font-semibold">Dein Standort</h2>
            <div>
              <label className="text-sm font-medium">Adresse / PLZ</label>
              <input value={address} onChange={e=>setAddress(e.target.value)}
                     className="mt-1 w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                     placeholder="z. B. Wien 1070, Neubaugasse 12" />
            </div>
            <div>
              <label className="text-sm font-medium">Zeithorizont: {horizon}</label>
              <input type="range" min={2025} max={2100} step={5} value={horizon}
                     onChange={e=>setHorizon(Number(e.target.value))}
                     className="mt-1 w-full accent-emerald-600" />
            </div>
            <div>
              <label className="text-sm font-medium">Gebäudetyp</label>
              <select value={homeType} onChange={e=>setHomeType(e.target.value as any)}
                      className="mt-1 w-full border rounded-xl px-3 py-2">
                <option value="apartment">Wohnung</option>
                <option value="house">Einfamilienhaus</option>
                <option value="multi">Mehrfamilienhaus</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-primary w-full">Report erstellen</button>
              <a className="btn btn-quiet w-full" href="/">Zur Landing</a>
            </div>
          </form>

          {/* Live-Preview */}
          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Live-Vorschau</h3>
              <div className="text-sm">XP: <b>{g.xp}</b> • Streak: <b>{g.streak}</b> • Badges: {g.badges.length}</div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <ScoreRing score={preview.score}/>
              <div className="grid grid-cols-2 gap-3">
                <Tile k={`${preview.metrics.heatDays}`} t="Hitzetage >35°C"/>
                <Tile k={`${preview.metrics.rainChangePct}%`} t="Starkregen (Δ)"/>
                <Tile k={`${preview.metrics.snowChangePct}%`} t="Schneetage (Δ)"/>
                <Tile k={`${preview.metrics.coolingCostDeltaEur}€`} t="Kühlkosten/Jahr (Δ)"/>
              </div>
            </div>
            <TrendChart data={preview.trend}/>
            <div>
              <div className="font-semibold mb-2">Empfohlene Challenges</div>
              <ChallengeList items={[
                "Sonnenschutz anbringen (+50 XP)",
                "Zwei Schattenbäume pflanzen (+80 XP)",
                "Starkregen-Versicherung prüfen (+60 XP)"
              ]}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Tile({k,t}:{k:string;t:string}){
  return (
    <div className="p-4 border rounded-xl bg-white">
      <div className="text-2xl font-extrabold">{k}</div>
      <div className="text-slate-600 text-sm">{t}</div>
    </div>
  );
}
