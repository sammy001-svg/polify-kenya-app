"use client";

import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export const PwaManager = {
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  saveOfflineData(key: string, data: unknown) {
    if (!this.isStorageAvailable()) return;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ ...(data as Record<string, unknown>), _offline: true, _timestamp: Date.now() });
    localStorage.setItem(key, JSON.stringify(existing));
  },

  getOfflineData(key: string) {
    if (!this.isStorageAvailable()) return [];
    return JSON.parse(localStorage.getItem(key) || '[]');
  },

  clearOfflineData(key: string) {
    if (!this.isStorageAvailable()) return;
    localStorage.removeItem(key);
  }
};
