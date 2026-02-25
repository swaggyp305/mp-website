export default function Footer() {
  return (
    <footer className="border-t-2 border-dark-brown bg-cream">
      <div className="mx-auto w-full max-w-5xl px-4 py-4 text-sm">
        © {new Date().getFullYear()} Retro Portfolio • Built with Next.js
      </div>
    </footer>
  );
}