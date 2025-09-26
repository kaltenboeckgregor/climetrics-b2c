"use client";
export default function ChallengeList({items}:{items:string[]}) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((c,i)=>(<li key={i}>• {c}</li>))}
    </ul>
  );
}
