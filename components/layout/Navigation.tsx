"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

const links: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/typing", label: "Typing" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-dark-brown bg-cream">
      <nav className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-2 px-4 py-3" aria-label="Main">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`focus-ring rounded border px-3 py-1 text-sm ${active ? "border-dark-brown bg-beige" : "border-transparent hover:border-dark-brown"}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}