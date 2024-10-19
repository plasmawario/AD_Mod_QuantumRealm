export class DimensionState {
    constructor(getData, tier) {
      this._tier = tier;
      this._getData = getData;
      const DISPLAY_NAMES = [null, "First", "Second", "Third"];
      this._displayName = DISPLAY_NAMES[tier];
      const SHORT_DISPLAY_NAMES = [null, "1st", "2nd", "3rd"];
      this._shortDisplayName = SHORT_DISPLAY_NAMES[tier];
    }
  
    get tier() { return this._tier; }
  
    get displayName() { return this._displayName; }
    get shortDisplayName() { return this._shortDisplayName; }
  
    get data() { return this._getData()[this.tier - 1]; }
  
    /** @returns {Decimal} */
    get amount() { return this.data.amount; }
    /** @param {Decimal} value */
    set amount(value) { this.data.amount = value; }
  
    /** @returns {number} */
    get bought() { return this.data.bought; }
    /** @param {number} value */
    set bought(value) { this.data.bought = value; }
  
    /** @abstract */
    get productionPerSecond() { throw new NotImplementedError(); }
  
    get productionPerRealSecond() {
      return this.productionPerSecond.times(getGameSpeedupForDisplay());
    }
  
    productionForDiff(diff) {
      return this.productionPerSecond.times(diff / 1000);
    }
  
    produceCurrency(currency, diff) {
      currency.add(this.productionForDiff(diff))
    }

    /**
     * a modified version of produceCurrency designed to give much less
     * production of a currency. This is stored in a seperate function so
     * that things in the game that just want to produce things at a normal
     * rate aren't impacted by extra calculations
     * @param {*} currency currency to produce
     * @param {*} diff diff
     * @param {*} power the exponent to apply to production
     */
    produceCurrencyModified(currency, diff, power = 1) {
      currency.add(Decimal.pow(this.productionForDiff(diff), power));
    }
  
    produceDimensions(dimension, diff) {
      dimension.amount = dimension.amount.plus(this.productionForDiff(diff));
    }
  
    static get dimensionCount() { return 3; }
  
    static createAccessor() {
      const index = Array.range(1, this.dimensionCount).map(tier => new this(tier));
      index.unshift(null);
      const accessor = tier => index[tier];
      accessor.index = index;
      return accessor;
    }
  }
  