"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type LeaderboardEntry = {
  id: string;
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
  createdAt: string;
};

export default function Leaderboard() {
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState<"wpm" | "accuracy">("wpm");
  const limit = 10;

  const { data, isLoading, isFetching } = useQuery<{ entries: LeaderboardEntry[]; hasMore: boolean }>({
    queryKey: ["leaderboard", offset, sortBy],
    queryFn: async () => {
      const response = await fetch(`/api/leaderboard?limit=${limit}&offset=${offset}&sortBy=${sortBy}`);
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }
      return response.json();
    },
  });

  if (isLoading) return <p>Loading leaderboard...</p>;

  return (
    <section className="rounded border-2 border-dark-brown bg-cream p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Leaderboard</h2>
        <label className="text-sm">
          Sort by{" "}
          <select
            className="focus-ring ml-2 rounded border border-dark-brown bg-paper-bg px-2 py-1"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value as "wpm" | "accuracy");
              setOffset(0);
            }}
          >
            <option value="wpm">WPM</option>
            <option value="accuracy">Accuracy</option>
          </select>
        </label>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="pb-2">Rank</th>
              <th className="pb-2">User</th>
              <th className="pb-2">WPM</th>
              <th className="pb-2">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {data?.entries.map((entry) => (
              <tr key={entry.id} className="border-t border-dark-brown/30">
                <td className="py-2">{entry.rank}</td>
                <td className="py-2">{entry.username}</td>
                <td className="py-2">{entry.wpm}</td>
                <td className="py-2">{entry.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          className="focus-ring rounded border border-dark-brown px-3 py-1 text-sm disabled:opacity-50"
          onClick={() => setOffset((current) => Math.max(0, current - limit))}
          disabled={offset === 0 || isFetching}
        >
          Previous
        </button>
        <p className="text-xs">Showing {offset + 1} - {offset + (data?.entries.length || 0)}</p>
        <button
          type="button"
          className="focus-ring rounded border border-dark-brown px-3 py-1 text-sm disabled:opacity-50"
          onClick={() => setOffset((current) => current + limit)}
          disabled={!data?.hasMore || isFetching}
        >
          Next
        </button>
      </div>
    </section>
  );
}