type ResultsModalProps = {
  open: boolean;
  wpm: number;
  accuracy: number;
  elapsedSeconds: number;
  onReset: () => void;
};

export default function ResultsModal({ open, wpm, accuracy, elapsedSeconds, onReset }: ResultsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-retro-black/45 p-4">
      <div className="retro-panel max-w-md rounded-md p-6">
        <h2 className="text-xl font-semibold">Test Complete</h2>
        <p className="mt-3">WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Time: {elapsedSeconds}s</p>
        <button onClick={onReset} className="focus-ring mt-5 rounded border-2 border-dark-brown px-4 py-2 hover:bg-beige" type="button">
          Try Again
        </button>
      </div>
    </div>
  );
}