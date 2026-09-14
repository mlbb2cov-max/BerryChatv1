import React, { useState } from 'react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { Download, Share2, X, Smartphone, Check } from 'lucide-react';
import { AppLanguage } from '../types';
import { getTranslation } from '../utils/i18n';

interface PWAInstallButtonProps {
  language?: AppLanguage;
  variant?: 'compact' | 'full' | 'header';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  language = 'en',
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running as standalone PWA, do not display
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      await install();
    } finally {
      setIsInstalling(false);
    }
  };

  const isMy = language === 'my';
  const t = getTranslation(language);

  // Desktop / Android / Chromium flow
  if (isInstallable) {
    if (variant === 'header') {
      return (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#ff85a2] to-[#ff5a8a] text-white text-xs font-bold shadow-sm shadow-[#ff5a8a]/20 hover:opacity-95 transition-all cursor-pointer"
          title={isMy ? 'Berry App အား ဖုန်း/ကွန်ပျူတာတွင် ထည့်သွင်းပါ (PWA)' : 'Install Berry AI App (PWA)'}
        >
          <Download className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold tracking-tight">
            {isMy ? 'App သွင်းမည်' : 'Install App'}
          </span>
        </button>
      );
    }

    if (variant === 'full') {
      return (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#ff85a2]/20 to-[#ff5a8a]/10 border border-[#ff85a2]/40 hover:border-[#ff85a2] text-white transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 rounded-xl bg-[#ff85a2] text-white shadow-md shadow-[#ff85a2]/30 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{isMy ? 'Berry App ကို ထည့်သွင်းပါ' : 'Install Berry AI App'}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#ff85a2] text-white">
                  PWA
                </span>
              </div>
              <div className="text-[11px] text-[#a0909c]">
                {isMy
                  ? 'အင်တာနက်မရှိချိန်လည်း အဆင်ပြေပြေ အသုံးပြုနိုင်သည့် Native App အတွေ့အကြုံ'
                  : 'Fast, offline-ready native app experience with full screen mode.'}
              </div>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#ff85a2] text-white text-xs font-bold shrink-0">
            {isMy ? 'Install' : 'Install'}
          </div>
        </button>
      );
    }

    return (
      <button
        onClick={handleInstallClick}
        disabled={isInstalling}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2e222c] hover:bg-[#3d2b38] border border-[#3d2b38] hover:border-[#ff85a2]/60 text-white text-xs font-semibold transition-all cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-[#ff85a2]" />
        <span>{isMy ? 'App သွင်းရန်' : 'Install PWA'}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        {variant === 'header' ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#2e222c] border border-[#ff85a2]/40 text-white text-xs font-bold hover:bg-[#3d2b38] transition-all cursor-pointer"
            title={isMy ? 'iOS တွင် App သွင်းရန် လမ်းညွှန်' : 'Install on iOS Safari'}
          >
            <Download className="w-3.5 h-3.5 text-[#ff85a2]" />
            <span className="text-[11px]">{isMy ? 'App သွင်းနည်း' : 'Install'}</span>
          </button>
        ) : variant === 'full' ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#ff85a2]/15 to-[#ff5a8a]/5 border border-[#ff85a2]/30 hover:border-[#ff85a2] text-white transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="p-2 rounded-xl bg-[#ff85a2] text-white shadow-md shadow-[#ff85a2]/30 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{isMy ? 'iPhone/iPad တွင် သွင်းရန်' : 'Install on iPhone / iPad'}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#ff85a2] text-white">
                    iOS PWA
                  </span>
                </div>
                <div className="text-[11px] text-[#a0909c]">
                  {isMy
                    ? 'Safari Share ခလုတ်မှတစ်ဆင့် Home Screen ပေါ်တင်နည်း'
                    : 'Add to Home Screen via Safari Share button.'}
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#2e222c] border border-[#ff85a2]/40 text-[#ff85a2] text-xs font-bold shrink-0">
              {isMy ? 'ကြည့်မည်' : 'View'}
            </div>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2e222c] hover:bg-[#3d2b38] border border-[#3d2b38] hover:border-[#ff85a2]/60 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#ff85a2]" />
            <span>{isMy ? 'iOS တွင် သွင်းနည်း' : 'Install on iOS'}</span>
          </button>
        )}

        {/* iOS Guided Modal */}
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-[#241b22] border border-[#3d2b38] p-6 shadow-2xl space-y-4 text-white">
              <div className="flex items-center justify-between pb-2 border-b border-[#3d2b38]">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#ff85a2]" />
                  <h3 className="text-sm font-bold text-white">
                    {isMy ? 'iPhone / iPad တွင် App သွင်းရန်' : 'Install on iPhone & iPad'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-xl text-[#a0909c] hover:text-white hover:bg-[#2e222c]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#a0909c] leading-relaxed">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#2e222c] border border-[#3d2b38]">
                  <div className="p-1 rounded-lg bg-[#ff85a2]/20 text-[#ff85a2] font-bold shrink-0">
                    1
                  </div>
                  <div>
                    {isMy ? (
                      <span>
                        Safari ဘရောက်ဇာ၏ အောက်ခြေရှိ <Share2 className="w-3.5 h-3.5 inline text-[#ff85a2]" /> <strong>Share</strong> ခလုတ်ကို နှိပ်ပါ။
                      </span>
                    ) : (
                      <span>
                        {t.tapShare} <Share2 className="w-3.5 h-3.5 inline text-[#ff85a2]" /> <strong>Share</strong> {t.shareButtonBottom}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#2e222c] border border-[#3d2b38]">
                  <div className="p-1 rounded-lg bg-[#ff85a2]/20 text-[#ff85a2] font-bold shrink-0">
                    2
                  </div>
                  <div>
                    {isMy ? (
                      <span>
                        မီနူးကို အောက်သို့ဆွဲချပြီး <strong>"Add to Home Screen"</strong> (သို့မဟုတ် <strong>"ပင်မမျက်နှာပြင်သို့ ထည့်ပါ"</strong>) ကို ရွေးချယ်ပါ။
                      </span>
                    ) : (
                      <span>
                        {t.scrollDownSelect} <strong>{t.addToHomeScreen}</strong>.
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#2e222c] border border-[#3d2b38]">
                  <div className="p-1 rounded-lg bg-[#ff85a2]/20 text-[#ff85a2] font-bold shrink-0">
                    3
                  </div>
                  <div>
                    {isMy ? (
                      <span>
                        ညာဘက်အပေါ်ထောင့်ရှိ <strong>"Add"</strong> ကို နှိပ်လိုက်ပါက သင့်ပင်မမျက်နှာပြင်တွင် App အဖြစ် အဆင်သင့် အသုံးပြုနိုင်ပါပြီ!
                      </span>
                    ) : (
                      <span>
                        {t.tapWord} <strong>"Add"</strong> {t.addInTopRight}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-2xl bg-[#2e222c] hover:bg-[#3d2b38] border border-[#3d2b38] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {isMy ? 'နားလည်ပါပြီ' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
