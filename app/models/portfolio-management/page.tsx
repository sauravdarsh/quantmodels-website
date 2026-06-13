import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Portfolio Management",
  description:
    "Build, analyse, and optimise mock portfolios across the NIFTY equity universe with simple institutional-style analytics.",
};

type MockStock = {
  symbol: string;
  name: string;
  sector: string;
  expectedReturn: number;
  volatility: number;
  weight: number;
  monthlyReturns: number[];
};

const equityUniverse = [
  "NIFTY 50",
  "NIFTY Next 50",
  "NIFTY 100",
  "Sector indices",
];

const portfolioStocks: MockStock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    sector: "Energy",
    expectedReturn: 0.128,
    volatility: 0.224,
    weight: 0.22,
    monthlyReturns: [0.022, -0.011, 0.017, 0.013, -0.007, 0.026],
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    sector: "Financials",
    expectedReturn: 0.112,
    volatility: 0.184,
    weight: 0.2,
    monthlyReturns: [0.016, 0.005, -0.009, 0.012, 0.01, 0.015],
  },
  {
    symbol: "INFY",
    name: "Infosys",
    sector: "Information Technology",
    expectedReturn: 0.118,
    volatility: 0.208,
    weight: 0.18,
    monthlyReturns: [0.021, -0.015, 0.011, 0.009, -0.004, 0.018],
  },
  {
    symbol: "ITC",
    name: "ITC",
    sector: "Consumer Staples",
    expectedReturn: 0.094,
    volatility: 0.152,
    weight: 0.16,
    monthlyReturns: [0.009, 0.008, 0.004, 0.007, -0.003, 0.011],
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro",
    sector: "Industrials",
    expectedReturn: 0.121,
    volatility: 0.198,
    weight: 0.24,
    monthlyReturns: [0.019, -0.006, 0.014, 0.016, 0.005, 0.021],
  },
];

const correlations: number[][] = [
  [1, 0.62, 0.48, 0.31, 0.54],
  [0.62, 1, 0.46, 0.29, 0.51],
  [0.48, 0.46, 1, 0.25, 0.41],
  [0.31, 0.29, 0.25, 1, 0.28],
  [0.54, 0.51, 0.41, 0.28, 1],
];

const riskFreeRate = 0.068;
const investmentAmount = 2_500_000;

const optimisationMethods = [
  {
    name: "Equal weight",
    summary: "Allocate evenly across the selected NIFTY names to keep the baseline transparent.",
  },
  {
    name: "Minimum variance",
    summary: "Bias toward the lowest covariance mix to reduce total portfolio volatility.",
  },
  {
    name: "Maximum Sharpe",
    summary: "Target the best excess return per unit of risk relative to the mock risk-free rate.",
  },
  {
    name: "Risk parity",
    summary: "Rebalance weights so each stock contributes a similar share of overall risk.",
  },
  {
    name: "HRP - Hierarchical Risk Parity",
    summary: "Cluster correlated stocks first, then size allocations to improve diversification stability.",
  },
];

const chartCards = [
  {
    title: "Efficient frontier",
    summary: "Placeholder frontier using mock NIFTY returns and covariances for future optimisation visuals.",
  },
  {
    title: "Allocation pie chart",
    summary: "Placeholder allocation chart for stock and sector weights once live charting is connected.",
  },
  {
    title: "Risk contribution",
    summary: "Placeholder breakdown showing how each position contributes to overall portfolio variance.",
  },
  {
    title: "Historical performance",
    summary: "Placeholder NAV and drawdown series built from the sample return stream below.",
  },
];

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildCovarianceMatrix(stocks: MockStock[], correlationMatrix: number[][]) {
  return stocks.map((stock, rowIndex) =>
    stocks.map(
      (peer, columnIndex) =>
        stock.volatility * peer.volatility * correlationMatrix[rowIndex][columnIndex],
    ),
  );
}

function calculatePortfolioReturn(stocks: MockStock[]) {
  return stocks.reduce((total, stock) => total + stock.weight * stock.expectedReturn, 0);
}

function calculatePortfolioVolatility(stocks: MockStock[], covarianceMatrix: number[][]) {
  let variance = 0;

  for (let rowIndex = 0; rowIndex < stocks.length; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < stocks.length; columnIndex += 1) {
      variance +=
        stocks[rowIndex].weight *
        stocks[columnIndex].weight *
        covarianceMatrix[rowIndex][columnIndex];
    }
  }

  return Math.sqrt(variance);
}

function calculateDrawdown(stocks: MockStock[]) {
  const periods = stocks[0]?.monthlyReturns.length ?? 0;
  let cumulative = 1;
  let peak = 1;
  let maxDrawdown = 0;

  for (let period = 0; period < periods; period += 1) {
    const portfolioReturn = stocks.reduce(
      (total, stock) => total + stock.weight * stock.monthlyReturns[period],
      0,
    );
    cumulative *= 1 + portfolioReturn;
    peak = Math.max(peak, cumulative);
    maxDrawdown = Math.min(maxDrawdown, cumulative / peak - 1);
  }

  return Math.abs(maxDrawdown);
}

function calculateSectorAllocation(stocks: MockStock[]) {
  return stocks.reduce<Record<string, number>>((allocation, stock) => {
    allocation[stock.sector] = (allocation[stock.sector] ?? 0) + stock.weight;
    return allocation;
  }, {});
}

