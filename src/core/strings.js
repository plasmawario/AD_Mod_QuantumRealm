import { DC } from "./constants";

/**
 * @abstract
 */
export class StringPurchaseType {
  /**
  * @abstract
  */
  get amount() { throw new NotImplementedError(); }

  /**
  * @abstract
  */
  set amount(value) { throw new NotImplementedError(); }

  add(amount) { this.amount += amount; }

  /**
  * @abstract
  */
  get currency() { throw new NotImplementedError(); }

  get cost() { return this.costBase.times(this.costIncrement.pow(this.amount)); }

  /**
   * @abstract
   */
  get costBase() { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  get costIncrement() { throw new NotImplementedError(); }

  get bulkPossible() {
    return Decimal.affordGeometricSeries(this.currency.value, this.cost, this.costIncrement, 0).toNumber();
  }

  // Note: This is actually just the cost of the largest term of the geometric series. If buying EP without the
  // perk that makes them free, this will be incorrect, but the EP object already overrides this anyway
  bulkCost(amount) {
    return this.cost.times(this.costIncrement.pow(amount - 1));
  }

  purchase(bulk) {
    if (!this.canAfford) return false;
    let purchased = false;
    const amount = this.bulkPossible;
    const buyFn = cost => (this.currency.purchase(cost));
    // This will sometimes buy one too few for EP, so we just have to buy 1 after.
    if (bulk && buyFn(this.bulkCost(amount))) {
      Currency.strings.add(amount);
      this.add(amount);
      purchased = true;
    }
    if (buyFn(this.cost)) {
      Currency.strings.add(1);
      this.add(1);
      purchased = true;
    }

    //update node colors, size and title textx when we buy strings so we can refresh
    //the node availability and certain information
    WebNetwork.updatePerkColor();
    WebNetwork.updatePerkTitleText();
    WebNetwork.updatePerkSize();

    //achievement
    QuantumAchievement(44).tryUnlock();

    return purchased;
  }

  get canAfford() {
    return this.currency.gte(this.cost) && QuantumAchievement(27).isUnlocked;
  }

  reset() {
    this.amount = 0;
  }
}

StringPurchaseType.matter = new class extends StringPurchaseType {
  get amount() { return player.web.matterBought; }
  set amount(value) { player.web.matterBought = value; }

  get currency() { return Currency.matter_quantum; }
  get costBase() { return DC.E2; }
  get costIncrement() { return DC.D1_5; }

  bulkCost(amount) {
    return this.costIncrement.pow(amount + this.amount).subtract(this.cost);
  }
}();

export const WebStrings = {
  checkForBuying(auto) {
    if (PlayerProgress.quantumWebUnlocked()) return true;

    return false;
  },

  buyOne(auto = false, type) {
    if (!this.checkForBuying(auto)) return 0;
    if (!StringPurchaseType[type].purchase(false)) return 0;
    return 1;
  },

  buyMax(auto = false) {
    if (!this.checkForBuying(auto)) return 0;
    return StringPurchaseType.matter.purchase(true);
  },

  totalPurchased() {
    return StringPurchaseType.matter.amount;
  },

  calculateStringsCost() {
    let totalCost = player.webNodes
      .map(ts => ts.cost)
      .reduce(Number.sumReducer, 0);

    return totalCost;
  }
};
