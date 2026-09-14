import React from 'react';
import { Home, MessageSquare, User } from 'lucide-react';
import { AppLanguage } from '../types';
import { getTranslation } from '../utils/i18n';

export type MainTab = 'home' | 'chat' | 'profile';

interface BottomNavProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  unreadChatCount?: number;
  language?: AppLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadChatCount = 0,
  language = 'en',
}) => {
  const t = getTranslation(language);

  return (
    <nav className="bg-[#241b22]/95 backdrop-blur-lg border-t border-[#3d2b38] px-4 py-2 shrink-0 z-40 sticky bottom-0">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Home Tab */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-2xl transition-all ${
            activeTab === 'home'
              ? 'text-[#ff85a2]'
              : 'text-[#a0909c] hover:text-white'
          }`}
          aria-label={t.navHome}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'home' ? 'bg-[#ff85a2]/15' : ''
            }`}
          >
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold tracking-wide">{t.navHome}</span>
        </button>

        {/* Chat Tab */}
        <button
          onClick={() => onTabChange('chat')}
          className={`relative flex flex-col items-center gap-1 py-1 px-4 rounded-2xl transition-all ${
            activeTab === 'chat'
              ? 'text-[#ff85a2]'
              : 'text-[#a0909c] hover:text-white'
          }`}
          aria-label={t.navChat}
        >
          <div
            className={`p-1.5 rounded-xl transition-all relative ${
              activeTab === 'chat' ? 'bg-[#ff85a2]/15' : ''
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            {unreadChatCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ff85a2] ring-2 ring-[#241b22]" />
            )}
          </div>
          <span className="text-[11px] font-semibold tracking-wide">{t.navChat}</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-2xl transition-all ${
            activeTab === 'profile'
              ? 'text-[#ff85a2]'
              : 'text-[#a0909c] hover:text-white'
          }`}
          aria-label={t.navProfile}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'profile' ? 'bg-[#ff85a2]/15' : ''
            }`}
          >
            <User className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold tracking-wide">{t.navProfile}</span>
        </button>
      </div>
    </nav>
  );
};
