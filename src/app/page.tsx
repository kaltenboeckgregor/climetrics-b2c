"use client";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 bg-white/70 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-climetrics.svg" alt="Climetrics" className="h-6 w-6" />
            <span className="font-semibold tracking-tight">Climetrics</span>
            <span className="ml-2 text-xs px-2 py-0.5 border rounded-full">B2C Beta</span>
          </div>
          <a href="#demo" className="text-sm px-3 py-1.5 border rounded-xl hover:bg-slate-50">
            Live-Demo
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4 py-12 space-y-10">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Wie verändert der Klimawandel <span className="text-emerald-600">deinen Alltag</span>?
            </h1>
            <p className="text-slate-600">
              Hol dir einen persönlichen Climate Daily Life Report mit Resilienz-Score,
              Hitzetagen, Starkregen-Risiko und konkreten Tipps.
            </p>

            {/* kleines Formular (ohne Backend, nur UI) */}
            <form
              onSubmit={(e) => { e.preventDefault(); location.hash = '#demo'; }}
              className="p-4 border rounded-2xl bg-white space-y-3"
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
              <button className="w-full rounded-2xl bg-emerald-600 text-white py-2.5">
                Report anzeigen
              </button>
            </form>
          </div>

          {/* Platzhalter-Karten */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { k: "+23", t: "Hitzetage > 35 °C" },
              { k: "+17 %", t: "Starkregen-Änderung" },
              { k: "−40 %", t: "Schneetage (Δ)" },
              { k: "+120 €", t: "Kühlkosten/Jahr (Δ)" }
            ].map((m, i) => (
              <div key={i} className="p-5 border rounded-2xl bg-white">
                <div className="text-2xl font-bold">{m.k}</div>
                <div className="text-slate-600 text-sm">{m.t}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Demo-Section */}
        <section id="demo" className="space-y-4">
          <h2 className="text-2xl font-bold">Climate Daily Life Report (Demo)</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="border rounded-2xl bg-white p-5">
              <div className="font-semibold mb-2">Resilienz-Score</div>
              <div className="text-4xl font-extrabold">62/100</div>
              <p className="text-slate-600 text-sm mt-2">
                Höher ist besser. Verbessere deinen Score mit Maßnahmen.
              </p>
            </div>
            <div className="lg:col-span-2 border rounded-2xl bg-white p-5">
              <div className="font-semibold mb-2">Trend-Vorschau</div>
              <div className="aspect-video grid place-items-center text-slate-500 border rounded-xl">
                (Chart-Placeholder)
              </div>
            </div>
          </div>

          {/* Gamification */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-2xl bg-white p-5">
              <div className="font-semibold mb-3">Challenges</div>
              <ul className="space-y-2 text-sm">
                <li>• Sonnenschutz anbringen (+50 XP)</li>
                <li>• Zwei Schattenbäume pflanzen (+80 XP)</li>
                <li>• Starkregen-Versicherung prüfen (+60 XP)</li>
              </ul>
            </div>
            <div className="border rounded-2xl bg-white p-5">
              <div className="font-semibold mb-3">Badges</div>
              <div className="flex gap-2 flex-wrap text-sm">
                <span className="px-2 py-1 border rounded-xl">Heat Survivor</span>
                <span className="px-2 py-1 border rounded-xl">Flood Aware</span>
                <span className="px-2 py-1 border rounded-xl">Cool Roof Hero</span>
              </div>
            </div>
          </div>
        </section>
      </main>

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
