import React, { useState, useRef, useEffect } from 'react';
import { Character, ChatMessage, MessagePart, AppLanguage, StoryGenre, StorySession } from '../types';
import { getTranslation, localizeCharacter } from '../utils/i18n';
import { STORY_GENRES, storyGenreEmoji } from '../utils/storage';
import {
  Send,
  Image as ImageIcon,
  X,
  Star,
  Trash2,
  Edit3,
  Calendar,
  Heart,
  Loader2,
  Check,
  Sparkles,
  MapPin,
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Plus,
  Dices,
} from 'lucide-react';

interface ChatModeViewProps {
  character: Character;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string, parts?: MessagePart[]) => void;
  onBookmarkMessage: (msg: ChatMessage) => void;
  onDeleteMessage: (msgId: string) => void;
  onEditMessage: (msgId: string, newContent: string) => void;
  affectionNotification?: { delta: number; timestamp: number } | null;
  onOpenDonate?: () => void;
  onOpenEncounterDetail?: (encounterId: string) => void;
  /** Story Mode: tapped `+` → pick a genre to start a brand-new adventure. */
  onStartStory?: (genre: StoryGenre) => void;
  /** Saved Story Mode sessions shown in the + menu for resuming. */
  stories?: StorySession[];
  /** Story Mode: resume an existing saved adventure. */
  onOpenStory?: (storyId: string) => void;
  language?: AppLanguage;
}

const QUICK_SUGGESTIONS: Record<string, string[]> = {
  en: ['Tell me more', 'What do you think?', 'I agree', 'Tell me about your day'],
  my: ['နောက်ထပ် ပြောပြပါ', 'မင်းဘယ်လိုထင်လဲ?', 'ငါသဘောတူတယ်', 'မင်းရဲ့နေ့ကို ပြောပြပါ'],
};

