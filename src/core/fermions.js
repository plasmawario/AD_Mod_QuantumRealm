import { GameMechanicState, SetPurchasableMechanicState } from "./game-mechanics";
import { DC } from "./constants";

class QuarkUpgradeState extends SetPurchasableMechanicState {
    get currency() {
      return Currency.quarks1;
    }
  
    get set() {
      return player.quarkUpgrades;
    }
  }
  
  /***
   * This class indicates one upgrade's properties
   */
  class UpQuarkMultiplierState extends GameMechanicState {
    constructor() {
      super({});
      this.cachedCost = new Lazy(() => this.costAfterCount(player.quarkUpMultiplierNum));
      this.cachedEffectValue = new Lazy(() => DC.D5.pow(player.quarkUpMultiplierNum));
    }
  
    get isAffordable() {
      return Currency.quarks1.gte(this.cost);
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
  
    reset() {
      this.boughtAmount = 0;
    }
  
    costAfterCount(count) {
      return DC.E3.pow(count + Math.pow(Math.clampMin(count - 1334, 0), 1.2)).times(500);
    }
  }
  
  export const FermionUpgrade = mapGameDataToObject(
    GameDatabase.fermions.upgrades,
    config => new QuarkUpgradeState(config)
  );
  
  FermionUpgrade.upQuarkMultiplier = new UpQuarkMultiplierState();
  