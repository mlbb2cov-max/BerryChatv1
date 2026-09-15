import React, { useState } from 'react';
import { X, Download, Copy, Check, HeartHandshake, QrCode, Sparkles } from 'lucide-react';
import { AppLanguage } from '../types';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: AppLanguage;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose, language }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isMy = language === 'my';

  const handleCopy = () => {
    navigator.clipboard.writeText('Oakar Khant (8676) - KBZPay');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = './donate_kbzpay.webp';
    a.download = 'oakar_khant_kbzpay_qr.png';
    a.click();
  };

  return (
    <div
      id="donate-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-label={isMy ? 'KBZPay ဖြင့် လှူဒါန်းရန်' : 'Donate with KBZPay'}
    >
      <div
        id="donate-modal-container"
        className="w-full max-w-md bg-[#1f171e] border border-[#3d2b38] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#3d2b38] flex items-center justify-between bg-[#2a1d27]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#005baa]/20 border border-[#005baa]/40 flex items-center justify-center text-[#00aaff]">
              <HeartHandshake className="w-4 h-4 text-[#ff85a2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{isMy ? 'Berrychat ကို ထောက်ပံ့လှူဒါန်းရန်' : 'Donate & Support Berrychat'}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#ffb86c]" />
              </h3>
              <p className="text-[11px] text-[#c4b5c0]">{isMy ? 'KBZPay QR ဖြင့် ပေးချေရန်' : 'KBZPay QR Payment'}</p>
            </div>
          </div>
          <button
            id="btn-close-donate-modal"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#c4b5c0] hover:text-white hover:bg-[#3d2b38] transition-colors"
            aria-label={isMy ? 'ပိတ်မည်' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col items-center gap-4">
          {/* Note Banner */}
          <div className="w-full p-3 rounded-2xl bg-[#005baa]/10 border border-[#005baa]/30 text-center">
            <p className="text-xs font-semibold text-[#80c8ff] leading-relaxed">
              {isMy
                ? 'KBZPay App ဖွင့်ပြီး အောက်ပါ QR Code ကို Scan ဖတ်၍ လှူဒါန်းနိုင်ပါသည်'
                : 'Open KBZPay app and scan the QR code below to send donation'}
            </p>
          </div>

          {/* Exact KBZPay Donation Card UI replicating the user image */}
          <div
            id="kbzpay-donate-card"
            className="w-full max-w-[340px] bg-[#005baa] rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-[#004a8f] text-center flex flex-col items-center select-none"
          >
            {/* Top Burmese Prompt */}
            <div className="mb-4">
              <h4 className="text-white font-bold text-base sm:text-lg leading-tight drop-shadow-sm font-sans">
                မိမိထံ ငွေပေးချေရန် KBZPay QR
              </h4>
              <h4 className="text-white font-bold text-base sm:text-lg leading-tight drop-shadow-sm font-sans mt-0.5">
                Scanner ကို အသုံးပြုပါ။
              </h4>
            </div>

            {/* White QR Code Card with User Silhouette Center */}
            <div className="w-full aspect-square max-w-[260px] bg-white rounded-2xl p-4 shadow-xl flex items-center justify-center relative overflow-hidden">
              <img
                src="./donate_qr_code.webp"
                alt={isMy ? 'KBZPay QR ကုဒ်' : 'KBZPay QR Code'}
                className="w-full h-full object-contain pointer-events-none rounded-lg"
              />
            </div>


            {/* KBZPay Official Brand Logo at bottom */}
            <div className="mt-4 flex items-center justify-center">
              <div className="px-4 py-2 rounded-xl bg-[#003d73] border border-white/30 shadow-md flex items-center gap-2">
                <span className="text-white font-black text-sm tracking-wider">KBZ</span>
                <span className="w-2 h-2 rounded-full bg-[#00aaff]"></span>
                <span className="text-white font-bold text-sm tracking-wide">Pay</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-[340px] grid grid-cols-2 gap-2 mt-1">
            <button
              id="btn-copy-kbzpay-info"
              onClick={handleCopy}
              className="py-2.5 px-3 rounded-xl bg-[#2a1d27] hover:bg-[#3d2b38] border border-[#3d2b38] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">{isMy ? 'ကူးယူပြီးပါပြီ' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#ff85a2]" />
                  <span>{isMy ? 'နာမည် ကူးယူရန်' : 'Copy Info'}</span>
                </>
              )}
            </button>

            <button
              id="btn-download-kbzpay-qr"
              onClick={handleDownload}
              className="py-2.5 px-3 rounded-xl bg-[#005baa] hover:bg-[#004f94] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isMy ? 'QR သိမ်းဆည်းရန်' : 'Save QR'}</span>
            </button>
          </div>

          {/* Thank You Footer */}
          <div className="text-center px-4 mt-1">
            <p className="text-[11px] text-[#c4b5c0] leading-relaxed">
              {isMy
                ? 'သင်၏ စေတနာထောက်ပံ့မှုသည် AI ဆာဗာများနှင့် မော်ဒယ်စရိတ်များအတွက် များစွာအထောက်အကူဖြစ်စေပါသည် ❤️'
                : 'Your kind donation directly keeps Berrychat fast, free, and constantly updated for everyone! ❤️'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
