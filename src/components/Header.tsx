import React from 'react';
import { AppMode, Character, AppLanguage } from '../types';
import {
  ChevronLeft,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Heart,
  Bookmark,
  User,
  Award,
  BookOpen,
  LogOut,
  Globe,
} from 'lucide-react';
import { getTranslation } from '../utils/i18n';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  activeMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  activeCharacter: Character;
  activeChapterName: string;
  onBackToHome: () => void;
  onOpenChapterSheet: () => void;
  onOpenBookmarks: () => void;
  onOpenProfile: () => void;
  onToggleLike: () => void;
  onOpenDonate?: () => void;
  onEndMeetMode?: () => void;
  language?: AppLanguage;
  onLanguageChange?: (language: AppLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  onModeChange,
  activeCharacter,
  activeChapterName,
  onBackToHome,
  onOpenChapterSheet,
  onOpenBookmarks,
  onOpenProfile,
  onToggleLike,
  onOpenDonate,
  onEndMeetMode,
  language = 'en',
  onLanguageChange,
}) => {
  const t = getTranslation(language);

  return (
    <header className="bg-[#241b22]/95 backdrop-blur-md border-b border-[#3d2b38]/70 px-3 sm:px-4 py-2.5 z-40 sticky top-0 shrink-0">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back + Avatar + Name + Chapter */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onBackToHome}
            className="tap-target p-2 -ml-2 rounded-xl text-[#c4b5c0] hover:text-white hover:bg-[#2e222c] transition-colors"
            title={t.backToHome}
            aria-label={t.backToHome}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Character Avatar */}
          <button
            onClick={onOpenProfile}
            className="relative shrink-0 focus:outline-none"
            title={t.profileBtn}
          >
            <img
              src={activeCharacter.avatar}
              alt={activeCharacter.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#3d2b38] hover:border-[#ff85a2] transition-colors"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#241b22]" />
          </button>

          {/* Name & Session dropdown */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white truncate max-w-[105px] sm:max-w-[180px]">
                {activeCharacter.name}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1a1218] border border-[#ff85a2]/50 text-[#ff85a2] flex items-center gap-1 shrink-0">
                <Award className="w-3 h-3" />
                <span>Lv.{activeCharacter.level || 1}</span>
              </span>
            </div>

            <button
              onClick={onOpenChapterSheet}
              className="hidden sm:flex items-center gap-1 text-xs text-[#c4b5c0] hover:text-white transition-colors truncate text-left w-fit"
            >
              <BookOpen className="w-3 h-3 text-[#ff85a2]" />
              <span className="truncate max-w-[110px] sm:max-w-[160px]">
                {activeChapterName || `${t.chapter} 1`}
              </span>
              <ChevronDown className="w-3 h-3 text-[#c4b5c0]" />
            </button>
          </div>
        </div>

        {/* Right: Affection Bar + Mode Toggle + Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {activeMode === 'real' && onEndMeetMode ? (
            <>
            <button
              onClick={onEndMeetMode}
              className="px-3 py-2 rounded-full text-xs font-bold bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/60 text-rose-100 hover:text-white transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
              title={language === 'my' ? 'တွေ့ဆုံမှု အဆုံးသတ်ရန်' : 'End Meet Mode'}
              aria-label={language === 'my' ? 'အဆုံးသတ်' : 'End'}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'my' ? 'အဆုံးသတ်' : 'End'}</span>
            </button>
            </>
          ) : (
            <>

          {/* PWA Install Button if installable */}
          <div className="hidden md:block">
            <PWAInstallButton language={language} variant="header" />
          </div>

          {/* Affection Mini Bar (hidden on very small screens) */}
          <div
            onClick={onOpenProfile}
            className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#2e222c] border border-[#3d2b38] cursor-pointer hover:border-[#ff85a2]/50 transition-colors"
            title={`Affection: ${activeCharacter.affection || 0}%`}
          >
            <Heart className="w-3.5 h-3.5 fill-[#ff85a2] text-[#ff85a2]" />
            <div className="w-12 h-1.5 bg-[#1a1218] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, activeCharacter.affection || 0)}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-white">
              {activeCharacter.affection || 0}%
            </span>
          </div>

          {/* On phones: end meet, switch to meet, or switch language */}
          {activeMode === 'real' && onEndMeetMode ? (
            <button
              onClick={onEndMeetMode}
              className="sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/60 text-rose-100 hover:text-white transition-all active:scale-95"
              title={language === 'my' ? 'တွေ့ဆုံမှု အဆုံးသတ်ရန်' : 'End Meet Mode'}
              aria-label={language === 'my' ? 'တွေ့ဆုံမှု အဆုံးသတ်ရန်' : 'End Meet Mode'}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'my' ? 'အဆုံးသတ်' : 'End'}</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => onLanguageChange?.(language === 'en' ? 'my' : 'en')}
                className="sm:hidden flex items-center gap-1.5 px-2.5 py-2 rounded-full bg-[#2e222c] border border-[#3d2b38] text-white hover:border-[#ff85a2] transition-colors"
                title={t.switchLanguage}
                aria-label={t.switchLanguage}
              >
                <Globe className="w-3.5 h-3.5 text-[#ff85a2]" />
                <span className="text-xs font-bold">{language === 'my' ? 'မြန်မာ' : 'EN'}</span>
              </button>
            </>
          )}

          {/* End Meet Mode Button when in real/meet mode */}
          {activeMode === 'real' && onEndMeetMode && (
            <button
              onClick={onEndMeetMode}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/60 text-rose-200 hover:text-white transition-all shadow-sm active:scale-95"
              title={language === 'my' ? 'တွေ့ဆုံမှု အဆုံးသတ်ရန်' : 'End Meet Mode'}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'my' ? 'အဆုံးသတ်ရန်' : 'End Meet'}</span>
            </button>
          )}

          {/* Mode Toggle Button */}
          <button
            onClick={() => onModeChange(activeMode === 'chat' ? 'real' : 'chat')}
            className={`flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              activeMode === 'real'
                ? 'bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white shadow-[#ff5a8a]/25'
                : 'bg-[#2e222c] hover:bg-[#3d2b38] text-white border border-[#3d2b38] hover:border-[#ff85a2]'
            }`}
            title={activeMode === 'chat' ? t.switchToMeetMode : t.switchToChatMode}
          >
            {activeMode === 'chat' ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#ff85a2]" />
                <span>{t.meetMode}</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.chatMode}</span>
              </>
            )}
          </button>

          {/* Heart Like Button */}
          <button
            onClick={onToggleLike}
            className={`hidden sm:block p-2 rounded-full border transition-all ${
              activeCharacter.liked
                ? 'bg-[#ff85a2]/20 border-[#ff85a2] text-[#ff85a2]'
                : 'bg-[#2e222c] border-[#3d2b38] text-[#c4b5c0] hover:text-white'
            }`}
            title={activeCharacter.liked ? t.liked : t.likeCharacter}
            aria-label={t.likeCharacter}
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                activeCharacter.liked ? 'fill-[#ff85a2]' : ''
              }`}
            />
          </button>

          {/* Bookmarks Drawer Button */}
          <button
            onClick={onOpenBookmarks}
            className="hidden sm:block p-2 rounded-full bg-[#2e222c] border border-[#3d2b38] text-[#c4b5c0] hover:text-white hover:border-[#ff85a2] transition-colors relative"
            title={t.bookmarks}
            aria-label={t.bookmarks}
          >
            <Bookmark className="w-4 h-4" />
            {(activeCharacter.bookmarks?.length || 0) > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff85a2]" />
            )}
          </button>

          {/* Profile Button */}
          <button
            onClick={onOpenProfile}
            className="hidden sm:block p-2 rounded-full bg-[#2e222c] border border-[#3d2b38] text-[#c4b5c0] hover:text-white hover:border-[#ff85a2] transition-colors"
            title={t.profileBtn}
            aria-label={t.profileBtn}
          >
            <User className="w-4 h-4" />
          </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
