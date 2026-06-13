import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Portfolio Management",
  description:
    "Build, analyse, and optimise mock NIFTY 50 portfolios with simple strategy analytics and future-ready market data architecture.",
};

type MockStock = {
  symbol: string;
  name: string;
  sector: string;
  expectedReturn: number;
  volatility: number;
  monthlyReturns: number[];
};

type StrategyId =
  | "equal-weight"
  | "minimum-variance"
  | "maximum-sharpe"
  | "risk-parity";

type StrategyDefinition = {
  id: StrategyId;
  name: string;
  summary: string;
  weights: number[];
};

type FrontierPoint = {
  label: string;
  return: number;
  volatility: number;
};

const nifty50Universe: MockStock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    sector: "Energy",
    expectedReturn: 0.126,
    volatility: 0.226,
    monthlyReturns: [0.022, -0.011, 0.017, 0.013, -0.007, 0.026],
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    sector: "Financials",
    expectedReturn: 0.111,
    volatility: 0.182,
    monthlyReturns: [0.016, 0.005, -0.009, 0.012, 0.01, 0.015],
  },
  {
    symbol: "INFY",
    name: "Infosys",
    sector: "Information Technology",
    expectedReturn: 0.119,
    volatility: 0.208,
    monthlyReturns: [0.021, -0.015, 0.011, 0.009, -0.004, 0.018],
  },
  {
    symbol: "ITC",
    name: "ITC",
    sector: "Consumer Staples",
    expectedReturn: 0.094,
    volatility: 0.152,
    monthlyReturns: [0.009, 0.008, 0.004, 0.007, -0.003, 0.011],
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro",
    sector: "Industrials",
    expectedReturn: 0.122,
    volatility: 0.198,
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

const strategies: StrategyDefinition[] = [
  {
    id: "equal-weight",
    name: "Equal Weight",
    summary: "A clean baseline across the selected NIFTY 50 names with identical capital allocation.",
    weights: [0.2, 0.2, 0.2, 0.2, 0.2],
  },
  {
    id: "minimum-variance",
    name: "Minimum Variance",
    summary: "Tilts toward lower-volatility and lower-correlation names to compress total portfolio risk.",
    weights: [0.13, 0.25, 0.14, 0.3, 0.18],
  },
  {
    id: "maximum-sharpe",
    name: "Maximum Sharpe",
    summary: "Leans into stronger expected excess return while still respecting simple diversification assumptions.",
    weights: [0.24, 0.16, 0.23, 0.11, 0.26],
  },
  {
    id: "risk-parity",
    name: "Risk Parity",
    summary: "Balances exposure so each constituent contributes more evenly to overall risk.",
    weights: [0.17, 0.22, 0.18, 0.24, 0.19],
  },
];

const futureIntegrationLayers = [
  {
    title: "Market data adapters",
    summary:
      "Prepare typed ingestion adapters for NSE spot equity snapshots, NIFTY constituents, and option chain payloads.",
  },
  {
    title: "Normalisation layer",
    summary:
      "Map vendor-specific symbol formats, timestamps, and contract metadata into a single internal schema.",
  },
  {
    title: "Analytics engine",
    summary:
      "Swap mock expected returns, covariance estimates, and backtest series with live factor and market data inputs.",
  },
  {
    title: "Execution surfaces",
    summary:
      "Expose portfolio construction, optimisation, and derivatives overlay views without coupling UI cards to a single API provider.",
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

function calculatePortfolioReturn(stocks: MockStock[], weights: number[]) {
  return stocks.reduce((total, stock, index) => total + stock.expectedReturn * weights[index], 0);
}

function calculatePortfolioVolatility(
  stocks: MockStock[],
  covarianceMatrix: number[][],
  weights: number[],
) {
  let variance = 0;

  for (let rowIndex = 0; rowIndex < stocks.length; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < stocks.length; columnIndex += 1) {
      variance += weights[rowIndex] * weights[columnIndex] * covarianceMatrix[rowIndex][columnIndex];
    }
  }

  return Math.sqrt(variance);
}

function calculatePortfolioPath(stocks: MockStock[], weights: number[]) {
  const periods = stocks[0]?.monthlyReturns.length ?? 0;
  let cumulative = 1;

  return Array.from({ length: periods }, (_, index) => {
    const periodReturn = stocks.reduce(
      (total, stock, stockIndex) => total + stock.monthlyReturns[index] * weights[stockIndex],
      0,
    );
    cumulative *= 1 + periodReturn;

    return {
      month: `M${index + 1}`,
      nav: cumulative,
      periodReturn,
    };
  });
}

function calculateDrawdownFromPath(path: Array<{ nav: number }>) {
  let peak = 1;
  let maxDrawdown = 0;

  path.forEach((point) => {
    peak = Math.max(peak, point.nav);
    maxDrawdown = Math.min(maxDrawdown, point.nav / peak - 1);
  });

  return Math.abs(maxDrawdown);
}

function calculateSectorAllocation(stocks: MockStock[], weights: number[]) {
  return stocks.reduce<Record<string, number>>((allocation, stock, index) => {
    allocation[stock.sector] = (allocation[stock.sector] ?? 0) + weights[index];
    return allocation;
  }, {});
}

function buildStrategyAnalytics(
  stocks: MockStock[],
  covarianceMatrix: number[][],
  strategy: StrategyDefinition,
) {
  const portfolioReturn = calculatePortfolioReturn(stocks, strategy.weights);
  const portfolioVolatility = calculatePortfolioVolatility(
    stocks,
    covarianceMatrix,
    strategy.weights,
  );
  const sharpe = (portfolioReturn - riskFreeRate) / portfolioVolatility;
  const path = calculatePortfolioPath(stocks, strategy.weights);
  const drawdown = calculateDrawdownFromPath(path);
  const sectorAllocation = calculateSectorAllocation(stocks, strategy.weights);

  return {
    ...strategy,
    portfolioReturn,
    portfolioVolatility,
    sharpe,
    drawdown,
    path,
    sectorAllocation,
  };
}

function buildSvgPath(
  values: number[],
  width: number,
  height: number,
  padding: number,
  invert = false,
) {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = maximum - minimum || 1;

  return values
    .map((value, index) => {
      const x = padding + (index / Math.max(values.length - 1, 1)) * (width - padding * 2);
      const normalized = (value - minimum) / range;
      const y = invert
        ? height - padding - normalized * (height - padding * 2)
        : padding + normalized * (height - padding * 2);

      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function buildFrontierPoint(strategyName: string, portfolioReturn: number, portfolioVolatility: number) {
  return {
    label: strategyName,
    return: portfolioReturn,
    volatility: portfolioVolatility,
  };
}

const covarianceMatrix = buildCovarianceMatrix(nifty50Universe, correlations);
const strategyAnalytics = strategies.map((strategy) =>
  buildStrategyAnalytics(nifty50Universe, covarianceMatrix, strategy),
);
const featuredStrategy = strategyAnalytics.find((strategy) => strategy.id === "maximum-sharpe")!;

const frontierPoints: FrontierPoint[] = [
  {
    label: "Low risk",
    return: 0.096,
    volatility: 0.126,
  },
  ...strategyAnalytics.map((strategy) =>
    buildFrontierPoint(strategy.name, strategy.portfolioReturn, strategy.portfolioVolatility),
  ),
  {
    label: "High return",
    return: 0.131,
    volatility: 0.204,
  },
];

const backtestNavValues = featuredStrategy.path.map((point) => point.nav);
const backtestLinePath = buildSvgPath(backtestNavValues, 420, 190, 18, true);
const frontierReturnValues = frontierPoints.map((point) => point.return);
const frontierVolatilityValues = frontierPoints.map((point) => point.volatility);

const portfolioInputs = [
  {
    label: "NIFTY 50 universe",
    value: `${nifty50Universe.length} representative large-cap stocks from the benchmark universe`,
  },
  {
    label: "Expected returns",
    value: "Mock annualised return estimates from 9.40% to 12.60%",
  },
  {
    label: "Volatility",
    value: "Mock annualised volatility estimates from 15.20% to 22.60%",
  },
  {
    label: "Correlation matrix",
    value: `${nifty50Universe.length} x ${nifty50Universe.length} cross-asset correlation set`,
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

function FrontierChart() {
  return (
    <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/80 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Efficient Frontier</p>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            Mock frontier built from simple NIFTY covariance assumptions and four baseline
            optimisation strategies.
          </p>
        </div>
        <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs tracking-[0.2em] text-cyan-200 uppercase">
          Mock
        </span>
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
        <svg viewBox="0 0 420 220" className="h-auto w-full">
          <path d="M 22 188 L 398 188" stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
          <path d="M 22 24 L 22 188" stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
          <path
            d={frontierPoints
              .map((point, index) => {
                const x =
                  40 +
                  ((point.volatility - Math.min(...frontierVolatilityValues)) /
                    ((Math.max(...frontierVolatilityValues) -
                      Math.min(...frontierVolatilityValues)) ||
                      1)) *
                    340;
                const y =
                  178 -
                  ((point.return - Math.min(...frontierReturnValues)) /
                    ((Math.max(...frontierReturnValues) - Math.min(...frontierReturnValues)) || 1)) *
                    130;

                return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(103,232,249,0.9)"
            strokeWidth="3"
          />
          {frontierPoints.map((point) => {
            const x =
              40 +
              ((point.volatility - Math.min(...frontierVolatilityValues)) /
                ((Math.max(...frontierVolatilityValues) - Math.min(...frontierVolatilityValues)) ||
                  1)) *
                340;
            const y =
              178 -
              ((point.return - Math.min(...frontierReturnValues)) /
                ((Math.max(...frontierReturnValues) - Math.min(...frontierReturnValues)) || 1)) *
                130;

            return (
              <g key={point.label}>
                <circle cx={x} cy={y} r="5.5" fill="rgb(103,232,249)" />
                <text x={x + 8} y={y - 8} fill="rgb(226,232,240)" fontSize="11">
                  {point.label}
                </text>
              </g>
            );
          })}
          <text x="300" y="208" fill="rgba(148,163,184,0.8)" fontSize="11">
            Volatility
          </text>
          <text x="10" y="18" fill="rgba(148,163,184,0.8)" fontSize="11">
            Return
          </text>
        </svg>
      </div>
    </div>
  );
}

function AllocationChart() {
  return (
    <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/80 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Portfolio Allocation</p>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            Mock maximum-Sharpe allocation across the selected NIFTY 50 basket, prepared for
            future live portfolio and option overlay views.
          </p>
        </div>
        <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs tracking-[0.2em] text-cyan-200 uppercase">
          Mock
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-[conic-gradient(from_110deg,_rgba(103,232,249,0.95)_0_24%,_rgba(34,211,238,0.8)_24%_40%,_rgba(56,189,248,0.7)_40%_63%,_rgba(14,165,233,0.6)_63%_74%,_rgba(125,211,252,0.75)_74%_100%)]">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-slate-950 text-center">
            <div>
              <div className="text-xs tracking-[0.22em] text-slate-500 uppercase">Strategy</div>
              <div className="mt-2 text-sm font-semibold text-white">Max Sharpe</div>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {featuredStrategy.weights.map((weight, index) => (
            <div
              key={nifty50Universe[index].symbol}
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {nifty50Universe[index].symbol}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{nifty50Universe[index].sector}</p>
                </div>
                <p className="text-sm font-semibold text-cyan-200">{formatPercent(weight)}</p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-cyan-300"
                  style={{ width: `${weight * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BacktestPlaceholder() {
  return (
    <div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/80 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Historical Backtest Placeholder</p>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            A simple NAV path from mock monthly returns. This section is intentionally structured
            to accept future historical NSE equity and derivative overlays.
          </p>
        </div>
        <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs tracking-[0.2em] text-cyan-200 uppercase">
          Placeholder
        </span>
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
        <svg viewBox="0 0 420 190" className="h-auto w-full">
          <path d="M 18 164 L 402 164" stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
          <path d={backtestLinePath} fill="none" stroke="rgba(103,232,249,0.95)" strokeWidth="3" />
          {featuredStrategy.path.map((point, index) => {
            const minimum = Math.min(...backtestNavValues);
            const maximum = Math.max(...backtestNavValues);
            const x = 18 + (index / Math.max(featuredStrategy.path.length - 1, 1)) * 384;
            const y =
              172 -
              ((point.nav - minimum) / ((maximum - minimum) || 1)) * 136;

            return <circle key={point.month} cx={x} cy={y} r="4" fill="rgb(103,232,249)" />;
          })}
        </svg>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Final NAV</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {(featuredStrategy.path.at(-1)?.nav ?? 1).toFixed(3)}x
          </p>
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Max Drawdown</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {formatPercent(featuredStrategy.drawdown)}
          </p>
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Data Mode</p>
          <p className="mt-2 text-lg font-semibold text-white">Mock NIFTY</p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio Management"
        title="NIFTY 50 portfolio construction with strategy views and future-ready market data architecture"
        description="Build, analyse and optimise portfolios from the NIFTY equity universe."
      />

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">Overview</p>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                Build, analyse and optimise portfolios from the NIFTY equity universe. The
                current module uses mock NIFTY 50 data, simple covariance assumptions, and
                institutional-style portfolio cards so we can plug in real NSE equity and option
                chain data later without redesigning the product surface.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-cyan-300/15 bg-slate-950/80 p-5">
                  <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Universe</p>
                  <p className="mt-3 text-2xl font-semibold text-white">NIFTY 50</p>
                </div>
                <div className="rounded-[1.25rem] border border-cyan-300/15 bg-slate-950/80 p-5">
                  <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Strategies</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{strategies.length}</p>
                </div>
                <div className="rounded-[1.25rem] border border-cyan-300/15 bg-slate-950/80 p-5">
                  <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Data Mode</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Mock</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                NIFTY 50 Universe
              </p>
              <div className="mt-6 grid gap-4">
                {nifty50Universe.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{stock.symbol}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {stock.name} | {stock.sector}
                        </p>
                      </div>
                      <div className="text-right text-xs text-slate-400">
                        <div>Ret {formatPercent(stock.expectedReturn)}</div>
                        <div className="mt-1">Vol {formatPercent(stock.volatility)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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
                Strategy Metrics
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {strategyAnalytics.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5"
                  >
                    <p className="text-sm font-semibold text-white">{strategy.name}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{strategy.summary}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div>
                        <p className="text-[11px] tracking-[0.2em] text-slate-500 uppercase">
                          Return
                        </p>
                        <p className="mt-1 text-sm font-semibold text-cyan-200">
                          {formatPercent(strategy.portfolioReturn)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.2em] text-slate-500 uppercase">
                          Volatility
                        </p>
                        <p className="mt-1 text-sm font-semibold text-cyan-200">
                          {formatPercent(strategy.portfolioVolatility)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.2em] text-slate-500 uppercase">
                          Sharpe
                        </p>
                        <p className="mt-1 text-sm font-semibold text-cyan-200">
                          {strategy.sharpe.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <FrontierChart />
            <AllocationChart />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Correlation Matrix
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-3 text-left text-sm text-slate-300">
                  <thead>
                    <tr>
                      <th className="text-slate-500">Stock</th>
                      {nifty50Universe.map((stock) => (
                        <th key={stock.symbol} className="text-slate-500">
                          {stock.symbol}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {nifty50Universe.map((stock, rowIndex) => (
                      <tr key={stock.symbol}>
                        <td className="font-medium text-white">{stock.symbol}</td>
                        {correlations[rowIndex].map((value, columnIndex) => (
                          <td
                            key={`${stock.symbol}-${nifty50Universe[columnIndex].symbol}`}
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

            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-slate-950/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Strategy Allocation Detail
              </p>
              <div className="mt-6 grid gap-4">
                {strategyAnalytics.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{strategy.name}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Drawdown {formatPercent(strategy.drawdown)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-cyan-200">
                        {formatCurrency(investmentAmount)}
                      </p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {strategy.weights.map((weight, index) => (
                        <div key={`${strategy.id}-${nifty50Universe[index].symbol}`}>
                          <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                            <span>{nifty50Universe[index].symbol}</span>
                            <span>{formatPercent(weight)}</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white/10">
                            <div
                              className="h-2 rounded-full bg-cyan-300"
                              style={{ width: `${weight * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <BacktestPlaceholder />

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm tracking-[0.22em] text-slate-500 uppercase">
                Future Data Architecture
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-300">
                The UI is deliberately separated from the current mock analytics so we can replace
                these assumptions with live NSE cash-market and option-chain feeds without changing
                the page structure or design language.
              </p>
              <div className="mt-6 grid gap-4">
                {futureIntegrationLayers.map((layer) => (
                  <div
                    key={layer.title}
                    className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5"
                  >
                    <p className="text-sm font-semibold text-white">{layer.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{layer.summary}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/5 p-5">
                <p className="text-xs tracking-[0.22em] text-cyan-200 uppercase">Next Step</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Add typed repositories for constituent data, historical returns, realised
                  volatility, and NSE option chain snapshots, then route those into the same
                  portfolio cards and chart components.
                </p>
              </div>
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
