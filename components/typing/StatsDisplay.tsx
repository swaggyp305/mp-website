type StatsDisplayProps = {
  wpm: number;
  accuracy: number;
  elapsedSeconds: number;
};

export default function StatsDisplay({ wpm, accuracy, elapsedSeconds }: StatsDisplayProps) {
  return (
    <div className="grid gap-3 rounded border-2 border-dark-brown bg-beige p-4 sm:grid-cols-3">
      <p><span className="font-semibold">WPM:</span> {wpm}</p>
      <p><span className="font-semibold">Accuracy:</span> {accuracy}%</p>
      <p><span className="font-semibold">Time:</span> {elapsedSeconds}s</p>
    </div>
  );
}