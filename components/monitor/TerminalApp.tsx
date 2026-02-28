"use client";

import TypingTest from "@/components/typing/TypingTest";
import Leaderboard from "@/components/typing/Leaderboard";

export function TerminalApp() {
  return (
    <div className="space-y-4 rounded border border-dark-brown bg-retro-black p-3 text-monitor-green shadow-crt">
      <div className="border-b border-monitor-green/40 pb-2 text-xs font-mono">
        terminal.exe — typing challenge
      </div>
      <TypingTest />
      <Leaderboard />
    </div>
  );
}
