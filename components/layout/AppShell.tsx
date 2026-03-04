"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isSceneRoute = pathname === "/scene";

  if (isSceneRoute) {
    return (
      <div id="main-content" className="h-screen w-screen overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" className="mx-auto min-h-[calc(100vh-9rem)] w-full max-w-5xl px-4 py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}