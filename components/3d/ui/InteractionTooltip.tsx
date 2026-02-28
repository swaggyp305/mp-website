"use client";

import { useInteractionStore } from "@/lib/stores/interactionStore";

export function InteractionTooltip() {
  const tooltip = useInteractionStore((state) => state.hoveredTooltip);
  const cursor = useInteractionStore((state) => state.cursor);

  if (!tooltip) return null;

  const style = {
    left: `${cursor.x + 14}px`,
    top: `${cursor.y + 14}px`,
  };

  return (
    <div
      className="pointer-events-none absolute z-30 rounded border border-dark-brown bg-paper-bg px-2 py-1 font-mono text-xs text-dark-brown shadow-retro"
      style={style}
    >
      {tooltip}
    </div>
  );
}