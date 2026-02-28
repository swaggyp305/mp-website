"use client";

import { FormEvent, useState } from "react";

export function ContactApp() {
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    setStatus("Sending...");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(response.ok ? "Message sent." : "Failed to send message.");
  }

  return (
    <div className="space-y-3 text-dark-brown">
      <h2 className="text-xl font-semibold">Contact</h2>
      <form onSubmit={onSubmit} className="space-y-2">
        <input name="name" placeholder="Name" required className="focus-ring w-full rounded border border-dark-brown bg-paper-bg px-2 py-1 text-sm" />
        <input name="email" type="email" placeholder="Email" required className="focus-ring w-full rounded border border-dark-brown bg-paper-bg px-2 py-1 text-sm" />
        <input name="subject" placeholder="Subject" required className="focus-ring w-full rounded border border-dark-brown bg-paper-bg px-2 py-1 text-sm" />
        <textarea name="message" placeholder="Message" required className="focus-ring min-h-24 w-full rounded border border-dark-brown bg-paper-bg px-2 py-1 text-sm" />
        <button type="submit" className="focus-ring rounded border border-dark-brown px-3 py-1 text-sm hover:bg-beige">
          Send
        </button>
      </form>
      {status ? <p className="text-xs">{status}</p> : null}
    </div>
  );
}
