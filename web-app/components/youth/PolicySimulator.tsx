"use client";

import { useState } from "react";
import { DEMO_SIMULATIONS } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wallet, TrendingUp, AlertCircle } from "lucide-react";

const StatBar = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </span>
      <span className="font-bold">{value}%</span>
    </div>
    <div className="h-2 bg-brand-surface-secondary rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-700 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export function PolicySimulator() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [stats, setStats] = useState({ publicTrust: 50, budget: 50, development: 50 });
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);

  const scenario = DEMO_SIMULATIONS[currentScenario];

  const handleChoice = (index: number) => {
    const choice = scenario.choices[index];
    setSelectedChoice(index);
    setOutcome(choice.outcome);
    
    setStats({
      publicTrust: Math.max(0, Math.min(100, stats.publicTrust + choice.consequences.publicTrust)),
      budget: Math.max(0, Math.min(100, stats.budget + choice.consequences.budget)),
      development: Math.max(0, Math.min(100, stats.development + choice.consequences.development))
    });
  };

  const handleNext = () => {
    if (currentScenario < DEMO_SIMULATIONS.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
      setOutcome(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Run Your County</h2>
        <p className="text-sm text-brand-text-muted">Make tough decisions and see the consequences</p>
      </div>

      {/* Stats Dashboard */}
      <Card className="bg-brand-surface border-kenya-gold/30">
        <CardHeader>
          <CardTitle className="text-sm">Your Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <StatBar label="Public Trust" value={stats.publicTrust} icon={Users} color="bg-green-500" />
          <StatBar label="Budget Health" value={stats.budget} icon={Wallet} color="bg-blue-500" />
          <StatBar label="Development" value={stats.development} icon={TrendingUp} color="bg-purple-500" />
        </CardContent>
      </Card>

      {/* Scenario */}
      <Card className="bg-brand-surface border-border">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-kenya-red mt-1" />
            <div>
              <CardTitle>{scenario.title}</CardTitle>
              <p className="text-sm text-brand-text-muted mt-2">{scenario.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-semibold">What will you do?</p>
          
          {scenario.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => !outcome && handleChoice(index)}
              disabled={outcome !== null}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedChoice === index
                  ? 'border-kenya-gold bg-kenya-gold/10'
                  : outcome
                  ? 'border-border bg-brand-surface-secondary opacity-50'
                  : 'border-border bg-brand-surface-secondary hover:border-gray-500'
              }`}
            >
              {choice.text}
            </button>
          ))}

          {outcome && (
            <div className="p-4 rounded-lg bg-brand-highlight border border-border">
              <p className="font-bold mb-2">Outcome:</p>
              <p className="text-sm text-brand-text-muted">{outcome}</p>
            </div>
          )}

          {outcome && currentScenario < DEMO_SIMULATIONS.length - 1 && (
            <Button onClick={handleNext} className="w-full">
              Next Scenario
            </Button>
          )}

          {outcome && currentScenario === DEMO_SIMULATIONS.length - 1 && (
            <div className="text-center p-6 bg-brand-highlight rounded-lg">
              <h3 className="text-xl font-bold mb-2">Leadership Term Complete!</h3>
              <p className="text-sm text-brand-text-muted">
                Your final approval rating: <span className="text-kenya-gold font-bold">{stats.publicTrust}%</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
