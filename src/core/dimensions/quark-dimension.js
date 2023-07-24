import { DC } from "../constants";
import { Currency } from "../currency";

import { DimensionState } from "./dimensionDouble";

/***
 * This will buy a single quark generator
 * @param {number} tier The nth dimension to buy
 * @returns {boolean} whether or not the purchase was successful
 */
export function buySingleQuarkGenerator(tier) {
  const dim = QuarkGenerator(tier);
  if (Currency.quarks1.lt(dim.cost)) return false;

  Currency.quarks1.subtract(dim.cost);
  dim.amount = dim.amount.plus(1);
  dim.bought += 1;
  dim.cost = dim.nextCost(dim.bought);
  return true;
}

/***
 * This will reset your quark generators to their base amount that you have already bought
 */
export function resetQuarkGenerator() {
  for (const dim of QuarkGenerators.all) dim.amount = new Decimal(dim.bought);
  updateQuarkGeneratorCosts();
}

/***
 * This will completely reset your quark generators to nothing
 */
export function fullResetQuarkGenerator() {
  for (const dim of QuarkGenerators.all) {
    dim.cost = new Decimal(dim.baseCost);
    dim.amount = DC.D0;
    dim.bought = 0;
  }
}

/***
 * This will toggle the autobuyer settings of all your quark generators
 */
/*export function toggleAllTimeDims() {
  const areEnabled = Autobuyer.timeDimension(1).isActive;
  for (let i = 1; i < 9; i++) {
    Autobuyer.timeDimension(i).isActive = !areEnabled;
  }
}*/

/***
 * This will buy max your specified quark generator
 * @param {number} tier The nth dimension to buy max
 * @param {number} portionToSpend i dunno (Default: 1)
 * @returns {boolean} whether or not the purchase was successful
 */
export function buyMaxQuarkGenerator(tier, portionToSpend = 1) {
  const canSpend = Currency.quarks1.value.times(portionToSpend);
  const dim = QuarkGenerator(tier);
  if (canSpend.lt(dim.cost)) return false;
  
  const bulk = bulkBuyBinarySearch(canSpend, {
    costFunction: bought => dim.nextCost(bought),
    cumulative: true,
    firstCost: dim.cost,
  }, dim.bought);
  if (!bulk) return false;
  
  Currency.quarks1.subtract(bulk.purchasePrice);
  dim.amount = dim.amount.plus(bulk.quantity);
  dim.bought += bulk.quantity;
  dim.cost = dim.nextCost(dim.bought);
  return true;
}

/***
 * This will buy max your all quark generators
 */
export function maxAllQuarkGenerator() {
  // Try to buy single from the highest affordable new dimensions
  for (let i = 2; i > 0 && QuarkGenerator(i).bought === 0; i--) {
    buySingleQuarkGenerator(i, true);
  }

  // Buy everything costing less than 1% of initial Quarks
  for (let i = 2; i > 0; i--) {
    buyMaxQuarkGenerator(i, 0.01, true);
  }

  // Loop buying the cheapest dimension possible; explicit infinite loops make me nervous
  const unlockedDimensions = QuarkGenerators.all.filter(d => d.isUnlocked);
  for (let stop = 0; stop < 1000; stop++) {
    const cheapestDim = unlockedDimensions.reduce((a, b) => (b.cost.gte(a.cost) ? a : b));
    if (!buySingleQuarkGenerator(cheapestDim.tier, true)) break;
  }
}

/***
 * This determine the multiplier of your quark generators
 * @returns {Decimal} the resulting multiplier
 */
export function quarkGeneratorCommonMultiplier() {
  /*let mult = new Decimal(ShopPurchase.allDimPurchases.currentMult);
  return mult;*/
return DC.D1;
}

/***
 * This will simply update the costs for your quark generators
 */
export function updateQuarkGeneratorCosts() {
  for (let i = 1; i <= 2; i++) {
    const dim = QuarkGenerator(i);
    dim.cost = dim.nextCost(dim.bought);
  }
}

/***
 * This is the class that contains information related to quark generators, along with a
 * constructor and functions
 */
