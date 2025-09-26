"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function TrendChart({data}:{data:{year:number; heatDays:number}[]}) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="heatDays" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
