import React, { useState, useEffect, useRef } from 'react';
import { Character, AppLanguage } from '../types';
import { getTranslation } from '../utils/i18n';
import {
  X,
  Camera,
  Image as ImageIcon,
  Check,
  Plus,
  Trash2,
  Sparkles,
  User,
} from 'lucide-react';

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterToEdit?: Character | null;
  onSave: (characterData: Partial<Character>) => void;
  onDelete?: (id: string) => void;
  language?: AppLanguage;
}


export const CharacterModal: React.FC<CharacterModalProps> = ({
  isOpen,
  onClose,
  characterToEdit,
  onSave,
  onDelete,
  language = 'en',
}) => {
  const t = getTranslation(language);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [wallpaper, setWallpaper] = useState('');
  const [personality, setPersonality] = useState('');
  const [backstory, setBackstory] = useState('');
  const [speakingStyle, setSpeakingStyle] = useState('');
  const [relationship, setRelationship] = useState('');
  const [model, setModel] = useState('gemini-3.8-flash');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [memories, setMemories] = useState<string[]>([]);
  const [newMemoryInput, setNewMemoryInput] = useState('');

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const wallpaperInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (characterToEdit) {
      setName(characterToEdit.name || '');
      setAvatar(characterToEdit.avatar || '');
      setWallpaper(characterToEdit.wallpaper || '');
      setPersonality(characterToEdit.personality || '');
      setBackstory(characterToEdit.backstory || '');
      setSpeakingStyle(characterToEdit.speakingStyle || '');
      setRelationship(characterToEdit.relationship || '');
      setModel(characterToEdit.model || 'gemini-3.8-flash');
      setSystemPrompt(characterToEdit.systemPrompt || '');
      setMemories(characterToEdit.memories || []);
    } else {
      setName('');
      setAvatar('');
      setWallpaper('');
      setPersonality('');
      setBackstory('');
      setSpeakingStyle('');
      setRelationship('');
      setModel('gemini-3.8-flash');
      setSystemPrompt('');
      setMemories([]);
    }
  }, [characterToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setAvatar(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleWallpaperFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setWallpaper(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryInput.trim()) return;
    setMemories([...memories, newMemoryInput.trim()]);
    setNewMemoryInput('');
  };

  const handleRemoveMemory = (index: number) => {
    setMemories(memories.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      avatar: avatar.trim(),
      wallpaper: wallpaper.trim(),
      personality: personality.trim(),
      backstory: backstory.trim(),
      speakingStyle: speakingStyle.trim(),
      relationship: relationship.trim(),
      model,
      systemPrompt: systemPrompt.trim(),
      memories,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#241b22] border border-[#3d2b38] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-label={t.characterDetails}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#3d2b38] flex items-center justify-between bg-[#2e222c]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#ff85a2]" />
            <h3 className="text-base font-bold text-white">
              {characterToEdit ? t.editCompanion : t.createNewCompanion}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#a0909c] hover:text-white hover:bg-[#3d2b38] transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Avatar & Wallpaper Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#2e222c] border border-[#3d2b38]">
            <div className="relative group shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt={t.avatarSelection}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-[#ff85a2]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#1a1218] border-2 border-dashed border-[#3d2b38] ring-2 ring-[#ff85a2]/40 flex items-center justify-center text-[#a0909c]">
                  <Camera className="w-7 h-7" />
                </div>
              )}
              <input
                type="file"
                ref={avatarInputRef}
                onChange={handleAvatarFile}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                title={t.uploadCustomAvatar}
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">
                  {t.avatarSelection}
                </span>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="text-xs text-[#ff85a2] font-semibold hover:underline flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{t.uploadPhoto}</span>
                </button>
              </div>

              {/* Custom Wallpaper */}
              <div className="pt-2 border-t border-[#3d2b38] flex items-center justify-between">
                <span className="text-xs text-[#a0909c]">{t.chatBackground}</span>
                <input
                  type="file"
                  ref={wallpaperInputRef}
                  onChange={handleWallpaperFile}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  {wallpaper && (
                    <button
                      type="button"
                      onClick={() => setWallpaper('')}
                      className="text-xs text-red-400 hover:underline"
                    >
                      {t.remove}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => wallpaperInputRef.current?.click()}
                    className="text-xs text-[#ff85a2] font-semibold hover:underline flex items-center gap-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{wallpaper ? t.changeWallpaper : t.setWallpaper}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Name & Relationship */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-white mb-1">
                {t.nameLabel} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.nameCharPlaceholder}
                className="w-full px-3.5 py-2 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-white text-sm focus:outline-none focus:border-[#ff85a2]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                {t.relationshipLabel}
              </label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder={t.relationshipPlaceholder}
                className="w-full px-3.5 py-2 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-white text-sm focus:outline-none focus:border-[#ff85a2]"
              />
            </div>
          </div>

          {/* Personality */}
          <div>
            <label className="block text-xs font-bold text-white mb-1">
              {t.personalityLabel}
            </label>
            <textarea
              rows={2}
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder={t.personalityPlaceholder}
              className="w-full px-3.5 py-2 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-white text-sm focus:outline-none focus:border-[#ff85a2] resize-none"
            />
          </div>

          {/* Backstory */}
          <div>
            <label className="block text-xs font-bold text-white mb-1">
              {t.backstoryLabel}
            </label>
            <textarea
              rows={2}
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
              placeholder={t.backstoryPlaceholder}
              className="w-full px-3.5 py-2 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-white text-sm focus:outline-none focus:border-[#ff85a2] resize-none"
            />
          </div>

          
          {/* Character Memories */}
          <div>
            <label className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff85a2]" />
              <span>{t.memoriesLabel}</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newMemoryInput}
                onChange={(e) => setNewMemoryInput(e.target.value)}
                placeholder={t.memoryPlaceholder}
                className="flex-1 px-3.5 py-1.5 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-white text-xs focus:outline-none focus:border-[#ff85a2]"
              />
              <button
                type="button"
                onClick={handleAddMemory}
                className="px-3 py-1.5 rounded-xl bg-[#2e222c] hover:bg-[#3d2b38] border border-[#3d2b38] text-[#ff85a2] text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.add}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
              {memories.map((m, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-xs text-white flex items-center gap-1.5"
                >
                  <span>{m}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMemory(idx)}
                    className="text-[#a0909c] hover:text-red-400"
                    aria-label={t.removeMemory}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* System Prompt (Optional Override) */}
          <div>
            <label className="block text-xs font-bold text-white mb-1">
              {t.systemPromptLabel}
            </label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder={t.systemPromptPlaceholder}
              className="w-full px-3.5 py-2 rounded-xl bg-[#2e222c] border border-[#3d2b38] text-white text-xs font-mono focus:outline-none focus:border-[#ff85a2]"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-[#3d2b38] flex items-center justify-between">
            {characterToEdit && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete ${characterToEdit.name}?`)) {
                    onDelete(characterToEdit.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 rounded-xl text-red-400 hover:bg-red-950/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.delete}</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#2e222c] hover:bg-[#3d2b38] text-white text-xs font-semibold"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#ff5a8a]/20 hover:opacity-95"
              >
                <Check className="w-4 h-4" />
                <span>{t.saveCompanion}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
