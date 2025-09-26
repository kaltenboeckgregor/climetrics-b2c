// src/lib/compute.ts
export type InputPayload = {
  address: string;
  horizon: number;
  homeType: "apartment" | "house" | "multi";
};

export type Report = {
  id: string;
  input: InputPayload;          // <- wichtig für report-client
  score: number;                // 0..100
  metrics: {
    heatDays: number;           // >35°C
    rainChangePct: number;      // %
    snowChangePct: number;      // %
    coolingCostDeltaEur: number;
  };
  trend: { year: number; heatDays: number }[];
};

export function computeReport(input: InputPayload): Report {
  const heatDays = Math.max(0, Math.round((input.horizon - 2020) / 5) + (input.homeType === "apartment" ? 2 : 0));
  const rainChangePct = 10 + Math.round((input.horizon - 2025) / 5);
  const snowChangePct = -Math.round((input.horizon - 2025) / 5);
  const coolingCostDeltaEur = Math.max(0, Math.round(40 + heatDays * 3.5));

  const base =
    100
    - Math.min(heatDays * 1.2, 50)
    - Math.max(0, rainChangePct - 10)
    - Math.max(0, (-(snowChangePct) - 10) / 2)
    - Math.min(coolingCostDeltaEur / 5, 20);

  const score = Math.max(0, Math.min(100, Math.round(base)));

  const trend = Array.from({ length: 5 }).map((_, i) => ({
    year: 2030 + i * 10,
    heatDays: Math.max(0, Math.round(heatDays * (0.6 + i * 0.12))),
  }));

  return {
    id: encodeId(input),
    input,
    score,
    metrics: { heatDays, rainChangePct, snowChangePct, coolingCostDeltaEur },
    trend,
  };
}

// ---- URL-safe Base64 (Browser/Node) ----
function toBase64Url(s: string) {
  const b64 =
    typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(s)))
      : Buffer.from(s, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(s: string) {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const raw =
    typeof window !== "undefined"
      ? decodeURIComponent(escape(atob(padded)))
      : Buffer.from(padded, "base64").toString("utf8");
  return raw;
}

export function encodeId(input: InputPayload) {
  const raw = JSON.stringify(input);
  return toBase64Url(raw);
}

export function decodeId(id: string): InputPayload {
  const raw = fromBase64Url(id);
  return JSON.parse(raw);
}
