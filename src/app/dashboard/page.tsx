"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { computeReport, encodeId, type InputPayload } from "@/lib/compute";
import { bumpGamification, getGamestate } from "@/lib/gamification";
import { saveLocal } from "@/lib/storage";
import ScoreRing from "@/components/ScoreRing";
import TrendChart from "@/components/TrendChart";
import ChallengeList from "@/components/ChallengeList";

type Leader = { rank: number; place: string; score: number };

export default function Dashboard() {
  // Eingaben (passen zu InputPayload)
  const [address, setAddress] = useState("");
  const [horizon, setHorizon] = useState(2050);
  const [homeType, setHomeType] = useState<"apartment" | "house" | "multi">(
    "apartment"
  );

  // Vorschau aus aktuellen Eingaben
  const previewInput: InputPayload = {
    address: address || "Wien 1070",
    horizon,
    homeType,
  };
  const preview = computeReport(previewInput);

  // Gamification-Status
  const g =
    typeof window !== "undefined"
      ? getGamestate()
      : { xp: 0, streak: 0, badges: [], reports: 0, lastDay: "" };

  // Leaderboard (Demo)
  const [leaders, setLeaders] = useState<Leader[]>([]);
  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => setLeaders((d?.items as Leader[]) ?? []))
      .catch(() => setLeaders([]));
  }, []);

  // Submit mit Adress-Validierung
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || address.trim().length < 3) {
      alert(
        "Bitte gib eine gültige Adresse oder PLZ ein, damit der Report erstellt werden kann."
      );
      return;
    }

    const input: InputPayload = { address, horizon, homeType };
    const id = encodeId(input);
    const report = computeReport(input);

    bumpGamification(50, report.score >= 70 ? "Resilience Starter" : undefined);
    saveLocal(`climetrics:report:${id}`, report);

    window.location.href = `/report/${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-cloud)] text-[var(--brand-graphite)]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formular */}
          <form onSubmit={onSubmit} className="card space-y-4">
            <h2 className="text-xl font-semibold">Dein Standort</h2>

            <div>
              <label className="text-sm font-medium">Adresse / PLZ</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="z. B. Wien 1070, Neubaugasse 12"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Zeithorizont: {horizon}</label>
              <input
                type="range"
                min={2025}
                max={2100}
                step={5}
                value={horizon}
                onChange={(e) => setHorizon(Number(e.target.value))}
                className="mt-1 w-full accent-emerald-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Gebäudetyp</label>
              <select
                value={homeType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setHomeType(e.target.value as "apartment" | "house" | "multi")
                }
                className="mt-1 w-full border rounded-xl px-3 py-2"
              >
                <option value="apartment">Wohnung</option>
                <option value="house">Einfamilienhaus</option>
                <option value="multi">Mehrfamilienhaus</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-primary w-full" type="submit">
                Report erstellen
              </button>
              <Link className="btn btn-quiet w-full" href="/">
                Zur Landing
              </Link>
            </div>
          </form>

          {/* Live-Vorschau + Gamification */}
          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Live-Vorschau</h3>
              <div className="text-sm">
                XP: <b>{g.xp}</b> • Streak: <b>{g.streak}</b> • Badges: {g.badges.length}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* dynamischer Ring zeigt preview.score */}
              <ScoreRing score={preview.score} />
              <div className="grid grid-cols-2 gap-3">
                <Tile k={`${preview.metrics.heatDays}`} t="Hitzetage >35°C" />
                <Tile k={`${preview.metrics.rainChangePct}%`} t="Starkregen (Δ)" />
                <Tile k={`${preview.metrics.snowChangePct}%`} t="Schneetage (Δ)" />
                <Tile k={`${preview.metrics.coolingCostDeltaEur}€`} t="Kühlkosten/Jahr (Δ)" />
              </div>
            </div>

            <div>
              <div className="font-semibold mb-2">Trend Hitzetage</div>
              <TrendChart data={preview.trend} />
            </div>

            <div>
              <div className="font-semibold mb-2">Empfohlene Challenges</div>
              <ChallengeList
                items={[
                  "Sonnenschutz anbringen (+50 XP)",
                  "Zwei Schattenbäume pflanzen (+80 XP)",
                  "Starkregen-Versicherung prüfen (+60 XP)",
                ]}
              />
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <section className="mt-10">
          <h2 className="font-semibold mb-2">🏆 Leaderboard (Demo)</h2>
          <div className="overflow-x-auto border rounded-xl bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 px-3">#</th>
                  <th className="px-3">Ort</th>
                  <th className="px-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((r) => (
                  <tr key={r.rank} className="border-t">
                    <td className="py-2 px-3">{r.rank}</td>
                    <td className="px-3">{r.place}</td>
                    <td className="px-3">{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Coming Soon Box */}
        <section className="mt-6">
          <div className="card">
            <div className="text-sm font-semibold mb-2">🚧 Coming Soon</div>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Adresse-Autovervollständigung (Map-Picker)</li>
              <li>Risiko-Heatmap & Straßen-Level-Hinweise</li>
              <li>Maßnahmen-Konfigurator mit Kosten/Nutzen</li>
              <li>Vergleich: Zwei Adressen nebeneinander</li>
              <li>Account-Sync (Reports auf allen Geräten)</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function Tile({ k, t }: { k: string; t: string }) {
  return (
    <div className="p-4 border rounded-xl bg-white">
      <div className="text-2xl font-extrabold">{k}</div>
      <div className="text-slate-600 text-sm">{t}</div>
    </div>
  );
}
