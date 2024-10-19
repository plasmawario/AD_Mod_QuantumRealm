import { DC } from "./constants";
import { FusionUpgrade } from "./fusion";
import { FusionChallenge } from "./fusion-challenges";
import { PlayerProgress } from "./player-progress";

/***
 * This will calculate the number of galaxies that affect tickspeed upgrades
 * @returns the total number of galaxies that the player has
 */
export function effectiveBaseProtoGalaxies() {
  //return Math.max(player.gluonProtoGalaxies, 0);
  //return Math.max(player.protoGalaxies + GalaxyGenerator.galaxies + replicantiGalaxies + freeGalaxies, 0);

  if (FusionChallenge(10).isRunning) return 0;

  //here we add all of our galaxies, including any manually-purchased ones
  return Math.max(FusionUpgrade(10).effectOrDefault(0) + 
                  ElectronUpgrade(3).effectOrDefault(0) +
                  (WebNode.muon.canBeApplied && WebNode.chargeAmp.canBeApplied && WebNode.tau.canBeApplied) + 
                  (WebNode.fusionChallengeQk.canBeApplied && WebNode.scaleReduce1.canBeApplied && WebNode.galaxyAmp.canBeApplied) +
                  (WebNode.upBoostFusions.canBeApplied && WebNode.downBoostCharge.canBeApplied) +
                  (WebNode.boostDecrease.canBeApplied && WebNode.boostAmp.canBeApplied) +
                  (WebNode.fusionChallengeQk2.canBeApplied) +
                  (WebNode.electronBoostFusions.canBeApplied),
                  //WebNode.galaxy1.effectOrDefault(0), 
  0);
}

/***
 * This will calculate the total tickspeed multiplier
 */
export function getQuantumTickSpeedMultiplier() {
  let galaxies = effectiveBaseProtoGalaxies();

  const effects = Effects.product(
    //multipliers to galaxies
    WebNode.galaxyAmp,
    FusionUpgrade2(4),
  );

  if (galaxies < 3) {
    // Magic numbers are to retain balancing from before while displaying
    // them now as positive multipliers rather than negative percentages
    let baseMultiplier = 1 / Tickspeed_Quantum.baseTickspeed;    //<- base tickspeed multiplier

    if (player.galaxies === 1) baseMultiplier = 1 / 1.11888888;
    if (player.galaxies === 2) baseMultiplier = 1 / 1.11267177;

    if (FusionChallenge(5).isRunning){  //fusion challenge 3
      //baseMultiplier = 1 / 1.15;
      if (player.galaxies === 1) baseMultiplier = 1 / 1.14514509;
      if (player.galaxies === 2) baseMultiplier = 1 / 1.14015125;
    }

    //challenge
    if (FusionChallenge(7).isRunning) {
      baseMultiplier *= GenBoostDown.totalBoosts === 0 ? 1 : Math.pow(0.99, GenBoostDown.totalBoosts);
      baseMultiplier *= GenBoostUp.totalBoosts === 0 ? 1 : Math.pow(0.99, GenBoostUp.totalBoosts);
    }

    const perGalaxy = 0.02 * effects;

    return DC.D0_01.clampMin(baseMultiplier - (galaxies * perGalaxy));
  }

  //this should come out to  0.8
  let baseMultiplier = 0.1 / (Tickspeed_Quantum.baseTickspeed - 1);
  galaxies -= 2;
  galaxies *= effects;

  //challenge
  if (FusionChallenge(7).isRunning) {
    baseMultiplier *= GenBoostDown.totalBoosts === 0 ? 1 : Math.pow(0.99, GenBoostDown.totalBoosts);
    baseMultiplier *= GenBoostUp.totalBoosts === 0 ? 1 : Math.pow(0.99, GenBoostUp.totalBoosts);
  }

  const perGalaxy = DC.D0_965;

  return perGalaxy.pow(galaxies - 2).times(baseMultiplier);
}


/***
 * This will buy a single tickspeed upgrade
 * @returns whether the puchase was successful
 */
