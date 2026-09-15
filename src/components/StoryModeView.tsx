import React, { useState, useRef, useEffect } from 'react';
import { StorySession, AppLanguage } from '../types';
import { getTranslation } from '../utils/i18n';
import { storyGenreEmoji, storyGenreLabel } from '../utils/storage';
import { ChevronLeft, ChevronDown, Dices, LogOut, Send, Loader2, Users } from 'lucide-react';

interface StoryModeViewProps {
  story: StorySession;
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onExitStory: () => void;
  language?: AppLanguage;
}

export const StoryModeView: React.FC<StoryModeViewProps> = ({
  story,
  isLoading,
  onSendMessage,
  onExitStory,
  language = 'en',
}) => {
  const t = getTranslation(language);
  const lang = (language || 'en') as AppLanguage;

  const [inputText, setInputText] = useState('');
  const [expandedOption, setExpandedOption] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [story.messages, isLoading]);

  const handleSend = () => {
    const val = inputText.trim();
    if (!val || isLoading) return;
    onSendMessage(val);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const title = story.title || `${storyGenreEmoji(story.genre)} ${storyGenreLabel(story.genre, lang)}`;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#000000] relative">
      {/* Monochrome Top Bar (replaces the pink Header for full visual separation) */}
      <div className="shrink-0 border-b border-neutral-800 bg-black px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onExitStory}
            className="tap-target p-2 -ml-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
            title={t.exitStory}
            aria-label={t.exitStory}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Game Master Avatar (generic dice icon, not the companion) */}
          <span className="relative shrink-0 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_0_2px_rgba(255,255,255,0.4)]">
            <Dices className="w-5 h-5" />
          </span>

          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm text-white truncate max-w-[150px] sm:max-w-[220px]">
              {title}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-neutral-400">
              <Users className="w-3 h-3 text-white/70" />
              {t.gameMaster}
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-300">{storyGenreLabel(story.genre, lang)}</span>
            </span>
          </div>
        </div>

        {/* Exit Story Button */}
        <button
          onClick={onExitStory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white transition-all shadow-sm active:scale-95"
          title={t.exitStory}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t.exitStory}</span>
        </button>
      </div>

      {/* Scrollable Story Area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 max-w-3xl w-full mx-auto">
        {story.messages.length === 0 && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <span className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
              <Dices className="w-8 h-8" />
            </span>
            <h3 className="text-base font-bold text-white">{t.storyMode}</h3>
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">{t.chooseGenre}</p>
          </div>
        )}

        {story.messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id || index}
              className={`relative rounded-3xl p-5 border transition-all msg-animate shadow-md ${
                isUser
                  ? 'bg-white text-black border-neutral-200 ml-6 sm:ml-12'
                  : 'bg-neutral-900 text-neutral-100 border-neutral-700/70 mr-4 sm:mr-10'
              }`}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-700/40">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold ${
                      isUser ? 'text-black' : 'text-white'
                    }`}
                  >
                    {isUser ? t.you : `${storyGenreEmoji(story.genre)} ${t.gameMaster}`}
                  </span>
                  <span className="text-[11px] text-neutral-300">{msg.time || ''}</span>
                </div>
              </div>
              <p className={`whitespace-pre-wrap leading-relaxed text-sm ${isUser ? '' : 'select-text'}`}>
                {msg.content}
              </p>
            </div>
          );
        })}

        {/* Loading Story Progression */}
        {isLoading && (
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-700 flex items-center justify-center gap-3 text-neutral-300 shadow-lg">
            <Loader2 className="w-5 h-5 animate-spin text-white" />
            <span className="text-xs font-medium text-neutral-300">{t.gmTyping}</span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Action Chips (the 3 AI-suggested moves) */}
      <div className="px-4 pb-1.5 shrink-0 max-w-3xl w-full mx-auto">
        {story.lastActions.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1 text-[11px] text-neutral-300 px-1">
              <span className="w-1 h-1 rounded-full bg-white inline-block" />
              {t.yourTurn}
            </div>
            <div className="flex flex-col gap-1.5">
              {story.lastActions.map((act, i) => {
                const isExpanded = expandedOption === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl bg-neutral-900 border transition-all shadow-xs ${
                      isExpanded ? 'border-white' : 'border-neutral-600'
                    }`}
                  >
                    {/* Header row — tap to expand / collapse */}
                    <button
                      onClick={() => setExpandedOption(isExpanded ? null : i)}
                      disabled={isLoading}
                      className="w-full text-left px-3 py-2 flex items-center gap-2.5 min-h-[40px]"
                    >
                      <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-white text-black text-[11px] font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="flex-1 min-w-0 truncate text-neutral-200 text-xs leading-snug">
                        {act}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {/* Expanded body — full readable text + choose action */}
                    {isExpanded && (
                      <div className="px-3.5 py-2.5 border-t border-neutral-700/60">
                        <p className="whitespace-pre-wrap text-neutral-100 text-sm leading-relaxed">
                          {act}
                        </p>
                        <button
                          onClick={() => onSendMessage(act)}
                          disabled={isLoading}
                          className="mt-2.5 w-full py-2 rounded-xl bg-white text-black text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-95 transition-all active:scale-[0.98] disabled:opacity-40"
                        >
                          <Send className="w-3.5 h-3.5" />
                          {t.takeAction}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-2.5 sm:p-4 pb-safe border-t border-neutral-800 bg-black shrink-0">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          <div className="flex items-end gap-1.5 sm:gap-2">
            <div className="flex-1 relative rounded-2xl bg-neutral-900 border border-neutral-700 focus-within:border-white transition-colors overflow-hidden">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`${t.yourAction} (${t.typeCustomAction})`}
                rows={1}
                className="w-full px-3 sm:px-3.5 py-2.5 bg-transparent text-white text-sm focus:outline-none resize-none max-h-36 placeholder-neutral-500 leading-5"
              />
            </div>

            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 sm:p-3 rounded-2xl bg-white text-black hover:opacity-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-all shrink-0 min-w-[42px] min-h-[42px] flex items-center justify-center"
              title={t.send}
              aria-label={t.send}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};