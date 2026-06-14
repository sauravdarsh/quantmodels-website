import type { QuizQuestion } from "@/components/learning-quiz";

export type LearningTopic =
  | "black-scholes"
  | "heston"
  | "cir-plus-plus"
  | "monte-carlo"
  | "portfolio-optimization"
  | "var-expected-shortfall";

export type LearningDifficulty = "beginner" | "intermediate" | "advanced";

export type GeneratedQuestionRequest = {
  count: number;
  difficulty: LearningDifficulty;
  topic: LearningTopic;
};

type QuestionBuilder = {
  answer: number;
  explanation: string;
  options: [string, string, string, string];
  prompt: string;
};

function buildQuestion({
  answer,
  explanation,
  options,
  prompt,
}: QuestionBuilder): QuizQuestion {
  return {
    answer,
    explanation,
    options,
    prompt,
  };
}

export const learningTopicLabels: Record<LearningTopic, string> = {
  "black-scholes": "Black-Scholes",
  heston: "Heston",
  "cir-plus-plus": "CIR++",
  "monte-carlo": "Monte Carlo",
  "portfolio-optimization": "Portfolio Optimization",
  "var-expected-shortfall": "VaR and Expected Shortfall",
};

export const staticQuestionBank: Record<LearningTopic, QuizQuestion[]> = {
  "black-scholes": [
    buildQuestion({
      prompt: "What is the primary market setting assumed by the Black-Scholes model?",
      options: [
        "A European-style option on an underlying with lognormal price dynamics",
        "A bond portfolio with default intensity",
        "A stochastic volatility model with random jumps",
        "A multi-asset basket with discrete rebalancing costs",
      ],
      answer: 0,
      explanation:
        "Black-Scholes assumes a European exercise feature and a lognormal diffusion for the underlying, which allows the pricing PDE to be solved in closed form.",
    }),
    buildQuestion({
      prompt: "Which input tends to increase both call and put option value in Black-Scholes?",
      options: ["Dividend yield", "Volatility", "Lower maturity", "Lower strike"],
      answer: 1,
      explanation:
        "Higher volatility increases uncertainty about terminal price outcomes, which raises the value of optionality for both calls and puts.",
    }),
    buildQuestion({
      prompt: "Why is Black-Scholes still used heavily in practice?",
      options: [
        "It perfectly explains every volatility smile",
        "It provides a fast benchmark for pricing and Greeks",
        "It removes all hedging error",
        "It only works for American options",
      ],
      answer: 1,
      explanation:
        "Even when desks use richer models, Black-Scholes remains the standard benchmark for vanilla pricing, Greeks, and implied volatility quoting.",
    }),
    buildQuestion({
      prompt: "What does delta represent in the Black-Scholes framework?",
      options: [
        "Sensitivity to volatility changes",
        "Sensitivity to passage of time",
        "Sensitivity of option value to the underlying price",
        "Sensitivity to correlation changes",
      ],
      answer: 2,
      explanation:
        "Delta is the first derivative of option price with respect to the underlying asset price and is central to dynamic hedging.",
    }),
    buildQuestion({
      prompt: "What role does the risk-free rate play in Black-Scholes?",
      options: [
        "It determines the strike directly",
        "It discounts the strike and affects the drift in the risk-neutral measure",
        "It eliminates volatility",
        "It only matters for puts",
      ],
      answer: 1,
      explanation:
        "Under risk-neutral pricing, the risk-free rate enters through discounting and the drift assumption for the asset in the pricing formula.",
    }),
    buildQuestion({
      prompt: "Why does Black-Scholes usually misfit market smiles?",
      options: [
        "Because volatility is assumed constant",
        "Because it includes too many stochastic factors",
        "Because it is designed for American exercise only",
        "Because it assumes negative rates",
      ],
      answer: 0,
      explanation:
        "Real markets show strike- and maturity-dependent implied volatilities, while Black-Scholes treats volatility as a single constant input.",
    }),
    buildQuestion({
      prompt: "What does gamma measure?",
      options: [
        "The rate of change of delta with respect to the underlying",
        "The sensitivity to interest rates only",
        "The sensitivity to volatility",
        "The second derivative with respect to time",
      ],
      answer: 0,
      explanation:
        "Gamma captures curvature in the price with respect to the underlying and indicates how fast delta changes as spot moves.",
    }),
    buildQuestion({
      prompt: "Which assumption is least realistic in real trading conditions?",
      options: [
        "Continuous trading without transaction costs",
        "The existence of a quoted underlying spot price",
        "A positive strike price",
        "A finite maturity date",
      ],
      answer: 0,
      explanation:
        "Continuous rebalancing without costs is mathematically convenient but unrealistic, which is one reason practical hedging differs from the idealized model.",
    }),
    buildQuestion({
      prompt: "What is implied volatility in a Black-Scholes context?",
      options: [
        "The historical realized volatility over the last year",
        "The volatility number that makes the model match the market price",
        "A forecast from macroeconomic data only",
        "A constant supplied by regulators",
      ],
      answer: 1,
      explanation:
        "Implied volatility is backed out from the observed option price by solving the Black-Scholes formula in reverse for sigma.",
    }),
    buildQuestion({
      prompt: "Why is put-call parity useful alongside Black-Scholes?",
      options: [
        "It connects prices of related European calls and puts",
        "It makes American options closed form",
        "It removes the need for discounting",
        "It determines the spot price from volatility",
      ],
      answer: 0,
      explanation:
        "Put-call parity is a no-arbitrage relationship that links European call and put prices with the same strike and maturity.",
    }),
  ],
  heston: [
    buildQuestion({
      prompt: "What key feature does the Heston model add beyond Black-Scholes?",
      options: [
        "Deterministic interest-rate shifts only",
        "A stochastic variance process",
        "Zero transaction costs",
        "Guaranteed closed-form American exercise",
      ],
      answer: 1,
      explanation:
        "Heston extends constant-volatility modeling by allowing variance to evolve randomly over time.",
    }),
    buildQuestion({
      prompt: "Why does correlation between price and variance matter in Heston?",
      options: [
        "It has no impact on option prices",
        "It helps shape skew and smile behavior",
        "It removes randomness from volatility",
        "It guarantees variance stays constant",
      ],
      answer: 1,
      explanation:
        "The correlation between the asset shock and the variance shock is a major driver of implied skew in the model.",
    }),
    buildQuestion({
      prompt: "Where is Heston especially useful?",
      options: [
        "For explaining volatility smiles in equity options",
        "Only for bond coupon amortization",
        "For eliminating numerical methods entirely",
        "For pricing without any calibration step",
      ],
      answer: 0,
      explanation:
        "Heston is widely used because it can represent smile and skew effects that Black-Scholes misses.",
    }),
    buildQuestion({
      prompt: "What does the parameter kappa represent?",
      options: [
        "Mean reversion speed of variance",
        "Dividend payout speed",
        "The strike scaling factor",
        "The number of Monte Carlo paths",
      ],
      answer: 0,
      explanation:
        "Kappa controls how quickly variance reverts toward its long-run mean theta.",
    }),
    buildQuestion({
      prompt: "What is theta in the Heston variance process?",
      options: [
        "Option time decay",
        "Long-run average variance level",
        "Instantaneous spot return",
        "Portfolio Sharpe ratio target",
      ],
      answer: 1,
      explanation:
        "In Heston notation, theta denotes the long-run mean to which variance mean-reverts.",
    }),
    buildQuestion({
      prompt: "Why is sigma_v important?",
      options: [
        "It measures the volatility of variance itself",
        "It is the risk-free rate",
        "It fixes the maturity of the option",
        "It controls only dividends",
      ],
      answer: 0,
      explanation:
        "Sigma_v governs how noisy the variance process is, often called vol-of-vol.",
    }),
    buildQuestion({
      prompt: "What practical issue often arises in Heston implementations?",
      options: [
        "Variance may need careful numerical treatment to remain non-negative",
        "The model cannot use correlation at all",
        "The asset price must remain constant",
        "The model only works in discrete time without calibration",
      ],
      answer: 0,
      explanation:
        "Variance processes need numerical care because naive discretization can produce unstable or negative values without appropriate handling.",
    }),
    buildQuestion({
      prompt: "Why do practitioners calibrate Heston to an implied volatility surface?",
      options: [
        "To make the model consistent with observed option prices",
        "To remove dependence on maturity",
        "To avoid using spot prices",
        "To convert it into a short-rate model",
      ],
      answer: 0,
      explanation:
        "Calibration tunes the parameters so the model reproduces the market's smile and term-structure information as closely as possible.",
    }),
    buildQuestion({
      prompt: "What does rho less than zero typically imply for equity options?",
      options: [
        "Negative skew consistent with leverage-style effects",
        "Perfectly flat implied volatility curves",
        "Zero variance of the underlying",
        "A deterministic payoff",
      ],
      answer: 0,
      explanation:
        "Negative spot-vol correlation is often associated with equity skew, where implied vol tends to rise as spot falls.",
    }),
    buildQuestion({
      prompt: "Why is Heston often paired with Monte Carlo or Fourier methods?",
      options: [
        "Because richer stochastic-volatility models usually need numerical techniques",
        "Because the model cannot produce option prices at all",
        "Because correlation forbids closed-form expressions",
        "Because it is only a pedagogical toy model",
      ],
      answer: 0,
      explanation:
        "Although Heston has semi-analytic features, practical pricing and risk often still rely on numerical approaches such as Fourier inversion or simulation.",
    }),
  ],
  "cir-plus-plus": [
    buildQuestion({
      prompt: "What does the deterministic shift in CIR++ help achieve?",
      options: [
        "A perfect equity volatility smile",
        "A fit to the initial yield curve",
        "Zero correlation across rates",
        "American exercise valuation",
      ],
      answer: 1,
      explanation:
        "The deterministic shift lets CIR++ better fit the initial observed term structure while preserving stochastic rate dynamics.",
    }),
    buildQuestion({
      prompt: "What is the underlying core of CIR++?",
      options: [
        "A jump-diffusion equity model",
        "The Cox-Ingersoll-Ross short-rate process",
        "A static factor covariance matrix",
        "A pure Monte Carlo control variate",
      ],
      answer: 1,
      explanation:
        "CIR++ keeps the original CIR short-rate engine and adds a deterministic shift term.",
    }),
    buildQuestion({
      prompt: "Why is CIR-style modeling attractive for rates?",
      options: [
        "It is designed to handle short-rate dynamics and mean reversion",
        "It only prices equity options",
        "It guarantees negative rates never appear in any shifted model",
        "It avoids calibration completely",
      ],
      answer: 0,
      explanation:
        "CIR-based frameworks are built to describe mean-reverting short-rate behavior for fixed-income applications.",
    }),
    buildQuestion({
      prompt: "What does phi(t) typically represent in CIR++?",
      options: [
        "A deterministic shift term",
        "The option gamma",
        "A Monte Carlo error correction",
        "A covariance matrix diagonal",
      ],
      answer: 0,
      explanation:
        "Phi(t) is the deterministic adjustment layered on top of the CIR process to fit the observed initial curve.",
    }),
    buildQuestion({
      prompt: "What is x_t in the relation r_t = x_t + phi(t)?",
      options: [
        "The stochastic CIR state variable",
        "The market-implied volatility smile",
        "The bond coupon schedule",
        "A constant spread to equity dividends",
      ],
      answer: 0,
      explanation:
        "The x_t term is the stochastic short-rate factor governed by the CIR dynamics, while phi(t) is deterministic.",
    }),
    buildQuestion({
      prompt: "What is a typical use case for CIR++?",
      options: [
        "Interest-rate scenario generation and fixed-income derivative pricing",
        "Single-stock momentum backtesting only",
        "Commodity storage optimization only",
        "Cross-sectional equity clustering only",
      ],
      answer: 0,
      explanation:
        "CIR++ is most natural in interest-rate modeling, especially where curve consistency matters.",
    }),
    buildQuestion({
      prompt: "Why is curve fitting important in rate models?",
      options: [
        "Because pricing should start from the market term structure that actually prevails today",
        "Because rates never change over time",
        "Because calibration is optional in all fixed-income models",
        "Because mean reversion removes the need for market data",
      ],
      answer: 0,
      explanation:
        "If the model cannot reproduce today’s curve, it may misprice instruments even before any scenario evolution begins.",
    }),
    buildQuestion({
      prompt: "How does mean reversion affect a short-rate model?",
      options: [
        "It pulls the process toward a long-run level over time",
        "It guarantees zero volatility",
        "It fixes all bond prices permanently",
        "It removes the need for discounting",
      ],
      answer: 0,
      explanation:
        "Mean reversion keeps the short rate from drifting arbitrarily far away and is a central feature of many rate models.",
    }),
    buildQuestion({
      prompt: "Which statement best describes CIR++ compared with plain CIR?",
      options: [
        "It adds a deterministic shift to improve fit to the initial curve",
        "It removes stochasticity from rates entirely",
        "It changes the asset class from rates to equities",
        "It replaces the short rate with a fixed discount factor",
      ],
      answer: 0,
      explanation:
        "The '++' enhancement is exactly the deterministic shift that improves practical calibration flexibility.",
    }),
    buildQuestion({
      prompt: "Why might desks still need numerical methods with CIR++?",
      options: [
        "Because scenario generation and derivative pricing often remain computational tasks",
        "Because the model cannot represent rates at all",
        "Because it only works for equity smiles",
        "Because it forbids curve construction",
      ],
      answer: 0,
      explanation:
        "Even with analytical structure, many real workflows still require numerical implementation, scenario generation, or calibration routines.",
    }),
  ],
  "monte-carlo": [
    buildQuestion({
      prompt: "Why is Monte Carlo especially useful in quantitative finance?",
      options: [
        "It only works for closed-form payoffs",
        "It can approximate values for complex path-dependent problems",
        "It removes randomness from pricing",
        "It always outperforms analytic formulas for vanilla options",
      ],
      answer: 1,
      explanation:
        "Monte Carlo is strong when no clean closed form exists, especially for path-dependent or high-dimensional pricing problems.",
    }),
    buildQuestion({
      prompt: "What usually improves Monte Carlo estimate stability?",
      options: [
        "Fewer paths",
        "More simulation paths or variance-reduction methods",
        "Ignoring discounting",
        "Removing stochastic shocks",
      ],
      answer: 1,
      explanation:
        "More paths reduce sampling error, while variance-reduction methods improve efficiency.",
    }),
    buildQuestion({
      prompt: "What is a practical drawback of Monte Carlo?",
      options: [
        "It cannot model uncertainty",
        "It can be computationally expensive",
        "It cannot produce scenario outputs",
        "It only works for interest rates",
      ],
      answer: 1,
      explanation:
        "Monte Carlo is flexible but can become expensive for large path counts, nested simulation, or fine time discretization.",
    }),
    buildQuestion({
      prompt: "What does each simulated path represent?",
      options: [
        "One possible evolution of risk factors over time",
        "A guaranteed realized market trajectory",
        "A deterministic hedge portfolio",
        "A single closed-form derivative",
      ],
      answer: 0,
      explanation:
        "Each path is one hypothetical scenario for the future behavior of the modeled state variables.",
    }),
    buildQuestion({
      prompt: "Why is discounting applied to Monte Carlo payoffs?",
      options: [
        "To convert expected future payoffs into present value terms",
        "To increase variance artificially",
        "To remove dependence on rates",
        "To match American exercise rules",
      ],
      answer: 0,
      explanation:
        "Risk-neutral pricing discounts the expected payoff back to present value using the appropriate financing rate.",
    }),
    buildQuestion({
      prompt: "What is a control variate?",
      options: [
        "A variance-reduction technique using a related quantity with known value",
        "A method for deleting paths randomly",
        "A way to remove drift from the model permanently",
        "A short-rate calibration factor",
      ],
      answer: 0,
      explanation:
        "Control variates use a correlated quantity with a known expectation to reduce estimation noise.",
    }),
    buildQuestion({
      prompt: "Why is Monte Carlo useful for path-dependent products?",
      options: [
        "Because it can track the full path rather than only the terminal state",
        "Because path dependence makes formulas shorter",
        "Because it eliminates time discretization",
        "Because it avoids generating random numbers",
      ],
      answer: 0,
      explanation:
        "Many structured payoffs depend on the entire history of a process, and Monte Carlo naturally records that history.",
    }),
    buildQuestion({
      prompt: "What is the role of random variables Z in simulation formulas?",
      options: [
        "They inject stochastic shocks consistent with the assumed model",
        "They remove volatility from the system",
        "They set the maturity date",
        "They only appear in fixed-income models",
      ],
      answer: 0,
      explanation:
        "Gaussian shocks are commonly used to represent the random increments of Brownian-driven processes.",
    }),
    buildQuestion({
      prompt: "How does standard error usually behave as path count N increases?",
      options: [
        "It typically decreases at a rate proportional to 1/sqrt(N)",
        "It grows linearly with N",
        "It stays exactly constant",
        "It becomes negative",
      ],
      answer: 0,
      explanation:
        "Monte Carlo convergence is slow compared with some other methods, typically scaling with the square root of the path count.",
    }),
    buildQuestion({
      prompt: "Why do quants sometimes prefer quasi-random sequences?",
      options: [
        "They can improve sampling efficiency relative to plain pseudo-random draws",
        "They eliminate the need for discounting",
        "They turn every model into Black-Scholes",
        "They guarantee exact prices in finite samples",
      ],
      answer: 0,
      explanation:
        "Low-discrepancy sequences can improve coverage of the sample space and sometimes accelerate convergence in practice.",
    }),
  ],
  "portfolio-optimization": [
    buildQuestion({
      prompt: "Why is correlation important in portfolio optimization?",
      options: [
        "Because it determines option exercise style",
        "Because diversification depends on how assets move together",
        "Because it eliminates volatility",
        "Because it fixes expected return automatically",
      ],
      answer: 1,
      explanation:
        "Diversification depends not just on individual risks but on how assets co-move.",
    }),
    buildQuestion({
      prompt: "What does the Sharpe ratio measure?",
      options: [
        "Total return only",
        "Excess return per unit of risk",
        "Maximum possible leverage",
        "Drawdown persistence only",
      ],
      answer: 1,
      explanation:
        "The Sharpe ratio compares return above the risk-free rate to volatility, giving a simple risk-adjusted metric.",
    }),
    buildQuestion({
      prompt: "What is a practical use of optimization methods like minimum variance or risk parity?",
      options: [
        "Constructing systematic allocation rules",
        "Replacing market data entirely",
        "Guaranteeing positive returns",
        "Removing all estimation error",
      ],
      answer: 0,
      explanation:
        "Optimization methods provide disciplined ways to turn capital-market views into actual weights.",
    }),
    buildQuestion({
      prompt: "What does the covariance matrix contribute to portfolio optimization?",
      options: [
        "It summarizes joint asset risk interactions",
        "It fixes expected returns to a constant",
        "It selects the risk-free rate automatically",
        "It replaces portfolio weights",
      ],
      answer: 0,
      explanation:
        "The covariance matrix captures both individual asset volatility and pairwise co-movement, which drive portfolio variance.",
    }),
    buildQuestion({
      prompt: "What is the objective of a minimum-variance portfolio?",
      options: [
        "Maximize turnover",
        "Minimize total portfolio variance subject to constraints",
        "Guarantee the highest return",
        "Match a bond duration target only",
      ],
      answer: 1,
      explanation:
        "A minimum-variance portfolio focuses on reducing overall risk, typically subject to budget or long-only constraints.",
    }),
    buildQuestion({
      prompt: "What does an equal-weight portfolio do?",
      options: [
        "Assign the same capital weight to each selected asset",
        "Match each asset's volatility exactly",
        "Allocate only to the highest-return asset",
        "Use short selling to flatten drawdown",
      ],
      answer: 0,
      explanation:
        "Equal weight is a simple baseline that avoids estimation-heavy optimization while keeping diversification intuitive.",
    }),
    buildQuestion({
      prompt: "Why might a maximum-Sharpe portfolio be unstable in practice?",
      options: [
        "It can be sensitive to small errors in expected return estimates",
        "It does not use any returns information",
        "It forbids diversification",
        "It ignores covariance completely",
      ],
      answer: 0,
      explanation:
        "Expected returns are hard to estimate reliably, so Sharpe-maximizing solutions can swing materially when those estimates change.",
    }),
    buildQuestion({
      prompt: "What is risk parity trying to balance?",
      options: [
        "Risk contributions rather than just capital weights",
        "Only dividend payouts",
        "Only sector exposures by headcount",
        "Only transaction costs",
      ],
      answer: 0,
      explanation:
        "Risk parity allocates so that each asset or bucket contributes a more even share of portfolio risk.",
    }),
    buildQuestion({
      prompt: "Why do constraints matter in real portfolio construction?",
      options: [
        "Because mandates, liquidity, and regulation limit feasible allocations",
        "Because they remove all uncertainty",
        "Because optimization without constraints is always superior",
        "Because they fix covariance estimation automatically",
      ],
      answer: 0,
      explanation:
        "Real portfolios must respect position limits, leverage rules, liquidity concerns, and governance constraints.",
    }),
    buildQuestion({
      prompt: "What does the efficient frontier represent?",
      options: [
        "The set of portfolios delivering the highest expected return for each risk level",
        "Only one maximum-return portfolio",
        "A list of all assets sorted alphabetically",
        "A curve showing option implied volatility only",
      ],
      answer: 0,
      explanation:
        "The efficient frontier summarizes optimal risk-return trade-offs under the model’s assumptions and constraints.",
    }),
  ],
  "var-expected-shortfall": [
    buildQuestion({
      prompt: "What does Value at Risk estimate?",
      options: [
        "A threshold loss level not expected to be exceeded at a chosen confidence over a horizon",
        "The exact worst possible loss in all scenarios",
        "The average gain in the right tail",
        "The option delta of a portfolio",
      ],
      answer: 0,
      explanation:
        "VaR summarizes a loss quantile over a chosen horizon and confidence level, not the absolute worst conceivable loss.",
    }),
    buildQuestion({
      prompt: "What does Expected Shortfall measure?",
      options: [
        "The average loss conditional on losses beyond the VaR cutoff",
        "Only the best-case scenario",
        "The realized volatility of a bond",
        "The drift term in Black-Scholes",
      ],
      answer: 0,
      explanation:
        "Expected Shortfall looks deeper into the loss tail by averaging outcomes that are worse than the VaR threshold.",
    }),
    buildQuestion({
      prompt: "Why is Expected Shortfall often preferred to VaR in tail-risk discussions?",
      options: [
        "Because it captures tail severity beyond the cutoff",
        "Because it ignores extreme losses",
        "Because it never needs simulation",
        "Because it is always smaller than VaR",
      ],
      answer: 0,
      explanation:
        "VaR tells you where the tail begins, but Expected Shortfall tells you how bad that tail is on average.",
    }),
    buildQuestion({
      prompt: "What does a 99% one-day VaR of INR 10 million mean?",
      options: [
        "There is a 1% chance losses exceed INR 10 million over one day under the model",
        "The maximum possible loss is INR 10 million",
        "The portfolio earns INR 10 million with 99% certainty",
        "Losses cannot occur on 99% of days",
      ],
      answer: 0,
      explanation:
        "The interpretation is model-based and probabilistic: only about 1% of days are expected to be worse than that threshold.",
    }),
    buildQuestion({
      prompt: "Which method can be used to estimate VaR?",
      options: [
        "Historical simulation, parametric methods, or Monte Carlo",
        "Only a bond duration formula",
        "Only implied volatility surfaces",
        "Only option theta calculations",
      ],
      answer: 0,
      explanation:
        "VaR can be estimated through multiple approaches depending on data availability, distribution assumptions, and model sophistication.",
    }),
    buildQuestion({
      prompt: "What is a weakness of VaR?",
      options: [
        "It does not describe how large losses can be once the threshold is breached",
        "It cannot be computed from returns data",
        "It always exceeds Expected Shortfall",
        "It is only valid for bonds",
      ],
      answer: 0,
      explanation:
        "VaR is a quantile, so it does not explain the magnitude of losses deeper in the tail.",
    }),
    buildQuestion({
      prompt: "Why do regulators and risk teams care about tail metrics?",
      options: [
        "Because severe but rare losses can threaten solvency and liquidity",
        "Because tail events are always impossible",
        "Because returns are normally distributed in all markets",
        "Because expected return is irrelevant",
      ],
      answer: 0,
      explanation:
        "Tail losses can create outsized damage, making downside-sensitive risk metrics important for governance and capital planning.",
    }),
    buildQuestion({
      prompt: "What is historical simulation VaR based on?",
      options: [
        "Reapplying actual past return moves to the current portfolio",
        "Ignoring the portfolio composition entirely",
        "A deterministic flat-loss assumption",
        "Only the current risk-free rate",
      ],
      answer: 0,
      explanation:
        "Historical simulation uses past observed market moves as scenarios for the current portfolio.",
    }),
    buildQuestion({
      prompt: "What is a parametric VaR assumption often made for simple portfolios?",
      options: [
        "Returns follow an approximate normal distribution",
        "Returns are always zero on average",
        "All assets are perfectly correlated",
        "The portfolio is riskless",
      ],
      answer: 0,
      explanation:
        "A common starting point is the variance-covariance VaR approach, which often assumes normally distributed returns.",
    }),
    buildQuestion({
      prompt: "How are VaR and stress testing different?",
      options: [
        "VaR is probabilistic while stress testing examines specified adverse scenarios",
        "They are exactly the same concept",
        "Stress testing ignores losses completely",
        "VaR only applies to derivatives and stress only to equities",
      ],
      answer: 0,
      explanation:
        "VaR estimates losses under a statistical confidence framework, whereas stress testing focuses on particular extreme scenarios or narratives.",
    }),
  ],
};