export function buyTickSpeedQuantum() {
  if (!Tickspeed_Quantum.isAvailableForPurchase || !Tickspeed_Quantum.isAffordable) return false;

  if (FusionChallenge(10).isRunning) return;

  TutorialQuantum.turnOffEffect(TUTORIAL_QUANTUM_STATE.TICKSPEED);
  Currency.quarks1.subtract(Tickspeed_Quantum.cost);
  player.totalTickQuantumBought++;
  //player.requirementChecks.permanent.singleTickspeed++;

  //challenge handling
  if (FusionChallenge(2).isRunning) Currency.fc2_production.value = Math.clampMin(Currency.fc2_production.value * 1 - 0.012, 0.01);

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

  if (FusionChallenge(10).isRunning) return;

  const purchases = Tickspeed_Quantum.costScale.getMaxBought(player.totalTickQuantumBought, Currency.quarks1.value, 1);
  if (purchases === null) {
      return;
  }
  Currency.quarks1.subtract(Decimal.pow10(purchases.logPrice));
  player.totalTickQuantumBought += purchases.quantity;
  boughtTickspeed = true;

  //challenge handling
  if (FusionChallenge(2).isRunning) Currency.fc2_production.value *= 1 - (0.012 * purchases.quantity);

  /*if (boughtTickspeed) {
    player.records.thisInfinity.lastBuyTime = player.records.thisInfinity.time;
  }*/
}

/**
 * Here's where our definition of our Max All function will be. This will
 * handle buying Up, Down, and Electron-type generators, as well as
 * Tickspeed
 */
export function maxAllQuantum() {

  //player.requirementChecks.infinity.maxAll = true;

  //buy max our 3 initial generators
  maxAllUpQuarkGenerator();
  maxAllDownQuarkGenerator();
  maxAllElectronGenerator();

  // Do this here because tickspeed might not have been unlocked before
  // (and maxAll might have unlocked it by buying dimensions).
  buyMaxTickSpeedQuantum();
}

/***
 * this will reset your number of tickspeed upgrades bought
 */
export function resetTickspeedQuantum() {
  player.totalTickQuantumBought = 0;
  player.totalTickQuantumGained = 0;
}

export const Tickspeed_Quantum = {

  /**
   * returns the base tickspeed value
   */
  get baseTickspeed(){
    let tickspeed = 1.125;
    if (FusionChallenge(5).isRunning) tickspeed = 1.15;
    return tickspeed;
  },

  /**
   * specify the condition for unlocking the tickspeed upgrade, making it visible
   */
  get isUnlocked() {
    //Unlock the tickspeed upgrade if we have enough up/down quark generators,
    //if we have done any generator boosts, or have fused at least once
    return (UpQuarkGenerator(1).bought + DownQuarkGenerator(1).bought >= 35) || (player.upBoosts > 0 || player.downBoosts > 0) || PlayerProgress.matterUnlocked();
  },

  /**
   * specify the condition for when the tickspeed upgrade can be bought
   */
  get isAvailableForPurchase() {
    //it can be bought when it's unlocked, and if the cost has not exceeded the maximum possible value 
    return (UpQuarkGenerator(1).bought + DownQuarkGenerator(1).bought >= 35);// && (player.break || this.cost.lt(Decimal.NUMBER_MAX_VALUE));
  },

  /**
   * determin if we can afford to buy a tickspeed upgrade
   */
  get isAffordable() {
    return Currency.quarks1.gte(this.cost);
  },

  get multiplier() {
    return getQuantumTickSpeedMultiplier();
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
      baseCost: 10000,
      baseIncrease: 10,
      costScale: Player.postFusionCostScaleMulti,
      scalingCostThreshold: Number.MAX_VALUE
    });
  },

  get baseValue() {
    //achievement rewards that affect value of tickspeed
    return DC.E3.times(getQuantumTickSpeedMultiplier().pow(this.totalUpgrades));
    //return DC.E3.timesEffectsOf().times(getQuantumTickSpeedMultiplier().pow(this.totalUpgrades));
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