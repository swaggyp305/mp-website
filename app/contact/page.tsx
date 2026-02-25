"use client";

import { useState, type FormEvent } from "react";
import RetroContainer from "@/components/layout/RetroContainer";

export default function ContactPage() {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("Sending...");
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(response.ok ? "Message sent." : "Failed to send message.");
  }

  return (
    <RetroContainer>
      <h1 className="text-2xl font-semibold">Contact</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input className="focus-ring w-full rounded border-2 border-dark-brown bg-paper-bg px-3 py-2" name="name" placeholder="Name" required />
        <input className="focus-ring w-full rounded border-2 border-dark-brown bg-paper-bg px-3 py-2" name="email" type="email" placeholder="Email" required />
        <input className="focus-ring w-full rounded border-2 border-dark-brown bg-paper-bg px-3 py-2" name="subject" placeholder="Subject" required />
        <textarea className="focus-ring min-h-36 w-full rounded border-2 border-dark-brown bg-paper-bg px-3 py-2" name="message" placeholder="Message" required />
        <button className="focus-ring rounded border-2 border-dark-brown px-4 py-2 hover:bg-beige" type="submit">
          Send Message
        </button>
      </form>
      {status ? <p className="mt-4 text-sm">{status}</p> : null}
    </RetroContainer>
  );
}