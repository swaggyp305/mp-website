type WordDisplayProps = {
  text: string;
  userInput: string;
  currentIndex: number;
};

export default function WordDisplay({ text, userInput, currentIndex }: WordDisplayProps) {
  return (
    <p className="rounded border-2 border-dark-brown bg-terminal-bg p-4 font-terminal text-xl leading-loose text-monitor-green">
      {text.split("").map((char, index) => {
        let className = "text-monitor-white/80";
        if (index < userInput.length) {
          className = userInput[index] === char ? "text-monitor-green" : "text-red-400";
        } else if (index === currentIndex) {
          className = "animate-blink bg-monitor-amber text-terminal-bg";
        }
        return (
          <span key={`${char}-${index}`} className={className}>
            {char}
          </span>
        );
      })}
    </p>
  );
}