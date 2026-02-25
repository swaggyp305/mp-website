"use client";

import { useEffect, useMemo, useState } from "react";
import WordDisplay from "./WordDisplay";
import TypingInput from "./TypingInput";
import StatsDisplay from "./StatsDisplay";
import ResultsModal from "./ResultsModal";
import ScoreSubmit from "./ScoreSubmit";
import { useTypingTestStore } from "@/lib/stores";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog while neon scanlines glow across the screen.",
  "Retro interfaces still feel magical when polished with performance and accessibility in mind.",
  "Type with rhythm, keep your focus, and let accuracy beat speed before speed catches up.",
];

export default function TypingTest() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const {
    text,
    userInput,
    currentIndex,
    startTime,
    endTime,
    wpm,
    accuracy,
    isComplete,
    setText,
    handleKeyPress,
    resetTest,
  } = useTypingTestStore();

  const selectedText = useMemo(() => SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)], []);

  useEffect(() => {
    if (!text) {
      setText(selectedText);
    }
  }, [selectedText, setText, text]);

  useEffect(() => {
    if (!startTime || isComplete) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - startTime) / 1000)));
    }, 500);

    return () => window.clearInterval(interval);
  }, [startTime, isComplete]);

  function onReset() {
    setElapsedSeconds(0);
    resetTest();
    setText(SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
  }

  const totalCharacters = userInput.length;
  const incorrectCharacters = userInput.split("").reduce((acc, char, index) => {
    return acc + (char === text[index] ? 0 : 1);
  }, 0);
  const correctCharacters = totalCharacters - incorrectCharacters;
  const completedSeconds = startTime && endTime ? Math.max(1, Math.round((endTime - startTime) / 1000)) : elapsedSeconds;

  return (
    <div className="space-y-4">
      <StatsDisplay wpm={wpm} accuracy={accuracy} elapsedSeconds={elapsedSeconds} />
      <WordDisplay text={text} userInput={userInput} currentIndex={currentIndex} />
      <TypingInput onKeyPress={handleKeyPress} disabled={isComplete} />
      {isComplete ? (
        <ScoreSubmit
          wpm={wpm}
          accuracy={accuracy}
          timeSeconds={completedSeconds}
          totalCharacters={totalCharacters}
          correctCharacters={correctCharacters}
          incorrectCharacters={incorrectCharacters}
        />
      ) : null}
      <ResultsModal open={isComplete} wpm={wpm} accuracy={accuracy} elapsedSeconds={completedSeconds} onReset={onReset} />
    </div>
  );
}