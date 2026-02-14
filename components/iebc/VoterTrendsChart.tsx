"use client";

import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { month: 'Jan', registrations: 4000 },
  { month: 'Feb', registrations: 3000 },
  { month: 'Mar', registrations: 2000 },
  { month: 'Apr', registrations: 2780 },
  { month: 'May', registrations: 1890 },
  { month: 'Jun', registrations: 2390 },
  { month: 'Jul', registrations: 3490 },
];

export function VoterTrendsChart() {
  return (
    <Card className="bg-brand-surface border-white/5">
      <CardHeader>
        <CardTitle>Voter Registration Trends</CardTitle>
        <CardDescription>Monthly new voter registrations for 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#008C51" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#008C51" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis 
                    dataKey="month" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                />
                <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`} 
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} 
                    labelStyle={{ color: '#fff' }} 
                    itemStyle={{ color: '#008C51' }} 
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <Area 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#008C51" 
                    fillOpacity={1} 
                    fill="url(#colorRegistrations)" 
                />
            </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
