/**
 * @abstract
 */
export class AutobuyerState {
  constructor(id = null) {
    this._id = id;
  }

  /**
   * @abstract
   */
  get data() { throw new NotImplementedError(); }

  /**
   * @abstract
   */
  get isUnlocked() { throw new NotImplementedError(); }

  get id() { return this._id; }

  get canTick() {
    const isDisabled = !player.auto.autobuyersOn || !this.constructor.isActive;
    return this.isActive && !isDisabled && (this.isUnlocked || this.isBought);
  }

  get isActive() {
    return this.data.isActive;
  }

  set isActive(value) {
    this.data.isActive = value;
  }

  get bulk() {
    return 1;
  }

  toggle() {
    this.isActive = !this.isActive;
  }

  /**
   * @abstract
   */
  tick() { throw new NotImplementedError(); }

  // eslint-disable-next-line no-empty-function
  reset() { }

  static get entryCount() { return 1; }

  /**
   * @abstract
   * @returns {string}
   */
  static get autobuyerGroupName() { throw new NotImplementedError(); }
  static get isActive() { return true; }
  /** @abstract */
  static set isActive(value) { throw new NotImplementedError(); }

  static createAccessor() {
    const entryCount = this.entryCount;
    /** @type {object[]} */
    const zeroIndexed = Array.range(1, entryCount).map(id => new this(id));
    const oneIndexed = [null, ...zeroIndexed];
    /** @param {number} id */
    const accessor = id => oneIndexed[id];
    Object.defineProperties(accessor, {
      oneIndexed: { get: () => oneIndexed },
      zeroIndexed: { get: () => zeroIndexed },
      entryCount: { get: () => entryCount },
      anyUnlocked: { get: () => zeroIndexed.some(x => x.isUnlocked) },
      allUnlocked: { get: () => zeroIndexed.every(x => x.isUnlocked) },
      allActive: { get: () => zeroIndexed.every(x => x.isActive) },
      groupName: { get: () => this.autobuyerGroupName },
      isActive: {
        get: () => this.isActive,
        set: value => { this.isActive = value; },
      },
    });
    accessor.toggle = () => this.isActive = !this.isActive;
    return accessor;
  }
}


/**
 * @abstract
 */
export class IntervaledAutobuyerState extends AutobuyerState {
  get interval() {
    return this.data.interval;
  }

  get canTick() {
    return super.canTick && this.timeSinceLastTick >= this.interval;
  }

  get timeSinceLastTick() {
    return player.records.realTimePlayed - this.data.lastTick;
  }

  tick() {
    this.data.lastTick = player.records.realTimePlayed;
  }

  /**
   * @abstract
   */
  get resetTickOn() { return undefined; }

  resetTick(prestigeEvent) {
    if (prestigeEvent >= this.resetTickOn) this.data.lastTick = 0;
  }

  // eslint-disable-next-line no-empty-function
  reset() { }
}


/**
 * @abstract
 */
export class UpgradeableAutobuyerState extends IntervaledAutobuyerState {
  /**
  * @abstract
  */
  get baseInterval() { throw new NotImplementedError(); }

  get cost() {
    return this.data.cost;
  }

  get interval() {
    //console.log(this.data);
    const interval = this.data.interval;
    return BreakInfinityUpgrade.autobuyerSpeed.isBought ? interval / 2 : interval;
  }

  get hasMaxedInterval() {
    return this.data.interval <= 100;
  }

  upgradeInterval(free) {
    if (this.hasMaxedInterval) return;
    if (!free && !Currency.infinityPoints.purchase(this.cost)) return;
    this.data.cost *= 2;
    this.data.interval = Math.clampMin(this.data.interval * 0.6, 100);
    Achievement(52).tryUnlock();
    Achievement(53).tryUnlock();
    GameUI.update();
  }

  maxIntervalForFree() {
    while (!this.hasMaxedInterval) {
      this.upgradeInterval(true);
    }
  }

  reset() {
    if (EternityMilestone.keepAutobuyers.isReached || PelleUpgrade.keepAutobuyers.canBeApplied) return;
    this.data.interval = this.baseInterval;
    this.data.cost = 1;
  }

  static createAccessor() {
    const accessor = super.createAccessor();
    Object.defineProperty(accessor, "allMaxedInterval", {
      get: () => accessor.zeroIndexed.every(x => x.hasMaxedInterval)
    });
    Object.defineProperty(accessor, "hasInstant", {
      get: () => accessor.zeroIndexed.some(x => x.interval < player.options.updateRate)
    });
    return accessor;
  }
}


