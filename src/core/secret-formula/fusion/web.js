import { DC } from "../../constants";

/**
 * this defines the branch of the quantum web, which corrispond to one of the main
 * branches that stem from the center node
 */
export const QUANTUM_WEB_BRANCH = {
    CORE: "CORE",
    ATOMIC_STABILITY: "ATOMIC_STABILITY",
    OBFUSCATED: "OBFUSCATED"
}

// This function isn't used in-game, see note below for its intended usage
// eslint-disable-next-line no-unused-vars
function vectorToNum(v) {
  return Math.floor(v.x / 5) + 400 * Math.floor(v.y / 5) + 80200;
}

/**
 * In order to reduce boilerplate code and excessive Vector object declarations, the node positions in fixed layouts
 * are specified as numbers which are decoded on-the-fly using positionNumToVector in PerksTab.vue. The function
 * vectorToNum above is the inverse of that function.
 *
 * To make a new preset layout, define vectorToNum in the console, move all the nodes around in-game and then run
 *    Object.values(WebNetwork.network.body.nodes).filter(n => n.edges.length !== 0).map(v => vectorToNum(v))
 * in the console to get all the current node positions. Then, append the resulting numbers to each layoutPosList
 * array below and make the appripriate entry in PerkLayouts.
 *
 * Note: This encoding/decoding only works properly for coordinates with values between -1000 and 1000, and will
 * be slightly off for vectors whose coordinates aren't divisible by 5
 * 
 * 
 * 
 * additional node: If the nodes have an effect, you get it by calling WebNode.<object name>.effectOrDefault().
 * If it only needs to be checked if it is bought, or it has no effect, do WebNode.<object name>.canBeApplied or webNodes.isBought
 */
