import RetroContainer from "@/components/layout/RetroContainer";
import TypingTest from "@/components/typing/TypingTest";
import Leaderboard from "@/components/typing/Leaderboard";

export default function TypingPage() {
  return (
    <div className="space-y-6">
      <RetroContainer>
        <h1 className="text-2xl font-semibold">Typing Race</h1>
        <p className="mt-2 text-sm">Type the passage as quickly and accurately as possible, then submit your score.</p>
      </RetroContainer>
      <TypingTest />
      <Leaderboard />
    </div>
  );
}