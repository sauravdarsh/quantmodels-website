"use client";

import { useState } from "react";

import {
  calculateBlackScholes,
  type BlackScholesInputs,
  type BlackScholesResults,
} from "@/lib/simulators";

const defaultInputs: BlackScholesInputs = {
  spot: 100,
  strike: 100,
  rate: 0.03,
  volatility: 0.2,
  maturity: 1,
};

function formatNumber(value: number) {
  return Number.isFinite(value) ? value.toFixed(4) : "0.0000";
}

export function BlackScholesSimulator() {
  const [inputs, setInputs] = useState<BlackScholesInputs>(defaultInputs);
  const [results, setResults] = useState<BlackScholesResults>(() =>
    calculateBlackScholes(defaultInputs),
  );

  function updateInput(key: keyof BlackScholesInputs, value: string) {
    setInputs((current) => ({ ...current, [key]: Number(value) }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
          Black-Scholes Inputs
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {Object.entries(inputs).map(([key, value]) => (
            <label key={key} className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                {key}
              </span>
              <input
                type="number"
                step="any"
                value={value}
                onChange={(event) =>
                  updateInput(key as keyof BlackScholesInputs, event.target.value)
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
              />
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setResults(calculateBlackScholes(inputs))}
          className="mt-6 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Price Option
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
            Call price
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {formatNumber(results.callPrice)}
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
            Put price
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {formatNumber(results.putPrice)}
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
            Delta
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {formatNumber(results.delta)}
          </p>
        </div>
      </div>
    </div>
  );
}
