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
    id: 'gemini-3.7-flash',
    name: 'Gemini 3.7 Flash',
    tag: 'Free API Tier',
    freeTier: true,
    description: {
      en: 'Versatile and fast. Balanced performance for natural, emotionally aware companion chat on free tier.',
      my: 'စွယ်စုံသုံး မြန်ဆန်သော မော်ဒယ်။ အခမဲ့ API ဖြင့် သဘာဝကျသော စကားပြောဆိုမှုကို ပေးစွမ်းသည်။',
    },
  },
  {
    id: 'gemini-3.6-flash',
    name: 'Gemini 3.6 Flash',
    tag: 'Free API Tier',
    freeTier: true,
    description: {
      en: 'Reliable mid-tier Flash with smooth conversational flow and strong personality nuance.',
      my: 'တည်ငြိမ်ယုံကြည်ရပြီး ချောမွေ့သော စကားပြောဆိုမှုနှင့် ဇာတ်ကောင်စရိုက် ကြွယ်ဝသော မော်ဒယ်။',
    },
  },
  {
    id: 'gemini-3.5-flash-lite',
    name: 'Gemini 3.5 Flash Lite',
    tag: 'Free API Tier',
    freeTier: true,
    description: {
      en: 'Compact lightweight Flash for fast replies while preserving free API quota.',
      my: 'ပေါ့ပါးသွက်လက်ပြီး အခမဲ့ API ဒေတာကို ချွေတာရန် သင့်တော်သော မော်ဒယ်။',
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
];
