"use client";

import { useViewModeStore } from "@/lib/stores";
import { useRouter } from "next/navigation";

export default function ViewModeToggle() {
  const mode = useViewModeStore((state) => state.mode);
  const setMode = useViewModeStore((state) => state.setMode);
  const router = useRouter();

  function handleToggle() {
    const nextMode = mode === "2d" ? "3d" : "2d";
    setMode(nextMode);
    router.push(nextMode === "3d" ? "/scene" : "/");
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="focus-ring rounded border-2 border-dark-brown bg-cream px-3 py-2 text-sm hover:bg-beige"
      aria-label="Toggle view mode"
    >
      Mode: {mode.toUpperCase()}
    </button>
  );
}