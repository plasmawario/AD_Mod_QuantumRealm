import { DC } from "./constants";
import { Currency } from "./currency";
import { DownQuarkGenerator } from "./globals";

export const TUTORIAL_QUANTUM_STATE = {
  UP: 0,
  DOWN: 1,
  TICKSPEED: 2,
  BOOST: 3,
  ELECTRON: 4,
  AUTOBUYER: 5,
};

// Tutorial has two ways of moving on, either by Tutorial.moveOn() or by having it's condition be true. This
// is checked by moving on when the NEXT state's condition evaluates to true
const tutorialQuantumStates = [
  {
    id: TUTORIAL_QUANTUM_STATE.UP,
    condition: () => true
  },
  {
    id: TUTORIAL_QUANTUM_STATE.DOWN,
    condition: () => DownQuarkGenerator(1).requirementReached === true
  },
  {
    id: TUTORIAL_QUANTUM_STATE.TICKSPEED,
    condition: () => UpQuarkGenerator(1).bought + DownQuarkGenerator(1).bought >= 35
  },
  {
    id: TUTORIAL_QUANTUM_STATE.BOOST,
    condition: () => UpQuarkGenerator(1).bought >= 35 || DownQuarkGenerator(1).bought >= 35
  },
  {
    id: TUTORIAL_QUANTUM_STATE.ELECTRON,
    condition: () => Currency.quarks1.value.gte(DC.E10)
  },
  {
    id: TUTORIAL_QUANTUM_STATE.AUTOBUYER,
    condition: () => Currency.quarks1.value.gte(DC.E55)
  }
];

export const TutorialQuantum = {

  isActive(atState) {
    return player.records.fullGameCompletions === 0 && ui.view.tutorialState_quantum === atState && ui.view.tutorialActive;
  },

  // This will remain visible until the first dimboost is purchased. However, since the tutorial state generally
  // only visually updates whenever the UI elements need changing, we need to explicitly check boost count or else
  // this will remain visible until a galaxy can be purchased
  emphasizeH2P() {
    const hasFirstBoost = player.tutorialState_quantum > TUTORIAL_QUANTUM_STATE.BOOST || player.upBoosts > 0 || player.downBoosts > 0;
    return player.records.fullGameCompletions === 0 && !hasFirstBoost;
  },

  // Turns off the visual effect
  turnOffEffect(fromState) {
    if (fromState !== player.tutorialState_quantum) return;
    player.tutorialActive = false;
    ui.view.tutorialActive = false;
    // Check if we can immediately enter next tutorial state. This is needed
    // to correctly handle buying dimension 2 + tickspeed in the same tick,
    // for example.
    this.tutorialLoop();
  },

  // Moves on to the next tutorialState_quantum, but only if parameter is current state.
  moveOn(fromState) {
    if (fromState !== player.tutorialState_quantum) return;
    player.tutorialState_quantum++;
    ui.view.tutorialState_quantum++;
    player.tutorialActive = true;
    ui.view.tutorialActive = true;
  },

  tutorialLoop() {
    const nextState = tutorialQuantumStates.find(o => o.id === player.tutorialState_quantum + 1);
    if (nextState && nextState.condition()) this.moveOn(player.tutorialState_quantum);
  }
};
  