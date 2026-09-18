import React from 'react';
import { useLiveTyping } from '../utils/useLiveTyping';

/**
 * Renders an AI message with a live "typing" reveal effect. Only the LATEST
 * model message should use this (pass animate=false for everything else so
 * earlier messages render instantly). While typing, a blinking caret is shown.
 */
export const TypedText: React.FC<{ text: string; animate?: boolean; className?: string }> = ({
  text,
  animate = false,
  className,
}) => {
  const { typed, isTyping } = useLiveTyping(text, animate);

  return (
    <span className={className}>
      {animate ? typed : text}
      {isTyping && <span className="animate-pulse inline-block ml-0.5">▍</span>}
    </span>
  );
};