const generatedQuestionTemplates: Record<
  LearningTopic,
  Record<LearningDifficulty, QuizQuestion[]>
> = {
  "black-scholes": {
    beginner: [
      buildQuestion({
        prompt: "In a beginner Black-Scholes setting, what is the most intuitive role of volatility?",
        options: [
          "It measures uncertainty in future price movement",
          "It sets the strike automatically",
          "It removes time value",
          "It only matters after expiry",
        ],
        answer: 0,
        explanation:
          "At a basic level, volatility captures how widely the underlying price may move, which directly affects option value.",
      }),
      buildQuestion({
        prompt: "Why does time to maturity matter for a vanilla option?",
        options: [
          "More time can increase optionality",
          "It only affects bond coupons",
          "It fixes the risk-free rate",
          "It always lowers option value",
        ],
        answer: 0,
        explanation:
          "More time usually gives the option more opportunity to finish in the money, especially when uncertainty matters.",
      }),
      buildQuestion({
        prompt: "What does Black-Scholes mainly help calculate?",
        options: [
          "Option price and sensitivities",
          "Accounting depreciation",
          "Tax liability",
          "Market microstructure latency",
        ],
        answer: 0,
        explanation:
          "Black-Scholes is a benchmark framework for pricing vanilla European options and computing Greeks.",
      }),
    ],
    intermediate: [
      buildQuestion({
        prompt: "Why is the risk-neutral measure central to Black-Scholes derivation?",
        options: [
          "It converts pricing into discounted expectation under no-arbitrage",
          "It removes the need for discounting",
          "It makes volatility stochastic",
          "It forces realized drift to equal zero",
        ],
        answer: 0,
        explanation:
          "The risk-neutral framework allows pricing by discounted expected payoff under a measure where the asset grows at the risk-free rate.",
      }),
      buildQuestion({
        prompt: "What does vega capture in a Black-Scholes risk report?",
        options: [
          "Sensitivity to volatility changes",
          "Sensitivity to maturity only",
          "Sensitivity to correlation",
          "Sensitivity to dividends only",
        ],
        answer: 0,
        explanation:
          "Vega measures how much the option price changes for a small shift in implied volatility.",
      }),
      buildQuestion({
        prompt: "Why is implied volatility often quoted instead of raw option premium?",
        options: [
          "It normalizes the price into a more comparable market language",
          "It eliminates arbitrage entirely",
          "It replaces the strike price",
          "It equals historical volatility exactly",
        ],
        answer: 0,
        explanation:
          "Implied volatility lets traders compare options across strikes and maturities in a common volatility language.",
      }),
    ],
    advanced: [
      buildQuestion({
        prompt: "What is a common limitation when hedging solely with Black-Scholes delta?",
        options: [
          "Discrete rebalancing and model misspecification create residual hedging error",
          "Delta eliminates all PnL variation",
          "Delta is only defined for bonds",
          "Delta ignores the underlying price entirely",
        ],
        answer: 0,
        explanation:
          "Practical hedging is not continuous and markets are not perfectly Black-Scholes, so residual risk remains.",
      }),
      buildQuestion({
        prompt: "Why is local or stochastic volatility often layered on top of Black-Scholes intuition?",
        options: [
          "To fit surface structure that a constant-vol model cannot explain",
          "To remove all calibration steps",
          "To force gamma to zero",
          "To avoid numerical methods completely",
        ],
        answer: 0,
        explanation:
          "Richer volatility models are used because market surfaces vary with strike and maturity, unlike a single constant-volatility input.",
      }),
      buildQuestion({
        prompt: "What does put-call parity imply about no-arbitrage structure?",
        options: [
          "Equivalent synthetic positions must have aligned values",
          "Call options always dominate stocks",
          "Puts and calls are independent assets",
          "Interest rates do not matter",
        ],
        answer: 0,
        explanation:
          "Put-call parity comes from comparing replicating positions that produce the same payoff at expiry.",
      }),
    ],
  },
  heston: {
    beginner: [
      buildQuestion({
        prompt: "What does Heston try to improve relative to Black-Scholes?",
        options: [
          "The treatment of changing volatility",
          "The definition of a strike",
          "The existence of maturity",
          "The use of discounting",
        ],
        answer: 0,
        explanation:
          "Heston explicitly models variance as stochastic, which helps describe changing volatility conditions.",
      }),
      buildQuestion({
        prompt: "Why might traders care about stochastic volatility?",
        options: [
          "Because observed market volatility is not constant",
          "Because spot prices never move",
          "Because options do not depend on volatility",
          "Because only interest rates matter",
        ],
        answer: 0,
        explanation:
          "Real option markets show time-varying and strike-dependent volatility behavior, motivating stochastic-vol models.",
      }),
      buildQuestion({
        prompt: "What kind of market pattern can Heston help explain?",
        options: [
          "Volatility smile or skew",
          "Bond coupon schedules",
          "Tax accrual rules",
          "Settlement holidays",
        ],
        answer: 0,
        explanation:
          "One of Heston’s main practical motivations is explaining the smile and skew structure seen in implied vol surfaces.",
      }),
    ],
    intermediate: [
      buildQuestion({
        prompt: "How does mean reversion in variance affect Heston intuition?",
        options: [
          "Variance tends to drift back toward a long-run level",
          "Variance becomes constant immediately",
          "The spot path stops moving",
          "The model loses all randomness",
        ],
        answer: 0,
        explanation:
          "Mean reversion stops variance from wandering aimlessly and helps stabilize long-run behavior in the model.",
      }),
      buildQuestion({
        prompt: "What does vol-of-vol control?",
        options: [
          "How violently the variance process itself fluctuates",
          "How many assets enter the portfolio",
          "The length of the yield curve",
          "The confidence level for VaR",
        ],
        answer: 0,
        explanation:
          "Vol-of-vol determines how noisy the variance path is and can materially affect option surface shapes.",
      }),
      buildQuestion({
        prompt: "Why does negative rho often matter in equities?",
        options: [
          "It helps produce downside skew",
          "It forces positive skew",
          "It makes variance deterministic",
          "It removes the need for calibration",
        ],
        answer: 0,
        explanation:
          "Negative spot-vol correlation is a common ingredient in reproducing the downside skew seen in equity options.",
      }),
    ],
    advanced: [
      buildQuestion({
        prompt: "Why do numerical schemes for Heston need care around variance?",
        options: [
          "Discretization can create instability or negative variance without safeguards",
          "The asset price stops existing in simulation",
          "Interest rates become singular",
          "Correlation cannot be simulated",
        ],
        answer: 0,
        explanation:
          "Variance is constrained by model structure, so implementation choices matter when discretizing the stochastic process.",
      }),
      buildQuestion({
        prompt: "What is a key calibration challenge in Heston?",
        options: [
          "Multiple parameters interact to fit the surface jointly",
          "No market data is required",
          "Only the strike needs calibration",
          "The model ignores maturities",
        ],
        answer: 0,
        explanation:
          "The parameters jointly shape skew, term structure, and level, so calibration is a multi-dimensional fitting problem.",
      }),
      buildQuestion({
        prompt: "Why might desks still use simpler models after learning Heston?",
        options: [
          "Because richer realism can come with higher calibration and implementation cost",
          "Because Heston forbids option pricing",
          "Because stochastic volatility is never observed",
          "Because it only works for commodities",
        ],
        answer: 0,
        explanation:
          "Heston is more realistic than Black-Scholes in some ways, but simplicity and operational speed still matter in production workflows.",
      }),
    ],
  },
  "cir-plus-plus": {
    beginner: [
      buildQuestion({
        prompt: "What market area is CIR++ mainly associated with?",
        options: [
          "Interest-rate modeling",
          "Equity index construction",
          "Credit card settlement",
          "Commodity storage",
        ],
        answer: 0,
        explanation:
          "CIR++ is a fixed-income and short-rate modeling framework rather than an equity option model.",
      }),
      buildQuestion({
        prompt: "Why add a deterministic shift to CIR?",
        options: [
          "To better match the market yield curve at time zero",
          "To remove all randomness",
          "To price only equities",
          "To eliminate calibration",
        ],
        answer: 0,
        explanation:
          "The shift improves the model’s ability to fit the observed starting term structure while keeping stochastic short-rate dynamics.",
      }),
      buildQuestion({
        prompt: "What does mean reversion mean in a rate model?",
        options: [
          "Rates tend to drift back toward a long-run level",
          "Rates never change",
          "Rates become equity prices",
          "Rates equal inflation exactly",
        ],
        answer: 0,
        explanation:
          "Mean reversion is the tendency for the stochastic short rate to move back toward a central level over time.",
      }),
    ],
    intermediate: [
      buildQuestion({
        prompt: "Why does curve fit matter before pricing fixed-income instruments?",
        options: [
          "Because the starting term structure influences current valuations directly",
          "Because rates never affect discounting",
          "Because only volatility matters",
          "Because bonds are priced from spot equity only",
        ],
        answer: 0,
        explanation:
          "The current curve is embedded in present value calculations, so a model should align with it before projecting forward scenarios.",
      }),
      buildQuestion({
        prompt: "What does the stochastic factor x_t capture?",
        options: [
          "The random component of short-rate evolution",
          "The equity dividend yield",
          "The bond coupon schedule",
          "The confidence level for stress testing",
        ],
        answer: 0,
        explanation:
          "The x_t state variable carries the random mean-reverting CIR dynamics inside the shifted model.",
      }),
      buildQuestion({
        prompt: "Why might a desk prefer a shifted model to a plain one-factor rate process?",
        options: [
          "Because it offers more flexibility in fitting today's curve",
          "Because it removes the need for discounting",
          "Because it guarantees all derivatives are closed form",
          "Because it is unrelated to market data",
        ],
        answer: 0,
        explanation:
          "Shifted models offer a pragmatic balance between structural intuition and market calibration flexibility.",
      }),
    ],
    advanced: [
      buildQuestion({
        prompt: "What is a practical production challenge with CIR++ implementations?",
        options: [
          "Keeping calibration, simulation, and pricing layers consistent with the same curve assumptions",
          "The model cannot use stochastic processes",
          "The model only supports equity baskets",
          "The shift removes all model parameters",
        ],
        answer: 0,
        explanation:
          "Production implementations must keep curve construction, calibration, and scenario generation aligned.",
      }),
      buildQuestion({
        prompt: "Why is CIR++ attractive in education as well as practice?",
        options: [
          "It clearly separates structural dynamics from market-fitting adjustments",
          "It eliminates all numerical work",
          "It does not need any data",
          "It replaces fixed-income analytics entirely",
        ],
        answer: 0,
        explanation:
          "The split between x_t and phi(t) makes the modeling logic intuitive: one term drives randomness and the other term anchors today's curve.",
      }),
      buildQuestion({
        prompt: "What kind of extension path is natural after CIR++?",
        options: [
          "Richer multi-factor or curve models for more nuanced rate dynamics",
          "Dropping the yield curve entirely",
          "Moving to a stock split model",
          "Using only tax data",
        ],
        answer: 0,
        explanation:
          "Once users understand shifted one-factor short-rate models, the next step is often multi-factor or more market-consistent curve dynamics.",
      }),
    ],
  },
  "monte-carlo": {
    beginner: [
      buildQuestion({
        prompt: "What is the basic Monte Carlo idea?",
        options: [
          "Simulate many possible futures and average the results",
          "Use one deterministic scenario only",
          "Ignore randomness in pricing",
          "Replace discounting with ranking",
        ],
        answer: 0,
        explanation:
          "Monte Carlo works by generating many scenarios for uncertain variables and aggregating their payoff consequences.",
      }),
      buildQuestion({
        prompt: "Why are more paths often helpful?",
        options: [
          "They typically reduce sampling noise",
          "They remove the model assumptions",
          "They make randomness disappear",
          "They always reduce runtime",
        ],
        answer: 0,
        explanation:
          "More paths give a better statistical estimate, although runtime usually increases as well.",
      }),
      buildQuestion({
        prompt: "What is one reason Monte Carlo is intuitive for learners?",
        options: [
          "It connects uncertainty directly to scenario outcomes",
          "It avoids all mathematics",
          "It prices only options with closed forms",
          "It never uses probability",
        ],
        answer: 0,
        explanation:
          "Simulation makes it easy to picture pricing as an average across many possible futures.",
      }),
    ],
    intermediate: [
      buildQuestion({
        prompt: "Why is path dependence a natural fit for Monte Carlo?",
        options: [
          "Because the full time path can be tracked explicitly",
          "Because path dependence removes volatility",
          "Because only terminal payoffs matter",
          "Because it forbids discounting",
        ],
        answer: 0,
        explanation:
          "If the payoff depends on the running average, barrier hits, or path extrema, simulation can record those features directly.",
      }),
      buildQuestion({
        prompt: "What does a variance-reduction technique try to do?",
        options: [
          "Improve estimate efficiency without changing the core pricing objective",
          "Remove discounting from present value calculations",
          "Replace the model with accounting rules",
          "Guarantee exact finite-sample prices",
        ],
        answer: 0,
        explanation:
          "Variance-reduction methods target lower estimation noise for a given computational budget.",
      }),
      buildQuestion({
        prompt: "Why is time discretization important in simulation?",
        options: [
          "Because the path is approximated step by step in finite increments",
          "Because maturity disappears otherwise",
          "Because rates can no longer be used",
          "Because it sets the strike level",
        ],
        answer: 0,
        explanation:
          "Continuous-time models must be approximated numerically, and the time step affects both accuracy and runtime.",
      }),
    ],
    advanced: [
      buildQuestion({
        prompt: "What is a common advanced Monte Carlo concern for complex books?",
        options: [
          "Nested simulation and computational cost",
          "The complete absence of randomness",
          "The inability to price multi-factor structures",
          "The lack of discounting formulas",
        ],
        answer: 0,
        explanation:
          "Nested Monte Carlo for exposure, xVA, or dynamic risk can be extremely expensive if not carefully designed.",
      }),
      buildQuestion({
        prompt: "Why are quasi-Monte Carlo methods interesting to quants?",
        options: [
          "They can improve convergence in some high-value workflows",
          "They remove the need for calibration",
          "They guarantee exact pricing for all path-dependent products",
          "They eliminate the stochastic process entirely",
        ],
        answer: 0,
        explanation:
          "Low-discrepancy sampling can sometimes improve estimator efficiency, though performance depends on the problem structure.",
      }),
      buildQuestion({
        prompt: "Why do production Monte Carlo engines often separate scenario generation from payoff logic?",
        options: [
          "To make the architecture reusable across multiple instruments and risk calculations",
          "To prevent discounting entirely",
          "To remove randomness from the engine",
          "To avoid any data dependencies",
        ],
        answer: 0,
        explanation:
          "Separating the stochastic engine from payoff evaluation improves reuse, testability, and portfolio-scale architecture.",
      }),
    ],
  },
  "portfolio-optimization": {
    beginner: [
      buildQuestion({
        prompt: "What is the main purpose of portfolio optimization?",
        options: [
          "Choose weights that balance return and risk goals",
          "Eliminate all market uncertainty",
          "Guarantee gains every month",
          "Replace asset research completely",
        ],
        answer: 0,
        explanation:
          "Portfolio optimization translates expectations and risk information into a disciplined allocation decision.",
      }),
      buildQuestion({
        prompt: "Why is diversification valuable?",
        options: [
          "Assets that do not move together can reduce total portfolio risk",
          "It guarantees the highest return asset is chosen",
          "It removes the need for market data",
          "It makes volatility equal to zero",
        ],
        answer: 0,
        explanation:
          "Diversification works because imperfectly correlated assets can reduce the overall variance of the combined portfolio.",
      }),
      buildQuestion({
        prompt: "What does an efficient frontier help visualize?",
        options: [
          "Risk-return trade-offs across portfolios",
          "Only tax treatment",
          "Bond coupon dates",
          "Option exercise rules",
        ],
        answer: 0,
        explanation:
          "The efficient frontier shows which portfolios are optimal for a given level of risk or return under the model assumptions.",
      }),
    ],
    intermediate: [
      buildQuestion({
        prompt: "Why are expected returns often the hardest input in optimization?",
        options: [
          "They are notoriously noisy and difficult to estimate robustly",
          "They never matter",
          "They are known exactly from the risk-free curve",
          "They come directly from accounting standards",
        ],
        answer: 0,
        explanation:
          "Expected returns are highly uncertain, and small errors can meaningfully change optimization results.",
      }),
      buildQuestion({
        prompt: "What does a long-only constraint do?",
        options: [
          "Prevents negative asset weights",
          "Forces equal weights",
          "Eliminates diversification",
          "Removes the covariance matrix",
        ],
        answer: 0,
        explanation:
          "A long-only constraint disallows short positions and can materially change the feasible solution set.",
      }),
      buildQuestion({
        prompt: "What is the intuition behind risk parity?",
        options: [
          "Balance contributions to risk rather than just capital",
          "Maximize raw return at any cost",
          "Ignore volatility entirely",
          "Allocate based only on market capitalization",
        ],
        answer: 0,
        explanation:
          "Risk parity focuses on how much each asset contributes to the portfolio’s total risk, not merely on dollar weights.",
      }),
    ],
    advanced: [
      buildQuestion({
        prompt: "Why do optimized portfolios often need regularization or practical overlays?",
        options: [
          "Because pure optimizers can overreact to noisy inputs and unstable estimates",
          "Because constraints are mathematically impossible",
          "Because covariance does not matter in practice",
          "Because every asset should have the same return",
        ],
        answer: 0,
        explanation:
          "Regularization, shrinkage, and practical constraints help reduce instability and improve real-world usability.",
      }),
      buildQuestion({
        prompt: "What does a robust optimizer usually try to address?",
        options: [
          "Parameter uncertainty and sensitivity of allocations",
          "The maturity schedule of a single option",
          "Only dividend policy",
          "Only exchange holidays",
        ],
        answer: 0,
        explanation:
          "Robust optimization acknowledges that inputs like expected returns and covariances are estimated with error.",
      }),
      buildQuestion({
        prompt: "Why might a buy-side team compare equal-weight and maximum-Sharpe allocations side by side?",
        options: [
          "To judge whether estimation complexity is adding useful signal",
          "Because both are always identical",
          "Because Sharpe ignores volatility",
          "Because equal weight requires no assets",
        ],
        answer: 0,
        explanation:
          "Comparing simple and optimized portfolios helps determine whether model complexity creates better practical outcomes.",
      }),
    ],
  },
  "var-expected-shortfall": {
    beginner: [
      buildQuestion({
        prompt: "What does VaR try to summarize for a portfolio?",
        options: [
          "A loss threshold at a chosen confidence level",
          "The exact worst-case loss in all universes",
          "Only positive returns",
          "The option delta of the portfolio",
        ],
        answer: 0,
        explanation:
          "VaR is a threshold-style risk metric describing how bad losses could be up to a chosen confidence level and horizon.",
      }),
      buildQuestion({
        prompt: "Why do risk teams also look at Expected Shortfall?",
        options: [
          "Because it describes the average severity of losses beyond VaR",
          "Because it removes the need for confidence levels",
          "Because it ignores extreme events",
          "Because it only applies to options",
        ],
        answer: 0,
        explanation:
          "Expected Shortfall looks further into the tail by averaging losses conditional on breaching VaR.",
      }),
      buildQuestion({
        prompt: "What is one simple interpretation of a 95% VaR?",
        options: [
          "Losses are expected to exceed that threshold about 5% of the time under the model",
          "The portfolio cannot lose money",
          "Returns are always normally distributed",
          "The portfolio always earns the risk-free rate",
        ],
        answer: 0,
        explanation:
          "The remaining tail beyond the confidence cutoff is where the VaR threshold may be exceeded.",
      }),
    ],
    intermediate: [
      buildQuestion({
        prompt: "Why is historical simulation attractive for VaR?",
        options: [
          "It is intuitive because it reuses observed market moves",
          "It removes all model assumptions permanently",
          "It guarantees future crises match the past exactly",
          "It only applies to fixed-income instruments",
        ],
        answer: 0,
        explanation:
          "Historical simulation is intuitive and transparent, though it still depends on the chosen lookback window and past market regimes.",
      }),
      buildQuestion({
        prompt: "What is a key limitation of a normal parametric VaR approach?",
        options: [
          "Heavy tails and nonlinear payoffs may not be captured well",
          "It cannot use volatility at all",
          "It only works with positive returns",
          "It eliminates correlation from risk analysis",
        ],
        answer: 0,
        explanation:
          "Simple parametric assumptions can misstate risk if returns are skewed, fat-tailed, or highly nonlinear.",
      }),
      buildQuestion({
        prompt: "How is stress testing different from VaR?",
        options: [
          "Stress testing evaluates named adverse scenarios rather than a single statistical threshold",
          "Stress testing is only for equities and VaR only for bonds",
          "They are identical by construction",
          "VaR always dominates stress testing",
        ],
        answer: 0,
        explanation:
          "Stress testing focuses on specified crisis-like or hypothetical scenarios, complementing the probabilistic summary given by VaR.",
      }),
    ],
    advanced: [
      buildQuestion({
        prompt: "Why is Expected Shortfall often considered a more coherent risk measure than VaR?",
        options: [
          "Because it better respects diversification-sensitive properties such as subadditivity in many settings",
          "Because it ignores tail losses",
          "Because it never needs a confidence level",
          "Because it is always easier to estimate",
        ],
        answer: 0,
        explanation:
          "Expected Shortfall is often favored in theory because it better captures tail behavior and has stronger coherence properties than VaR.",
      }),
      buildQuestion({
        prompt: "What makes nonlinear portfolios challenging for VaR estimation?",
        options: [
          "Their loss distributions can be skewed and path-dependent rather than approximately normal",
          "They never react to volatility",
          "They cannot be marked to market",
          "They eliminate correlation completely",
        ],
        answer: 0,
        explanation:
          "Options and structured portfolios can create asymmetric and fat-tailed loss distributions that simple approximations miss.",
      }),
      buildQuestion({
        prompt: "Why do desks often combine VaR, Expected Shortfall, and scenario analysis?",
        options: [
          "Because no single risk metric fully describes portfolio downside behavior",
          "Because all three are mathematically identical",
          "Because Expected Shortfall replaces portfolio construction",
          "Because VaR is only for educational use",
        ],
        answer: 0,
        explanation:
          "Each tool highlights a different part of the downside picture, so using them together gives a more complete risk view.",
      }),
    ],
  },
};

export function createMockGeneratedQuestions({
  count,
  difficulty,
  topic,
}: GeneratedQuestionRequest): QuizQuestion[] {
  const templates = generatedQuestionTemplates[topic][difficulty];

  return Array.from({ length: Math.max(1, count) }, (_, index) => {
    const template = templates[index % templates.length];

    return {
      ...template,
      prompt: `${template.prompt} (${learningTopicLabels[topic]} · ${difficulty} · Set ${index + 1})`,
    };
  });
}
