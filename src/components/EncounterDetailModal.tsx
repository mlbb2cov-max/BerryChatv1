import React from 'react';
import { MeetEncounter, Character, AppLanguage } from '../types';
import { X, Sparkles, MapPin, Calendar, Clock, Lock, BookOpen } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface EncounterDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  encounter: MeetEncounter | null;
  character: Character;
  language?: AppLanguage;
}

export const EncounterDetailModal: React.FC<EncounterDetailModalProps> = ({
  isOpen,
  onClose,
  encounter,
  character,
  language = 'en',
}) => {
  if (!isOpen || !encounter) return null;

  const t = getTranslation(language);
  const formattedDate = new Date(encounter.startedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = new Date(encounter.startedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const renderFormattedStory = (text: string) => {
    const paragraphs = text.split('\n\n').filter(Boolean);

    return paragraphs.map((p, pIdx) => {
      const parts = p.split(/(\*[^*]+\*|"[^"]+")/g);
      return (
        <p key={pIdx} className="mb-2 leading-relaxed text-sm text-stone-200">
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#241b22] border border-[#ff85a2]/30 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d2b38] flex items-center justify-between bg-[#1f161d] shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={character.avatar}
                alt={character.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ff85a2]/50 shadow-md"
              />
              <span className="absolute bottom-0 right-0 p-1 rounded-full bg-[#1a1218] border border-[#ff85a2] text-[#ff85a2]">
                <Sparkles className="w-3 h-3" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {encounter.title || `${character.name} - Meet Mode`}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ff85a2]/15 text-[#ff85a2] border border-[#ff85a2]/30 text-[11px] font-semibold flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  {language === 'my' ? 'ဖတ်ရှုရန်သာ' : 'Ended Meet • Read-Only'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#c4b5c0] mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formattedTime}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="tap-target p-2.5 rounded-xl text-[#c4b5c0] hover:text-white hover:bg-[#3d2b38] transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Setting Badge */}
        {encounter.setting && (
          <div className="px-4 py-2.5 bg-[#2c1f29] border-b border-[#3d2b38] flex items-start gap-2 text-xs text-[#e4d4e0] shrink-0">
            <MapPin className="w-4 h-4 text-[#ff85a2] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">
                {language === 'my' ? 'တွေ့ဆုံခဲ့သည့်နေရာနှင့် အခိုက်အတန့်: ' : 'Encounter Setting: '}
              </span>
              <span>{encounter.setting}</span>
            </div>
          </div>
        )}

        {/* Scrollable Encounter Transcript (Read-Only) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="text-center py-1">
            <span className="px-3 py-1 rounded-full bg-[#1a1218] border border-[#3d2b38] text-[11px] text-[#c4b5c0] inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#ff85a2]" />
              {language === 'my'
                ? 'တွေ့ဆုံမှုမှတ်တမ်းအား ပြင်ဆင်၍မရပါ (ဖတ်ရှုရန်သာ)'
                : 'Encounter transcript is archived and cannot be edited.'}
            </span>
          </div>

          {encounter.messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const imgPart = msg.parts?.find((p) => p.inlineData);

            return (
              <div
                key={msg.id || index}
                className={`p-4 rounded-2xl border transition-all ${
                  isUser
                    ? 'bg-[#2b1f29]/90 border-[#ff85a2]/30 ml-4 sm:ml-8'
                    : 'bg-[#1e151c]/95 border-[#3d2b38] mr-4 sm:mr-8'
                }`}
              >
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#3d2b38]/50">
                  <span
                    className={`text-xs font-bold ${
                      isUser ? 'text-[#ff85a2]' : 'text-white'
                    }`}
                  >
                    {isUser ? t.you : character.name}
                  </span>
                  <span className="text-[11px] text-[#c4b5c0]">
                    {msg.time || ''}
                  </span>
                </div>

                {imgPart?.inlineData && (
                  <div className="mb-2 overflow-hidden rounded-xl border border-[#3d2b38] max-w-sm">
                    <img
                      src={`data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`}
                      alt={t.sceneVisual}
                      className="w-full h-auto object-cover max-h-56"
                    />
                  </div>
                )}

                <div>{renderFormattedStory(msg.content)}</div>
              </div>
            );
          })}

          {encounter.summary && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#ff85a2]/10 to-[#ff5a8a]/5 border border-[#ff85a2]/30 text-xs text-stone-300">
              <div className="font-bold text-[#ff85a2] flex items-center gap-1.5 mb-1 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>
                  {t.encounterSummaryTitle}
                </span>
              </div>
              <p className="leading-relaxed">{encounter.summary}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#3d2b38] bg-[#1f161d] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#c4b5c0] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#ff85a2]" />
            <span>
              {t.meetAgainHint}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#2e222c] hover:bg-[#3d2b38] text-white text-xs font-semibold border border-[#3d2b38] transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
