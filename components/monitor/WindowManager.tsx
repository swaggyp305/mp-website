import { ReactNode } from "react";

interface WindowManagerProps {
  title: string;
  children: ReactNode;
}

export function WindowManager({ title, children }: WindowManagerProps) {
  return (
    <div className="h-full overflow-hidden rounded border-2 border-retro-gray bg-cream shadow-retro">
      <div className="flex h-8 items-center border-b border-[#003399] bg-gradient-to-b from-[#0054E3] to-[#0041B8] px-3 text-white">
        <span className="text-xs font-semibold">{title}</span>
      </div>
      <div className="h-[calc(100%-2rem)] overflow-y-auto p-3">{children}</div>
    </div>
  );
}