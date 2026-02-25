"use client";

import { useState } from "react";

type ScoreSubmitProps = {
  wpm: number;
  accuracy: number;
  timeSeconds: number;
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
};

export default function ScoreSubmit(props: ScoreSubmitProps) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  async function submitScore() {
    setStatus("Submitting...");
    const authResponse = await fetch("/api/auth/guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (!authResponse.ok) {
      setStatus("Guest sign-in failed.");
      return;
    }

    const scoreResponse = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    });

    setStatus(scoreResponse.ok ? "Score submitted." : "Score submission failed.");
  }

  return (
    <div className="rounded border-2 border-dark-brown bg-beige p-4">
      <h3 className="font-semibold">Submit to leaderboard</h3>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          className="focus-ring w-full rounded border-2 border-dark-brown bg-paper-bg px-3 py-2"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          maxLength={50}
        />
        <button
          type="button"
          className="focus-ring rounded border-2 border-dark-brown px-4 py-2 hover:bg-cream disabled:cursor-not-allowed disabled:opacity-60"
          onClick={submitScore}
          disabled={username.trim().length < 2}
        >
          Submit
        </button>
      </div>
      {status ? <p className="mt-2 text-sm">{status}</p> : null}
    </div>
  );
}