export const ChatModeView: React.FC<ChatModeViewProps> = ({
  character,
  messages,
  isLoading,
  onSendMessage,
  onBookmarkMessage,
  onDeleteMessage,
  onEditMessage,
  affectionNotification,
  onOpenDonate,
  onOpenEncounterDetail,
  onStartStory,
  stories,
  onOpenStory,
  language = 'en',
}) => {
  const t = getTranslation(language);
  const lang = (language || 'en') as AppLanguage;
  const lc = localizeCharacter(character, lang);
  
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<{
    data: string;
    mimeType: string;
    previewUrl: string;
  } | null>(null);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [activeMsgActions, setActiveMsgActions] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  }, [inputText]);

  const handleSend = () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const parts: MessagePart[] = [];
    if (selectedImage) {
      parts.push({
        inlineData: {
          mimeType: selectedImage.mimeType,
          data: selectedImage.data,
        },
      });
    }
    if (inputText.trim()) {
      parts.push({ text: inputText.trim() });
    }

    onSendMessage(inputText.trim(), parts.length > 0 ? parts : undefined);
    setInputText('');
    setSelectedImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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

  const isBookmarked = (msgId: string) => {
    return (character.bookmarks || []).some((b) => b.msgId === msgId);
  };

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#1a1218]"
      style={
        character.wallpaper
          ? {
              backgroundImage: `linear-gradient(rgba(26,18,24,0.85), rgba(26,18,24,0.85)), url(${character.wallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-4xl w-full mx-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <img
              src={character.avatar}
              alt={lc.name}
              className="w-16 h-16 rounded-full ring-4 ring-[#ff85a2]/30 shadow-lg object-cover"
            />
            <h3 className="text-base font-bold text-white">
              {t.startChatWith} {lc.name}
            </h3>
            <p className="text-xs text-[#c4b5c0] max-w-xs leading-relaxed">
              {t.startChatDesc}
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const isLastInGroup =
              !messages[index + 1] ||
              messages[index + 1]?.role !== msg.role ||
              messages[index + 1]?.date !== msg.date;
            const showDate =
              index === 0 ||
              msg.date !== messages[index - 1]?.date;
            const bookmarked = isBookmarked(msg.id);

            // Find image attachment if any
            const imgPart = msg.parts?.find((p) => p.inlineData);

            // Encounter Event Card (System box added when meet mode ends)
            if (msg.isEncounterCard || msg.role === 'system') {
              return (
                <div key={msg.id || index} className="w-full flex justify-center my-4 px-2 msg-animate">
                  <div
                    onClick={() => onOpenEncounterDetail?.(msg.encounterId || '')}
                    className="w-full max-w-md bg-gradient-to-br from-[#2f1e2c] via-[#231622] to-[#1a1018] border border-[#ff85a2]/40 hover:border-[#ff85a2] rounded-2xl p-4 shadow-xl cursor-pointer transition-all duration-200 group hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#3d2b38]/70">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-xl bg-[#ff85a2]/20 text-[#ff85a2] border border-[#ff85a2]/30">
                          <Sparkles className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white group-hover:text-[#ff85a2] transition-colors">
                            {msg.encounterTitle || t.inPersonEncounterMode}
                          </span>
                          <p className="text-[11px] text-[#c4b5c0] flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            <span>
                              {msg.time || ''} {msg.date ? `• ${msg.date}` : ''}
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#ff85a2]/15 text-[#ff85a2] border border-[#ff85a2]/30 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {t.completed}
                      </span>
                    </div>

                    {msg.encounterSetting && (
                      <div className="flex items-start gap-1.5 text-xs text-stone-300 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#ff85a2] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{msg.encounterSetting}</span>
                      </div>
                    )}

                    {msg.encounterSummary && (
                      <p className="text-xs text-[#d1c2ce] leading-relaxed line-clamp-3 mb-3 bg-[#180f16]/60 p-2.5 rounded-xl border border-[#3d2b38]/40">
                        {msg.encounterSummary}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-[#ff85a2] font-semibold flex items-center gap-1 group-hover:underline">
                        <BookOpen className="w-3.5 h-3.5" />
                        {t.viewMeetDetails}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#c4b5c0] group-hover:text-[#ff85a2] transition-colors" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <React.Fragment key={msg.id || index}>
                {showDate && msg.date && (
                  <div className="flex justify-center my-3">
                    <span className="px-3 py-1 rounded-full bg-[#241b22]/90 border border-[#3d2b38] text-[11px] font-medium text-[#c4b5c0] flex items-center gap-1.5 shadow-xs">
                      <Calendar className="w-3 h-3 text-[#ff85a2]" />
                      <span>{msg.date}</span>
                    </span>
                  </div>
                )}

                <div
                  className={`flex items-end gap-2 group msg-animate ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Model Avatar (only shown on last message of cluster) */}
                  {!isUser &&
                    (isLastInGroup ? (
                      <img
                        src={character.avatar}
                        alt={lc.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#3d2b38] mb-1"
                      />
                    ) : (
                      <div className="w-8 shrink-0" />
                    ))}

                  {/* Message Bubble Container */}
                  <div className="relative max-w-[85%] sm:max-w-[75%] flex flex-col">
                    {/* Inline Image Attachment */}
                    {imgPart?.inlineData && (
                      <div className="mb-1.5 overflow-hidden rounded-2xl border border-[#3d2b38] max-w-xs">
                        <img
                          src={`data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`}
                          alt={t.attachPhoto}
                          className="w-full h-auto object-cover max-h-60"
                        />
                      </div>
                    )}

                    {/* Bubble Content */}
                    <div
                      onClick={() =>
                        setActiveMsgActions((prev) => (prev === msg.id ? null : msg.id))
                      }
                      className={`relative px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed cursor-pointer active:scale-[0.99] transition-transform ${
                        isUser
                          ? 'bg-gradient-to-br from-[#ff85a2] to-[#ff5a8a] text-white rounded-br-xs font-normal'
                          : 'bg-[#241b22] border border-[#3d2b38] text-white rounded-bl-xs'
                      }`}
                    >
                      {editingMsgId === msg.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full bg-[#1a1218] border border-[#3d2b38] rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#ff85a2]"
                            rows={3}
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => {
                                onEditMessage(msg.id, editingText);
                                setEditingMsgId(null);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#ff85a2] text-[#1a1218] text-xs font-bold flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>{t.save}</span>
                            </button>
                            <button
                              onClick={() => setEditingMsgId(null)}
                              className="px-2.5 py-1 rounded-lg bg-[#2e222c] text-[#c4b5c0] text-xs font-semibold"
                            >
                              {t.cancel}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap select-text">
                          {msg.content}
                        </div>
                      )}

                      {/* Time + Bookmark indicator */}
                      <div
                        className={`flex items-center justify-end gap-1.5 mt-1 text-[11px] ${
                          isUser ? 'text-rose-100' : 'text-[#c4b5c0]'
                        }`}
                      >
                        {bookmarked && (
                          <Star className="w-2.5 h-2.5 fill-[#ff85a2] text-[#ff85a2]" />
                        )}
                        <span>{msg.time || ''}</span>
                      </div>
                    </div>

                    {/* Message Action Bar (tap bubble to show; touch-friendly on mobile) */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute top-0 -translate-y-1/2 flex items-center gap-1 bg-[#241b22] border border-[#3d2b38] p-1 rounded-xl shadow-lg z-10 transition-opacity ${
                        activeMsgActions === msg.id
                          ? 'opacity-100'
                          : 'opacity-0 pointer-events-none'
                      } ${isUser ? 'right-2' : 'left-2'}`}
                    >
                      <button
                        onClick={() => onBookmarkMessage(msg)}
                        className={`tap-target flex items-center justify-center rounded-lg transition-colors ${
                          bookmarked
                            ? 'text-[#ff85a2] bg-[#ff85a2]/15'
                            : 'text-[#c4b5c0] hover:text-white'
                        }`}
                        title={bookmarked ? t.removeBookmark : t.bookmark}
                        aria-label={t.bookmark}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            bookmarked ? 'fill-[#ff85a2]' : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => {
                          setEditingMsgId(msg.id);
                          setEditingText(msg.content);
                          setActiveMsgActions(null);
                        }}
                        className="tap-target flex items-center justify-center rounded-lg text-[#c4b5c0] hover:text-white transition-colors"
                        title={t.editMessage}
                        aria-label={t.edit}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteMessage(msg.id)}
                        className="tap-target flex items-center justify-center rounded-lg text-[#c4b5c0] hover:text-red-400 transition-colors"
                        title={t.deleteMessage}
                        aria-label={t.delete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-end gap-2">
            <img
              src={character.avatar}
              alt={lc.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#3d2b38] mb-1"
            />
            <div className="px-4 py-3 rounded-2xl rounded-bl-xs bg-[#241b22] border border-[#3d2b38] flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ff85a2] animate-bounce" />
              <span
                className="w-2 h-2 rounded-full bg-[#ff85a2] animate-bounce"
                style={{ animationDelay: '0.15s' }}
              />
              <span
                className="w-2 h-2 rounded-full bg-[#ff85a2] animate-bounce"
                style={{ animationDelay: '0.3s' }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips (only on an empty chat, so they don't shove messages up) */}
      {messages.length === 0 && (
      <div className="px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-4xl w-full mx-auto shrink-0">
        {(QUICK_SUGGESTIONS[language] || QUICK_SUGGESTIONS.en).map((sug, i) => (
          <button
            key={i}
            onClick={() => onSendMessage(sug)}
            disabled={isLoading}
            className="px-3 py-1 rounded-full bg-[#241b22]/90 border border-[#3d2b38] hover:border-[#ff85a2] text-xs text-[#c4b5c0] hover:text-white transition-all whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            {sug}
          </button>
        ))}
      </div>
      )}

      {/* Story Mode "+" Menu (start new or resume saved adventure) */}
      {showPlusMenu && (
        <div className="px-3 pt-2 shrink-0 max-w-4xl w-full mx-auto">
          <div className="relative bg-[#241b22] border border-[#3d2b38] rounded-2xl p-3.5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              onClick={() => setShowPlusMenu(false)}
              className="absolute top-2.5 right-2.5 p-1 rounded-lg text-[#c4b5c0] hover:text-white hover:bg-[#3d2b38]"
              aria-label={t.close}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2.5 pr-6">
              <span className="p-1.5 rounded-xl bg-[#ff85a2]/15 text-[#ff85a2] border border-[#ff85a2]/30">
                <Dices className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">{t.startStoryMode}</h3>
                <p className="text-[11px] text-[#c4b5c0]">{t.chooseGenre}</p>
              </div>
            </div>

            {/* Genre chips */}
            <div className="grid grid-cols-2 gap-1.5">
              {STORY_GENRES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setShowPlusMenu(false);
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

            {/* Resume saved adventures */}
            {stories && stories.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#3d2b38]/60">
                <p className="text-[11px] font-bold text-[#ff85a2] mb-1.5 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {t.continueStory}
                </p>
                <div className="flex flex-col gap-1">
                  {stories.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setShowPlusMenu(false);
                        onOpenStory?.(s.id);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1218] border border-[#3d2b38] hover:border-[#a0909c] hover:bg-[#2e222c] text-left transition-all active:scale-95"
                    >
                      <span className="text-sm">{storyGenreEmoji(s.genre)}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{s.title}</p>
                        <p className="text-[11px] text-[#c4b5c0]">
                          {new Date(s.updatedAt).toLocaleDateString()} •{' '}
                          {s.messages.length >= 2
                            ? `${Math.ceil(s.messages.length / 2)} ${lang === 'my' ? 'အကြိမ်' : 'turns'}`
                            : lang === 'my' ? 'မစတင်ရသေး' : 'not started'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="p-2.5 sm:p-4 pb-safe bg-[#241b22]/95 backdrop-blur-md border-t border-[#3d2b38] shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          {/* Selected Image Preview */}
          {selectedImage && (
            <div className="relative inline-flex items-center gap-2 p-1.5 rounded-xl bg-[#2e222c] border border-[#3d2b38] self-start">
              <img
                src={selectedImage.previewUrl}
                alt={t.uploadPreview}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full text-[#c4b5c0] hover:text-white hover:bg-[#3d2b38]"
                aria-label={t.removeImage}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-end gap-1.5 sm:gap-2">
            {/* Story Mode "+" Button */}
            <button
              type="button"
              onClick={() => setShowPlusMenu((v) => !v)}
              className={`p-2.5 rounded-2xl border transition-colors shrink-0 ${
                showPlusMenu
                  ? 'bg-[#ff85a2] text-[#1a1218] border-[#ff85a2]'
                  : 'bg-[#2e222c] border-[#3d2b38] text-[#c4b5c0] hover:text-[#ff85a2] hover:border-[#ff85a2]'
              }`}
              title={t.startStoryMode}
              aria-label={t.startStoryMode}
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* Image Attachment Button */}
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
              className="p-2.5 rounded-2xl bg-[#2e222c] border border-[#3d2b38] text-[#c4b5c0] hover:text-[#ff85a2] hover:border-[#ff85a2] transition-colors shrink-0"
              title={t.attachPhoto}
              aria-label={t.attachPhoto}
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            {/* Textarea */}
            <div className="flex-1 relative rounded-2xl bg-[#2e222c] border border-[#3d2b38] focus-within:border-[#ff85a2] transition-colors overflow-hidden">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`${language === 'my' ? 'မက်ဆေ့ခ်ျ ရိုက်ထည့်ပါ' : 'Message'} ${lc.name}...`}
                rows={1}
                className="w-full px-3 sm:px-3.5 py-2.5 bg-transparent text-white text-sm focus:outline-none resize-none max-h-36 placeholder-[#a0909c] leading-5"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={(!inputText.trim() && !selectedImage) || isLoading}
              className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#ff5a8a]/20 transition-all shrink-0 min-w-[42px] min-h-[42px] flex items-center justify-center"
              title={t.sendMessage}
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

      {/* Dynamic Affection Conversation Feedback Banner */}
      {affectionNotification && (
        <div
          key={affectionNotification.timestamp}
          className={`absolute top-14 right-4 z-20 px-3.5 py-1.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-black transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none select-none ${
            affectionNotification.delta > 0
              ? 'bg-[#ff85a2] text-[#1a1218] shadow-[#ff85a2]/40 border border-white/40'
              : affectionNotification.delta < 0
              ? 'bg-[#3b82f6] text-white shadow-blue-500/40 border border-white/30'
              : 'bg-[#2a1d27] text-[#c4b5c0] border border-[#3d2b38]'
          }`}
        >
          {affectionNotification.delta > 0 ? (
            <>
              <Heart className="w-3.5 h-3.5 fill-[#1a1218] animate-pulse" />
              <span>+{affectionNotification.delta} Affection</span>
            </>
          ) : affectionNotification.delta < 0 ? (
            <>
              <Heart className="w-3.5 h-3.5" />
              <span>{affectionNotification.delta} Affection</span>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};
