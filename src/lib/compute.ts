// src/lib/compute.ts
export type InputPayload = {
  address: string;
  horizon: number;
  homeType: "apartment" | "house" | "multi";
};

export type Report = {
  id: string;
  score: number;
  metrics: {
    heatDays: number;
    rainChangePct: number;
    snowChangePct: number;
    coolingCostDeltaEur: number;
  };
  trend: { year: number; heatDays: number }[];
};

// Dummy-Report-Generator
export function computeReport(input: InputPayload): Report {
  const score = Math.max(
    0,
    100 -
      (input.horizon - 2025) / 10 -
      (input.homeType === "apartment" ? 5 : input.homeType === "house" ? 15 : 10)
  );

  return {
    id: encodeId(input),
    score,
    metrics: {
      heatDays: 15 + (input.horizon - 2025) / 10,
      rainChangePct: (input.horizon - 2025) / 5,
      snowChangePct: -((input.horizon - 2025) / 5),
      coolingCostDeltaEur: (input.horizon - 2025) * 2,
    },
    trend: Array.from({ length: 10 }).map((_, i) => ({
      year: 2025 + i * 10,
      heatDays: 10 + i * 3,
    })),
  };
}

// URL-safe Base64 Encoding
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
