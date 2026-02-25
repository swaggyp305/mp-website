"use client";

import { useViewModeStore } from "@/lib/stores";

export default function ViewModeToggle() {
  const mode = useViewModeStore((state) => state.mode);
  const toggleMode = useViewModeStore((state) => state.toggleMode);

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="focus-ring rounded border-2 border-dark-brown bg-cream px-3 py-2 text-sm hover:bg-beige"
      aria-label="Toggle view mode"
    >
      Mode: {mode.toUpperCase()}
    </button>
  );
}