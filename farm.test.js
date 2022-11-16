const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// Yield tests without environmental factors

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

// Test cost, revenue, profit  without environmental factors

describe("getCostsForCrop", () => {
  test("Get costs for crop", () => {
    const mais = {
      name: "mais",
      yield: 3,
      cost: 1,
    };
    const input = {
      crop: mais,
      numCrops: 230,
    };
    expect(getCostsForCrop(input)).toBe(230);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop", () => {
    const apple = {
      name: "apple",
      yield: 5,
    };
    const input = {
      crop: apple,
      numCrops: 10,
      salePrice: 2,
    };
    expect(getRevenueForCrop(input)).toBe(100);
  });
});

describe("getProfitFromCrop", () => {
  test("Get profit from crop", () => {
    const apple = {
      name: "apple",
      cost: 1,
      yield: 5,
    };
    const input = {
      crop: apple,
      numCrops: 10,
      salePrice: 2,
    };
    expect(getProfitForCrop(input)).toBe(90);
  });
});

describe("getTotalProfitFromCrop", () => {
  test("Get profit from multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      cost: 1,
    };
    const crops = [
      { crop: corn, numCrops: 1, salePrice: 2 },
      { crop: pumpkin, numCrops: 1, salePrice: 2 },
    ];

    expect(getTotalProfit({ crops })).toBe(12);
  });
});

// test yield with evironmentelfactors
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  let environmentFactors = {
    sun: "low",
    wind: "high",
    temperature: "medium",
  };

  test("Get yield for plant with sun environment factor", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });

  const avocado = {
    name: "avocado",
    yield: 3,
    factor: {
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  test("Get yield for plant with wind environment factor", () => {
    expect(getYieldForPlant(avocado, environmentFactors)).toBe(1.2);
  });

  const tomato = {
    name: "tomato",
    yield: 4,
    factor: {
      temperature: {
        low: -40,
        medium: 50,
        high: 0,
      },
    },
  };
  test("Get yield for plant with temperature enviroment factor", () => {
    expect(getYieldForPlant(tomato, environmentFactors)).toBe(6);
  });

  const broccoli = {
    name: "broccoli",
    yield: 5,
    factor: {
      soil: {
        sandy: -70,
        clay: 20,
        chalk: 50,
        peat: 0,
      },
    },
  };
  const environmentFactorsBrocolli = {
    soil: "chalk",
  };
  test("Get yield for plant with soil as environment factor", () => {
    expect(getYieldForPlant(broccoli, environmentFactorsBrocolli)).toBe(7.5);
  });
});

describe("getYieldForPlant", () => {
  const avocado = {
    name: "avocado",
    yield: 3,
    factor: {
      sun: {
        low: -20,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const environmentFactors = {
    sun: "high",
    wind: "high",
  };

  test("Get yield for plant with  multiple environment factors", () => {
    expect(getYieldForPlant(avocado, environmentFactors)).toBe(1.8);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop with environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(15);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops with environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(15.5);
  });
});

// test revenue, profit with environmental factors
describe("getRevenueForCrop", () => {
  test("Get revenue for crop", () => {
    const apple = {
      name: "apple",
      yield: 5,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const input = {
      crop: apple,
      numCrops: 1,
      salePrice: 2,
    };
    environmentFactors = {
      sun: "high",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(15);
  });
});

describe("getProfitFromCrop", () => {
  test("Get profit from crop", () => {
    const apple = {
      name: "apple",
      yield: 5,
      cost: 1,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const input = {
      crop: apple,
      numCrops: 1,
      salePrice: 2,
    };
    environmentFactors = {
      sun: "high",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(14);
  });
});

describe("getTotalProfitFromCrop", () => {
  test("Get profit from multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      cost: 1,
    };
    const crops = [
      { crop: corn, numCrops: 5, salePrice: 2 },
      { crop: pumpkin, numCrops: 2, salePrice: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(24);
  });
});
