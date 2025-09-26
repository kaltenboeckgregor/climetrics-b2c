// src/app/api/leaderboard/route.ts
export type LeaderboardEntry = { rank: number; place: string; score: number };

const demo: LeaderboardEntry[] = [
  { rank: 1, place: "Wien 19", score: 78 },
  { rank: 2, place: "Wien 13", score: 74 },
  { rank: 3, place: "Wien 1",  score: 71 },
];

export async function GET() {
  return Response.json({ items: demo }, { status: 200 });
}
