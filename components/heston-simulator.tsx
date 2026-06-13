"use client";

import { useState } from "react";

import { simulateHeston, type HestonInputs, type HestonResults } from "@/lib/simulators";

const defaultInputs: HestonInputs = {
  S0: 100,
  v0: 0.04,
  r: 0.03,
  kappa: 2,
  theta: 0.04,
  sigmaV: 0.35,
  rho: -0.7,
  maturity: 1,
  steps: 50,
  paths: 2000,
  strike: 100,
};

const labels: Record<keyof HestonInputs, string> = {
  S0: "S0",
  v0: "v0",
  r: "r",
  kappa: "kappa",
  theta: "theta",
  sigmaV: "sigma_v",
  rho: "rho",
  maturity: "maturity",
  steps: "steps",
  paths: "paths",
  strike: "strike",
};

function formatNumber(value: number) {
  return Number.isFinite(value) ? value.toFixed(4) : "0.0000";
}

export function HestonSimulator() {
  const [inputs, setInputs] = useState<HestonInputs>(defaultInputs);
  const [results, setResults] = useState<HestonResults | null>(null);

  function handleInputChange(key: keyof HestonInputs, value: string) {
    setInputs((current) => ({
      ...current,
      [key]: Number(value),
    }));
  }

  function handleRunSimulation() {
    setResults(simulateHeston(inputs));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
          Heston Inputs
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {(Object.keys(defaultInputs) as Array<keyof HestonInputs>).map((key) => (
            <label key={key} className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                {labels[key]}
              </span>
              <input
                type="number"
                step={key === "steps" || key === "paths" ? 1 : "any"}
                value={inputs[key]}
                onChange={(event) => handleInputChange(key, event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
              />
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={handleRunSimulation}
          className="mt-6 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Run Heston Simulation
        </button>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
            Simulation Output
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                European call
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {results ? formatNumber(results.estimatedCallPrice) : "--"}
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                Avg final stock
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {results ? formatNumber(results.finalAverageStockPrice) : "--"}
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                Avg final variance
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {results ? formatNumber(results.finalAverageVariance) : "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
            Monte Carlo Notes
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            This internal simulator uses a simple Euler-style Monte Carlo scheme
            with correlated shocks for the asset and variance processes. It is
            designed as a clear in-product demonstration rather than a production
            pricing benchmark.
          </p>
        </div>
      </div>
    </div>
  );
}
