/**
 * Affection Engine for Berrychat
 * Dynamically adjusts companion affection based on conversational tone,
 * emotional connection, compliments, or hurtful remarks.
 */

const POSITIVE_TERMS_EN = [
  'love', 'adore', 'miss you', 'cute', 'sweet', 'beautiful', 'handsome', 'gorgeous',
  'pretty', 'kind', 'thank', 'thanks', 'appreciate', 'hug', 'kiss', 'warm', 'caring',
  'darling', 'honey', 'babe', 'sweetheart', 'proud of you', 'like you', 'best', 'wonderful',
  'amazing', 'special', 'happy to talk', 'comfort', 'smile', 'gentle', 'cherish', 'treasure',
  'lovelier', 'lovely', 'marry', 'precious', 'hold your hand', 'care about you'
];

const POSITIVE_TERMS_MY = [
  'ချစ်', 'သတိရ', 'ကြိုက်', 'ကျေးဇူး', 'လှတယ်', 'ချောတယ်', 'နမ်း', 'ဖက်',
  'အနားမှာ', 'ဂရုစိုက်', 'စိတ်ချမ်းသာ', 'အားပေး', 'အဆင်ပြေ', 'ကောင်းတယ်', 'ပျော်တယ်',
  'တန်ဖိုးထား', 'ချစ်စရာ', 'ချစ်တယ်', 'ကြင်နာ', 'နွေးထွေး', 'မင်းအနား', 'လက်ကိုင်',
  'စိတ်ချ', 'မင်းလေး', 'အချစ်', 'ချစ်သူ', 'အချစ်ဆုံး'
];

const NEGATIVE_TERMS_EN = [
  'hate', 'shut up', 'ugly', 'stupid', 'idiot', 'dumb', 'annoying', 'boring', 'get lost',
  'leave me', 'go away', 'useless', 'trash', 'disgusting', 'bitch', 'fuck', 'loser',
  'hate you', 'waste of time', 'shut your mouth', 'disappointing', 'shut down', 'worst'
];

const NEGATIVE_TERMS_MY = [
  'မုန်း', 'ရုပ်ဆိုး', 'ပါးစပ်ပိတ်', 'အရူး', 'ငတုံး', 'စိတ်ပျက်', 'လခွမ်း', 'စောက်',
  'ထွက်သွား', 'နင်မုန်း', 'အသုံးမကျ', 'ရွံ', 'တောက်', 'နားငြီး', 'အမြင်ကတ်', 'နင်နဲ့မပြောချင်',
  'မုန်းတယ်', 'ခွေး', 'မကောင်းတဲ့'
];

export interface AffectionEvaluation {
  cleanText: string;
  affectionDelta: number;
  direction: 'increase' | 'decrease' | 'neutral';
}

/**
 * Analyzes conversational text and AI response to determine affection change.
 */
export function evaluateAffection(rawReplyText: string, userMessageText: string): AffectionEvaluation {
  let affectionDelta = 0;
  let cleanText = rawReplyText;

  // 1. Check if the AI model included an explicit [AFFECTION:+N] or [AFFECTION:-N] tag
  const tagMatch = rawReplyText.match(/\[AFFECTION:\s*([+-]?\d+)\]/i) ||
                   rawReplyText.match(/<!--\s*affection:\s*([+-]?\d+)\s*-->/i);

  if (tagMatch) {
    const parsed = parseInt(tagMatch[1], 10);
    if (!isNaN(parsed)) {
      affectionDelta = parsed;
    }
    cleanText = rawReplyText
      .replace(/\[AFFECTION:\s*[+-]?\d+\]/gi, '')
      .replace(/<!--\s*affection:\s*[+-]?\d+\s*-->/gi, '')
      .trim();
  }

  // 2. If AI model didn't return an explicit delta or returned 0, evaluate user's text sentiment
  if (affectionDelta === 0 && userMessageText && userMessageText.trim().length > 0) {
    const lowerUser = userMessageText.toLowerCase().trim();

    let posScore = 0;
    let negScore = 0;

    for (const term of POSITIVE_TERMS_EN) {
      if (lowerUser.includes(term)) posScore += 1;
    }
    for (const term of POSITIVE_TERMS_MY) {
      if (lowerUser.includes(term)) posScore += 1;
    }

    for (const term of NEGATIVE_TERMS_EN) {
      if (lowerUser.includes(term)) negScore += 1;
    }
    for (const term of NEGATIVE_TERMS_MY) {
      if (lowerUser.includes(term)) negScore += 1;
    }

    if (negScore > 0 && negScore >= posScore) {
      // Negative sentiment detected: decrease affection by -1 to -3
      affectionDelta = -Math.min(3, negScore);
    } else if (posScore > 0) {
      // Positive sentiment detected: increase affection by +1 to +3
      affectionDelta = Math.min(3, posScore);
    } else {
      // Neutral conversation: casual back-and-forth gives modest engagement
      // (1 point every few messages or neutral)
      affectionDelta = 1;
    }
  }

  // Cap delta between -5 and +5 per turn
  affectionDelta = Math.max(-5, Math.min(5, affectionDelta));

  const direction = affectionDelta > 0 ? 'increase' : affectionDelta < 0 ? 'decrease' : 'neutral';

  return {
    cleanText,
    affectionDelta,
    direction,
  };
}
