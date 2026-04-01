"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TRENDS_DATA = [
  { month: "Jan", ruto: 2.5, raila: 1.9, others: 1.0 },
  { month: "Feb", ruto: 3.1, raila: 1.9, others: 1.3 },
  { month: "Mar", ruto: 2.9, raila: 2.4, others: 1.4 },
  { month: "Apr", ruto: 3.9, raila: 2.9, others: 1.8 },
];

export function PollTrends() {
  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 px-6 pt-3">
        <div className="w-6 h-px bg-white/20"></div>
        <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-tight">
          Poll Trends Over Time
        </h3>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <div className="flex-1 w-full px-4 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TRENDS_DATA} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="ruto" 
              stroke="#fbbf24" 
              strokeWidth={3} 
              dot={{ fill: '#fbbf24', r: 4, strokeWidth: 2, stroke: '#005043' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="raila" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#005043' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="others" 
              stroke="#22c55e" 
              strokeWidth={3} 
              dot={{ fill: '#22c55e', r: 4, strokeWidth: 2, stroke: '#005043' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
