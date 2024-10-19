import { DC } from "../constants";

import { UpgradeableAutobuyerStateQuantum } from "./autobuyer";

export class ElectronGeneratorAutobuyerState extends UpgradeableAutobuyerStateQuantum {
  get tier() {
    return this.id;
  }

  get name() {
    return ElectronGenerator(this.tier).shortDisplayName;
  }

  get fullName() {
    return `${this.name} Generator`;
  }

  get data() {
    return player.auto.electronGens.all[this.tier - 1];
  }

  get baseInterval() {
    return Player.defaultStart.auto.electronGens.all[this.tier - 1].interval;
  }

  get isUnlocked() {
    return this.data.isBought || this.canBeUpgraded;
  }

  get isBought() {
    return FusionUpgrade2(12).isBought;
  }

  get quarkCost() {
    return DC.D1;
  }

  //tlese autobuyers are automatically given for free after buying the fusion upgrade.
  //it should remain hidden and inaccessable otherwise
  get canBeBought() {
    return FusionUpgrade2(12).isBought;
  }

  //upgradeable after making matter, maybe?
  get canBeUpgraded() {
    return FusionUpgrade2(12).isBought;
  }

  //modify this to reflect our own prestige layers
  get resetTickOn() {
    return PRESTIGE_EVENT.FUSION_RESET_AFTER;
  }

  get bulk() {
    // Use 1e100 to avoid issues with Infinity.
    return this.hasUnlimitedBulk ? 1e100 : Math.clampMax(this.data.bulk, this.bulkCap);
  }

  //automaticaly make bulk unlimited when it's at 512
  get hasUnlimitedBulk() {
    return this.data.bulk >= 512;
  }

  get bulkCap() {
    return 512;
  }

  get hasMaxedBulk() {
    return this.bulk >= this.bulkCap;
  }

  get mode() {
    return this.data.mode;
  }

  set mode(value) {
    this.data.mode = value;
  }

  get canUnlockSlowVersion() {
    return player.records.totalQuarks.gte(this.cost);
  }

  toggleMode() {
    this.mode = [
      AUTOBUYER_MODE.BUY_SINGLE,
      AUTOBUYER_MODE.BUY_MAX
    ]
      .nextSibling(this.mode);
  }

  // We don't want to directly call super.canTick here because the game logic works really weirdly in terms of
  // interactions between individual and group AD autobuyers. The UI can change and certain settings can become
  // unmodifiable in some conditions. This is basically the lowest-effort solution to support legacy behavior
  // because the proper alternatve of an AD autobuyer refactor to untangle this mess is likely not worth the effort
  get canTick() {
    // AD autobuyer-specific logic; if the UI is collapsed then we are unable to toggle groupSetting.
    // In terms of UX for this case it makes the most sense to ignore it and pretend it's true
    const settingConfig = player.auto.electronGens;
    const individualSetting = settingConfig.all[this.tier - 1];
    const groupSetting = settingConfig.isActive;
    const thisSetting = individualSetting && (Autobuyer.electronGenerator.collapseDisplay ? groupSetting : true);

    // General availability
    const dim = ElectronGenerator(this.tier);
    const hasAutobuyer = dim.isAvailableForPurchase && dim.isAffordable;

    // From IntervaledAutobuyerState.canTick
    const intervalTick = this.timeSinceLastTick >= this.interval;

    // From AutobuyerState.canTick (ignores this.constructor.isActive because that's accounted for in thisSetting)
    const autoTick = player.auto.autobuyersOn && this.isActive && (this.isUnlocked || this.isBought);

    return thisSetting && hasAutobuyer && intervalTick && autoTick;
  }

  tick() {
    super.tick();
    const tier = this.tier;
    switch (this.mode) {
      case AUTOBUYER_MODE.BUY_SINGLE:
        buyMaxElectronGenerator(tier);
        break;
      case AUTOBUYER_MODE.BUY_MAX:
        buyMaxElectronGenerator(tier, this.bulk);
        break;
    }
  }

  upgradeBulk() {
    if (this.hasMaxedBulk) return;
    if (!Currency.matter_quantum.purchase(this.cost)) return;
    this.data.bulk = Math.clampMax(this.bulk * 2, this.bulkCap);
    this.data.cost = Math.ceil(2.4 * this.cost);
    GameUI.update();
  }

  purchase() {
    if (!this.canUnlockSlowVersion) return;
    this.data.isBought = true;
  }

  get resetTickOn() {
    return PRESTIGE_QUANTUM_EVENT.FUSION;
  }

  reset() {
    super.reset();
    this.data.isUnlocked = false;
    this.data.isBought = false;
    this.data.bulk = 1;
    TabNotification.newAutobuyer.clearTrigger();
  }

  static get entryCount() { return 3; }
  static get autobuyerGroupName() { return "Electron-type"; }
  static get isActive() { return player.auto.electronGens.isActive; }
  static set isActive(value) { player.auto.electronGens.isActive = value; }


  static createAccessor() {
    const accessor = super.createAccessor();
    Object.defineProperties(accessor, {
      allBought: { get: () => accessor.zeroIndexed.every(x => x.isBought) },
      // Unlike with AD, where all unlimited bulk flags are set at once, these are not, so we have to account for each one individually
      allUnlimitedBulk: { get: () => accessor.zeroIndexed[0].hasUnlimitedBulk && accessor.zeroIndexed[1].hasUnlimitedBulk && accessor.zeroIndexed[2].hasUnlimitedBulk },
      bulkCap: { get: () => accessor.zeroIndexed[0].bulkCap },
      collapseDisplay: { get: () => accessor.allMaxedInterval && accessor.allUnlocked && accessor.allUnlimitedBulk }
    });
    return accessor;
  }
}
