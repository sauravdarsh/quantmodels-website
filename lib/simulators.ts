export type HestonInputs = {
  S0: number;
  v0: number;
  r: number;
  kappa: number;
  theta: number;
  sigmaV: number;
  rho: number;
  maturity: number;
  steps: number;
  paths: number;
  strike: number;
};

export type HestonResults = {
  estimatedCallPrice: number;
  finalAverageStockPrice: number;
  finalAverageVariance: number;
};

export type CirInputs = {
  x0: number;
  kappa: number;
  theta: number;
  sigma: number;
  phi: number;
  maturity: number;
  steps: number;
  paths: number;
};

export type CirPathPoint = {
  step: number;
  time: number;
  averageState: number;
  averageShortRate: number;
};

export type CirResults = {
  averageTerminalShortRate: number;
  pathTable: CirPathPoint[];
};

export type BlackScholesInputs = {
  spot: number;
  strike: number;
  rate: number;
  volatility: number;
  maturity: number;
};

export type BlackScholesResults = {
  callPrice: number;
  putPrice: number;
  delta: number;
};

export type MonteCarloInputs = {
  S0: number;
  rate: number;
  volatility: number;
  maturity: number;
  steps: number;
  paths: number;
  strike: number;
};

export type MonteCarloResults = {
  callPrice: number;
  putPrice: number;
  averageTerminalPrice: number;
};

function createNormalPair() {
  const u1 = Math.max(Math.random(), 1e-12);
  const u2 = Math.random();
  const radius = Math.sqrt(-2 * Math.log(u1));
  const angle = 2 * Math.PI * u2;

  return {
    z1: radius * Math.cos(angle),
    z2: radius * Math.sin(angle),
  };
}

function normalCdf(value: number) {
  const sign = value < 0 ? -1 : 1;
  const x = Math.abs(value) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x));

  return 0.5 * (1 + sign * erf);
}

export function simulateHeston(inputs: HestonInputs): HestonResults {
  const steps = Math.max(1, Math.floor(inputs.steps));
  const paths = Math.max(1, Math.floor(inputs.paths));
  const dt = Math.max(inputs.maturity, 1e-6) / steps;
  const sqrtDt = Math.sqrt(dt);

  let payoffSum = 0;
  let stockSum = 0;
  let varianceSum = 0;

  for (let path = 0; path < paths; path += 1) {
    let stock = Math.max(inputs.S0, 1e-6);
    let variance = Math.max(inputs.v0, 0);

    for (let step = 0; step < steps; step += 1) {
      const { z1, z2 } = createNormalPair();
      const correlatedZ = inputs.rho * z1 + Math.sqrt(1 - inputs.rho ** 2) * z2;
      const varianceFloor = Math.max(variance, 0);

      variance =
        variance +
        inputs.kappa * (inputs.theta - varianceFloor) * dt +
        inputs.sigmaV * Math.sqrt(varianceFloor) * sqrtDt * z1;
      variance = Math.max(variance, 0);

      stock =
        stock *
        Math.exp(
          (inputs.r - 0.5 * varianceFloor) * dt +
            Math.sqrt(varianceFloor) * sqrtDt * correlatedZ,
        );
    }

    payoffSum += Math.max(stock - inputs.strike, 0);
    stockSum += stock;
    varianceSum += variance;
  }

  return {
    estimatedCallPrice: Math.exp(-inputs.r * inputs.maturity) * (payoffSum / paths),
    finalAverageStockPrice: stockSum / paths,
    finalAverageVariance: varianceSum / paths,
  };
}

export function simulateCirPlusPlus(inputs: CirInputs): CirResults {
  const steps = Math.max(1, Math.floor(inputs.steps));
  const paths = Math.max(1, Math.floor(inputs.paths));
  const dt = Math.max(inputs.maturity, 1e-6) / steps;
  const sqrtDt = Math.sqrt(dt);
  const stateSums = new Array<number>(steps + 1).fill(0);
  const rateSums = new Array<number>(steps + 1).fill(0);

  for (let path = 0; path < paths; path += 1) {
    let state = Math.max(inputs.x0, 0);
    stateSums[0] += state;
    rateSums[0] += state + inputs.phi;

    for (let step = 1; step <= steps; step += 1) {
      const { z1 } = createNormalPair();
      const stateFloor = Math.max(state, 0);

      state =
        state +
        inputs.kappa * (inputs.theta - stateFloor) * dt +
        inputs.sigma * Math.sqrt(stateFloor) * sqrtDt * z1;
      state = Math.max(state, 0);

      stateSums[step] += state;
      rateSums[step] += state + inputs.phi;
    }
  }

  const pathTable = stateSums.map((value, index) => ({
    step: index,
    time: index * dt,
    averageState: value / paths,
    averageShortRate: rateSums[index] / paths,
  }));

  return {
    averageTerminalShortRate: pathTable[pathTable.length - 1]?.averageShortRate ?? 0,
    pathTable,
  };
}

export function calculateBlackScholes(
  inputs: BlackScholesInputs,
): BlackScholesResults {
  const maturity = Math.max(inputs.maturity, 1e-6);
  const volatility = Math.max(inputs.volatility, 1e-6);
  const sqrtT = Math.sqrt(maturity);
  const d1 =
    (Math.log(inputs.spot / inputs.strike) +
      (inputs.rate + 0.5 * volatility * volatility) * maturity) /
    (volatility * sqrtT);
  const d2 = d1 - volatility * sqrtT;
  const discount = Math.exp(-inputs.rate * maturity);
  const nd1 = normalCdf(d1);
  const nd2 = normalCdf(d2);

  return {
    callPrice: inputs.spot * nd1 - inputs.strike * discount * nd2,
    putPrice:
      inputs.strike * discount * normalCdf(-d2) - inputs.spot * normalCdf(-d1),
    delta: nd1,
  };
}

export function simulateMonteCarlo(
  inputs: MonteCarloInputs,
): MonteCarloResults {
  const steps = Math.max(1, Math.floor(inputs.steps));
  const paths = Math.max(1, Math.floor(inputs.paths));
  const dt = Math.max(inputs.maturity, 1e-6) / steps;
  const sqrtDt = Math.sqrt(dt);
  let callPayoffSum = 0;
  let putPayoffSum = 0;
  let terminalPriceSum = 0;

  for (let path = 0; path < paths; path += 1) {
    let price = Math.max(inputs.S0, 1e-6);

    for (let step = 0; step < steps; step += 1) {
      const { z1 } = createNormalPair();
      price =
        price *
        Math.exp(
          (inputs.rate - 0.5 * inputs.volatility ** 2) * dt +
            inputs.volatility * sqrtDt * z1,
        );
    }

    terminalPriceSum += price;
    callPayoffSum += Math.max(price - inputs.strike, 0);
    putPayoffSum += Math.max(inputs.strike - price, 0);
  }

  const discount = Math.exp(-inputs.rate * inputs.maturity);

  return {
    callPrice: discount * (callPayoffSum / paths),
    putPrice: discount * (putPayoffSum / paths),
    averageTerminalPrice: terminalPriceSum / paths,
  };
}
