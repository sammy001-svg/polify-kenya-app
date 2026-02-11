import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Base styles: Youtube-like rounded, medium weight, smooth transition
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5", // "Youtube White"
      secondary:
        "bg-brand-surface-secondary text-brand-text hover:bg-brand-highlight border border-white/5", // "Youtube Gray"
      outline:
        "border border-white/10 bg-transparent hover:bg-white/5 text-brand-text",
      ghost: "hover:bg-white/5 text-brand-text",
      danger:
        "bg-kenya-red text-white hover:opacity-90 shadow-lg shadow-kenya-red/20",
      success:
        "bg-kenya-green text-white hover:opacity-90 shadow-lg shadow-kenya-green/20",
      link: "text-kenya-gold hover:underline bg-transparent h-auto p-0 font-normal",
    };

    const sizes = {
      sm: "h-8 px-4 text-[10px] uppercase tracking-wider",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-10 text-lg tracking-tight",
      icon: "h-11 w-11",
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
