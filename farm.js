
const getYieldForPlant = (plant, environmentFactors) => {
  if (environmentFactors === undefined) {
    // When no environmentfactors are defined in the function call, the yield will be standard
    return plant.yield;

  } else if (plant.hasOwnProperty("factor") === false) {
    // When environmentfactors are defined but they have no influence on the plant, yield will be standard
    return plant.yield;

  } else {
    // When enviromentfactors are defined and are of influence on the yield

    // Checks if sun is of influence
    const getSunfactorValue = () => {
      if (plant.factor.sun === undefined) {
        return 1;
      } else {
        const environmentSunFactor = environmentFactors.sun;
        return (100 + plant.factor.sun[environmentSunFactor]) / 100;
      }
    };

    // Checks if temperature is of influence
    const getTemperaturefactorValue = () => {
      if (plant.factor.temperature === undefined) {
        return 1;
      } else {
        const environmentTemperatureFactor = environmentFactors.temperature;
        return (
          (100 + plant.factor.temperature[environmentTemperatureFactor]) / 100
        );
      }
    };

    // Checks if wind is of influence
    const getWindfactorValue = () => {
      if (plant.factor.wind === undefined) {
        return 1;
      } else {
        const environmentWindFactor = environmentFactors.wind;
        return (100 + plant.factor.wind[environmentWindFactor]) / 100;
      }
    };

    // checks if soil is of influence
    const getSoilfactorValue = () => {
      if (plant.factor.soil === undefined) {
        return 1;
      } else {
        const environmentSoilFactor = environmentFactors.soil;
        return (100 + plant.factor.soil[environmentSoilFactor]) / 100;
      }
    };

    const newYield =
      plant.yield *
      getSunfactorValue() *
      getTemperaturefactorValue() *
      getWindfactorValue() *
      getSoilfactorValue();
    return Math.round(newYield * 10) / 10;
  }
};

const getYieldForCrop = (input, environmentFactors) => {
  const plant = input.crop;

  if (environmentFactors === undefined) {
    // When environmentfactors are not defined in the function call
    let YieldForCrop = getYieldForPlant(plant) * input.numCrops; 
    return YieldForCrop;
  } else {
    //When enviromentfactors are defined in function call
    let YieldForCrop =
      getYieldForPlant(plant, environmentFactors) * input.numCrops;
    return YieldForCrop;
  };
};

const getTotalYield = (crops, environmentFactors) => {
  const cropObjects = crops.crops;
  let total = 0;

  //Total when enviromentfactors are not of influence
  if (environmentFactors === undefined) {
    for (let i = 0; i < cropObjects.length; i++) {
      total = total + getYieldForCrop(cropObjects[i]); 
    }
    return total;
  }

  // Total when environmentfactors are of influence
  else {
    for (let i = 0; i < cropObjects.length; i++) {
      total = total + getYieldForCrop(cropObjects[i], environmentFactors); 
    }
    return total;
  }
};

const getCostsForCrop = (input) => {
  const cost = input.crop.cost * input.numCrops; 
  return cost;
};

const getRevenueForCrop = (input, environmentFactors) => {
  //Renvenue when environmentfactors are not of influence
  if (environmentFactors === undefined) {
    let revenuePerCrop = getYieldForCrop(input) * input.salePrice;
    return revenuePerCrop;
  }

  // Revenue when environmentfactors are of influence
  else {
    revenuePerCrop =
      getYieldForCrop(input, environmentFactors) * input.salePrice;
    return revenuePerCrop;
  }
};

const getProfitForCrop = (input, environmentFactors) => {
  // Profit when environmentfactors are not of influence
  if (environmentFactors === undefined) {
    let profit = getRevenueForCrop(input) - getCostsForCrop(input);
    return profit;
  }

  // Profit when environmenfactors are of influence
  else {
    profit =
      getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);
    return profit;
  }
};

const getTotalProfit = (input, environmentFactors) => {
  const crops = input.crops;
  let totalProfit = 0;

  // Total profit when environmentfactors are not of influence on all crops
  if (environmentFactors === undefined) {
    for (let i = 0; i < crops.length; i++) {
      totalProfit = totalProfit + getProfitForCrop(crops[i]); // adds profit per crop to totalProfit
    }
    return totalProfit;
  }

  // Total profit when environmentfactors are of influence on one or more crops
  else {
    for (let i = 0; i < crops.length; i++) {
      totalProfit =
        totalProfit + getProfitForCrop(crops[i], environmentFactors); // adds profit per crop to totalProfit
    }
    return totalProfit;
  }
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
