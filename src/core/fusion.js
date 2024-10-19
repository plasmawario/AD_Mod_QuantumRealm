import { BitPurchasableMechanicState, RebuyableMechanicState, GameMechanicState } from "./game-mechanics";

class FusionUpgradeState extends BitPurchasableMechanicState {
  constructor(config) {
    super(config);
  }

  get name() {
    return this.config.name;
  }

  get shortDescription() {
    return this.config.shortDescription ? this.config.shortDescription() : "";
  }

  get currency() {
    return Currency.matter_quantum;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.nuclearFusion.upgradeBits;
  }

  set bits(value) {
    player.nuclearFusion.upgradeBits = value;
    QuantumAchievement(27).tryUnlock();
  }

  /*get isAvailableForPurchase() {
    return (player.reality.upgReqs & (1 << this.id)) !== 0;
  }*/
}

class FusionUpgradeStateB extends BitPurchasableMechanicState {
  constructor(config) {
    super(config);
  }

  get name() {
    return this.config.name;
  }

  get shortDescription() {
    return this.config.shortDescription ? this.config.shortDescription() : "";
  }

  get currency() {
    return Currency.matter_quantum;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.nuclearFusion.upgradeBbits;
  }

  set bits(value) {
    player.nuclearFusion.upgradeBbits = value;
    QuantumAchievement(27).tryUnlock();
  }

  /*get isAvailableForPurchase() {
    return (player.reality.upgReqs & (1 << this.id)) !== 0;
  }*/
}

class FusionUpgradeState2 extends BitPurchasableMechanicState {
  constructor(config) {
    super(config);
  }

  get name() {
    return this.config.name;
  }

  get shortDescription() {
    return this.config.shortDescription ? this.config.shortDescription() : "";
  }

  get currency() {
    return Currency.matter_quantum;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.nuclearFusion.upgrade2Bits;
  }

  set bits(value) {
    player.nuclearFusion.upgrade2Bits = value;
    GameCache.postFusionCostScaleMulti.invalidate()
  }

  /*get isAvailableForPurchase() {
    return (player.reality.upgReqs & (1 << this.id)) !== 0;
  }*/
}

class RebuyableFusionUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.matter_quantum;
  }

  get boughtAmount() {
    return player.nuclearFusion.rebuyables[this.id];
  }

  set boughtAmount(value) {
    player.nuclearFusion.rebuyables[this.id] = value;
  }
}

/*export function totalGluonMult() {
    let gluonMult = DC.D1
      .times(ShopPurchase.IPPurchases.currentMult)
      .timesEffectsOf(
        TimeStudy(41),
        TimeStudy(51),
        TimeStudy(141),
        TimeStudy(142),
        TimeStudy(143),
        Achievement(85),
        Achievement(93),
        Achievement(116),
        Achievement(125),
        Achievement(141).effects.ipGain,
        InfinityUpgrade.ipMult,
        DilationUpgrade.ipMultDT,
        GlyphEffect.ipMult
      );
    ipMult = ipMult.times(Replicanti.amount.powEffectOf(AlchemyResource.exponential));
    return ipMult;
  }*/

/***
 * This function maps the upgrade data into either repeatable upgrades or one-time upgrades
 */
FusionUpgradeState.index = mapGameData(
  GameDatabase.fusion.upgrades,

  //we can sort out one-time upgrades and rebuyables upgrades. Gonna keep this down here just in case i need to know how to do just that
  config => (
    config.rebuyable === true
    ? new RebuyableFusionUpgradeState(config)
    : new FusionUpgradeState(config)
  )
);

/**
* @param {number} id
* @return {FusionUpgradeState|RebuyableFusionUpgradeState}
*/
export const FusionUpgrade = id => FusionUpgradeState.index[id];

export const FusionUpgrades = {
  /**
   * @type {(FusionUpgradeState|RebuyableFusionUpgradeState)[]}
   */
  all: FusionUpgradeState.index.compact()
};

