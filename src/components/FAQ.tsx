"use client";
import { useState } from "react";

type QA = { q: string; a: string };

const faqs: QA[] = [
  { q: "Warum betrifft mich der Klimawandel persönlich?",
    a: "Mehr Hitzetage, häufigere Starkregen, steigende Kühlkosten und potenzielle Schäden an Gebäuden wirken sich direkt auf deinen Alltag und deine Ausgaben aus." },
  { q: "Woher stammen die Klimadaten?",
    a: "Aus wissenschaftlichen Ensembles (z. B. CMIP6/EURO-CORDEX). Wir verarbeiten diese zu standortbezogenen, robusten Trends." },
  { q: "Sind das Wettervorhersagen?",
    a: "Nein. Es sind Klimatrends/Szenarien (z. B. SSPs), keine punktgenauen Tagesvorhersagen." },
  { q: "Wie wird der Resilienz-Score berechnet?",
    a: "Aus Indikatoren wie Hitzetagen, Starkregen-Änderung, Schnee-Rückgang und geschätzten Mehrkosten (Proxy) wird ein 0-100-Score gebildet." },
  { q: "Kann ich meinen Score verbessern?",
    a: "Ja – durch Maßnahmen wie Sonnenschutz, Begrünung, Regenwassermanagement oder Versicherungscheck. Im Dashboard findest du Challenges." },
  { q: "Ist das Tool kostenlos?",
    a: "Die Basis ist kostenlos. Eine Pro-Version mit zusätzlichen Analysen ist geplant." },
  { q: "Welche Daten gebe ich an?",
    a: "Adresse (oder PLZ) sowie wenige Kontextdaten (z. B. Gebäudetyp). Keine sensiblen Personendaten." },
  { q: "Wie geht das Tool mit Datenschutz um?",
    a: "Wir speichern lokal (LocalStorage) für Komfortfunktionen. Keine personenbezogene Weitergabe." },
  { q: "Wie genau ist die Auswertung?",
    a: "Sie ist so genau wie die zugrunde liegenden Klimamodelle/Downscalings. Es sind robuste Trends, keine Garantien." },
  { q: "Welche Regionen sind abgedeckt?",
    a: "Europa-weit (Demo). Weitere Regionen sind geplant." },
  { q: "Funktioniert das auch mobil?",
    a: "Ja, die Oberfläche ist responsive." },
  { q: "Warum verändert sich mein Score bei anderem Horizont?",
    a: "Weil Klimarisiken langfristig wachsen. Ein weiterer Horizont kann höhere Exposition bedeuten." },
  { q: "Was bedeutet Δ bei Starkregen/Schnee?",
    a: "Δ zeigt die prozentuale Änderung gegenüber einem Referenzzeitraum, z. B. mehr Starkregenereignisse, weniger Schneetage." },
  { q: "Kann ich Ergebnisse exportieren?",
    a: "Ja, über Drucken/PDF auf der Report-Seite. Weitere Export-Formate sind geplant." },
  { q: "Gibt es ein Leaderboard?",
    a: "Demo-Leaderboard integriert. Später mit regionalen Vergleichen und Community-Challenges." },
  { q: "Wie funktionieren Badges?",
    a: "Für bestimmte Aktionen/Schwellen (z. B. Score ≥ 70, Maßnahmen umgesetzt) erhältst du Abzeichen." },
  { q: "Kann ich mehrere Adressen vergleichen?",
    a: "Einfach mehrere Reports generieren. Eine Vergleichsansicht ist in Planung." },
  { q: "Ich sehe widersprüchliche Zahlen zu Medienberichten.",
    a: "Methodik/Region/Zeitraum unterscheiden sich oft. Wir konzentrieren uns auf robuste, wissenschaftlich fundierte Trends." },
  { q: "Wie finanziert ihr euch?",
    a: "Freemium-Modell (B2C), B2B-Lizenzen/White-Label sowie Beratung/Integrations-APIs." },
  { q: "Ich habe Feedback – wohin?",
    a: "Sehr gerne! Kontakt über das Impressum oder direkt per GitHub Issues im Repo." },
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
