import { FusionUpgrade2 } from "../fusion";
import { GenBoostUp } from "../genboostUp";
import { UpgradeableAutobuyerStateQuantum } from "./autobuyer";

export class UpBoostAutobuyerState extends UpgradeableAutobuyerStateQuantum {
  get data() {
    return player.auto.upBoost;
  }

  get name() {
    return `Up Boost`;
  }

  get isUnlocked() {
    return this.canBeUpgraded;
  }

  get canBeUpgraded() {
    return FusionChallenge(8).isCompleted;
  }

  get baseInterval() {
    return Player.defaultStart.auto.upBoost.interval;
  }

  get limitUpBoosts() {
    return this.data.limitUpBoosts;
  }

  set limitUpBoosts(value) {
    this.data.limitUpBoosts = value;
  }

  get maxUpBoosts() {
    return this.data.maxUpBoosts;
  }

  set maxUpBoosts(value) {
    this.data.maxUpBoosts = value;
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
    return GenBoostUp.canBeBought && GenBoostUp.requirement.isSatisfied && super.canTick;
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
    return this.isBuyMaxUnlocked ? PRESTIGE_QUANTUM_EVENT.FUSION : PRESTIGE_QUANTUM_EVENT.UPBOOST;
  }

  tick() {
    if (this.isBuyMaxUnlocked) {
      const galaxyCondition = !this.limitUntilGalaxies || player.galaxies >= this.galaxies;
      if (!GenBoostUp.canUnlockNewDimension && !galaxyCondition) return;
      requestUpGenBoost(true);
      super.tick();
      return;
    }

    const limitCondition = !this.limitUpBoosts || GenBoostUp.purchasedBoosts < this.maxUpBoosts;
    const galaxyCondition = this.limitUntilGalaxies && player.galaxies >= this.galaxies;
    if (limitCondition || galaxyCondition) {
      requestUpGenBoost(false);
      super.tick();
    }
  }
}
