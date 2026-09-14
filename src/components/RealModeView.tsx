import React, { useState, useRef, useEffect } from 'react';
import { Character, ChatMessage, MessagePart, AppLanguage } from '../types';
import { getTranslation, localizeCharacter } from '../utils/i18n';
import {
  Send,
  Paperclip,
  X,
  Star,
  Trash2,
  Compass,
  MessageCircle,
  Loader2,
  Sparkles,
  LogOut,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface RealModeViewProps {
  character: Character;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string, parts?: MessagePart[]) => void;
  onBookmarkMessage: (msg: ChatMessage) => void;
  onDeleteMessage: (msgId: string) => void;
  chapterName: string;
  setting?: string;
  onEndMeetMode?: () => void;
  language?: AppLanguage;
}

const REAL_CHOICE_PILLS = {
  en: [
    'Continue...',
    'What happens next?',
    '*Take your hand gently*',
    '*Look into your eyes*',
    '*Smile softly*',
  ],
  my: [
    'ဆက်လုပ်ပါ...',
    'နောက်ဘာဖြစ်မလဲ?',
    '*သင့်လက်ကို ညင်သာစွာ ဆွဲကိုင်လိုက်သည်*',
    '*သင့်မျက်လုံးများကို စိုက်ကြည့်လိုက်သည်*',
    '*ညင်သာစွာ ပြုံးလိုက်သည်*',
  ],
};