class QuarkGeneratorState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.quarks1, tier);
    const BASE_COSTS = [null, DC.E1, DC.E3];
    this._baseCost = BASE_COSTS[tier];
    const COST_MULTS = [null, 2, 4];
    this._costMultiplier = COST_MULTS[tier];
    /*const E6000_SCALING_AMOUNTS = [null, 7322, 4627];
    this._e6000ScalingAmount = E6000_SCALING_AMOUNTS[tier];
    const COST_THRESHOLDS = [Decimal.NUMBER_MAX_VALUE, DC.E1300, DC.E6000];
    this._costIncreaseThresholds = COST_THRESHOLDS;*/
  }

  /** @returns {Decimal} */
  get cost() {
    return this.data.cost;
  }

  /** @param {Decimal} value */
  set cost(value) { this.data.cost = value; }

  /***
  * This will calculate the cost of your next quark generator after buying one
  * @param {number} bought how many generators that have been bought
  * @returns {Decimal} the new calculated cost
  */
  nextCost(bought) {
    let base = this.costMultiplier;
    const exponent = bought;
    const cost = Decimal.pow(base, exponent).times(this.baseCost);

    return cost;
  }

  /***
  * This will check to see if the quark generator is unlocked and visible or not
  * @returns {boolean} whether the generator is unlocked and visible
  */
  get isUnlocked() {
    return true;
    //return this._tier < 5 || TimeStudy.timeDimension(this._tier).isBought;
  }

  /***
  * This will check to see if we can buy this quark generator
  * @returns {boolean} whether or not the purchase was successful
  */
  get isAvailableForPurchase() {
    return this.isAffordable;
  }

  /***
  * This will check if we can afford to buy this quark generator
  * @returns {boolean} whether or not the purchase was successful
  */
  get isAffordable() {
    return Currency.quarks1.gte(this.cost);
  }

  /***
  * This will calculate the multiplier for a generator after buying a generator
  * @returns {Decimal} the new calculated multiplier
  */
  get multiplier() {
    const tier = this._tier;

    let mult = GameCache.quarkGeneratorCommonMultiplier.value;

    const dim = QuarkGenerator(tier);
    //const bought = dim.bought;
    //mult = mult.times(Decimal.pow(dim.powerMultiplier, bought));
    const upgradeBought = dim.bought; //<- replace this with the number of times we bought that one upgrade (i think that's how that works)
    mult = mult.times(Decimal.pow(dim.powerMultiplier, upgradeBought));

    return mult;
  }

  /***
  * This will calculate the production of quarks your generators are producing per second
  * @returns {Decimal} the production of quarks per second
  */
  get productionPerSecond() {
    let production = this.amount.times(this.multiplier);

    return production;
  }

  /***
  * This will calculate the rate of change of your quark production
  * @returns {Decimal} whether or not the purchase was successful
  */
  get rateOfChange() {
    const tier = this._tier;

    if (tier == 2){
      return DC.D0;
    }

    const toGain = QuarkGenerator(tier + 1).productionPerSecond;
    const current = Decimal.max(this.amount, 1);
    return toGain.times(10).dividedBy(current).times(getGameSpeedupForDisplay());
  }

  /***
  * This will determine if a particular generator is currently producing or not
  * @returns {Decimal} i dunno
  */
  get isProducing() {
    const tier = this.tier;

    return this.amount.gt(0);
  }

  /***
  * This will get the base cost of your generator
  * @returns {boolean} the base cost of your generator
  */
  get baseCost() {
    return this._baseCost;
  }

  /***
  * This will get the cost multiplier of your generator
  * @returns {boolean} the cost multiplier of your generator
  */
  get costMultiplier() {
    return this._costMultiplier;
  }

  /***
  * This will multiply the power of your quark generators after buying them by a set value
  * @returns {boolean} the decimal value to multiply the power of your quark generators by
  */
  get powerMultiplier() {
    return DC.D1;
  }

  /***
  * This will get whether or not we have reached the requirement for unlocking a quark generator
  * @returns {boolean} whether the requirement was reached
  */
  get requirementReached() {
    const tier = this._tier;

    //requirement: if you are a certain amount of quarks away from affording it
    return QuarkGenerator(tier).cost.dividedBy(Currency.quarks1.value).lte(DC.E2);
  }

  /***
  * This will attempt to unlock a quark generator
  */
  /*tryUnlock() {
    if (this.isUnlocked) return;
    TimeStudy.timeDimension(this._tier).purchase();
  }*/
}

/**
 * @function
 * @param {number} tier
 * @return {QuarkGeneratorState}
 */
export const QuarkGenerator = QuarkGeneratorState.createAccessor();

export const QuarkGenerators = {
  /**
   * @type {TimeDimensionState[]}
   */
  all: QuarkGenerator.index.compact(),

  canBuy() {
    return true;
  },

  tick(diff) {
    //defines which generator produces other generators
    /*for (let tier = 2; tier > 1; tier--) {
      QuarkGenerator(tier).produceDimensions(QuarkGenerator(tier - 1), diff / 10);
    }*/

    //defines which generator produces currency
    QuarkGenerator(1).produceCurrency(Currency.quarks1, diff);
    QuarkGenerator(2).produceCurrency(Currency.quarks1, diff);
  },

  /*buySingle() {
    if (!this.isAvailableForPurchase) return false;
    Currency.quarks1.purchase(this.cost);
    this.cost = dim.nextCost(dim.bought);
    this.amount = this.amount.plus(1);

    return true;
  },

  buyMax() {
    if (!this.isAvailableForPurchase) return false;

    const costScaling = new LinearCostScaling(
      Currency.quarks1.value,
      this.cost,
      this.costMultiplier
    );

    if (costScaling.purchases <= 0) return false;

    Currency.quarks1.purchase(costScaling.totalCost);
    this.cost = this.cost.times(costScaling.totalCostMultiplier);
    this.amount = this.amount.plus(costScaling.purchases);

    return true;
  }*/
};



/*export function tryUnlockTimeDimensions() {
  if (QuarkGenerator(8).isUnlocked) return;
  for (let tier = 5; tier <= 8; ++tier) {
    if (QuarkGenerator(tier).isUnlocked) continue;
    QuarkGenerator(tier).tryUnlock();
  }
}*/
