"use client";

export default function Page() {
  const year = 2050;

  const tiles = [
    { k: "+23", t: "Hitzetage > 35 °C" },
    { k: "+17 %", t: "Starkregen-Änderung" },
    { k: "−40 %", t: "Schneetage (Δ)" },
    { k: "+120 €", t: "Kühlkosten/Jahr (Δ)" }
  ];

  const challenges = [
    "Sonnenschutz anbringen (+50 XP)",
    "Zwei Schattenbäume pflanzen (+80 XP)",
    "Starkregen-Versicherung prüfen (+60 XP)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-cloud)] text-[var(--brand-graphite)]">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b">
        <div className="mx-auto max-w-6xl h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-climetrics.svg" alt="Climetrics" className="h-6 w-6" />
            <span className="font-semibold tracking-tight">Climetrics</span>
            <span className="ml-2 text-xs px-2 py-0.5 border rounded-full">B2C&nbsp;Beta</span>
          </div>
          <nav className="hidden sm:flex items-center gap-2">
            <a href="#features" className="text-sm px-3 py-1.5 rounded-xl hover:bg-slate-50">Features</a>
            <a href="#demo" className="text-sm px-3 py-1.5 rounded-xl hover:bg-slate-50">Demo</a>
            <a href="#faq" className="text-sm px-3 py-1.5 rounded-xl hover:bg-slate-50">FAQ</a>
          </nav>
          <a href="#demo" className="btn btn-quiet text-sm">Live-Demo</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
             style={{background: "radial-gradient(600px 300px at 20% 20%, var(--brand-cyan), transparent), radial-gradient(600px 300px at 80% 0%, var(--brand-emerald), transparent)"}} />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Wie verändert der Klimawandel <span className="text-emerald-600">deinen Alltag</span>?
            </h1>
            <p className="text-slate-600 text-lg">
              Hol dir einen persönlichen <b>Climate Daily Life Report</b> mit Resilienz-Score,
              Hitzetagen, Starkregen-Risiko und konkreten Maßnahmen – für {year} und darüber hinaus.
            </p>

            <div className="card space-y-3">
              <form
                onSubmit={(e) => { e.preventDefault(); location.hash = '#demo'; }}
                className="space-y-3"
              >
                <div>
                  <label className="text-sm font-medium">Adresse / PLZ</label>
                  <input
                    className="mt-1 w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="z. B. Wien 1070, Neubaugasse 12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Zeithorizont</label>
                  <input type="range" min={2025} max={2100} step={5} defaultValue={2050}
                         className="mt-1 w-full accent-emerald-600" />
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-primary w-full">Report anzeigen</button>
                  <button type="button" className="btn btn-quiet w-full" onClick={() => location.hash = '#features'}>
                    Mehr Infos
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Metrics tiles */}
          <div className="grid sm:grid-cols-2 gap-4">
            {tiles.map((m, i) => (
              <div key={i} className="card hover:shadow-md transition">
                <div className="text-3xl font-extrabold tracking-tight">{m.k}</div>
                <div className="text-slate-600 text-sm mt-1">{m.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-sm font-semibold mb-1">Resilienz-Score</div>
            <p className="text-slate-600 text-sm">
              Einfache Kennzahl (0–100), die Hitze, Starkregen, Schnee-Rückgang
              und Kostenrisiken kombiniert – nachvollziehbar erklärt.
            </p>
          </div>
          <div className="card">
            <div className="text-sm font-semibold mb-1">Präzise Standortanalyse</div>
            <p className="text-slate-600 text-sm">
              Adresse → Geokoordinaten → voraggregierte Klimadaten. Keine Rohdaten im Browser.
            </p>
          </div>
          <div className="card">
            <div className="text-sm font-semibold mb-1">Gamification & Coaching</div>
            <p className="text-slate-600 text-sm">
              Challenges, Badges und ein KI-Coach, der dir konkrete Maßnahmen vorschlägt.
            </p>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="mx-auto max-w-6xl px-4 pb-20 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Climate Daily Life Report (Demo)</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="font-semibold mb-2">Resilienz-Score</div>
            <div className="text-5xl font-extrabold">62<span className="text-slate-400 text-2xl"> / 100</span></div>
            <p className="text-slate-600 text-sm mt-2">
              Höher ist besser. Verbessere deinen Score mit gezielten Maßnahmen.
            </p>
          </div>
          <div className="lg:col-span-2 card">
            <div className="font-semibold mb-2">Trend-Vorschau</div>
            <div className="aspect-video grid place-items-center text-slate-500 border rounded-xl">
              (Chart-Placeholder)
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <div className="font-semibold mb-3">Challenges</div>
            <ul className="space-y-2 text-sm">
              {challenges.map((c, i) => <li key={i}>• {c}</li>)}
            </ul>
          </div>
          <div className="card">
            <div className="font-semibold mb-3">Badges</div>
            <div className="flex gap-2 flex-wrap text-sm">
              <span className="px-2 py-1 border rounded-xl">Heat Survivor</span>
              <span className="px-2 py-1 border rounded-xl">Flood Aware</span>
              <span className="px-2 py-1 border rounded-xl">Cool Roof Hero</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Climetrics</div>
          <div className="flex items-center gap-3">
            <a className="hover:underline" href="#">Datenschutz</a>
            <a className="hover:underline" href="#">Impressum</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
