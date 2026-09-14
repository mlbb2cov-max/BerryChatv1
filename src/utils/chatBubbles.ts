/**
 * Splits an AI chat-mode reply into realistic, separate text bubbles.
 *
 * The model is instructed to separate each text message with a blank line.
 * Some models instead put one message per line. This handles both while
 * refusing to shred a genuinely long paragraph into fragments.
 */

const MAX_BUBBLE_CHARS = 320;

function splitOnBlankLines(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function splitOnSingleLines(text: string): string[] {
  const lines = text
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) return lines.length === 1 ? [text] : [];

  // Only treat a newline as a bubble break when every line looks like a short,
  // standalone text message. Otherwise it is one multi-line message.
  const allShort = lines.every((line) => line.length <= MAX_BUBBLE_CHARS);
  return allShort ? lines : [text];
}

export function splitIntoBubbles(text: string): string[] {
  const raw = (text || '').trim();
  if (!raw) return [];

  // If the model used blank lines, that is the authoritative bubble boundary —
  // respect it exactly and never shred those bubbles further.
  const hasBlankLineBreak = /\n\s*\n/.test(raw);
  const chunks = hasBlankLineBreak ? splitOnBlankLines(raw) : splitOnSingleLines(raw);

  const bubbles: string[] = [];
  for (const chunk of chunks) {
    const cleaned = chunk.trim();
    if (cleaned) bubbles.push(cleaned);
  }

  // Never return more than 6 bubbles for a single reply.
  if (bubbles.length > 6) {
    const head = bubbles.slice(0, 5);
    const tail = bubbles.slice(5).join('\n\n');
    return [...head, tail];
  }

  return bubbles.length > 0 ? bubbles : [raw];
}

/** Randomised per-bubble delay used to fake human typing rhythm. */
export function bubbleDelayMs(index: number): number {
  const base = 320;
  const jitter = 120;
  return base + Math.round(Math.random() * jitter) + index * 40;
}
