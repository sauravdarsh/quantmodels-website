import Link from "next/link";

type ModelCardProps = {
  name: string;
  summary: string;
  bullets: string[];
  href?: string;
};

export function ModelCard({ name, summary, bullets, href }: ModelCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
        Quant Library
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-white">{name}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-400">{summary}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-300">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {href ? (
        <Link
          href={href}
          className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
        >
          Explore model
        </Link>
      ) : null}
    </article>
  );
}
