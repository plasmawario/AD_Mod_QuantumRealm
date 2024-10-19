import { DC } from "../constants";

import { UpgradeableAutobuyerStateQuantum } from "./autobuyer";

export class QuantumTickspeedAutobuyerState extends UpgradeableAutobuyerStateQuantum {
  get data() {
    return player.auto.tickspeed_quantum;
  }

  get name() {
    return `Tickspeed`;
  }

  get isUnlocked() {
    return this.canBeUpgraded;
  }

  get canBeUpgraded() {
    return FusionChallenge(7).isCompleted;
  }

  get baseInterval() {
    return Player.defaultStart.auto.tickspeed_quantum.interval;
  }

  get isBought() {
    return this.data.isBought;
  }

  get quarkCost() {
    return DC.E90;
  }

  get canBeBought() {
    return true;
  }

  get mode() {
    return this.data.mode;
  }

  set mode(value) {
    this.data.mode = value;
  }

  get hasUnlimitedBulk() {
    return this.mode === AUTOBUYER_MODE.BUY_MAX;
  }

  get canUnlockSlowVersion() {
    return player.records.thisFusion.maxQuarks.gte(this.quarkCost);
  }

  toggleMode() {
    this.mode = [
      AUTOBUYER_MODE.BUY_SINGLE,
      AUTOBUYER_MODE.BUY_MAX
    ]
      .nextSibling(this.mode);
  }

  get canTick() {
    return Tickspeed_Quantum.isAvailableForPurchase && Tickspeed_Quantum.isAffordable && super.canTick;
  }

  tick() {
    super.tick();
    switch (this.mode) {
      case AUTOBUYER_MODE.BUY_SINGLE:
        buyTickSpeedQuantum();
        break;
      case AUTOBUYER_MODE.BUY_MAX:
        buyMaxTickSpeedQuantum();
        break;
    }
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
    this.data.mode = AUTOBUYER_MODE.BUY_SINGLE;
    this.data.isUnlocked = false;
    this.data.isBought = false;
    TabNotification.newAutobuyer.clearTrigger();
  }
}
