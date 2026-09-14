import React, { useEffect, useState } from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';
import { AppLanguage } from '../types';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

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

interface OfflineIndicatorProps {
  language?: AppLanguage;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language = 'en' }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-2.5 rounded-2xl bg-[#ff85a2] text-[#1a1218] px-3.5 py-2 text-xs font-bold shadow-xl border border-white/20 animate-in fade-in slide-in-from-bottom-2">
      <WifiOff className="w-4 h-4 shrink-0 text-[#1a1218]" />
      <span className="leading-tight">
        {language === 'my'
          ? 'အော့ဖ်လိုင်းဖြစ်နေပါသည် — သိမ်းဆည်းထားသော အချက်အလက်များကို အသုံးပြုနေပါသည်'
          : 'Offline Mode — Cached local data is being used.'}
      </span>
    </div>
  );
};
