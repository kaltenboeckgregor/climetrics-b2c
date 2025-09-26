// src/components/FAQ.tsx
"use client";

import { useState } from "react";

type QA = {
  q: string;
  a: string;
};

const faqs: QA[] = [
  {
    q: "Warum betrifft mich der Klimawandel persönlich?",
    a: "Der Klimawandel verändert unser tägliches Leben: mehr Hitzetage im Sommer, steigende Kühlkosten, häufigere Starkregenereignisse und Risiken für Gesundheit und Infrastruktur."
  },
  {
    q: "Woher stammen die Klimadaten im Tool?",
    a: "Wir nutzen wissenschaftliche Datensätze wie CMIP6 und EURO-CORDEX, die auch in internationalen Klimaberichten (IPCC) verwendet werden. Diese Daten werden aufbereitet und standortgenau ausgewertet."
  },
  {
    q: "Wie genau ist mein Report?",
    a: "Die Ergebnisse basieren auf wissenschaftlichen Szenarien (SSP1-2.6, SSP2-4.5, SSP5-8.5). Sie geben robuste Trends für deinen Standort wieder, sind aber keine punktgenauen Wettervorhersagen."
  },
  {
    q: "Kann ich das Tool kostenlos nutzen?",
    a: "Ja, die Basisversion ist kostenlos. Du kannst sofort Reports erstellen und grundlegende Risiken einsehen. In Zukunft wird es eine Pro-Version mit erweiterten Analysen geben."
  },
  {
    q: "Welche Gamification-Elemente gibt es?",
    a: "Du sammelst Punkte und Badges, wenn du Reports erstellst, Maßnahmen prüfst oder deine Resilienz verbesserst. Dein Score zeigt dir, wie du im Vergleich zu anderen abschneidest."
  },
  {
    q: "Wie kann ich meinen Score verbessern?",
    a: "Im Dashboard findest du Challenges, z. B. Maßnahmen wie Sonnenschutz installieren oder Regenwassermanagement verbessern. Jede erfüllte Challenge steigert deinen Score."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Häufige Fragen (FAQ)</h2>
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{item.q}</span>
              <span>{open === i ? "−" : "+"}</span>
            </div>
            {open === i && (
              <p className="mt-2 text-slate-600 text-sm">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
