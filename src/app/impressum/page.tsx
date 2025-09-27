// src/app/impressum/page.tsx
import Header from "@/components/Header";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-cloud)] text-[var(--brand-graphite)]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 space-y-4">
        <h1 className="text-2xl font-bold">Impressum</h1>
        <p>Climetrics (B2C Prototype)</p>
        <p>Verantwortlich: Dein Name / Deine Firma</p>
        <p>Adresse: Musterstraße 1, 1010 Wien</p>
        <p>E-Mail: hello@example.com</p>
        <p>UID: ATU12345678</p>
        <p className="text-sm text-slate-600">
          Inhalte ohne Gewähr. Die verwendeten Klimadaten basieren auf wissenschaftlichen Szenarien
          und stellen keine punktgenauen Wettervorhersagen dar.
        </p>
      </main>
    </div>
  );
}
