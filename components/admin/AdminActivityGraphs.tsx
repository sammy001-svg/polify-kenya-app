"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart, Line,
  Cell,
  PieChart, Pie
} from "recharts";

const USER_GROWTH_DATA = [
  { name: "Jan", users: 4000 },
  { name: "Feb", users: 5200 },
  { name: "Mar", users: 6800 },
  { name: "Apr", users: 7100 },
  { name: "May", users: 8400 },
  { name: "Jun", users: 10200 },
];

const ACTIVITY_DATA = [
  { name: "Mon", tasks: 45 },
  { name: "Tue", tasks: 52 },
  { name: "Wed", tasks: 38 },
  { name: "Thu", tasks: 65 },
  { name: "Fri", tasks: 48 },
  { name: "Sat", tasks: 24 },
  { name: "Sun", tasks: 18 },
];

const SALES_DATA = [
  { name: "M", sales: 12000 },
  { name: "T", sales: 15000 },
  { name: "W", sales: 11000 },
  { name: "T", sales: 18000 },
  { name: "F", sales: 22000 },
  { name: "S", sales: 14000 },
  { name: "S", sales: 9000 },
];

const CROWDFUNDING_DATA = [
  { name: "Education", value: 400, color: "#008c51" },
  { name: "Healthcare", value: 300, color: "#fdb931" },
  { name: "Infra", value: 200, color: "#bb1919" },
  { name: "Legal", value: 278, color: "#0088fe" },
];

export function AdminActivityGraphs() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* 1. Registered Users Growth */}
      <Card className="bg-brand-surface border-border p-6 col-span-1 lg:col-span-1">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xs font-bold text-white uppercase tracking-widest">Registered User Growth</CardTitle>
        </CardHeader>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={USER_GROWTH_DATA}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#008c51" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#008c51" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
              <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} />
              <YAxis stroke="#ffffff20" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', fontSize: '10px' }}
                itemStyle={{ color: '#008c51' }}
              />
              <Area type="monotone" dataKey="users" stroke="#008c51" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2. User Activities */}
      <Card className="bg-brand-surface border-border p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xs font-bold text-white uppercase tracking-widest">Weekly Citizen Activity</CardTitle>
        </CardHeader>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ACTIVITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
              <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} />
              <YAxis stroke="#ffffff20" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', fontSize: '10px' }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar dataKey="tasks" fill="#fdb931" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 3. Marketplace Sales */}
      <Card className="bg-brand-surface border-border p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xs font-bold text-white uppercase tracking-widest">Marketplace Sales (KES)</CardTitle>
        </CardHeader>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={SALES_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
              <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} />
              <YAxis stroke="#ffffff20" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', fontSize: '10px' }} />
              <Line type="monotone" dataKey="sales" stroke="#0088fe" strokeWidth={3} dot={{ r: 4, fill: '#0088fe' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 4. Crowdfunding Distribution */}
      <Card className="bg-brand-surface border-border p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xs font-bold text-white uppercase tracking-widest">Crowdfunding Allocation</CardTitle>
        </CardHeader>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CROWDFUNDING_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {CROWDFUNDING_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
