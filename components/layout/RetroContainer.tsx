import { ReactNode } from "react";

export default function RetroContainer({ children }: { children: ReactNode }) {
  return <section className="retro-panel crt-overlay rounded-md p-6">{children}</section>;
}