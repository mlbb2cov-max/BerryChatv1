import React, { useState } from 'react';
import { Character, AppMode, AppLanguage } from '../types';
import {
  Plus,
  Search,
  X,
  Trash2,
  MessageSquare,
  Settings,
  ChevronRight,
  User,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { getTranslation, localizeCharacter } from '../utils/i18n';

interface ChatTabProps {
  characters: Character[];
  activeCharacterId: string;
  onOpenConversation: (character: Character, mode: AppMode) => void;
  onOpenCreateCharacter: () => void;
  onOpenEditCharacter: (character: Character) => void;
  onDeleteCharacter: (characterId: string) => void;
  onOpenSettings: () => void;
  onGoToHome: () => void;
  language: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
}

export const ChatTab: React.FC<ChatTabProps> = ({
  characters,
  activeCharacterId,
  onOpenConversation,
  onOpenCreateCharacter,
  onOpenEditCharacter,
  onDeleteCharacter,
  onOpenSettings,
  onGoToHome,
  language,
  onLanguageChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const t = getTranslation(language);

  // Helper to compute latest activity timestamp like Telegram
  const getLatestActivity = (c: Character): number => {
    let maxTime = c.lastActivityTimestamp || c.createdAt || 0;
    for (const sess of c.sessions || []) {
      for (const msg of sess.messages || []) {
        if (msg.timestamp && msg.timestamp > maxTime) {
          maxTime = msg.timestamp;
        }
      }
    }
    return maxTime;
  };

  // Characters that appear in the Chat tab:
  // Any character with hasChatted === true, OR has messages in any session, OR is a custom character created by user (!isDefault)
  const chatCharacters = characters.filter((c) => {
    const hasMessages = (c.sessions || []).some((s) => (s.messages || []).length > 0);
    return c.hasChatted || hasMessages || !c.isDefault;
  });

  // Sort like Telegram: conversation with the most recent message appears at the top!
  const sortedChatCharacters = [...chatCharacters].sort(
    (a, b) => getLatestActivity(b) - getLatestActivity(a)
  );

  const filtered = sortedChatCharacters.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      (c.relationship || '').toLowerCase().includes(q) ||
      (c.personality || '').toLowerCase().includes(q)
    );
  });

  const handleDeleteConfirm = (id: string) => {
    onDeleteCharacter(id);
    setConfirmDeleteId(null);
  };

  const formatChatTime = (timestamp?: number) => {
    if (!timestamp) return '';
    const now = new Date();
    const date = new Date(timestamp);
    const isToday = now.toDateString() === date.toDateString();
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === date.toDateString()) {
      return language === 'my' ? 'မနေ့က' : 'Yesterday';
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative flex-1 flex flex-col h-full bg-[#1a1218] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3.5 bg-[#241b22]/95 backdrop-blur-md border-b border-[#3d2b38] shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t.chatsTitle}
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ff85a2]/20 text-[#ff85a2] border border-[#ff85a2]/30">
              {chatCharacters.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Language Toggle */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'my' : 'en')}
              className="tap-target p-2.5 sm:px-3 sm:py-1 rounded-xl bg-[#2e222c] border border-[#3d2b38] hover:border-[#ff85a2]/50 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
              title={t.switchLanguage}
            >
              <Globe className="w-3.5 h-3.5 text-[#ff85a2]" />
              <span className="hidden sm:inline text-[11px]">{language === 'en' ? 'မြန်မာ' : 'EN'}</span>
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="tap-target p-2.5 rounded-2xl text-[#c4b5c0] hover:text-white bg-[#2e222c] border border-[#3d2b38] hover:border-[#ff85a2]/50 transition-colors"
              title={t.settings}
              aria-label={t.settings}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto mt-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4b5c0] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchChats}
              className="w-full bg-[#2e222c] border border-[#3d2b38] rounded-2xl py-2 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-[#c4b5c0] focus:outline-none focus:border-[#ff85a2] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="tap-target absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-[#c4b5c0] hover:text-white active:bg-[#3d2b38]"
                aria-label={t.search}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 max-w-4xl w-full mx-auto pb-20">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[#c4b5c0] space-y-3 px-4">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-[#241b22] border border-[#3d2b38] flex items-center justify-center text-[#ff85a2]">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{t.noChatsTitle}</p>
              <p className="text-xs text-[#c4b5c0] max-w-xs mx-auto mt-1 leading-relaxed">
                {t.noChatsDesc}
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={onGoToHome}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white text-xs font-bold shadow-md shadow-[#ff5a8a]/20 hover:opacity-95 transition-all"
              >
                {t.browseCompanions}
              </button>
            </div>
          </div>
        ) : (
          filtered.map((character) => {
            const activeSession =
              character.sessions?.find((s) => s.id === character.activeSessionId) ||
              character.sessions?.[0];
            const messages = activeSession?.messages || [];
            const lastMsgObj = messages.length > 0 ? messages[messages.length - 1] : null;
            const lastMsg = lastMsgObj ? lastMsgObj.content : t.noMessagesYet;
            const lastMsgTime = lastMsgObj?.timestamp || character.lastActivityTimestamp || character.createdAt;
            const isSelected = character.id === activeCharacterId;

            return (
              <div
                key={character.id}
                onClick={() => onOpenConversation(character, 'chat')}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-(--surface2)' : 'hover:bg-(--surface2)'
                }`}
              >
                {/* Circular avatar with status dot */}
                <div className="relative shrink-0">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="w-13 h-13 rounded-full object-cover border border-(--border)"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-(--surface)" />
                </div>

                {/* Name, last message & timestamp */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-semibold text-sm text-(--text) truncate">
                        {character.name}
                      </span>
                      {character.isDefault ? (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-(--bg) text-(--accent) border border-(--accent)/30 shrink-0">
                          {t.official}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-(--surface2) text-(--text-secondary) border border-(--border) shrink-0">
                          {t.custom}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-(--text-secondary) shrink-0 ml-1">
                      {formatChatTime(lastMsgTime)}
                    </span>
                  </div>
                  <p className="text-xs text-(--text-secondary) truncate leading-relaxed mt-0.5 font-normal">
                    {lastMsg}
                  </p>
                </div>

                {/* Delete (trash) — opens the existing delete confirmation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDeleteId(character.id);
                  }}
                  className="tap-target w-9 h-9 rounded-xl text-(--text-secondary) hover:text-rose-400 hover:bg-rose-500/10 active:bg-rose-500/15 transition-colors shrink-0"
                  title={t.delete}
                  aria-label={t.deleteChatConfirmTitle}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Create character — kept above the bottom navigation and easy to reach with one hand. */}
      <button
        onClick={onOpenCreateCharacter}
        className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-[#ff85a2] to-[#ff5a8a] text-white shadow-lg shadow-[#ff5a8a]/35 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
        title={t.addCharacter}
        aria-label={t.addCharacter}
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#241b22] border border-[#3d2b38] rounded-3xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">
                {t.deleteChatConfirmTitle}
              </h3>
              <p className="text-xs text-[#c4b5c0] leading-relaxed">
                {t.deleteChatConfirmDesc}
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#2e222c] hover:bg-[#3d2b38] text-white text-xs font-semibold transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => handleDeleteConfirm(confirmDeleteId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors shadow-md shadow-rose-500/20"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
