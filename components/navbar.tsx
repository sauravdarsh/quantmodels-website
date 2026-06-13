import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/pricing-library", label: "Pricing Library" },
  { href: "/models", label: "Models" },
  { href: "/models/portfolio-management", label: "Portfolio Management" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(6,10,18,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center justify-center gap-3 lg:justify-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
            QM
          </span>
          <div className="text-center lg:text-left">
            <div className="text-sm font-semibold tracking-[0.24em] text-white uppercase">
              QuantModels.ai
            </div>
            <div className="text-xs tracking-[0.28em] text-slate-400 uppercase">
              Institutional Analytics
            </div>
          </div>
        </Link>

        <div className="w-full lg:w-auto">
          <nav className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 text-sm text-slate-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-end">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/models/heston"
              className="shrink-0 rounded-full bg-cyan-300 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-200"
            >
              Launch App
            </Link>
            <Link
              href="/contact"
              className="shrink-0 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-medium text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-300/15"
            >
              Request Demo
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
