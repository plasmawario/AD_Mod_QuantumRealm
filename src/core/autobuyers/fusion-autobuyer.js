import { UpgradeableAutobuyerStateQuantumFusion } from "./autobuyer";

export class FusionAutobuyerState extends UpgradeableAutobuyerStateQuantumFusion {
  get data() {
    return player.auto.fusion;
  }

  get name() {
    return `Nuclear Fusion`;
  }

  get isUnlocked() {
    return this.canBeUpgraded;
  }

  get canBeUpgraded() {
    return FusionChallenge(10).isCompleted;
  }

  get baseInterval() {
    return Player.defaultStart.auto.fusion.interval;
  }

  get mode() {
    return this.data.mode;
  }

  set mode(value) {
    this.data.mode = value;
  }

  get hasAdditionalModes() {//---------------
    return EternityMilestone.bigCrunchModes.isReached;
  }

  get increaseWithMult() {
    return this.data.increaseWithMult;
  }

  set increaseWithMult(value) {
    this.data.increaseWithMult = value;
  }

  get amount() {
    return this.data.amount;
  }

  // This is unused mechanically, but should be zero to suppress the "Current bulk:" text
  get bulk() {
    return 0;
  }

  set amount(value) {
    this.data.amount = value;
  }

  get time() {
    return this.data.time;
  }

  set time(value) {
    this.data.time = value;
  }

  get xHighest() {
    return this.data.xHighest;
  }

  set xHighest(value) {
    this.data.xHighest = value;
  }

  /*autoInfinitiesAvailable(considerMilestoneReached) {
    return (considerMilestoneReached || EternityMilestone.autoInfinities.isReached) &&
      !EternityChallenge(4).isRunning && !EternityChallenge(12).isRunning && !Player.isInAntimatterChallenge &&
      player.auto.autobuyersOn && this.data.isActive &&
      !Autobuyer.eternity.isActive && this.mode === AUTO_CRUNCH_MODE.TIME && this.time < 60 &&
      !Autobuyer.eternity.autoEternitiesAvailable();
  }*/

  upgradeInterval(free) {
    super.upgradeInterval(free);
    //TabNotification.breakInfinity.tryTrigger();
  }

  bumpAmount(mult) {
    if (this.isUnlocked && this.increaseWithMult) {
      this.amount = this.amount.times(mult);
    }
  }

  get canTick() {
    return Player.canFuse && super.canTick;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.FUSION;
  }

  get highestPrevPrestige() {
    return player.records.thisFusion.maxMatter;
  }

  get timeToNextTick() {
    return Math.clampMin(this.time - Time.thisFusionRealTime.totalSeconds, 0);
  }

  get willFuse() {
    if (Player.isInFusionChallenge) return true;

    switch (this.mode) {
      case AUTO_CRUNCH_MODE.AMOUNT:
        return gainedMatter().gte(this.amount);
      case AUTO_CRUNCH_MODE.TIME:
        return Time.thisFusionRealTime.totalSeconds > this.time;
      case AUTO_CRUNCH_MODE.X_HIGHEST:
      default:
        return gainedMatter().gte(this.highestPrevPrestige.times(this.xHighest));
    }
  }

  tick() {
    super.tick();
    if (this.willFuse) fusionResetRequest(true);
  }

  reset() {
    super.reset();
    //if (EternityMilestone.bigCrunchModes.isReached) return;
    this.mode = AUTO_CRUNCH_MODE.AMOUNT;
  }
}
