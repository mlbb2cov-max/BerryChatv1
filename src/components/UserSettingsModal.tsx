import React, { useState } from 'react';
import { X, User, Check, Info, Sparkles } from 'lucide-react';
import { AppLanguage } from '../types';
import { getTranslation } from '../utils/i18n';

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onSaveUserName: (name: string) => void;
  language?: AppLanguage;
}

export const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  isOpen,
  onClose,
  userName,
  onSaveUserName,
  language = 'en',
}) => {
  const t = getTranslation(language);
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveUserName(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/50">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-rose-500" />
            <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">{t.userProfileSettings}</h2>
          </div>
          <button
            onClick={onClose}
            className="tap-target p-2.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              {t.yourDisplayName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-rose-500"
            />
            <p className="text-xs text-stone-400 mt-1">
              {t.displayNameHint}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs text-stone-700 dark:text-stone-300 space-y-2">
            <div className="font-bold flex items-center gap-1 text-rose-700 dark:text-rose-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.dualModeArchitecture}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
              • <strong>{t.chatMode}</strong>: {t.bulletChatMode}<br />
              • <strong>{t.meetMode}</strong>: {t.bulletMeetMode}<br />
              • <strong>{t.seamlessMemory}</strong>: {t.bulletSeamlessMemory}
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="tap-target px-4 py-2.5 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="tap-target px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.saveChanges}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
