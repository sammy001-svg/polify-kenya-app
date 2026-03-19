"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowDownToLine, Users, Landmark } from "lucide-react";
import { motion } from "framer-motion";

export function AdminFinancialStats() {
  const metrics = [
    {
      title: "Total Wallet Balances",
      value: "KES 4,285,900",
      change: "+12.5%",
      icon: Wallet,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Withdrawal Requests",
      value: "KES 142,000",
      count: "12 Pending",
      icon: ArrowDownToLine,
      color: "text-kenya-red",
      bg: "bg-kenya-red/10",
    },
    {
      title: "Verified Advocates",
      value: "158",
      status: "8 Pending",
      icon: Landmark,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Verified Politicians",
      value: "42",
      status: "14 Pending",
      icon: Users,
      color: "text-kenya-gold",
      bg: "bg-kenya-gold/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-brand-surface border-border overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bg}`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-white">{metric.value}</div>
              <div className="flex items-center gap-2 mt-1">
                {metric.change && (
                  <span className="text-[10px] font-bold text-green-500">
                    {metric.change} from last month
                  </span>
                )}
                {(metric.count || metric.status) && (
                  <span className={`text-[10px] font-bold ${metric.count ? 'text-kenya-red' : 'text-brand-text-muted'}`}>
                    {metric.count || metric.status}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