export const RealModeView: React.FC<RealModeViewProps> = ({
  character,
  messages,
  isLoading,
  onSendMessage,
  onBookmarkMessage,
  onDeleteMessage,
  chapterName,
  setting,
  onEndMeetMode,
  language = 'en',
}) => {
  const t = getTranslation(language);
  const lang = (language || 'en') as AppLanguage;
  const lc = localizeCharacter(character, lang);
  
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'action' | 'speech' | 'normal'>('normal');
  const [selectedImage, setSelectedImage] = useState<{
    data: string;
    mimeType: string;
    previewUrl: string;
  } | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    let formattedText = inputText.trim();
    if (formattedText) {
      if (inputMode === 'action' && !formattedText.startsWith('*')) {
        formattedText = `*${formattedText}*`;
      } else if (inputMode === 'speech' && !formattedText.startsWith('"')) {
        formattedText = `"${formattedText}"`;
      }
    }

    const parts: MessagePart[] = [];
    if (selectedImage) {
      parts.push({
        inlineData: {
          mimeType: selectedImage.mimeType,
          data: selectedImage.data,
        },
      });
    }
    if (formattedText) {
      parts.push({ text: formattedText });
    }

    onSendMessage(formattedText, parts.length > 0 ? parts : undefined);
    setInputText('');
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        const base64Data = result.split(',')[1];
        setSelectedImage({
          data: base64Data,
          mimeType: file.type || 'image/jpeg',
          previewUrl: result,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Highlight asterisks and quotes in story narrative
  const renderFormattedStory = (text: string) => {
    const paragraphs = text.split('\n\n').filter(Boolean);

    return paragraphs.map((p, pIdx) => {
      const parts = p.split(/(\*[^*]+\*|"[^"]+")/g);
      return (
        <p key={pIdx} className="mb-3 leading-relaxed text-sm sm:text-base text-stone-200">
          {parts.map((part, idx) => {
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <span
                  key={idx}
                  className="text-[#ff85a2] italic font-medium bg-[#ff85a2]/10 px-1 py-0.5 rounded-sm mx-0.5"
                >
                  {part}
                </span>
              );
            }
            if (part.startsWith('"') && part.endsWith('"')) {
              return (
                <span key={idx} className="text-white font-semibold">
                  {part}
                </span>
              );
            }
            return <span key={idx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  const isBookmarked = (msgId: string) => {
    return (character.bookmarks || []).some((b) => b.msgId === msgId);
  };

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden bg-[#160e15] relative"
      style={
        character.wallpaper
          ? {
              backgroundImage: `linear-gradient(rgba(22,14,21,0.92), rgba(22,14,21,0.92)), url(${character.wallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Scrollable Story Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-3xl w-full mx-auto">
        {/* Top Story Introduction Badge */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 pb-2 border-b border-[#3d2b38]/50">
          <div className="relative">
            <img
              src={character.avatar}
              alt={lc.name}
              className="w-20 h-20 rounded-full object-cover pulse-avatar ring-4 ring-[#ff85a2]/50 shadow-2xl"
            />
            <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#1a1218] border border-[#ff85a2] text-[#ff85a2] shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <span>{lc.name}</span>
              <span className="text-xs font-normal text-[#a0909c]">
                • {chapterName || (language === 'my' ? 'အခန်း ၁' : 'Chapter 1')}
              </span>
            </h2>
            <p className="text-xs text-[#ff85a2] font-medium mt-0.5">
              {t.inPersonEncounterMode}
            </p>
          </div>

          {/* End Meet Mode Button */}
          {onEndMeetMode && (
            <button
              onClick={onEndMeetMode}
              className="px-4 py-1.5 rounded-full bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/70 text-rose-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.endMeetMode}</span>
            </button>
          )}

          {/* Current Setting Banner */}
          {setting && (
            <div className="w-full max-w-lg bg-[#2c1f2a]/90 border border-[#ff85a2]/30 rounded-2xl p-3 text-left flex items-start gap-2 shadow-sm">
              <MapPin className="w-4 h-4 text-[#ff85a2] shrink-0 mt-0.5" />
              <div className="text-xs text-stone-200 leading-relaxed">
                <span className="font-bold text-white">
                  {t.sceneSetting}
                </span>
                <span>{setting}</span>
              </div>
            </div>
          )}
        </div>

        {/* Empty state when scene is being prepared */}
        {messages.length === 0 && (
          <div className="p-8 rounded-3xl bg-[#241b22]/90 border border-[#ff85a2]/30 flex flex-col items-center justify-center gap-3 text-center my-6">
            <Loader2 className="w-8 h-8 text-[#ff85a2] animate-spin" />
            <span className="text-sm font-semibold text-white">
              {`${t.settingUpEncounter} ${lc.name}...`}
            </span>
            <span className="text-xs text-[#a0909c]">
              {t.generatingSceneDesc}
            </span>
          </div>
        )}

        {/* Narrative Messages */}
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          const bookmarked = isBookmarked(msg.id);
          const imgPart = msg.parts?.find((p) => p.inlineData);

          return (
            <div
              key={msg.id || index}
              className={`relative rounded-3xl p-5 border transition-all msg-animate shadow-md ${
                isUser
                  ? 'bg-[#241b22]/90 border-[#ff85a2]/40 ml-6 sm:ml-12'
                  : 'bg-[#241b22]/95 border-[#3d2b38] mr-4 sm:mr-10'
              }`}
            >
              {/* Header inside narrative card */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#3d2b38]/60">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold ${
                      isUser ? 'text-[#ff85a2]' : 'text-white'
                    }`}
                  >
                    {isUser ? t.you : lc.name}
                  </span>
                  <span className="text-[10px] text-[#a0909c]">
                    {msg.time || ''}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onBookmarkMessage(msg)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      bookmarked
                        ? 'text-[#ff85a2] bg-[#ff85a2]/15'
                        : 'text-[#a0909c] hover:text-white'
                    }`}
                    title={bookmarked ? t.removeBookmark : t.bookmarkScene}
                    aria-label={t.bookmarkScene}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        bookmarked ? 'fill-[#ff85a2]' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => onDeleteMessage(msg.id)}
                    className="p-1.5 rounded-lg text-[#a0909c] hover:text-red-400 transition-colors"
                    title={t.delete}
                    aria-label={t.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Inline Image Attachment */}
              {imgPart?.inlineData && (
                <div className="mb-3 overflow-hidden rounded-2xl border border-[#3d2b38] max-w-sm">
                  <img
                    src={`data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`}
                    alt={t.sceneVisual}
                    className="w-full h-auto object-cover max-h-72"
                  />
                </div>
              )}

              {/* Formatted Content */}
              <div>{renderFormattedStory(msg.content)}</div>
            </div>
          );
        })}

        {/* Loading Story Progression */}
        {isLoading && (
          <div className="p-6 rounded-3xl bg-[#241b22] border border-[#3d2b38] flex items-center justify-center gap-3 text-[#ff85a2] shadow-lg">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-xs font-medium text-white">
              {lc.name} {t.reactingToYou}
            </span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Choice Prompt Pills */}
      <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-3xl w-full mx-auto shrink-0">
        {(REAL_CHOICE_PILLS[language] || REAL_CHOICE_PILLS.en).map((pill, i) => (
          <button
            key={i}
            onClick={() => onSendMessage(pill)}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-full bg-[#241b22] border border-[#3d2b38] hover:border-[#ff85a2] text-xs text-stone-300 hover:text-white transition-all whitespace-nowrap shrink-0 shadow-xs disabled:opacity-50"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Real Mode Input Area */}
      <div className="p-2.5 sm:p-4 pb-safe bg-[#241b22]/95 backdrop-blur-md border-t border-[#3d2b38] shrink-0">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          {/* Action vs Speech Mode Selectors */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() =>
                setInputMode(inputMode === 'action' ? 'normal' : 'action')
              }
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all shrink-0 ${
                inputMode === 'action'
                  ? 'bg-[#ff85a2]/20 border-[#ff85a2] text-[#ff85a2]'
                  : 'bg-[#2e222c] border-[#3d2b38] text-[#a0909c] hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.actionLabel}</span>
            </button>

            <button
              onClick={() =>
                setInputMode(inputMode === 'speech' ? 'normal' : 'speech')
              }
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all shrink-0 ${
                inputMode === 'speech'
                  ? 'bg-sky-500/20 border-sky-400 text-sky-400'
                  : 'bg-[#2e222c] border-[#3d2b38] text-[#a0909c] hover:text-white'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.speechLabel}</span>
            </button>
          </div>

          {/* Image preview */}
          {selectedImage && (
            <div className="relative inline-flex items-center gap-2 p-1.5 rounded-xl bg-[#2e222c] border border-[#3d2b38] self-start">
              <img
                src={selectedImage.previewUrl}
                alt={t.preview}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full text-[#a0909c] hover:text-white hover:bg-[#3d2b38]"
                aria-label={t.removeImage}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input row */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-2xl bg-[#2e222c] border border-[#3d2b38] text-[#a0909c] hover:text-[#ff85a2] hover:border-[#ff85a2] transition-colors shrink-0"
              title={t.attachPhoto}
              aria-label={t.attachPhoto}
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <div className="flex-1 relative rounded-2xl bg-[#2e222c] border border-[#3d2b38] focus-within:border-[#ff85a2] transition-colors">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  inputMode === 'action'
                    ? t.actionPlaceholder
                    : inputMode === 'speech'
                    ? t.speechPlaceholder
                    : t.normalPlaceholder
                }
                className="w-full px-3 sm:px-4 py-2.5 bg-transparent text-white text-sm focus:outline-none placeholder-[#a0909c]"
              />
            </div>

            <button
              onClick={handleSend}
              disabled={(!inputText.trim() && !selectedImage) || isLoading}
              className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#ff5a8a]/20 transition-all shrink-0 min-w-[42px] min-h-[42px] flex items-center justify-center"
              title={t.sendToScene}
              aria-label={t.send}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
