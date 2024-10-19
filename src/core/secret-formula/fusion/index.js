//this file will contain everything related to the current prestige layer
import { buyGluonUpgrade } from "./gluon-upgrades";
import { fusionUpgrades, fusionUpgrades_B, fusionUpgrades_set2 } from "./fusion-upgrades";
import { webNodes, webNodeConnections } from "./web";

export const fusion = {
  buyGluonUpgrade: buyGluonUpgrade,
  upgrades: fusionUpgrades,
  upgrades_b: fusionUpgrades_B,
  upgrades_2: fusionUpgrades_set2,
  webNodes,
  webNodeConnections
};
