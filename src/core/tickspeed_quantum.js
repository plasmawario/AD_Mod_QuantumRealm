import { DC } from "./constants";

/***
 * This will calculate the number of galaxies that affect tickspeed upgrades
 * @returns the total number of galaxies that the player has
 */
export function effectiveBaseGalaxies() {
  //return Math.max(player.galaxies + GalaxyGenerator.galaxies + replicantiGalaxies + freeGalaxies, 0);
  return Math.max(0, 0);
}

/***
 * This will calculate the total tickspeed multiplier
 */
export function getTickSpeedMultiplier() {
  let galaxies = effectiveBaseGalaxies();
  const effects = Effects.product(
    //multipliers to galaxies
  );

  if (galaxies < 3) {
    // Magic numbers are to retain balancing from before while displaying
    // them now as positive multipliers rather than negative percentages
    let baseMultiplier = 1 / 1.25;    //<- base tickspeed multiplier per upgrade

    if (player.galaxies === 1) baseMultiplier = 1 / 1.1888888;
    if (player.galaxies === 2) baseMultiplier = 1 / 1.1267177;

    const perGalaxy = 0.02 * effects;

    return DC.D0_01.clampMin(baseMultiplier - (galaxies * perGalaxy));
  }

  let baseMultiplier = 0.8;
  galaxies -= 2;
  galaxies *= effects;

  const perGalaxy = DC.D0_965;

  return perGalaxy.pow(galaxies - 2).times(baseMultiplier);
}


/***
 * This will buy a single tickspeed upgrade
 * @returns whether the puchase was successful
 */
export function buyTickSpeedQuantum() {
  if (!Tickspeed_Quantum.isAvailableForPurchase || !Tickspeed_Quantum.isAffordable) return false;

  Tutorial.turnOffEffect(TUTORIAL_STATE.TICKSPEED);
  Currency.quarks1.subtract(Tickspeed_Quantum.cost);
  player.totalTickQuantumBought++;
  //player.requirementChecks.permanent.singleTickspeed++;
  GameUI.update();
  return true;
}

/***
 * This will buy the maximum amount of tickspeed upgrades we can afford
 */
export function buyMaxTickSpeedQuantum() {
  if (!Tickspeed_Quantum.isAvailableForPurchase || !Tickspeed_Quantum.isAffordable) return;
  let boughtTickspeed = false;

  Tutorial.turnOffEffect(TUTORIAL_STATE.TICKSPEED);

  const purchases = Tickspeed_Quantum.costScale.getMaxBought(player.totalTickQuantumBought, Currency.quarks1.value, 1);
  if (purchases === null) {
      return;
  }
  Currency.quarks1.subtract(Decimal.pow10(purchases.logPrice));
  player.totalTickQuantumBought += purchases.quantity;
  boughtTickspeed = true;

  /*if (boughtTickspeed) {
    player.records.thisInfinity.lastBuyTime = player.records.thisInfinity.time;
  }*/
}

/***
 * this will reset your number of tickspeed upgrades bought
 */
export function resetTickspeed() {
  player.totalTickQuantumBought = 0;
}

export const Tickspeed_Quantum = {

  get isUnlocked() {
    return QuarkGenerator(2).bought + QuarkGenerator(1).bought >= 40;
  },

  get isAvailableForPurchase() {
    return this.isUnlocked &&
      (player.break || this.cost.lt(Decimal.NUMBER_MAX_VALUE));
  },

  get isAffordable() {
    return Currency.quarks1.gte(this.cost);
  },

  get multiplier() {
    return getTickSpeedMultiplier();
  },

  get current() {
    const tickspeed = this.baseValue;
    return tickspeed;
  },

  get cost() {
    return this.costScale.calculateCost(player.totalTickQuantumBought);
  },

  get costScale() {
    return new ExponentialCostScaling({
      baseCost: 100000,
      baseIncrease: 100,
      costScale: Player.tickSpeedQuantumMultDecrease,
      scalingCostThreshold: Number.MAX_VALUE
    });
  },

  get baseValue() {
    //achievement rewards that affect value of tickspeed
    return DC.E3.timesEffectsOf(
    )
      .times(getTickSpeedMultiplier().pow(this.totalUpgrades));
  },

  get totalUpgrades() {
    let boughtTickspeed;

    boughtTickspeed = player.totalTickQuantumBought;
    return boughtTickspeed + player.totalTickQuantumGained;
  },

  get perSecond() {
    return Decimal.divide(1000, this.current);
  },
};