/**
 * variant of my variant that's specifically for the fusion autobuyer
 */
export class UpgradeableAutobuyerStateQuantumFusion extends IntervaledAutobuyerState {
  /**
  * @abstract
  */
  get baseInterval() { throw new NotImplementedError(); }

  get cost() {
    return this.data.cost;
  }

  get interval() {
    //console.log(this.data);
    const interval = this.data.interval;
    return interval;
  }

  /**
   * the interval the fusion autobuyer needs to reach to enable continuous fusion
   */
  get hasMaxedInterval() {
    return this.data.interval <= 10;
  }

  /**
   * the original first "maxing" of interval
   */
  get isIntervalAt100() {
    return this.data.interval <= 100;
  }

  /**
   * logic for upgrading the interval
   * @param {*} free whether this upgrade is free
   * @returns null
   */
  upgradeInterval(free) {
    //if interval is maxed, obviously do not upgrade it
    if (this.hasMaxedInterval) return;

    //if the interval has hit the first upgrade limit without the powerup that enables
    //further upgrading, do not upgrade
    if (this.isIntervalAt100) return;

    //if this upgrade is not free, and if we cannot afford this, do not
    if (!free && !Currency.matter_quantum.purchase(this.cost)) return;

    //do
    this.data.cost *= 2;
    this.data.interval = false ? Math.clampMin(this.data.interval * 0.5, 10) : Math.clampMin(this.data.interval * 0.5, 100);
    GameUI.update();
  }

  /**
   * instantly max out the interval for this autobuyer for free
   */
  maxIntervalForFree() {
    //max out interval to their respective limits based on if we have the specific upgrades
    if (false){
      while (!this.isIntervalAt100) {
        this.upgradeInterval(true);
      }
    }else{
      while (!this.hasMaxedInterval) {
        this.upgradeInterval(true);
      }
    }
  }

  /**
   * reset this autobuyer's interval
   * @returns 
   */
  reset() {
    if (EternityMilestone.keepAutobuyers.isReached) return;
    this.data.interval = this.baseInterval;
    this.data.cost = 1;
  }

  static createAccessor() {
    const accessor = super.createAccessor();
    Object.defineProperty(accessor, "allMaxedInterval", {
      get: () => accessor.zeroIndexed.every(x => x.hasMaxedInterval)
    });
    Object.defineProperty(accessor, "allIntervalAt100", {
      get: () => accessor.zeroIndexed.every(x => x.isIntervalAt100)
    });
    Object.defineProperty(accessor, "hasInstant", {
      get: () => accessor.zeroIndexed.some(x => x.interval < player.options.updateRate)
    });
    return accessor;
  }
}

/**
 * My own varient that uses matter as the upgrade currency instead of IP
 */
export class UpgradeableAutobuyerStateQuantum extends IntervaledAutobuyerState {
  /**
  * @abstract
  */
  get baseInterval() { throw new NotImplementedError(); }

  get cost() {
    return this.data.cost;
  }

  get interval() {
    //console.log(this.data);
    const interval = this.data.interval;
    return interval;
  }

  get hasMaxedInterval() {
    return this.data.interval <= 100;
  }

  /**
   * logic for upgrading the interval
   * @param {*} free whether this upgrade is free
   * @returns null
   */
  upgradeInterval(free) {
    //if interval is maxed, obviously do not upgrade it
    if (this.hasMaxedInterval) return;

    //if this upgradfe is not free, and if we cannot afford this, do not
    if (!free && !Currency.matter_quantum.purchase(this.cost)) return;

    //do
    this.data.cost *= 2;
    this.data.interval = Math.clampMin(this.data.interval * 0.5, 100);
    GameUI.update();
  }

  /**
   * instantly max out the interval for this autobuyer for free
   */
  maxIntervalForFree() {
    while (!this.hasMaxedInterval) {
      this.upgradeInterval(true);
    }
  }

  /**
   * reset this autobuyer's interval
   * @returns 
   */
  reset() {
    if (EternityMilestone.keepAutobuyers.isReached) return;
    this.data.interval = this.baseInterval;
    this.data.cost = 1;
  }

  static createAccessor() {
    const accessor = super.createAccessor();
    Object.defineProperty(accessor, "allMaxedInterval", {
      get: () => accessor.zeroIndexed.every(x => x.hasMaxedInterval)
    });
    Object.defineProperty(accessor, "hasInstant", {
      get: () => accessor.zeroIndexed.some(x => x.interval < player.options.updateRate)
    });
    return accessor;
  }
}