import React, { useState } from 'react';
import { Character, AppMode, AppLanguage, StoryGenre, StorySession } from '../types';
import {
  MessageSquare,
  Settings,
  Search,
  X,
  ShieldCheck,
  Award,
  Info,
  Globe,
  Dices,
  Shuffle,
  ChevronRight,
  Mars,
  Venus,
  Circle,
  Trash2,
  Check,
} from 'lucide-react';
import { getTranslation, localizeCharacter } from '../utils/i18n';
import { STORY_GENRES } from '../utils/storage';
import { PWAInstallButton } from './PWAInstallButton';

interface HomeTabProps {
  characters: Character[];
  onSelectAndTalk: (character: Character, mode: AppMode) => void;
  onOpenCharacterProfile: (character: Character) => void;
  onOpenSettings: () => void;
  onOpenDonate?: () => void;
  language: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  onStartStory?: (genre: StoryGenre) => void;
  stories?: StorySession[];
  onOpenStory?: (storyId: string) => void;
  onDeleteStory?: (storyId: string) => void;
  onStartStoryCustom?: (premise: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  characters,
  onSelectAndTalk,
  onOpenCharacterProfile,
  onOpenSettings,
  onOpenDonate,
  language,
  onLanguageChange,
  onStartStory,
  stories,
  onOpenStory,
  onDeleteStory,
  onStartStoryCustom,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showGamePicker, setShowGamePicker] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [customGenre, setCustomGenre] = useState('');
  const t = getTranslation(language);
  const lang: AppLanguage = language;

  // Default characters are the official 6 characters (cannot be edited or deleted)
  const defaultCharacters = characters.filter((c) => c.isDefault);

