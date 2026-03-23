"use client";

import { useEffect, ReactNode } from "react";

/**
 * SecurityProvider
 * 
 * Implements client-side measures to prevent source code inspection
 * and protect the intellectual property of the application.
 */
export function SecurityProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Prevent Right-Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Block Inspection Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // List of blocked keys
      // F12 (123)
      // Ctrl+Shift+I (I=73)
      // Ctrl+Shift+J (J=74)
      // Ctrl+Shift+C (C=67)
      // Ctrl+U (U=85) - View Source
      // Cmd+Opt+I (Mac equivalent for I)
      
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const key = e.key.toLowerCase();

      // Block F12
      if (e.keyCode === 123 || e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if (isCtrlOrCmd && isShift && (key === 'i' || key === 'j' || key === 'c')) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+U
      if (isCtrlOrCmd && key === 'u') {
        e.preventDefault();
        return false;
      }
      
      // Block Ctrl+S (Save page)
      if (isCtrlOrCmd && key === 's') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
