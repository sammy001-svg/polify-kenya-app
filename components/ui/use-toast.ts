"use client";

import { useState, useCallback } from "react";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  className?: string;
}

// Standalone toast function for non-hook usage or satisfying specific imports
export const toast = ({ ...props }: ToastProps) => {
  console.log("Global Toast:", props.title, props.description);
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toastHook = useCallback(({ ...props }: ToastProps) => {
    console.log("Hook Toast:", props.title, props.description);
    setToasts((prev) => [...prev, props]);
  }, []);

  return {
    toast: toastHook,
    toasts,
  };
}
