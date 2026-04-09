import { useState, useEffect } from "react";

const links = [
  { label: "Dịch vụ", href: "services" },
  { label: "Quy trình", href: "process" },
  { label: "Lợi ích", href: "benefits" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="TechMin logo" className="h-11 w-auto object-contain" />
          <div className="flex flex-col items-center leading-none">
            <span className="text-[17px] font-semibold tracking-tight text-apple-gray-1">
              TechMin<span className="text-apple-blue">.</span>
            </span>
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-apple-gray-3 mt-0.5">
              Software
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              className="text-sm text-apple-gray-2 transition-colors duration-200 hover:text-apple-gray-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="rounded-full bg-apple-blue px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-apple-bluehover"
          >
            Liên hệ
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-px w-full bg-apple-gray-1 transition-all duration-300 ${
                open ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full bg-apple-gray-1 transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-apple-gray-1 transition-all duration-300 ${
                open ? "top-1/2 -rotate-45" : "top-full"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-apple-gray-4/50 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-80" : "max-h-0 border-transparent"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-apple-gray-2 transition-colors hover:bg-apple-gray-5 hover:text-apple-gray-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-apple-blue px-5 py-2.5 text-center text-sm font-medium text-white"
          >
            Liên hệ
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
