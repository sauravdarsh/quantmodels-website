"use client";

import { useMemo, useState } from "react";

import {
  simulateCirPlusPlus,
  type CirInputs,
  type CirResults,
} from "@/lib/simulators";

const defaultInputs: CirInputs = {
  x0: 0.03,
  kappa: 0.8,
  theta: 0.04,
  sigma: 0.12,
  phi: 0.01,
  maturity: 1,
  steps: 12,
  paths: 1000,
};

const labels: Record<keyof CirInputs, string> = {
  x0: "x0",
  kappa: "kappa",
  theta: "theta",
  sigma: "sigma",
  phi: "phi",
  maturity: "maturity",
  steps: "steps",
  paths: "paths",
};

function formatNumber(value: number) {
  return Number.isFinite(value) ? value.toFixed(4) : "0.0000";
}

export function CirPlusPlusSimulator() {
  const [inputs, setInputs] = useState<CirInputs>(defaultInputs);
  const [results, setResults] = useState<CirResults>(() =>
    simulateCirPlusPlus(defaultInputs),
  );

  const visibleRows = useMemo(() => results.pathTable.slice(0, 16), [results.pathTable]);

  function handleInputChange(key: keyof CirInputs, value: string) {
    setInputs((current) => ({
      ...current,
      [key]: Number(value),
    }));
  }

  function handleRunSimulation() {
    setResults(simulateCirPlusPlus(inputs));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
          CIR++ Inputs
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {(Object.keys(defaultInputs) as Array<keyof CirInputs>).map((key) => (
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
          Run CIR++ Simulation
        </button>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
            Terminal Output
          </p>
          <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
              Avg terminal short rate
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {formatNumber(results.averageTerminalShortRate)}
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
            Simulated short-rate path table
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="text-xs tracking-[0.18em] text-slate-500 uppercase">
                <tr>
                  <th className="pb-3 pr-6 font-medium">Step</th>
                  <th className="pb-3 pr-6 font-medium">Time</th>
                  <th className="pb-3 pr-6 font-medium">Avg x(t)</th>
                  <th className="pb-3 font-medium">Avg r(t)</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.step} className="border-t border-white/8">
                    <td className="py-3 pr-6">{row.step}</td>
                    <td className="py-3 pr-6">{formatNumber(row.time)}</td>
                    <td className="py-3 pr-6">{formatNumber(row.averageState)}</td>
                    <td className="py-3">{formatNumber(row.averageShortRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