FusionUpgradeStateB.index = mapGameData(
  GameDatabase.fusion.upgrades_b,

  //we can sort out one-time upgrades and rebuyables upgrades. Gonna keep this down here just in case i need to know how to do just that
  config => new FusionUpgradeStateB(config)
);

/**
* @param {number} id
* @return {FusionUpgradeStateB}
*/
export const FusionUpgradeB = id => FusionUpgradeStateB.index[id];

export const FusionUpgradeBs = {
  /**
   * @type {(FusionUpgradeStateB)[]}
   */
  all: FusionUpgradeStateB.index.compact()
};

FusionUpgradeState2.index = mapGameData(
  GameDatabase.fusion.upgrades_2,

  //we can sort out one-time upgrades and rebuyables upgrades. Gonna keep this down here just in case i need to know how to do just that
  config => new FusionUpgradeState2(config)
);

/**
* @param {number} id
* @return {FusionUpgradeState2}
*/
export const FusionUpgrade2 = id => FusionUpgradeState2.index[id];

export const FusionUpgrade2s = {
  /**
   * @type {(FusionUpgradeState2)[]}
   */
  all: FusionUpgradeState2.index.compact()
};

// The repeatable 2xIP upgrade has an odd cost structure - it follows a shallow exponential (step *10) up to e3M, at
// which point it follows a steeper one (step *1e10) up to e6M before finally hardcapping. At the hardcap, there's
// an extra bump that increases the multipler itself from e993k to e1M. All these numbers are specified in
// GameDatabase.infinity.upgrades.ipMult
class GluonMultUpgrade extends GameMechanicState {
  get cost() {
    if (this.purchaseCount >= this.purchasesAtIncrease) {
      return this.config.costIncreaseThreshold
        .times(Decimal.pow(this.costIncrease, this.purchaseCount - this.purchasesAtIncrease));
    }
    return Decimal.pow(this.costIncrease, this.purchaseCount + 1);
  }

  get purchaseCount() {
    return player.nuclearFusion.gluonPurchases;
  }

  get purchasesAtIncrease() {
    return this.config.costIncreaseThreshold.log10() - 1;
  }

  get hasIncreasedCost() {
    return this.purchaseCount >= this.purchasesAtIncrease;
  }

  get costIncrease() {
    /*let costIncrease = this.config.initialCost;
    for (let i = this.config.costMultThresholds.length - 1; i > 0; i --){
      if (this.config.costMultThresholds[i]) {
          costIncrease = this.config.constMult[i];
          break;
      }
    }
    return costIncrease;*/

    //set different costincreases based on if we have A-GMUL or not
    if (WebNode.gluonMultUnlock.canBeApplied && false){
      return this.hasIncreasedCost ? this.config.costMultWebUpgrade[1] : this.config.costMultWebUpgrade[0];
    }else{
      return this.hasIncreasedCost ? this.config.costMult[1] : this.config.costMult[0];
    }
    
  }

  get isCapped() {
    return this.cost.gte(this.config.costCap);
  }

  get isBought() {
    return this.isCapped;
  }

  get isRequirementSatisfied() {
    return true;
    //return Achievement(41).isUnlocked;
  }

  get canBeBought() {
    return !this.isCapped && Currency.matter_quantum.gte(this.cost) && this.isRequirementSatisfied;
  }

  // This is only ever called with amount = 1 or within buyMax under conditions that ensure the scaling doesn't
  // change mid-purchase
  purchase(amount = 1) {
    if (!this.canBeBought) return;
    const prevMult = Currency.gluons.value.times(Currency.gluonMult.value);
    Currency.matter_quantum.subtract(Decimal.sumGeometricSeries(amount, this.cost, this.costIncrease, 0));
    player.nuclearFusion.gluonPurchases += amount;
    player.nuclearFusion.gluons = player.nuclearFusion.gluons.add(amount);
    Autobuyer.fusion.bumpAmount(Currency.gluons.value.times(Currency.gluonMult.value).subtract(prevMult).pow(amount));
    GameUI.update();
  }