const covarianceMatrix = buildCovarianceMatrix(portfolioStocks, correlations);
const portfolioReturn = calculatePortfolioReturn(portfolioStocks);
const portfolioVolatility = calculatePortfolioVolatility(portfolioStocks, covarianceMatrix);
const sharpeRatio = (portfolioReturn - riskFreeRate) / portfolioVolatility;
const drawdown = calculateDrawdown(portfolioStocks);
const sectorAllocation = calculateSectorAllocation(portfolioStocks);

const analytics = [
  { label: "Portfolio return", value: formatPercent(portfolioReturn) },
  { label: "Portfolio volatility", value: formatPercent(portfolioVolatility) },
  { label: "Sharpe ratio", value: sharpeRatio.toFixed(2) },
  { label: "Drawdown", value: formatPercent(drawdown) },
  {
    label: "Sector allocation",
    value: `${Object.keys(sectorAllocation).length} sectors`,
  },
  {
    label: "Stock allocation",
    value: `${portfolioStocks.length} stocks`,
  },
];

const portfolioInputs = [
  {
    label: "Select stocks",
    value: portfolioStocks.map((stock) => stock.symbol).join(", "),
  },
  {
    label: "Expected returns",
    value: "Mock annualised returns from 9.40% to 12.80%",
  },
  {
    label: "Volatility",
    value: "Mock annualised volatility from 15.20% to 22.40%",
  },
  {
    label: "Correlation matrix",
    value: `${portfolioStocks.length} x ${portfolioStocks.length} equity correlation set`,
  },
  {
    label: "Risk-free rate",
    value: formatPercent(riskFreeRate),
  },
  {
    label: "Investment amount",
    value: formatCurrency(investmentAmount),
  },
];

export default function PortfolioManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio Management"
        title="NIFTY portfolio construction with simple optimisation and risk diagnostics"
        description="Build, analyse and optimise portfolios from the NIFTY equity universe."
      />

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Overview
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                Build, analyse and optimise portfolios from the NIFTY equity
                universe.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {analytics.slice(0, 3).map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.25rem] border border-cyan-300/15 bg-slate-950/80 p-5"
                  >
                    <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Equity Universe
              </p>
              <div className="mt-6 grid gap-4">
                {equityUniverse.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Portfolio Inputs
              </p>
              <div className="mt-6 grid gap-4">
                {portfolioInputs.map((input) => (
                  <div
                    key={input.label}
                    className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5"
                  >
                    <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                      {input.label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">{input.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Correlation Matrix
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-3 text-left text-sm text-slate-300">
                  <thead>
                    <tr>
                      <th className="text-slate-500">Stock</th>
                      {portfolioStocks.map((stock) => (
                        <th key={stock.symbol} className="text-slate-500">
                          {stock.symbol}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioStocks.map((stock, rowIndex) => (
                      <tr key={stock.symbol}>
                        <td className="font-medium text-white">{stock.symbol}</td>
                        {correlations[rowIndex].map((value, columnIndex) => (
                          <td
                            key={`${stock.symbol}-${portfolioStocks[columnIndex].symbol}`}
                            className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2"
                          >
                            {value.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Analytics
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {analytics.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5"
                  >
                    <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Stock Allocation
              </p>
              <div className="mt-6 grid gap-4">
                {portfolioStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{stock.symbol}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {stock.name} · {stock.sector}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-cyan-200">
                        {formatPercent(stock.weight)}
                      </p>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-cyan-300"
                        style={{ width: `${stock.weight * 100}%` }}
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span>Return {formatPercent(stock.expectedReturn)}</span>
                      <span>Volatility {formatPercent(stock.volatility)}</span>
                      <span>Capital {formatCurrency(investmentAmount * stock.weight)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Sector Allocation
              </p>
              <div className="mt-6 grid gap-4">
                {Object.entries(sectorAllocation).map(([sector, weight]) => (
                  <div
                    key={sector}
                    className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-medium text-white">{sector}</p>
                      <p className="text-sm font-semibold text-cyan-200">
                        {formatPercent(weight)}
                      </p>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-cyan-300"
                        style={{ width: `${weight * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Optimisation Methods
              </p>
              <div className="mt-6 grid gap-4">
                {optimisationMethods.map((method) => (
                  <div
                    key={method.name}
                    className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5"
                  >
                    <p className="text-sm font-semibold text-white">{method.name}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{method.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
              Chart Cards
            </p>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {chartCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/80 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{card.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{card.summary}</p>
                    </div>
                    <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs tracking-[0.2em] text-cyan-200 uppercase">
                      Placeholder
                    </span>
                  </div>
                  <div className="mt-6 rounded-[1.25rem] border border-dashed border-white/15 bg-white/[0.03] p-8">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="h-20 rounded-2xl bg-gradient-to-b from-cyan-300/30 to-transparent" />
                      <div className="h-20 rounded-2xl bg-gradient-to-b from-white/15 to-transparent" />
                      <div className="h-20 rounded-2xl bg-gradient-to-b from-cyan-300/20 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Request Portfolio Demo
            </Link>
            <Link
              href="/models"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Back to Models
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
