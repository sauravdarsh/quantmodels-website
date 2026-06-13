export const stats = [
  { label: "Institutions onboarded", value: "120+" },
  { label: "Derivative scenarios daily", value: "8.5M" },
  { label: "Latency for pricing refresh", value: "<60ms" },
];

export const models = [
  {
    name: "Heston Stochastic Volatility",
    href: "/models/heston",
    summary:
      "Calibrate stochastic volatility surfaces with a workflow designed for institutional derivatives desks.",
    bullets: [
      "Fast parameter estimation for liquid and bespoke structures",
      "Scenario testing across volatility smiles and forward curves",
      "Internal Monte Carlo simulation directly inside QuantModels.ai",
    ],
  },
  {
    name: "Black-Scholes",
    href: "/models/black-scholes",
    summary:
      "Reliable vanilla pricing, Greeks, and hedging analytics packaged in a clean execution layer.",
    bullets: [
      "Option pricing and sensitivity ladders",
      "Trade blotter integrations for execution support",
      "Structured outputs for downstream portfolio systems",
    ],
  },
  {
    name: "Monte Carlo Pricing",
    href: "/models/monte-carlo",
    summary:
      "Pathwise pricing and simulation infrastructure for scenario-driven valuation across structured products and exotics.",
    bullets: [
      "Stochastic path generation across configurable horizons",
      "Flexible payoff modeling for simulation-based pricing",
      "Stress-ready outputs for downstream portfolio analysis",
    ],
  },
  {
    name: "Portfolio Management",
    href: "/models/portfolio-management",
    summary:
      "Construct and optimise NIFTY equity portfolios with mock allocations, diversification analytics, and institutional-style reporting.",
    bullets: [
      "Coverage across NIFTY 50, Next 50, NIFTY 100, and sector universes",
      "Simple portfolio return, volatility, Sharpe ratio, and drawdown analytics",
      "Placeholder workflows for efficient frontier, allocation, and risk contribution views",
    ],
  },
  {
    name: "Risk Analytics",
    href: "/models",
    summary:
      "Centralize exposure, stress, and liquidity diagnostics for portfolio managers and risk officers.",
    bullets: [
      "Portfolio VaR and stress-testing views",
      "Factor decomposition and concentration monitoring",
      "Committee-ready dashboards for oversight teams",
    ],
  },
  {
    name: "CIR++ Interest Rate Model",
    href: "/models/cir-plus-plus",
    summary:
      "A shifted short-rate framework for interest-rate simulation and curve-consistent fixed-income pricing workflows.",
    bullets: [
      "Extends Cox-Ingersoll-Ross with a deterministic shift to fit the initial yield curve",
      "Supports zero-coupon bond pricing and interest-rate derivative analytics",
      "Useful for scenario generation, calibration, and term-structure aware simulation",
    ],
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    cadence: "/month",
    summary: "For early exploration and technical evaluation.",
    features: [
      "Core model sandbox",
      "Sample market datasets",
      "Single workspace access",
    ],
    featured: false,
    cta: "Start Free",
  },
  {
    name: "Professional",
    price: "$29",
    cadence: "/month",
    summary: "For independent quants and lean investment teams.",
    features: [
      "Full pricing library",
      "Saved scenarios and exports",
      "Priority email support",
    ],
    featured: true,
    cta: "Choose Professional",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    summary: "For regulated firms with workflow, compliance, and scale needs.",
    features: [
      "Private deployment options",
      "SSO, controls, and governance workflows",
      "Dedicated onboarding and SLAs",
    ],
    featured: false,
    cta: "Talk to Sales",
  },
];

export const aboutPoints = [
  "Built for asset managers, hedge funds, treasury teams, and institutional advisors.",
  "Combines transparent model assumptions with a polished delivery layer for high-trust decisions.",
  "Designed to move from exploratory pricing to operational risk workflows without changing tools.",
];

export const contactDetails = [
  { label: "General", value: "research@quantmodels.ai" },
  { label: "Sales", value: "enterprise@quantmodels.ai" },
  { label: "Coverage", value: "New York, London, Singapore" },
];

export const pricingLibraryCategories = [
  {
    name: "Black-Scholes",
    summary:
      "Closed-form analytics for vanilla options, benchmark pricing, and hedging workflows.",
  },
  {
    name: "Heston stochastic volatility",
    summary:
      "Stochastic-volatility pricing and calibration routines for richer surface dynamics.",
  },
  {
    name: "Monte Carlo simulation",
    summary:
      "Path-based simulation engines for scenario generation, exotic payoffs, and stress studies.",
  },
  {
    name: "Greeks and sensitivities",
    summary:
      "Delta, gamma, vega, theta, and scenario-based sensitivities for risk oversight.",
  },
  {
    name: "Calibration tools",
    summary:
      "Market-fit utilities to align models with observed implied volatility surfaces and term structures.",
  },
];

export const pricingLibraryWorkflow = [
  "Market Data",
  "Model Calibration",
  "Simulation",
  "Pricing",
  "Risk Metrics",
];

export const productArchitecture = [
  {
    domain: "quantmodels.ai",
    label: "Professional SaaS website",
    summary:
      "The main institutional interface for product discovery, simulator access, pricing workflows, and client engagement.",
  },
  {
    domain: "Internal simulators",
    label: "Integrated quant pricing engine",
    summary:
      "Heston, CIR++, Black-Scholes, and Monte Carlo simulation tools now run directly inside the QuantModels.ai product experience.",
  },
];
