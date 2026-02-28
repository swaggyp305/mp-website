"use client";

import { useState } from "react";
import { WindowManager } from "@/components/monitor/WindowManager";
import { TerminalApp } from "@/components/monitor/TerminalApp";
import { AboutApp } from "@/components/monitor/AboutApp";
import { ProjectsApp } from "@/components/monitor/ProjectsApp";
import { ResumeApp } from "@/components/monitor/ResumeApp";
import { ContactApp } from "@/components/monitor/ContactApp";

type View = "home" | "terminal" | "about" | "projects" | "resume" | "contact";

export function DesktopOS() {
  const [view, setView] = useState<View>("home");

  return (
    <div className="flex h-full w-full font-mono text-sm">
      <aside className="w-44 border-r-2 border-retro-gray bg-beige p-2">
        <p className="mb-2 text-xs font-semibold text-dark-brown">Portfolio.exe</p>
        <div className="space-y-2">
          <button
            onClick={() => setView("home")}
            className={`w-full rounded border px-2 py-1 text-left ${view === "home" ? "border-dark-brown bg-cream" : "border-retro-gray bg-paper-bg"}`}
          >
            Home
          </button>
          <button
            onClick={() => setView("terminal")}
            className={`w-full rounded border px-2 py-1 text-left ${view === "terminal" ? "border-dark-brown bg-cream" : "border-retro-gray bg-paper-bg"}`}
          >
            Terminal
          </button>
          <button
            onClick={() => setView("about")}
            className={`w-full rounded border px-2 py-1 text-left ${view === "about" ? "border-dark-brown bg-cream" : "border-retro-gray bg-paper-bg"}`}
          >
            About
          </button>
          <button
            onClick={() => setView("projects")}
            className={`w-full rounded border px-2 py-1 text-left ${view === "projects" ? "border-dark-brown bg-cream" : "border-retro-gray bg-paper-bg"}`}
          >
            Projects
          </button>
          <button
            onClick={() => setView("resume")}
            className={`w-full rounded border px-2 py-1 text-left ${view === "resume" ? "border-dark-brown bg-cream" : "border-retro-gray bg-paper-bg"}`}
          >
            Resume
          </button>
          <button
            onClick={() => setView("contact")}
            className={`w-full rounded border px-2 py-1 text-left ${view === "contact" ? "border-dark-brown bg-cream" : "border-retro-gray bg-paper-bg"}`}
          >
            Contact
          </button>
        </div>

        <div className="mt-4 flex items-center gap-1 pl-1">
          <span className="h-2 w-2 rounded-full bg-[#FF0000]" />
          <span className="h-2 w-2 rounded-full bg-[#FF7F00]" />
          <span className="h-2 w-2 rounded-full bg-[#FFFF00]" />
          <span className="h-2 w-2 rounded-full bg-[#00FF00]" />
          <span className="h-2 w-2 rounded-full bg-[#0000FF]" />
          <span className="h-2 w-2 rounded-full bg-[#8B00FF]" />
        </div>
      </aside>

      <main className="h-full flex-1 bg-cream p-4">
        <WindowManager
          title={
            view === "home"
              ? "Portfolio.exe"
              : view === "terminal"
                ? "Terminal"
                : view === "about"
                  ? "About"
                  : view === "projects"
                    ? "Projects"
                    : view === "resume"
                      ? "Resume"
                      : "Contact"
          }
        >
          {view === "home" ? (
            <div className="space-y-3 text-dark-brown">
              <h2 className="text-xl font-semibold">Welcome</h2>
              <p>Everything from the 2D portfolio is accessible here inside the CRT desktop.</p>
            </div>
          ) : null}
          {view === "terminal" ? <TerminalApp /> : null}
          {view === "about" ? <AboutApp /> : null}
          {view === "projects" ? <ProjectsApp /> : null}
          {view === "resume" ? <ResumeApp /> : null}
          {view === "contact" ? <ContactApp /> : null}
        </WindowManager>
      </main>
    </div>
  );
}