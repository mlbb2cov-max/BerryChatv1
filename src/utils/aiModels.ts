export interface AIModelOption {
  id: string;
  name: string;
  tag: string;
  freeTier: boolean;
  description: {
    en: string;
    my: string;
  };
  recommended?: boolean;
}

export const SUPPORTED_AI_MODELS: AIModelOption[] = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    tag: 'Free API Tier',
    freeTier: true,
    description: {
      en: 'Recommended default. High-speed, emotionally nuanced, and 100% workable with free Gemini API quota.',
      my: 'အခမဲ့ API အသုံးပြုသူများအတွက် အထူးသင့်လျော်သည်။ အချိန်နှင့်တပြေးညီ မြန်ဆန်စွာ စကားပြောဆိုနိုင်သော မော်ဒယ်။',
    },
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    tag: 'Free API Tier',
    freeTier: true,
    description: {
      en: 'Ultra-low latency and lightweight token footprint. Ideal for fast chat replies on free tier.',
      my: 'အလွန်ပေါ့ပါးသွက်လက်ပြီး စာတိုပေးပို့ ချက်တင်ပြောဆိုရန် သင့်တော်သည်။ အခမဲ့ API နှင့် အပြည့်အဝအလုပ်လုပ်သည်။',
    },
    recommended: true,
  },
  {
    id: 'gemini-flash-latest',
    name: 'Gemini Flash Latest',
    tag: 'Free API Tier',
    freeTier: true,
    description: {
      en: 'Latest continuous Flash text version with natural conversational flow and dependable pacing.',
      my: 'အမြဲတမ်း နောက်ဆုံးထွက် Flash ဗားရှင်းဖြစ်ပြီး သဘာဝကျသော စကားပြောဆိုမှု ပေးစွမ်းသည်။',
    },
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    tag: 'Free API Tier',
    freeTier: true,
    description: {
      en: 'Proven stable companion text model with rich personality nuance on free tier.',
      my: 'ယုံကြည်စိတ်ချရပြီး တည်ငြိမ်သော မိတ်ဆွေမော်ဒယ်။ အခမဲ့ API ဖြင့် အဆင်ပြေစွာ သုံးနိုင်သည်။',
    },
  },
  {
    id: 'gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    tag: 'Free API Tier',
    freeTier: true,
    description: {
      en: 'Compact text-to-text model designed for maximum efficiency and quota preservation.',
      my: 'ဒေတာနှင့် ကုန်ကျစရိတ် ချွေတာရန်နှင့် ချက်ချင်းအဖြေရရှိရန် အထူးပြုလုပ်ထားသည်။',
    },
  },
];
