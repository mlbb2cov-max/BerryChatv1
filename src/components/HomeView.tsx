import React, { useState } from 'react';
import { Character, AppLanguage } from '../types';
import { getTranslation } from '../utils/i18n';
import {
  Search,
  X,
  Plus,
  Settings,
  Flame,
  Award,
  Trash2,
  Edit3,
  User,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface HomeViewProps {
  characters: Character[];
  activeCharacterId: string;
  onSelectCharacter: (id: string) => void;
  onOpenCreateCharacter: () => void;
  onOpenEditCharacter: (character: Character) => void;
  onOpenProfile: (character: Character) => void;
  onDeleteCharacter: (id: string) => void;
  onOpenSettings: () => void;
  language?: AppLanguage;
}

export const HomeView: React.FC<HomeViewProps> = ({
  characters,
  activeCharacterId,
  onSelectCharacter,
  onOpenCreateCharacter,
  onOpenEditCharacter,
  onOpenProfile,
  onDeleteCharacter,
  onOpenSettings,
  language = 'en',
}) => {
  const t = getTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = characters.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (c.name || '').toLowerCase().includes(q) ||
      (c.personality || '').toLowerCase().includes(q) ||
      (c.relationship || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1a1218] overflow-hidden">
      {/* Home Header */}
      <div className="px-4 py-3.5 bg-[#241b22]/90 backdrop-blur-md border-b border-[#3d2b38] flex flex-col gap-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">{t.chatsTitle}</h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ff85a2]/20 text-[#ff85a2] border border-[#ff85a2]/30">
              {characters.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenCreateCharacter}
              className="p-2 rounded-full bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white hover:opacity-95 shadow-md shadow-[#ff5a8a]/20 transition-all"
              title={t.addCharacter}
              aria-label={t.addCharacter}
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full text-[#a0909c] hover:text-white hover:bg-[#2e222c] transition-colors"
              title={t.settingsAndBackups}
              aria-label={t.settings}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0909c] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholderHome}
            className="w-full bg-[#2e222c] border border-[#3d2b38] rounded-2xl py-2 pl-10 pr-9 text-sm text-white placeholder-[#a0909c] focus:outline-none focus:border-[#ff85a2] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#a0909c] hover:text-white"
              aria-label={t.search}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Character List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 pb-24">
        {filtered.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-[#a0909c] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2e222c] flex items-center justify-center text-[#ff85a2]">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-white">
              {searchQuery ? t.noMatchFound : t.noCharactersYet}
            </p>
            <p className="text-xs max-w-xs">
              {searchQuery ? t.tryDifferentSearch : t.createFirstCompanion}
            </p>
          </div>
        ) : (
          filtered.map((char) => {
            const activeSession =
              char.sessions?.find((s) => s.id === char.activeSessionId) ||
              char.sessions?.[0];
            const msgs = activeSession?.messages || [];
            const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
            const previewText = lastMsg
              ? lastMsg.content.slice(0, 50) + (lastMsg.content.length > 50 ? '...' : '')
              : t.startNewConversation;
            const timeStr = lastMsg?.time || t.justNow;
            const isActive = char.id === activeCharacterId;

            return (
              <div
                key={char.id}
                className={`group relative rounded-2xl border transition-all p-3 flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-[#241b22] border-[#ff85a2]/60 shadow-md'
                    : 'bg-[#241b22] border-[#3d2b38] hover:border-[#ff85a2]/40 hover:bg-[#2e222c]/50'
                }`}
                onClick={() => onSelectCharacter(char.id)}
              >
                {/* Avatar with Level Ring */}
                <div className="relative shrink-0">
                  <img
                    src={char.avatar}
                    alt={char.name}
                    className="w-13 h-13 rounded-full object-cover border-2 border-[#3d2b38] group-hover:border-[#ff85a2] transition-colors"
                  />
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#1a1218] border border-[#ff85a2] text-[9px] font-black text-[#ff85a2] flex items-center gap-0.5 shadow-xs">
                    <Award className="w-2.5 h-2.5" />
                    <span>Lv.{char.level || 1}</span>
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-bold text-sm text-white truncate flex items-center gap-1.5">
                      <span>{char.name}</span>
                      {char.liked && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff85a2]" />
                      )}
                    </h2>
                    <span className="text-[11px] text-[#a0909c] shrink-0">{timeStr}</span>
                  </div>

                  <p className="text-xs text-[#a0909c] truncate mt-1 group-hover:text-stone-300 transition-colors">
                    {previewText}
                  </p>

                  <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                    <span className="text-[#ff85a2] font-semibold flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-[#ff85a2]" />
                      <span>{char.streak || 1}d streak</span>
                    </span>
                    <span className="text-[#a0909c] truncate">
                      {char.relationship || 'Friend'}
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProfile(char);
                    }}
                    className="p-1.5 rounded-lg text-[#a0909c] hover:text-white hover:bg-[#3d2b38] transition-colors"
                    title={t.profileBtn}
                    aria-label={t.viewProfile}
                  >
                    <User className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEditCharacter(char);
                    }}
                    className="p-1.5 rounded-lg text-[#a0909c] hover:text-[#ff85a2] hover:bg-[#3d2b38] transition-colors"
                    title={t.editCharacter}
                    aria-label={t.editCharacter}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`${t.deleteCharacter} ${char.name}? ${t.deleteCharWarning}`)) {
                        onDeleteCharacter(char.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-[#a0909c] hover:text-red-400 hover:bg-red-950/40 transition-colors"
                    title={t.deleteCharacter}
                    aria-label={t.deleteCharacter}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto bg-[#241b22]/95 backdrop-blur-md border-t border-[#3d2b38] px-6 py-2.5 flex items-center justify-around z-30 shadow-lg">
        <button
          className="flex flex-col items-center gap-1 text-[#ff85a2] font-semibold text-xs"
          aria-label={t.chatsTitle}
        >
          <MessageSquare className="w-5 h-5" />
          <span>{t.chatsTitle}</span>
        </button>
        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center gap-1 text-[#a0909c] hover:text-white font-medium text-xs transition-colors"
          aria-label={t.settingsAndBackups}
        >
          <Settings className="w-5 h-5" />
          <span>{t.settings}</span>
        </button>
      </div>
    </div>
  );
};
