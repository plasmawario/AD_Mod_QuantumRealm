import { DC } from "./constants";
import { FusionChallenge } from "./fusion-challenges";

class GenBoostUpRequirement {
  constructor(tier, amount) {
    this.tier = tier;
    this.amount = amount;
  }

  /**
   * gen boost purchase requirement
   */
  get isSatisfied() {
    const dimension = UpQuarkGenerator(this.tier);
    return dimension.amount.gte(this.amount);
  }
}

export class GenBoostUp {
  static get power() {
    let boost = Effects.max(
      //QuantumAchievement(21).effectOrDefault(7.5),
      7.5,
      FusionUpgrade(8),
      WebNode.boostAmp
    ).toDecimal();

    //fusion challenges
    if (FusionChallenge(5).isRunning) boost = DC.D3;
    if (FusionChallenge(4).isRunning) boost = DC.D5;
    if (FusionChallenge(7).isRunning) boost = DC.D1_01;
    if (FusionChallenge(8).isRunning) boost = DC.D12;

    return boost;
  }

  static multiplierToNDTier(tier) {
    const normalBoostMult = GenBoostUp.power.pow(this.purchasedBoosts + 1 - tier).clampMin(1);
    return normalBoostMult;
  }

  /**
   * sets the maximum dimension we can unlocked with boosts
   */
  static get maxDimensionsUnlockable() {
    return 3;
  }

  /**
   * checks if we can unlock a new dimension based on our max unlockable generators
   */
  static get canUnlockNewDimension() {
    //set to be greater than max generators unlockable after 2 purchases
    return GenBoostUp.purchasedBoosts + 1 < GenBoostUp.maxDimensionsUnlockable;
  }

  /**
   * Determines if there is a maximum amount of boosts we can get
   */
  static get maxBoosts() {
    
    //check if any challenges that limit how many boosts you can get
    //are running. Otherwise, there is no limit to buying boosts

    if (FusionChallenge(7).isRunning) return 2;

    return Infinity;
  }

  /**
   * determins whether we have the ability to buy boosts
   */
  static get canBeBought() {
    if (GenBoostUp.purchasedBoosts >= this.maxBoosts) return false;
    return true;
  }

  /**
   * sets the locked text based on which challenge is currently running
   */
  static get lockText() {
    if (GenBoostUp.purchasedBoosts >= this.maxBoosts) {
      //if (Ra.isRunning) return "Locked (Ra's Reality)";
    }
    return null;
  }

  static get requirement() {
    return this.bulkRequirement(1);
  }

  static bulkRequirement(bulk) {
    const targetResets = GenBoostUp.purchasedBoosts + bulk;
    const tier = Math.min(targetResets + 0, this.maxDimensionsUnlockable);
    const tierLimit = FusionChallenge(8).isRunning ? 1 : 3;
    
    //the default cost of generators & discounts
    let amount = 35;
    /*const discount = Effects.sum(
      0
    );*/
    const discount = FusionChallenge(10).isRunning ? 10 : 0;

    //if were at the 3rd generator, apply  this
    if (tier === 3 || FusionChallenge(8).isRunning) {
      amount += Math.round((targetResets - tierLimit) * (20 - discount));
    }

    amount -= Effects.sum(WebNode.boostDecrease);

    amount = Math.round(amount);

    return new GenBoostUpRequirement(FusionChallenge(8).isRunning ? 1 : tier, amount);
  }

  /**
   * Sets the text of the boost button based on the number of available generators, and how
   * many boosts we have already bought
   */
  static get unlockedByBoost() {
    if (GenBoostUp.lockText !== null) return GenBoostUp.lockText;
    const boosts = FusionChallenge(8).isRunning ? 0 : GenBoostUp.purchasedBoosts;

    //sets the text of the next tier to unlock if we have not exceeded the max number of unlocked
    //generators
    let newUnlock = "";
    if (boosts < GenBoostUp.maxDimensionsUnlockable - 1) {
      newUnlock = `unlock the ${UpQuarkGenerator(boosts + 2).shortDisplayName} Generator`;
    }

    //formats the text in relation to our bought upgrades
    const formattedMultText = `give a ${FusionChallenge(7).isRunning ? formatX(GenBoostUp.power, 2, 2) : formatX(GenBoostUp.power, 2, 1)} multiplier `;
    let dimensionRange = `to the Up Generator`;  //default text to apply boost to
    if (boosts > 0) dimensionRange = `to Generators Up & Charm`;
    //if (boosts > 1) dimensionRange = `to Generators Up, Charm, & Top`;
    if (boosts >= GenBoostUp.maxDimensionsUnlockable - 1) dimensionRange = `to Generators Up, Charm, & Top`;

    //challenges
    if (FusionChallenge(7).isRunning) dimensionRange = `to Tickspeed upgrades`;

    //compile the final text to render
    let boostEffects;
    if (newUnlock === "") boostEffects = `${formattedMultText} ${dimensionRange}`;
    else boostEffects = `${newUnlock} and ${formattedMultText} ${dimensionRange}`;

    //if boosting will give no benefit, return this text instead
    if (boostEffects === "") return "Up Gen Boosts are currently useless";

    //return final boost text
    return `Reset your Generators to ${boostEffects}`;
  }

