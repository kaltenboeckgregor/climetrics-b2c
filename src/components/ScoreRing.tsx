"use client";
import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

export default function ScoreRing({score}:{score:number}){
  const data = [{ name:"Score", uv: score, fill: "#0EA5A0" }];
  return (
    <div className="w-full h-48">
      <ResponsiveContainer>
        <RadialBarChart innerRadius="70%" outerRadius="100%" startAngle={180} endAngle={0} data={data}>
          <RadialBar dataKey="uv" cornerRadius={20} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center -mt-14">
        <div className="text-4xl font-extrabold">{score}</div>
        <div className="text-xs text-slate-500">Resilienz-Score</div>
      </div>
    </div>
  );
}