export const webNodes = {
  unlockAtomicStability: {
    id: 0,
    label: "INIT",
    branch: QUANTUM_WEB_BRANCH.CORE,
    cost: 1,
    labelOnly: false,       //used to generate big labels on node graph by marking this node as invisible except for its label
    requirementID: -1,      //required node to be purchased before we can buy this one
    visibleCondition: true, //id we only want certain nodes to be made visible at certain points
    get description() {
      return `Gluons are ${formatX(2, 0, 0)} stronger, and unlock the Atomic Stability branch`;
    },
    effect: 2,
    layoutPosList: [80200],
  },
  //---------------------------------------------------------
  LABEL_ONLY_1: {
    id: 1,
    label: "Atomic Stability",
    branch: QUANTUM_WEB_BRANCH.CORE,
    cost: 0,
    labelOnly: true,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return ``;
    },
    effect: 0,
    layoutPosList: [16120],
  },
  LABEL_ONLY_2: {
    id: 2,
    label: "???",
    branch: QUANTUM_WEB_BRANCH.CORE,
    cost: 0,
    labelOnly: true,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return ``;
    },
    effect: 0,
    layoutPosList: [61180],
  },
  LABEL_ONLY_3: {
    id: 3,
    label: "???",
    branch: QUANTUM_WEB_BRANCH.CORE,
    cost: 0,
    labelOnly: true,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return ``;
    },
    effect: 0,
    layoutPosList: [141040],
  },
  LABEL_ONLY_4: {
    id: 4,
    label: "???",
    branch: QUANTUM_WEB_BRANCH.CORE,
    cost: 0,
    labelOnly: true,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return ``;
    },
    effect: 0,
    layoutPosList: [92420],
  },
  //---------------------------------------------------------
  electricCharge: {
    id: 101,
    label: "A-EC",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 2,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Electrons now produce Electric Charge, which provide a multiplier to Quark Generators`;
    },
    effect: 1,
    layoutPosList: [66190],
  },
  muon: {
    id: 112,
    label: "A-ED2",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 7,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Unlock the Muon Generator`;
    },
    effect: 1,
    layoutPosList: [66170],
  },
  chargeAmp: {
    id: 113,
    label: "A-ECAMP",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 16,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Electric Charge now boosts Electron-type Generators with reduced effect`;
    },
    effect: 1,
    layoutPosList: [64150],
  },
  tau: {
    id: 114,
    label: "A-ED3",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 8,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Unlock the Tau Generator`;
    },
    effect: 1,
    layoutPosList: [60130],
  },
  fusionChallengeQk: {
    id: 121,
    label: "A-FCT",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 2,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
        const equasion = Decimal.clampMin(1000 / Time.fusionChallengeSum.totalMinutes, 1);
        return `Quark Generators are more powerful based on total Fusion Challenge completion time<br/>`
        + `(Currently: ${formatX(equasion, 2, 2)})`;
    },
    effect: () => Decimal.clampMin(1000 / Time.fusionChallengeSum.totalMinutes, 1),
    layoutPosList: [64210],
  },
  scaleReduce1: {
    id: 122,
    label: "A-PFCS",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 3,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Reduce post-fusion cost scaling of Quark Generators,
      Electron-type Generators, and tickspeed upgrades by ${formatX(2, 0, 0)}<br/>
       (Currently: ${formatX(Player.postFusionCostScaleMulti)})`;
    },
    effect: 2,
    layoutPosList: [60225],
  },
  galaxyAmp: {
    id: 123,
    label: "A-GUP",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 2,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
        return `All galaxies are ${formatX(3, 0, 0)} as powerful`;
    },
    effect: 3,
    layoutPosList: [54240],
  },
  gluonMultUnlock: {
    id: 102,
    label: "A-GCR",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 5,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Gluons are ${formatX(5, 0, 0)} times stronger and multiply fusion
      gain by 2`;
    },
    effect: 2,
    layoutPosList: [58185],
  },
  upBoostFusions: {
    id: 131,
    label: "A-UBM",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 4,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `You gain more Fusions based on number of Up Boosts`;
    },
    effect: 0,
    layoutPosList: [58170],
  },
  downBoostCharge: {
    id: 132,
    label: "A-DBEC",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 3,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Electric Charge Production multiplier based on number of Down Boosts`;
    },
    effect: 4,
    layoutPosList: [56155],
  },
  boostDecrease: {
    id: 151,
    label: "A-BDS",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 5,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
        return `Up and Down boost cost decreased by 15`;
    },
    effect: () => 15,
    layoutPosList: [56200],
  },
  boostAmp: {
    id: 134,
    label: "A-UDBA",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 2,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Up and Down Boost multipliers are now ${formatX(15, 0, 0)}`;
    },
    effect: () => 15,
    layoutPosList: [52215],
  },
  scaleReduce2: {
    id: 103,
    label: "A-PFCS2",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 9,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Reduce post-fusion cost scaling of Quark Generators,
      Electron-type Generators, and tickspeed upgrades by ${formatX(2, 0, 0)}<br/>
       (Currently: ${formatX(Player.postFusionCostScaleMulti)})`;
    },
    effect: 2,
    layoutPosList: [50180],
  },
  fusionChallengeQk2: {
    id: 141,
    label: "A-FCC",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 3,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
        const equasion = 500 * Math.log10(player.challenge.fusion.totalCompletions + 1.4) - 74;
        //const equasion = 125 * Math.log10(player.challenge.fusion.totalCompletions + 5) - 74;
        return `Quark Generators are more powerful based on the total number of Fusion Challenge completions<br/>`
        + `(Currently: ${formatX(equasion, 2, 2)})`;
    },
    effect: () => Decimal.clampMin(500 * Math.log10(player.challenge.fusion.totalCompletions + 1.4) - 74, 1),
    layoutPosList: [50165],
  },
  electronBoostFusions: {
    id: 133,
    label: "A-QFM",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 3,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Electron-type Generator Multiplier based on Fusions<br/>`
      + `(Currently: ${formatX(Currency.fused.value.times(0.2).plus(1), 2, 2)})`;
    },
    effect: () => Currency.fused.value.times(0.2).plus(1),
    layoutPosList: [48195],
  },
  gluonStrength1: {
    id: 104,
    label: "A-GMUL",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 6,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Gluons are ${formatX(10, 0, 0)} times stronger`;
    },
    effect: 2,
    layoutPosList: [42175],
  },
  fusionUpgrades2: {
    id: 105,
    label: "A-FU2",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 10,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return `Unlock the next set of Fusion Upgrades`;
    },
    effect: 1,
    layoutPosList: [34170],
  },
  decay: {
    id: 106,
    label: "A-DEC",
    branch: QUANTUM_WEB_BRANCH.ATOMIC_STABILITY,
    cost: 58,
    labelOnly: false,
    requirementID: -1,
    visibleCondition: true,
    get description() {
      return player.dev_lock_chpt1 ? `To be continued...` : `Unlock Nuclear Decay`;
    },
    effect: 1,
    layoutPosList: [26165],
  },
};

export const webNodeConnections = (function() {
  const n = webNodes;
  // First item is the start, other items are the ends
  const groups = [
    [n.unlockAtomicStability, n.electricCharge],
    [n.electricCharge, n.gluonMultUnlock],
    [n.gluonMultUnlock, n.scaleReduce2],
    [n.scaleReduce2, n.gluonStrength1],
    [n.gluonStrength1, n.fusionUpgrades2],
    [n.fusionUpgrades2, n.decay],

    [n.electricCharge, n.muon],
    [n.muon, n.chargeAmp],
    [n.chargeAmp, n.tau],

    [n.electricCharge, n.fusionChallengeQk],
    [n.fusionChallengeQk, n.scaleReduce1],
    [n.scaleReduce1, n.galaxyAmp],

    [n.gluonMultUnlock, n.upBoostFusions],
    [n.upBoostFusions, n.downBoostCharge],
    [n.gluonMultUnlock, n.boostDecrease],
    [n.boostDecrease, n.boostAmp],

    [n.scaleReduce2, n.fusionChallengeQk2],
    [n.scaleReduce2, n.electronBoostFusions]
  ];
  const connections = {};
  for (const node of Object.values(webNodes)) {
    const connectedNodes = [];
    const directConnections = groups.find(g => g[0] === node);
    if (directConnections !== undefined) {
      connectedNodes.push(...directConnections.slice(1));
    }
    const indirectConnections = groups
      .filter(g => g.slice(1).some(groupNode => groupNode === node))
      .map(g => g[0]);
    connectedNodes.push(...indirectConnections);
    connections[node.id] = [...new Set(connectedNodes.map(connectedNode => connectedNode.id))];
  }
  return connections;
}());
