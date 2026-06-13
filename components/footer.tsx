import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/models", label: "Models" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-[0.28em] text-cyan-200 uppercase">
            QuantModels.ai
          </p>
          <p className="max-w-md text-sm leading-7 text-slate-400">
            Enterprise-grade pricing, volatility, and risk analytics for teams
            that need disciplined market intelligence.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-white">Platform</p>
          <div className="space-y-3 text-sm text-slate-400">
            {links.map((link) => (
              <div key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-white">Contact</p>
          <div className="space-y-3 text-sm text-slate-400">
            <p>research@quantmodels.ai</p>
            <p>New York | London | Singapore</p>
            <p>Monitored by institutional support teams</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs tracking-[0.24em] text-slate-500 uppercase">
        Copyright 2026 QuantModels.ai. Built for modern investment workflows.
      </div>
    </footer>
  );
}
