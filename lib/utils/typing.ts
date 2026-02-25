export type TypingSummary = {
  wpm: number;
  accuracy: number;
  elapsedSeconds: number;
};

export function calculateWpm(correctCharacters: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  return Math.max(0, Math.round(correctCharacters / 5 / minutes));
}

export function calculateAccuracy(correctCharacters: number, totalCharacters: number): number {
  if (totalCharacters <= 0) return 100;
  return Math.max(0, Math.min(100, Math.round((correctCharacters / totalCharacters) * 100)));
}

export function summarizeTypingResult(params: {
  startTime: number;
  endTime: number;
  totalCharacters: number;
  correctCharacters: number;
}): TypingSummary {
  const elapsedSeconds = Math.max(1, Math.round((params.endTime - params.startTime) / 1000));
  const wpm = calculateWpm(params.correctCharacters, elapsedSeconds);
  const accuracy = calculateAccuracy(params.correctCharacters, params.totalCharacters);

  return {
    wpm,
    accuracy,
    elapsedSeconds,
  };
}