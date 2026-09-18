import { useEffect, useRef, useState } from 'react';

/**
 * Reveals a full string progressively to simulate live typing.
 * Returns the currently visible substring PLUS a boolean so the caller can
 * render a blinking caret or "typing…" indicator while it animates.
 *
 * - `text`: the complete message to type out (usually the latest model reply).
 * - `active`: when true the reveal runs; pass `isLoading` or similar so it
 *   behaves predictably when the underlying content changes.
 * - `speed`: ms between "keystrokes" (smaller = faster).
 * - `chunk`: how many chars advance per tick.
 *
 * It restarts whenever `text` changes, and always ends at the full text.
 */
export function useLiveTyping(
  text: string,
  active = true,
  speed = 14,
  chunk = 2
): { typed: string; isTyping: boolean } {
  const [typed, setTyped] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setTyped('');
    setIsTyping(active);

    if (!active) return;

    let i = 0;
    const run = () => {
      i = Math.min(i + chunk, text.length);
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        setIsTyping(false);
        return;
      }
      timerRef.current = window.setTimeout(run, speed);
    };
    run();

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
    // Restart only when the source text actually changes (not on every render).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active]);

  return { typed, isTyping };
}