  static get purchasedBoosts() {
    return Math.floor(player.upBoosts);
  }

  static get totalBoosts() {
    return Math.floor(this.purchasedBoosts);
  }

  /**
   * return the number of initial boosts you get per reset
   */
  static get startingUpGenBoosts() {
    if (FusionUpgrade(12).isBought) return 2;
    if (FusionUpgrade(11).isBought) return 1;
    return 0;
  }
}

/**
 * perform resetting of up quark boosts
 * @param {*} tempBulk 
 * @param {*} forcedReset force-reset generators
 * @param {*} forcedQuarkReset 
 * @param {*} enteringAntimatterChallenge 
 */
// eslint-disable-next-line max-params
export function softResetUpGenBoost(tempBulk, forcedReset = false, forcedQuarkReset = false, enteringAntimatterChallenge = false) {
  const bulk = Math.min(tempBulk, GenBoostUp.maxBoosts - player.upBoosts);
  EventHub.dispatch(GAME_EVENT.UP_BOOST_BEFORE, bulk);
  player.upBoosts = Math.max(0, player.upBoosts + bulk);
  //resetChallengeStuff();

  //reset generators and tickspeed
  const canKeepDimensions = false
  if (forcedReset || !canKeepDimensions) {
    fullResetUpQuarkGenerator();
    fullResetDownQuarkGenerator();
    fullResetElectronGenerator();
    resetTickspeedQuantum();
  }

  skipUpGenBoostResetsIfPossible();

  //reset quarks to startin value
  const canKeepAntimatter = false;
  if (!forcedQuarkReset && canKeepAntimatter) {
    Currency.quarks1.bumpTo(Currency.quarks1.startingValue);
    Currency.electrons.bumpTo(Currency.electrons.startingValue);
  } else {
    Currency.quarks1.reset();
    Currency.electrons.reset();
  }

  //challenge handling
  if (FusionChallenge(2).isRunning) Currency.fc2_production.reset();

  EventHub.dispatch(GAME_EVENT.UP_BOOST_AFTER, bulk);
}

/**
 * automatically sets the boost based on upgrades
 */
export function skipUpGenBoostResetsIfPossible() {
  if (FusionUpgrade(12).isBought && player.upBoosts < 2) player.upBoosts = 2;
  else if (FusionUpgrade(11).isBought && player.upBoosts < 1) player.upBoosts = 1;
}

/**
 * helper function for showing confirmation of buying boosts as well as checking
 * if we can even buy them at all
 * @param {*} bulk 
 * @returns 
 */
export function manualRequestUpGenBoost(bulk) {
  if (!GenBoostUp.requirement.isSatisfied) return;
  if (!GenBoostUp.canBeBought) return;
  if (player.options.confirmations.upGenBoost) {
    Modal.upGenBoost.show({ bulk });
    return;
  }
  requestUpGenBoost(bulk);
}

/**
 * Buys dimension boost in bulk, if we have the upgrade for it, or in singles
 * if otherwise
 * @param {*} bulk 
 * @returns 
 */
export function requestUpGenBoost(bulk) {
  if (!GenBoostUp.requirement.isSatisfied) return;
  if (!GenBoostUp.canBeBought) return;

  TutorialQuantum.turnOffEffect(TUTORIAL_QUANTUM_STATE.BOOST);

  if (FusionUpgrade2(3).isBought && bulk) maxBuyUpGenBoosts();
  else softResetUpGenBoost(1);

  QuantumAchievement(46).tryUnlock();
}

/**
 * bulk buys max boosts
 * @returns null
 */
function maxBuyUpGenBoosts() {
  // Boosts that unlock new dims are bought one at a time, unlocking the next dimension
  if (GenBoostUp.canUnlockNewDimension) {
    if (GenBoostUp.requirement.isSatisfied) softResetUpGenBoost(1);
    return;
  }
  const req1 = GenBoostUp.bulkRequirement(1);
  if (!req1.isSatisfied) return;
  const req2 = GenBoostUp.bulkRequirement(2);
  if (!req2.isSatisfied) {
    softResetUpGenBoost(1);
    return;
  }
  // Linearly extrapolate dimboost costs. req1 = a * 1 + b, req2 = a * 2 + b
  // so a = req2 - req1, b = req1 - a = 2 req1 - req2, num = (dims - b) / a
  const increase = req2.amount - req1.amount;
  const dim = UpQuarkGenerator(req1.tier);
  let maxBoosts = Math.min(Number.MAX_VALUE,
    1 + Math.floor((dim.amount.toNumber() - req1.amount) / increase));
  if (GenBoostUp.bulkRequirement(maxBoosts).isSatisfied) {
    softResetUpGenBoost(maxBoosts);
    return;
  }
  // But in case of EC5 it's not, so do binary search for appropriate boost amount
  let minBoosts = 2;
  while (maxBoosts !== minBoosts + 1) {
    const middle = Math.floor((maxBoosts + minBoosts) / 2);
    if (GenBoostUp.bulkRequirement(middle).isSatisfied) minBoosts = middle;
    else maxBoosts = middle;
  }
  softResetUpGenBoost(minBoosts);
}
