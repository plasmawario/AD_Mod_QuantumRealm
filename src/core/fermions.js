import { FusionChallenge } from "./fusion-challenges";
import { BitPurchasableMechanicState, RebuyableMechanicState } from "./game-mechanics";

class ElectronUpgradeState extends BitPurchasableMechanicState {
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
    return Currency.electrons;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.electrons.upgradeBits;
  }

  set bits(value) {
    if (FusionChallenge(4).isRunning) return;
    player.electrons.upgradeBits = value;
  }

  /*get isAvailableForPurchase() {
    return (player.reality.upgReqs & (1 << this.id)) !== 0;
  }*/
}

class RebuyableElectronUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.electrons;
  }

  get boughtAmount() {
    return player.electrons.rebuyables[this.id];
  }

  set boughtAmount(value) {
    if (FusionChallenge(4).isRunning) return;
    player.electrons.rebuyables[this.id] = value;
  }
}

/***
 * This function maps the upgrade data into either repeatable upgrades or one-time upgrades
 */
ElectronUpgradeState.index = mapGameData(
  GameDatabase.fermions.upgrades_electron,

  //we can sort out one-time upgrades and rebuyables upgrades
  config => (config.rebuyable === true
    ? new RebuyableElectronUpgradeState(config)
    : new ElectronUpgradeState(config))
);

/**
* @param {number} id
* @return {ElectronUpgradeState|RebuyableElectronUpgradeState}
*/
export const ElectronUpgrade = id => ElectronUpgradeState.index[id];

export const ElectronUpgrades = {
  /**
   * @type {(ElectronUpgradeState|RebuyableElectronUpgradeState)[]}
   */
  all: ElectronUpgradeState.index.compact()
};
  