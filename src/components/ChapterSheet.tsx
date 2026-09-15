import React, { useState } from 'react';
import { Session, AppLanguage } from '../types';
import { X, Plus, BookOpen, Check, Trash2, AlertCircle } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface ChapterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: Session[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onCreateSession: (name: string) => void;
  onDeleteSession: (id: string) => void;
  language?: AppLanguage;
}

export const ChapterSheet: React.FC<ChapterSheetProps> = ({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  language = 'en',
}) => {
  const [newChapterName, setNewChapterName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const t = getTranslation(language);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newChapterName.trim() || `${t.chapter} ${sessions.length + 1}`;
    onCreateSession(name);
    setNewChapterName('');
    setIsAdding(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteSession(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#241b22] border border-[#3d2b38] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-label={t.storyChapters}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#3d2b38] flex items-center justify-between bg-[#2e222c]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#ff85a2]" />
            <h3 className="text-base font-bold text-white">{t.storyChapters}</h3>
          </div>
          <button
            onClick={onClose}
            className="tap-target p-2.5 rounded-full text-[#c4b5c0] hover:text-white hover:bg-[#3d2b38] transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sessions.map((session) => {
            const isActive = session.id === activeSessionId;
            const count = session.messages?.length || 0;
            const lastMsg =
              count > 0 ? session.messages[count - 1]?.content : t.noMessagesYet;
            const isConfirmingDelete = confirmDeleteId === session.id;

            return (
              <div
                key={session.id}
                className={`w-full p-3.5 rounded-2xl border transition-all flex flex-col gap-2 ${
                  isActive
                    ? 'bg-[#ff85a2]/15 border-[#ff85a2] shadow-sm'
                    : 'bg-[#2e222c] border-[#3d2b38] hover:border-[#ff85a2]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    onClick={() => {
                      onSelectSession(session.id);
                      onClose();
                    }}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white truncate">
                        {session.name}
                      </span>
                      {isActive && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ff85a2] text-[#1a1218]">
                          {t.active}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#c4b5c0] truncate mt-0.5">
                      {lastMsg}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium text-[#c4b5c0] px-2 py-1 rounded-lg bg-[#1a1218]">
                      {count} {t.msgs}
                    </span>

                    {/* Delete Chapter Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(isConfirmingDelete ? null : session.id);
                      }}
                      className="tap-target p-2.5 rounded-xl text-[#c4b5c0] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title={t.deleteChapter}
                      aria-label={t.deleteChapter}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Confirm Delete Prompt */}
                {isConfirmingDelete && (
                  <div className="mt-1 pt-2 border-t border-[#3d2b38] flex items-center justify-between gap-2 bg-[#1a1218]/60 p-2.5 rounded-xl">
                    <span className="text-xs text-rose-300 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.deleteChapterConfirm}</span>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => handleDelete(e, session.id)}
                        className="tap-target px-3 py-2 rounded-lg bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors"
                      >
                        {t.delete}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(null);
                        }}
                        className="tap-target px-3 py-2 rounded-lg bg-[#2e222c] text-[#c4b5c0] hover:text-white text-xs font-bold transition-colors"
                      >
                        {t.cancel}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Chapter */}
        <div className="p-4 border-t border-[#3d2b38] bg-[#241b22]">
          {isAdding ? (
            <form onSubmit={handleCreate} className="flex gap-2">
              <input
                type="text"
                value={newChapterName}
                onChange={(e) => setNewChapterName(e.target.value)}
                placeholder={`${t.chapter} ${sessions.length + 1}`}
                autoFocus
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-white text-sm focus:outline-none focus:border-[#ff85a2]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{t.save}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-2 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-[#c4b5c0] text-xs font-semibold"
              >
                {t.cancel}
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#ff85a2]/50 hover:border-[#ff85a2] bg-[#ff85a2]/10 text-[#ff85a2] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{t.createNewChapter}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
