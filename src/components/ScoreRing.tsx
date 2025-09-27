// src/components/ScoreRing.tsx
"use client";

import { useMemo } from "react";

export default function ScoreRing({ score }: { score: number }) {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  const size = 160;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = useMemo(() => ((100 - s) / 100) * c, [s, c]);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#grad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={dash}
          style={{ transition: "stroke-dashoffset 600ms ease" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-emerald)" />
            <stop offset="100%" stopColor="var(--brand-cyan)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-2 text-2xl font-extrabold">{s}/100</div>
      <div className="text-slate-600 text-sm">Resilienz-Score</div>
    </div>
  );
}
