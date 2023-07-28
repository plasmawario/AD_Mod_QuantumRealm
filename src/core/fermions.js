import { BitPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";

class QuarkUpgradeState extends BitPurchasableMechanicState {
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
    return Currency.quarks1;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.quarks.upgradeBits;
  }

  set bits(value) {
    player.quarks.upgradeBits = value;
  }

  /*get isAvailableForPurchase() {
    return (player.reality.upgReqs & (1 << this.id)) !== 0;
  }*/
}

class RebuyableQuarkUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.quarks1;
  }

  get boughtAmount() {
    return player.quarks.rebuyables[this.id];
  }

  set boughtAmount(value) {
    player.quarks.rebuyables[this.id] = value;
  }
}

/***
 * This function maps the upgrade data into either repeatable upgrades or one-time upgrades
 */
QuarkUpgradeState.index = mapGameData(
  GameDatabase.fermions.upgrades,

  //we can sort out one-time upgrades and rebuyables upgrades. Gonna keep this down here just in case i need to know how to do just that
  config => (config.rebuyable === true
    ? new RebuyableQuarkUpgradeState(config)
    : new QuarkUpgradeState(config))
);

/**
* @param {number} id
* @return {QuarkUpgradeState|RebuyableQuarkUpgradeState}
*/
export const FermionUpgrade = id => QuarkUpgradeState.index[id];

export const FermionUpgrades = {
  /**
   * @type {(QuarkUpgradeState|RebuyableQuarkUpgradeState)[]}
   */
  all: QuarkUpgradeState.index.compact()
};



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
  