"use client";

import { useEffect, useRef } from "react";

type TypingInputProps = {
  onKeyPress: (key: string) => void;
  disabled?: boolean;
};

export default function TypingInput({ onKeyPress, disabled = false }: TypingInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="focus-ring sr-only"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      aria-label="Typing input"
      onKeyDown={(event) => onKeyPress(event.key)}
      disabled={disabled}
    />
  );
}