  buyMax() {
    if (!this.canBeBought) return;
    if (!this.hasIncreasedCost) {
      // Only allow IP below the softcap to be used
      const availableMatter = Currency.matter_quantum.value.clampMax(this.config.costIncreaseThreshold);
      const purchases = Decimal.affordGeometricSeries(availableMatter, this.cost, this.costIncrease, 0).toNumber();
      if (purchases <= 0) return;
      this.purchase(purchases);
    }
    // Do not replace it with `if else` - it's specifically designed to process two sides of threshold separately
    // (for example, we have 1e4000000 IP and no mult - first it will go to (but not including) 1e3000000 and then
    // it will go in this part)
    if (this.hasIncreasedCost) {
      const availableMatter = Currency.matter_quantum.value.clampMax(this.config.costCap);
      const purchases = Decimal.affordGeometricSeries(availableMatter, this.cost, this.costIncrease, 0).toNumber();
      if (purchases <= 0) return;
      this.purchase(purchases);
    }
  }
}

/***
 * This function maps the upgrade data into the buy gluon gamestate
 */
export const BuyGluonUpgrade = mapGameDataToObject(
  GameDatabase.fusion.buyGluonUpgrade,
  config => (new GluonMultUpgrade(config))
);


/*
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
*/

/*
class QuarkUpgradeState extends SetPurchasableMechanicState {
  get currency() {
    return Currency.quarks1;
  }

  get set() {
    return player.quarkUpgrades;
  }
}
*/

/***
 * This class indicates the upgrade properties for the Up Quark Multiplier
 */
/*
class UpQuarkMultiplierState extends GameMechanicState {
  constructor() {
    super({});
    this.cachedCost = new Lazy(() => this.costAfterCount(player.quarkUpMultiplierNum));
    this.cachedEffectValue = new Lazy(() => DC.D1_1.times(player.quarkUpMultiplierNum + 1));
  }

  get isAffordable() {
    return Currency.quarks1.gte(this.cost);
  }

  get description() {
    return GameDatabase.fermions.upgrades.idUpGenMulti;
  }

  get cost() {
    return this.cachedCost.value;
  }

  get boughtAmount() {
    return player.quarkUpMultiplierNum;
  }

  set boughtAmount(value) {
    // Reality resets will make this bump amount negative, causing it to visually appear as 0 even when it isn't.
    // A dev migration fixes bad autobuyer states and this change ensures it doesn't happen again
    const diff = Math.clampMin(value - player.quarkUpMultiplierNum, 0);
    player.quarkUpMultiplierNum = value;
    this.cachedCost.invalidate();
    this.cachedEffectValue.invalidate();
    //Autobuyer.eternity.bumpAmount(DC.D5.pow(diff));
  }

  get isCustomEffect() {
    return true;
  }

  get effectValue() {
    return this.cachedEffectValue.value;
  }

  purchase() {
    if (!this.isAffordable) return false;
    Currency.quarks1.subtract(this.cost);
    ++this.boughtAmount;
    return true;
  }

  buyMax() {
    if (!this.isAffordable) return false;
    const bulk = bulkBuyBinarySearch(Currency.quarks1.value, {
      costFunction: this.costAfterCount,
      cumulative: true,
      firstCost: this.cost,
    }, this.boughtAmount);
    if (!bulk) return false;
    Currency.quarks1.subtract(bulk.purchasePrice);
    this.boughtAmount += bulk.quantity;
    return true;
  }

    ***
    * resets the number of times this upgrade has been bought
    *
  reset() {
    this.boughtAmount = 0;
  }

  ***
    * calculates the cost of the upgrade after considering the number of times we've bought this upgrade
    * @param {Number} count the number of times we've bought this upgrade
    * @returns {Decimal} the newly calculated cost
    *
  costAfterCount(count) {
    return DC.E3.pow(count + 1);
  }
}

export const FermionUpgrade = mapGameDataToObject(
  GameDatabase.fermions.upgrades,
  config => new QuarkUpgradeState(config)
);

FermionUpgrade.upQuarkMultiplier = new UpQuarkMultiplierState();
*/
  