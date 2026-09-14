import React, { useState } from 'react';
import { Character, AppLanguage } from '../types';
import { getTranslation, localizeCharacter } from '../utils/i18n';
import { X, Plus, Trash2, Edit2, Check, User, Users, Heart, Sparkles, AlertTriangle, Mars, Venus, Circle } from 'lucide-react';

interface CharacterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  characters: Character[];
  activeCharacterId: string;
  onSelectCharacter: (id: string) => void;
  onOpenCreate: () => void;
  onOpenEdit: (character: Character) => void;
  onDeleteCharacter: (id: string) => void;
  language?: AppLanguage;
}

export const CharacterSidebar: React.FC<CharacterSidebarProps> = ({
  isOpen,
  onClose,
  characters,
  activeCharacterId,
  onSelectCharacter,
  onOpenCreate,
  onOpenEdit,
  onDeleteCharacter,
  language = 'en',
}) => {
  const t = getTranslation(language);
  const lang = (language || 'en') as AppLanguage;
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const characterToDelete = characters.find((c) => c.id === deletingId);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-2xs">
      <div className="w-full max-w-md h-full bg-white dark:bg-stone-900 shadow-2xl border-l border-stone-200 dark:border-stone-800 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-500">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">{t.characters}</h2>
              <p className="text-[11px] text-stone-500">{t.charactersSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCreate}
              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-1 transition-colors"
              title={t.addCharacter}
            >
              <Plus className="w-4 h-4" />
              <span>{t.newLabel}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Character List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {characters.map((char) => {
            const isActive = char.id === activeCharacterId;

            return (
              <div
                key={char.id}
                className={`relative rounded-2xl border p-3.5 transition-all ${
                  isActive
                    ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/20 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={char.avatar}
                    alt={localizeCharacter(char, lang).name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-rose-200 dark:ring-rose-900 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                        {char.gender === 'female' ? (
                          <Venus className="w-3.5 h-3.5 text-rose-500/80 inline-block mr-1 -mt-0.5" />
                        ) : char.gender === 'male' ? (
                          <Mars className="w-3.5 h-3.5 text-sky-500/80 inline-block mr-1 -mt-0.5" />
                        ) : char.gender ? (
                          <Circle className="w-3.5 h-3.5 text-violet-500/80 inline-block mr-1 -mt-0.5" />
                        ) : null}
                        {localizeCharacter(char, lang).name}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-2xs">
                          {t.active}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] font-medium text-rose-600 dark:text-rose-400 mt-0.5 truncate">
                      {localizeCharacter(char, lang).relationship}
                    </div>

                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {localizeCharacter(char, lang).personality}
                    </p>
                    {char.tags && char.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {char.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-lg bg-red-900/50 border border-red-500/60 text-[10px] font-bold text-red-200">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions bottom bar */}
                <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectCharacter(char.id);
                      onClose();
                    }}
                    disabled={isActive}
                    className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                      isActive
                        ? 'text-stone-400 cursor-default'
                        : 'bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 shadow-2xs'
                    }`}
                  >
                    {isActive ? t.currentlySelected : t.switchToCharacter}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenEdit(char)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      title={t.editCharacter}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setDeletingId(char.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title={t.deleteCharacter}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delete Confirmation Modal */}
        {deletingId && characterToDelete && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-2xs">
            <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-sm w-full p-5 border border-stone-200 dark:border-stone-800 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Delete {characterToDelete.name}?
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  This will permanently delete this character, along with all their Chat Mode messages and Real Mode encounter memories.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={() => {
                    onDeleteCharacter(deletingId);
                    setDeletingId(null);
                  }}
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  {t.confirmDelete}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
