<script>

import { DataSet, Network } from "vis-network";
import { QUANTUM_WEB_BRANCH } from "@/core/secret-formula";
import QuantumWebLabel from "./QuantumWebLabel";
import StringsShop from "./StringsShop";

export default {
  name: "QuantumWebTab",
  components: {
    QuantumWebLabel,
    StringsShop,
  },
  created() {
    EventHub.ui.on(GAME_EVENT.PERK_BOUGHT, () => WebNetwork.updatePerkColor());
  },
  mounted() {
    WebNetwork.initialStabilization = false;
    WebNetwork.currentLayout = PerkLayouts[0];
    WebNetwork.initializeIfNeeded();
    WebNetwork.setLabelVisibility(ui.view.shiftDown || player.options.showHintText.perks);
    WebNetwork.updatePerkColor();
    WebNetwork.updatePerkSize();
    this.$refs.tab.appendChild(WebNetwork.container);
    WebNetwork.moveToDefaultLayoutPositions(0);
  }
};

// Primary is lifted from the study tree (mostly),
// secondary is primary -15% l in hsl, apart from reality which is -10%
const nodeColors = () => ({
    [QUANTUM_WEB_BRANCH.CORE]: {
        primary: "#C4C4C4",
        secondary: "#A6A6A6"
    },
    [QUANTUM_WEB_BRANCH.ATOMIC_STABILITY]: {
        primary: "#ED9131",
        secondary: "#C97B28"
    },
    [QUANTUM_WEB_BRANCH.OBFUSCATED]: {
        primary: "#000000",
        secondary: "#000000"
    },
});

// Coordinate specifications are sometimes given in a grid index, so we need to spread them out to the proper scaling.
// Positions with |x| < 20 and |y| < 12 will display well with a scale factor of 10.
// When making new layouts, the grid coordinates need to be multiplied by 5
function globalScale(vec, factor) {
  return vec.matrixTransform(factor, 0, 0, factor);
}

function positionNumToVector(num) {
  const xPart = num % 400;
  const yPart = Math.floor(num / 400);
  return new Vector(5 * (xPart - 200), 5 * (yPart - 200));
}

// Specification for different starting layouts
export const WebLayouts = [
  {
    buttonText: "Default Untangled",
    position: config => positionNumToVector(config.layoutPosList[0]),
  },
];

/**
 * defines our entire web structure logic
 */
