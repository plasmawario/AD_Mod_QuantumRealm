import { GenBoostDown } from "../genboostDown";
import { UpgradeableAutobuyerStateQuantum } from "./autobuyer";

export class DownBoostAutobuyerState extends UpgradeableAutobuyerStateQuantum {
  get data() {
    return player.auto.downBoost;
  }

  get name() {
    return `Down Boost`;
  }

  get isUnlocked() {
    return this.canBeUpgraded;
  }

  get canBeUpgraded() {
    return FusionChallenge(9).isCompleted;
  }

  get baseInterval() {
    return Player.defaultStart.auto.downBoost.interval;
  }

  get limitDownBoosts() {
    return this.data.limitDownBoosts;
  }

  set limitDownBoosts(value) {
    this.data.limitDownBoosts = value;
  }

  get maxDownBoosts() {
    return this.data.maxDownBoosts;
  }

  set maxDownBoosts(value) {
    this.data.maxDownBoosts = value;
  }

  get limitUntilGalaxies() {
    return this.data.limitUntilGalaxies;
  }

  set limitUntilGalaxies(value) {
    this.data.limitUntilGalaxies = value;
  }

  get galaxies() {
    return this.data.galaxies;
  }

  set galaxies(value) {
    this.data.galaxies = value;
  }

  get bulk() {
    return this.data.bulk;
  }

  set bulk(value) {
    this.data.bulk = value;
  }

  get buyMaxInterval() {
    return this.data.buyMaxInterval;
  }

  set buyMaxInterval(value) {
    this.data.buyMaxInterval = value;
  }

  get isBuyMaxUnlocked() {
    return FusionUpgrade2(3).isBought;
  }

  get interval() {
    return this.isBuyMaxUnlocked
      ? TimeSpan.fromSeconds(this.buyMaxInterval).totalMilliseconds
      : super.interval;
  }

  get canTick() {
    return GenBoostDown.canBeBought && GenBoostDown.requirement.isSatisfied && super.canTick;
  }

  get resetTickOn() {
    // Before max dimboost, we want to do dimboosts as quickly as possible,
    // so we reset the autobuyer's timer to 0 after every galaxy.
    // After max dimboost, we'll generally have "Blink of an eye",
    // so doing a dimboost right after a galaxy will do a single dimboost
    // and then wait for the autobuyer interval to do any more dimboosts,
    // which seems unideal and in fact does slow getting dimboosts/galaxies
    // at the start of infinities down by about 20%.
    // After "Yo dawg, I heard you liked reskins...", it doesn't matter much
    // which we do (less than 1 tick difference, it seems).
    return this.isBuyMaxUnlocked ? PRESTIGE_QUANTUM_EVENT.FUSION : PRESTIGE_QUANTUM_EVENT.DOWNBOOST;
  }

  tick() {
    if (this.isBuyMaxUnlocked) {
      const galaxyCondition = !this.limitUntilGalaxies || player.galaxies >= this.galaxies;
      if (!GenBoostDown.canUnlockNewDimension && !galaxyCondition) return;
      requestDownGenBoost(true);
      super.tick();
      return;
    }

    const limitCondition = !this.limitDownBoosts || GenBoostDown.purchasedBoosts < this.maxDownBoosts;
    const galaxyCondition = this.limitUntilGalaxies && player.galaxies >= this.galaxies;
    if (limitCondition || galaxyCondition) {
      requestDownGenBoost(false);
      super.tick();
    }
  }
}
