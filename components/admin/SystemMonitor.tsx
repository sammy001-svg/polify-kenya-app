"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Database, Cpu, Globe, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    name: "Core API Gateway",
    status: "Healthy",
    latency: "12ms",
    icon: Globe,
    color: "text-green-500",
  },
  {
    name: "AI Scanning Engine",
    status: "Active",
    latency: "450ms",
    icon: Cpu,
    color: "text-blue-500",
  },
  {
    name: "Primary Database",
    status: "Connected",
    latency: "4ms",
    icon: Database,
    color: "text-green-500",
  },
  {
    name: "Civic Feed Scraper",
    status: "Syncing",
    latency: "1.2s",
    icon: Activity,
    color: "text-yellow-500",
  },
];

export function SystemMonitor() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-brand-surface border-border overflow-hidden group hover:border-brand-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">
                  {service.name}
                </CardTitle>
                <Icon className={`h-4 w-4 ${service.color}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-black text-white">{service.status}</div>
                    <p className="text-[10px] text-brand-text-muted mt-1 font-mono">
                      LATENCY: {service.latency}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
                    {service.status === "Healthy" || service.status === "Connected" || service.status === "Active" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     className={`h-full ${service.color.replace('text', 'bg')}`}
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