export const WebNetwork = {
  container: undefined,
  network: undefined,
  nodes: undefined,
  minScale: 0.2,
  maxScale: 4,
  lastPerkNotation: "",
  pulseTimer: 0,
  initialStabilization: false,
  currentLayout: {},

  initializeIfNeeded() {
    const notation = Notations.current.name;
    if (this.container !== undefined && notation === this.lastPerkNotation) return;
    this.lastPerkNotation = notation;

    this.makeNetwork();

    this.network.on("click", params => {
      const id = params.nodes[0];
      const node = WebNodes.find(id);
      if (!isFinite(id)) return;
      if (!node.isUnlocked || node.config.labelOnly) return;
      node.purchase();
      this.updatePerkColor();
      this.updatePerkSize();
    });

    this.network.on("dragStart", () => {
      const tooltip = this.container.getElementsByClassName("vis-tooltip")[0];
      if (tooltip !== undefined) {
        tooltip.style.visibility = "hidden";
      }
    });

    this.network.on("zoom", () => {
      const scale = this.network.getScale();
      const clampedScale = Math.clamp(scale, this.minScale, this.maxScale);
      if (scale !== clampedScale) {
        this.network.moveTo({ scale: clampedScale });
      }
    });

    this.network.on("stabilizationIterationsDone", () => {
      // Centering the perk tree doesn't work until the physics-based movement has stopped after the initial creation
      if (!this.initialStabilization) {
        this.resetPosition(false);
        this.initialStabilization = true;
      }
      this.setPhysics(false);
    });
  },
  makeNetwork() {
    // Need to do some html to be able to apply some css for when in doomed
    function htmlTitle(html) {
      const container = document.createElement("div");
      container.innerHTML = html;
      return container;
    }
    // Just for a bit of fun, tangle it up a bit unless the player specifically chooses not to
    const showTitle = node => node.isUnlocked;
    const fontOnly = node => node.config.labelOnly;
    const selectPos = config => PerkLayouts[0].position(config);

    //this code prepares the nodes and stores them into the nodes object
    this.nodes = new DataSet(WebNodes.all.map(node => ({
      id: node.id,
      label: node.config.label,
      shape: "square",
      font: {
        size: (fontOnly(node) ? 75 : 20),
      },
      title: (showTitle(node) 
            ? ((`${node.config.description}<br/><br/>
                Cost: ${node.config.cost} strings`) +
                (node.config.requirementID > 0 
                    ? `<br/>Requirement: ${WebNodes.all.find(p => p.id === node.config.requirementID).config.label}` 
                    : ``)
                )
            : undefined),
      x: selectPos(node.config).x,
      y: selectPos(node.config).y,
    })));


    /*
            fix total strings only seemingly track current strings

            notice that gluon mult is applying a power buff instead of a multiplier buff 
    */


    //i THINK this code takes all nodes, and looks at its connections list,
    //then it defines each connection line as an "edge" and stores them
    const edges = [];
    for (const node of WebNodes.all) {
      for (const connectedNode of node.connectedNodes) {
        const from = Math.min(node.id, connectedNode.id);
        const to = Math.max(node.id, connectedNode.id);
        if (edges.find(edge => edge.from === from && edge.to === to)) continue;
        edges.push({ from, to });
      }
    }

    //contains the nodes and their connection edges
    const nodeData = {
      nodes: this.nodes,
      edges
    };

    //contains various bits of information for our nodes and
    //their connection lines (edges)
    const nodeOptions = {
      interaction: {
        dragNodes: false,
        hover: true,
        hoverConnectedEdges: false,
        selectConnectedEdges: false,
        tooltipDelay: 0,
      },
      nodes: {
        shape: "square",
        size: 18,
        font: {
          size: 0,
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        width: 10,
        shadow: true,
        hoverWidth: width => width,
        selectionWidth: width => width,
        color: {
          inherit: "both"
        },
        hidden: false
      },
    };

    //specifies the canvas with which to render our tree from
    const container = document.createElement("div");
    container.className = "c-wide-canvas-element vis-network c-perk-network";
    container.tabIndex = 900;
    const canvas = document.createElement("canvas");
    canvas.className = "c-perk-network__canvas";
    container.appendChild(canvas);
    this.container = container;

    this.network = new Network(container, nodeData, nodeOptions);
  },

  //toggles the smooth jiggly motion of the nodes. We're
  //keeping this disabled for this mod
  setPhysics(state) {
    const newState = this.currentLayout.forcePhysics === undefined ? state : this.currentLayout.forcePhysics;
    this.network.setOptions({ physics: { enabled: newState } });
  },

  //sets the connection lines to be curved, or remain straight
  setEdgeCurve(state) {
    //const newState = this.currentLayout.straightEdges === undefined ? state : !this.currentLayout.straightEdges;
    this.network.setOptions({ edges: { smooth: { enabled: false } } });
  },

  //resets the positions of everything
  moveToDefaultLayoutPositions(layoutIndex = 0) {
    // Things go wonky if we don't turn these off before moving
    this.setPhysics(false);
    this.setEdgeCurve(false);

    for (const key of Object.keys(WebNetwork.network.getPositions())) {
      const id = Number(key);
      const config = WebNodes.all.find(p => p.id === id).config;
      const target = PerkLayouts[layoutIndex].position(config);
      this.network.moveNode(id, target.x, target.y);
    }

    // Properly set attributes and window after all the movement
    this.initialStabilization = false;
    this.resetPosition(false);
    this.setEdgeCurve(true);
  },

  //reinitializes the network
  forceNetworkRemake() {
    this.container = undefined;
    this.initializeIfNeeded();
    // Tangled trees use physics to bring it to a semi-usable state; it gets set properly again after stabilization
    this.setPhysics(true);
  },

  //resets the position of the web
  resetPosition(centerOnStart) {
    const center = centerOnStart
      ? WebNetwork.network.body.nodes[GameDatabase.fusion.nodes.unlockAtomicStability.id]
      : (PerkLayouts[0].centerOffset ?? new Vector(0, 0));
    this.network.moveTo({ position: { x: center.x, y: center.y }, scale: 0.4, offset: { x: 0, y: 0 } });
  },

  /**
   * makes the label of the node visible or not
   * @param {*} areVisible 
   */
  setLabelVisibility(areVisible) {
    const options = {
      nodes: {
        font: {
          size: areVisible ? 20 : 0,
          color: Theme.current().isDark() ? "#DDDDDD" : "#222222",
        }
      }
    };
    this.network.setOptions(options);
  },

  /**
   * changes the perk colors when drawing
   */
  updatePerkColor() {
    this.perkColorList = this.perkColorList ?? nodeColors();
    const perkColorList = this.perkColorList;

    function nodeColor(node) {
      const perkColor = perkColorList[node.config.branch];
      let primaryColor = perkColor.primary;
      let secondaryColor = perkColor.secondary;
      const canBeBought = node.canBeBought;
      const isBought = node.isBought;
      const isUnlocked = node.isUnlocked;

      let backgroundColor;
      
      //change color based on a number of factors
      if (canBeBought) {
        if (Theme.current().isDark()) {
            backgroundColor = "#EEEEEE";
        } else {
            backgroundColor = "#111111";
        }
      } else if (isBought) {
            backgroundColor = primaryColor;
      } else if (Theme.current().isDark()) {
            backgroundColor = "#333333";
      } else {
            backgroundColor = "#CCCCCC";
      }
      //override colors if this branch is locked
      if (!isUnlocked) {
        secondaryColor = "#000000";
        backgroundColor = "#000000";
      }

      //also make sure to override hover color if branch is locked too
      const hoverColor = canBeBought || isBought ? primaryColor : (!isUnlocked ? "#000000" : "#656565");
      const borderColor = secondaryColor;

      return {
        background: backgroundColor,
        border: borderColor,
        hover: {
          background: hoverColor,
          border: borderColor
        },
        highlight: {
          background: backgroundColor,
          border: borderColor
        }
      };
    }

    const data = WebNodes.all
      .map(node => ({ id: node.id, color: nodeColor(node) }));
    this.nodes.update(data);
  },

  /**
   * changes the node sizes of each web node
   */
  updatePerkSize() {
    function nodeSize(node) {
      WebNetwork.pulseTimer += 0.1;
      const mod = 0;

      //setting it to 0 displays it as a point. We want it to be totally invisible,
      //so make it crazy small so it won't show as a point
      if (node._config.labelOnly) return 0.00001;
      if (node._config.id === 0) return 35 + mod;
      if (node.isBought) return 25 + mod;
      if (node.canBeBought) return 20 + mod;
      return 12 + mod;
    }

    const data = WebNodes.all
      .map(node => ({ id: node.id, size: nodeSize(node) }));
    this.nodes.update(data);
  },

  /**
   * updates the titles of all nodes. Especially useful for when we unlock
   * a new branch and need to allow the new nodes to show their proper
   * titles
   */
  updatePerkTitleText() {
    //const showTitle = node => node.isUnlocked;

    function nodeTitle(node) {
        return (node.isUnlocked 
            ? ((`${node.config.description}<br/><br/>
                Cost: ${node.config.cost} strings`) +
                (node.config.requirementID > 0 
                    ? `<br/>Requirement: ${WebNodes.all.find(p => p.id === node.config.requirementID).config.label}` 
                    : ``)
                )
            : undefined)
    }

    const data = WebNodes.all
      .map(node => ({ id: node.id, title: nodeTitle(node) }));
    this.nodes.update(data);
  }
};


</script>

<template>
    <div>
        <!--<QuantumWebLabel />-->
        <StringsShop />
        <div
            ref="tab"
            class="c-perk-tab"
        >
        </div>
        <br/>
        <p>Every completed sub-branch also awards you with one free proto-galaxy</p>
    </div>
</template>

<style scoped>

</style>
