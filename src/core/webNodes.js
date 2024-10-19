import { SetPurchasableMechanicState } from "./game-mechanics";

class NodeState extends SetPurchasableMechanicState {
  constructor(config) {
    super(config);
    /**
     * @type {NodeState[]}
     */
    this.connectedNodes = [];
  }

  get branch() {
    return this.config.branch;
  }

  get section() {
    return this.config.section ? this.config.section : QUANTUM_WEB_SECTION.NONE;
  }

  get isUnlocked() {
    //i know, this is a little disgusting, but brain no workie right now so this is
    //how it's gonna be
    return (player.web.sectionsUnlockedState >= 0 && this.branch === QUANTUM_WEB_BRANCH.CORE) ||
          (player.web.sectionsUnlockedState >= 1 && this.branch === QUANTUM_WEB_BRANCH.ATOMIC_STABILITY);
  }

  get label() {
    return this.config.label;
  }

  get shortDescription() {
    return this.config.shortDescription ? this.config.shortDescription() : "";
  }

  get currency() {
    return Currency.strings;
  }

  get set() {
    return player.webNodes;
  }

  get cost() {
    return this.config.cost;
  }

  /**
   * determins whether the node can be purchased. This is defined
   * as whether it has an id of 0 (the starting node), or
   * it is connected to a purchased node, and
   * (our definition)
   * if its requirements are met
   */
  get isAvailableForPurchase() {
    return this.id === 0 || this.connectedNodes.some(p => p.isBought);
  }

  get canBeApplied() {
    return this.isBought;
  }

  initializeConnections() {
    this.connectedNodes = GameDatabase.fusion.webNodeConnections[this.id].map(id => WebNodes.find(id));
  }

  onPurchased() {
    if (this.config.bumpCurrency !== undefined) this.config.bumpCurrency();
    if (this.label === "INIT") {
      Currency.gluonMult.value *= 2;
      player.web.sectionsUnlockedState = 1; //set to atomic stability
    }
    if (this.label === "A-GCR"){
      Currency.gluonMult.value *= 5;
    }
    if (this.label === "A-PFCS" || this.label === "A-PFCS2"){
      //invalidate the cost scaling function so it gets updated with
      //the new value
      GameCache.postFusionCostScaleMulti.invalidate();
    }
    if (this.label === "A-GMUL"){
      Currency.gluonMult.value *= 10;
    }
    if (this.label === "A-DEC" && !player.dev_lock_chpt1){
      Tab.bosons.wz.show();
    }
    WebNetwork.updatePerkColor();           //update node colors
    WebNetwork.updatePerkTitleText();       //update node title text
    GameCache.achievementPeriod.invalidate();
    GameCache.buyablePerks.invalidate();
    EventHub.dispatch(GAME_EVENT.WEB_NODE_BOUGHT);
  }
}

export const WebNode = mapGameDataToObject(
  GameDatabase.fusion.webNodes,
  config => new NodeState(config)
);

export const WebNodes = {
  all: WebNode.all,
  /**
   * @param {number} id
   * @returns {NodeState}
   */
  find(id) {
    return WebNodes.all.find(p => p.id === id);
  }
};

for (const node of WebNodes.all) {
  node.initializeConnections();
}

export function checkQuantumWebValidity() {
  if (player.webNodes.every(id => WebNodes.find(id) !== undefined)) return;
  dev.respecPerks();
  if (Currency.strings.gte(WebNodes.all.length)) {
    dev.buyAllPerks();
    Modal.message.show("Some of your Perks were invalid, but you auto-bought all valid perks.");
  } else {
    Modal.message.show("Some of your Perks were invalid, so your Perks have been reset and your Perk Points refunded.");
  }
}
