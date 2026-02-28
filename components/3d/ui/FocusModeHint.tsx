"use client";

export function FocusModeHint() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded border border-dark-brown bg-paper-bg px-3 py-1 text-xs text-dark-brown">
      Focus mode active · Press ESC to return
    </div>
  );
}
