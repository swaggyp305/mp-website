"use client";

interface BootSequenceProps {
  progress: number;
}

export function BootSequence({ progress }: BootSequenceProps) {
  return (
    <div className="space-y-1 font-mono text-xs text-dark-brown">
      <p>&gt; Power on self test... OK</p>
      <p>&gt; Initializing display controller... OK</p>
      <p>&gt; Loading Portfolio.exe modules... {Math.round(progress)}%</p>
    </div>
  );
}
