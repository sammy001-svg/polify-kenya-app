"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SubscriptionCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText?: string;
  isPopular?: boolean;
  onSubscribe: () => void;
  isLoading?: boolean;
  current?: boolean;
}

export function SubscriptionCard({
  title,
  price,
  description,
  features,
  buttonText = "Subscribe",
  isPopular = false,
  onSubscribe,
  isLoading = false,
  current = false,
}: SubscriptionCardProps) {
  return (
    <Card
      className={`relative flex flex-col ${isPopular ? "border-primary shadow-lg scale-105" : ""}`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
          Mwananchi Choice
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Free" && (
            <span className="text-muted-foreground">/month</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={isPopular ? "primary" : "outline"}
          onClick={onSubscribe}
          disabled={isLoading || current}
        >
          {current ? "Current Plan" : isLoading ? "Processing..." : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
