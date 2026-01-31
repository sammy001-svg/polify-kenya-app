import * as React from "react"
// import { Slot } from "@radix-ui/react-slot" 

// Actually, since I didn't install radix, I will keep it simple for now and just use props.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    
    // Base styles: Youtube-like rounded, medium weight, smooth transition
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      primary: "bg-white text-black hover:bg-gray-200", // "Youtube White"
      secondary: "bg-brand-surface-secondary text-brand-text hover:bg-brand-highlight", // "Youtube Gray"
      outline: "border border-border bg-transparent hover:bg-brand-surface-secondary text-brand-text",
      ghost: "hover:bg-brand-surface-secondary text-brand-text",
      danger: "bg-kenya-red text-white hover:opacity-90",
      success: "bg-kenya-green text-white hover:opacity-90",
      link: "text-kenya-gold hover:underline bg-transparent h-auto p-0 font-normal",
    }
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