  const filteredCharacters = defaultCharacters.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      (c.personality || '').toLowerCase().includes(q) ||
      (c.relationship || '').toLowerCase().includes(q) ||
      (c.traits || []).some((tr) => tr.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1a1218] overflow-hidden">
      {/* Top Header */}
      <div className="px-4 py-3.5 bg-[#241b22]/95 backdrop-blur-md border-b border-[#3d2b38] shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="./app-icon.png"
              alt={t.appName}
              className="w-9 h-9 rounded-2xl object-cover shadow-md shadow-[#ff5a8a]/20 border border-white/10"
            />
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-none">
                {t.appName}
              </h1>
              <p className="hidden sm:block text-[11px] text-[#c4b5c0] font-medium mt-0.5">
                {t.appTagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">

            {/* Install PWA Button */}
            <div className="hidden md:block">
              <PWAInstallButton language={language} variant="header" />
            </div>

            {/* Quick Language Toggle */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'my' : 'en')}
              className="p-2 sm:px-2.5 sm:py-1 rounded-xl bg-[#2e222c] border border-[#3d2b38] hover:border-[#ff85a2]/50 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
              title={t.switchLanguage}
            >
              <Globe className="w-3.5 h-3.5 text-[#ff85a2]" />
              <span className="hidden sm:inline text-[11px]">{language === 'en' ? 'မြန်မာ' : 'EN'}</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2 rounded-2xl text-[#c4b5c0] hover:text-white bg-[#2e222c] border border-[#3d2b38] hover:border-[#ff85a2]/50 transition-colors"
              title={t.settings}
              aria-label={t.settings}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="max-w-4xl mx-auto mt-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4b5c0] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholderHome}
              className="w-full bg-[#2e222c] border border-[#3d2b38] rounded-2xl py-2 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-[#a0909c] focus:outline-none focus:border-[#ff85a2] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#c4b5c0] hover:text-white"
                aria-label={t.search}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-4xl w-full mx-auto pb-20">
        {/* Game Mode (Story Mode) — prominent, separate from companions */}
        <button
          onClick={() => setShowGamePicker((v) => !v)}
          className="w-full text-left bg-gradient-to-br from-[#1a2226] to-[#241b22] border border-[#3d2b38] hover:border-[#ff85a2]/60 rounded-3xl p-4 transition-all shadow-sm hover:shadow-md group"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <span className="block w-14 h-14 rounded-2xl bg-[#2e222c] border border-[#3d2b38] items-center justify-center flex text-3xl group-hover:scale-105 transition-transform">
                🎲
              </span>
              <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#1a1218]">
                <ChevronRight
                  className={`w-3.5 h-3.5 text-[#ff85a2] transition-transform ${showGamePicker ? 'rotate-90' : ''}`}
                />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white group-hover:text-[#ff85a2] transition-colors">
                  {t.gameMode}
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ff85a2]/20 text-[#ff85a2] border border-[#ff85a2]/30">
                  {t.storyMode}
                </span>
              </div>
              <p className="text-xs text-[#c4b5c0] mt-0.5 leading-relaxed">{t.gameModeDesc}</p>
            </div>
          </div>
        </button>

        {/* Game Mode genre picker */}
        {showGamePicker && (
          <div className="bg-[#241b22] border border-[#3d2b38] rounded-3xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#c4b5c0]">
                {t.chooseGenre}
              </p>
              <button
                onClick={() => {
                  setShowGamePicker(false);
                  onStartStory?.('random');
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-95 shadow-md shadow-[#ff5a8a]/20 transition-all active:scale-95"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>{t.surpriseMe}</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {STORY_GENRES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setShowGamePicker(false);
                    onStartStory?.(g.id);
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#1a1218] border border-[#3d2b38] hover:border-[#ff85a2] hover:bg-[#2e222c] text-left transition-all active:scale-95"
                >
                  <span className="text-base">{g.emoji}</span>
                  <span className="text-xs font-semibold text-white">
                    {lang === 'my' ? g.labelMy : g.labelEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Manual custom genre box */}
            <div className="mt-2.5 pt-2.5 border-t border-[#3d2b38]/60">
              <p className="text-[11px] font-bold text-[#c4b5c0] mb-1.5 flex items-center gap-1">
                <Dices className="w-3 h-3" />
                {t.customGenrePlaceholder}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customGenre}
                  onChange={(e) => setCustomGenre(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customGenre.trim()) {
                      setShowGamePicker(false);
                      onStartStoryCustom?.(customGenre);
                    }
                  }}
                  placeholder={t.customGenrePlaceholder}
                  className="flex-1 min-w-0 bg-[#1a1218] border border-[#3d2b38] rounded-xl px-3 py-2 text-xs text-white placeholder-[#a0909c] focus:outline-none focus:border-[#ff85a2] transition-colors"
                />
                <button
                  onClick={() => {
                    if (!customGenre.trim()) return;
                    setShowGamePicker(false);
                    onStartStoryCustom?.(customGenre);
                  }}
                  disabled={!customGenre.trim()}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-95 shadow-sm shadow-[#ff5a8a]/20 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>{t.customGenreStart}</span>
                </button>
              </div>
            </div>

            {/* Resume saved adventures */}
            {stories && stories.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#3d2b38]/60">
                <p className="text-[11px] font-bold text-[#ff85a2] mb-1.5 flex items-center gap-1">
                  <Dices className="w-3 h-3" />
                  {t.continueStory}
                </p>
                <div className="flex flex-col gap-1">
                  {stories.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center rounded-xl bg-[#1a1218] border border-[#3d2b38] hover:border-[#a0909c] hover:bg-[#2e222c] transition-all"
                    >
                      <button
                        onClick={() => {
                          setShowGamePicker(false);
                          onOpenStory?.(s.id);
                        }}
                        className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 text-left active:scale-[0.99]"
                      >
                        <span className="text-sm">{s.genre === 'scifi' ? '🚀' : s.genre === 'fantasy' ? '⚔️' : s.genre === 'slice' ? '😄' : s.genre === 'horror' ? '👻' : '🎲'}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-white truncate">{s.title}</p>
                          <p className="text-[11px] text-[#c4b5c0]">
                            {s.messages.length >= 2
                              ? `${Math.ceil(s.messages.length / 2)} ${lang === 'my' ? 'အကြိမ်' : 'turns'}`
                              : lang === 'my' ? 'မစတင်ရသေး' : 'not started'}
                          </p>
                        </div>
                      </button>
                      {pendingDelete === s.id ? (
                          <span className="shrink-0 mr-1.5 flex items-center gap-0.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteStory?.(s.id);
                                setPendingDelete(null);
                              }}
                              title={t.delete}
                              aria-label={t.delete}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPendingDelete(null);
                              }}
                              title={t.cancel}
                              aria-label={t.cancel}
                              className="p-1.5 rounded-lg text-[#c4b5c0] hover:bg-[#2e222c] transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPendingDelete(s.id);
                            }}
                            title={t.delete}
                            aria-label={t.delete}
                            className="shrink-0 mr-1.5 p-1.5 rounded-lg text-[#c4b5c0] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c4b5c0]">
              {t.officialCompanions}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ff85a2]/20 text-[#ff85a2] border border-[#ff85a2]/30">
              {defaultCharacters.length} {t.availableCount}
            </span>
          </div>
          <span className="hidden sm:flex text-[11px] text-[#c4b5c0] items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff85a2]" />
            <span>{t.permanentNote}</span>
          </span>
        </div>

        {filteredCharacters.length === 0 ? (
          <div className="py-16 text-center text-[#c4b5c0] space-y-2">
            <Search className="w-8 h-8 mx-auto text-[#c4b5c0]/60" />
            <p className="text-sm font-semibold text-white">{t.noCompanionsFound}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredCharacters.map((char) => {
              const lc = localizeCharacter(char, lang);
              return (
              <div
                key={char.id}
                className="group relative bg-[#241b22] border border-[#3d2b38] hover:border-[#ff85a2]/50 rounded-3xl p-4 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between cursor-pointer"
                onClick={() => onOpenCharacterProfile(char)}
              >
                <div>
                  {/* Card Top: Avatar, Name, Relationship, Level */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={char.avatar}
                        alt={lc.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#3d2b38] group-hover:ring-[#ff85a2] transition-all"
                      />
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#1a1218]">
                        <span className="block w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#241b22]" />
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h2 className="text-base font-bold text-white group-hover:text-[#ff85a2] transition-colors truncate">
                          {char.gender === 'female' ? (
                            <Venus className="w-3.5 h-3.5 text-[#ff85a2] inline-block mr-1 -mt-0.5 shrink-0" />
                          ) : char.gender === 'male' ? (
                            <Mars className="w-3.5 h-3.5 text-[#7cc4ff] inline-block mr-1 -mt-0.5 shrink-0" />
                          ) : char.gender ? (
                            <Circle className="w-3.5 h-3.5 text-[#c8a0ff] inline-block mr-1 -mt-0.5 shrink-0" />
                          ) : null}
                          {lc.name}
                        </h2>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-lg bg-[#2e222c] border border-[#3d2b38] text-white flex items-center gap-1">
                            <Award className="w-2.5 h-2.5 text-[#ff85a2]" />
                            <span>{t.level}{char.level || 1}</span>
                          </span>
                        </div>
                      </div>

                      {/* Relationship */}
                      <p className="text-xs font-semibold text-[#ff85a2] mt-0.5 truncate">
                        {lc.relationship}
                      </p>

                      {/* Backstory short snippet */}
                      <p className="text-xs text-[#c4b5c0] line-clamp-2 mt-1.5 leading-relaxed">
                        {lc.backstory}
                      </p>
                    </div>
                  </div>

                  {/* Traits Pills */}
                  {lc.traits && lc.traits.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#3d2b38]/60">
                      {char.tags && char.tags.length > 0 && char.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-red-900/60 border border-red-500/70 text-[11px] font-bold text-red-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {lc.traits.map((trait, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-[#2e222c] border border-[#3d2b38] text-[11px] font-medium text-[#c4b5c0]"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions: View Profile, Chat Button, Meet Button */}
                <div
                  className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#3d2b38]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onOpenCharacterProfile(char)}
                    className="text-xs text-[#c4b5c0] hover:text-white flex items-center gap-1 font-medium transition-colors px-2 py-1 rounded-xl hover:bg-[#2e222c]"
                    title={t.viewProfile}
                  >
                    <Info className="w-3.5 h-3.5 text-[#ff85a2]" />
                    <span>{t.viewProfile}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Chat Online Button (Meet is entered from inside the chat via the header toggle) */}
                    <button
                      onClick={() => onSelectAndTalk(char, 'chat')}
                      className="px-4 py-2 min-h-[40px] rounded-xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-95 shadow-md shadow-[#ff5a8a]/20 transition-all"
                      title={t.talkChat}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t.talkChat}</span>
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
