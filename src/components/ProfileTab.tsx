import React, { useState, useRef } from 'react';
import { UserProfile, Character, AppLanguage, Gender } from '../types';
import {
  Camera,
  Settings,
  Check,
  User,
  Sparkles,
  Sliders,
  Globe,
  HeartHandshake,
  Mars,
  Venus,
  Circle,
} from 'lucide-react';
import { getTranslation } from '../utils/i18n';
import { PWAInstallButton } from './PWAInstallButton';

const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/9218/9218712.png';

interface ProfileTabProps {
  userProfile: UserProfile;
  characters: Character[];
  onSaveProfile: (profile: UserProfile) => void;
  onOpenSettings: () => void;
  onOpenDonate?: () => void;
  language: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userProfile,
  characters,
  onSaveProfile,
  onOpenSettings,
  onOpenDonate,
  language,
  onLanguageChange,
}) => {
  const [name, setName] = useState(userProfile.name || '');
    const [avatar, setAvatar] = useState(userProfile.avatar || DEFAULT_AVATAR);
    const [bio, setBio] = useState(userProfile.bio || '');
    const [gender, setGender] = useState<Gender>(userProfile.gender || 'other');
  const [isSaved, setIsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = getTranslation(language);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setAvatar(result);
        setIsSaved(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated: UserProfile = {
      name: name.trim(),
      avatar,
      bio: bio.trim(),
      gender,
    };
    onSaveProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Compute stats across characters
  const totalMessages = characters.reduce((sum, c) => {
    const charMsgs = (c.sessions || []).reduce(
      (sSum, s) => sSum + (s.messages?.length || 0),
      0
    );
    return sum + charMsgs;
  }, 0);

  const totalBookmarks = characters.reduce(
    (sum, c) => sum + (c.bookmarks?.length || 0),
    0
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1a1218] overflow-hidden">
      {/* Top Header with Settings Icon */}
      <div className="px-4 py-3.5 bg-[#241b22]/95 backdrop-blur-md border-b border-[#3d2b38] shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#ff85a2]" />
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t.myProfile}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Language Toggle */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'my' : 'en')}
              className="p-2 sm:px-2.5 sm:py-1 rounded-xl bg-[#2e222c] border border-[#3d2b38] hover:border-[#ff85a2]/50 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
              title={t.switchLanguage}
            >
              <Globe className="w-3.5 h-3.5 text-[#ff85a2]" />
              <span className="hidden sm:inline text-[11px]">{language === 'en' ? 'မြန်မာ' : 'EN'}</span>
            </button>

            {/* Settings Icon placed in the header as required */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-2xl text-[#a0909c] hover:text-white bg-[#2e222c] border border-[#3d2b38] hover:border-[#ff85a2]/50 transition-colors"
              title={t.settings}
              aria-label={t.settings}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 max-w-2xl w-full mx-auto pb-24">
        {/* Profile Card Form */}
        <form
          onSubmit={handleSave}
          className="p-5 sm:p-6 rounded-3xl bg-[#241b22] border border-[#3d2b38] space-y-5 shadow-md"
        >
          {/* Avatar Upload Header */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-4 border-b border-[#3d2b38]">
            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#3d2b38] group-hover:ring-[#ff85a2] transition-all shadow-xl"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity text-xs font-semibold gap-1 cursor-pointer"
                title={t.changePhoto}
              >
                <Camera className="w-5 h-5" />
                <span>{t.changePhoto}</span>
              </button>
            </div>

            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-base font-bold text-white">
                  {name || t.yourName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ff85a2]/15 text-[#ff85a2] border border-[#ff85a2]/30">
                  {t.berryUser}
                </span>
              </div>
              <p className="text-xs text-[#a0909c] max-w-xs">
                {t.profileSubtitle}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs text-[#ff85a2] font-semibold hover:underline pt-1"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{t.changePhoto}</span>
              </button>
            </div>
          </div>

          {/* User Name Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white">
              {t.yourName}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsSaved(false);
              }}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#2e222c] border border-[#3d2b38] text-white text-sm focus:outline-none focus:border-[#ff85a2] transition-colors"
            />
          </div>

          {/* Bio / Description for the AI to know the user */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ff85a2]" />
                <span>{t.aboutYou}</span>
              </label>
            </div>
            <p className="text-[11px] text-[#a0909c]">
              {language === 'my'
                ? 'AI အဖော်များ သင့်စိတ်ကြိုက်၊ ဝါသနာနှင့် စကားပြောပုံစံကို သဘာဝကျကျ သိရှိနိုင်ရန် အောက်တွင် ရေးသားပါ-'
                : 'Write a short description about yourself (passions, hobbies, lifestyle) so characters naturally understand and talk to you.'}
            </p>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                setIsSaved(false);
              }}
              placeholder={t.aboutYouPlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-[#2e222c] border border-[#3d2b38] text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff85a2] transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white">
              {t.gender}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: 'male' as Gender, icon: Mars, label: t.genderMale },
                { value: 'female' as Gender, icon: Venus, label: t.genderFemale },
                { value: 'other' as Gender, icon: Circle, label: t.genderOther },
              ]).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setGender(opt.value);
                    setIsSaved(false);
                  }}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl border text-xs font-bold transition-colors ${
                    gender === opt.value
                      ? 'bg-[#ff85a2]/20 border-[#ff85a2]/60 text-[#ff85a2]'
                      : 'bg-[#2e222c] border-[#3d2b38] text-[#a0909c] hover:border-[#ff85a2]/50'
                  }`}
                >
                  <opt.icon className="w-4 h-4" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs">
              {isSaved && (
                <span className="text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>{t.profileSaved}</span>
                </span>
              )}
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white text-xs font-bold shadow-md shadow-[#ff5a8a]/20 hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{t.saveProfile}</span>
            </button>
          </div>
        </form>

        {/* Connection & Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-3xl bg-[#241b22] border border-[#3d2b38] text-center space-y-1">
            <div className="text-xl font-black text-white">
              {characters.length}
            </div>
            <div className="text-[10px] font-bold text-[#a0909c] uppercase tracking-wider">
              {t.totalCompanions}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-[#241b22] border border-[#3d2b38] text-center space-y-1">
            <div className="text-xl font-black text-[#ff85a2]">
              {totalMessages}
            </div>
            <div className="text-[10px] font-bold text-[#a0909c] uppercase tracking-wider">
              {t.totalMessages}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-[#241b22] border border-[#3d2b38] text-center space-y-1">
            <div className="text-xl font-black text-amber-400">
              {totalBookmarks}
            </div>
            <div className="text-[10px] font-bold text-[#a0909c] uppercase tracking-wider">
              {t.savedBookmarks}
            </div>
          </div>
        </div>

        {/* PWA App Install Banner Card */}
        <PWAInstallButton language={language} variant="full" />

        {/* Donate / Support KBZPay Card */}
        {onOpenDonate && (
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#005baa]/25 via-[#241b22] to-[#241b22] border border-[#005baa]/50 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#ff85a2]" />
                <span>{language === 'my' ? 'Berrychat ကို ထောက်ပံ့လှူဒါန်းရန်' : 'Support & Donate (KBZPay)'}</span>
              </h2>
              <p className="text-xs text-[#a0909c]">
                {language === 'my'
                  ? 'အက်ပ်ကို အခမဲ့ ဆက်လက်အသုံးပြုနိုင်ရန် KBZPay ဖြင့် ထောက်ပံ့လှူဒါန်းနိုင်ပါသည်။'
                  : 'Support Berrychat development and keep it 100% free via KBZPay QR.'}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenDonate}
              className="px-4 py-2 rounded-2xl bg-[#005baa] hover:bg-[#004f94] text-white text-xs font-bold transition-all shadow-md shadow-[#005baa]/20 shrink-0 active:scale-95"
            >
              {language === 'my' ? 'လှူဒါန်းရန်' : 'Donate'}
            </button>
          </div>
        )}

        {/* Settings & Configuration Quick Card */}
        <div className="p-5 rounded-3xl bg-[#241b22] border border-[#3d2b38] flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#ff85a2]" />
              <span>{t.settingsAndBackups}</span>
            </h2>
            <p className="text-xs text-[#a0909c]">
              {language === 'my'
                ? 'AI မော်ဒယ်ရွေးချယ်ခြင်း၊ Gemini API သော့များ စစ်ဆေးခြင်း၊ နှင့် ဒေတာအရန်သိမ်းခြင်းများ'
                : 'Select AI models, configure API keys, and backup/restore conversations.'}
            </p>
          </div>

          <button
            onClick={onOpenSettings}
            className="px-4 py-2 rounded-2xl bg-[#2e222c] hover:bg-[#3d2b38] border border-[#3d2b38] hover:border-[#ff85a2]/50 text-white text-xs font-semibold transition-colors shrink-0"
          >
            {t.settings}
          </button>
        </div>
      </div>
    </div>
  );
};
