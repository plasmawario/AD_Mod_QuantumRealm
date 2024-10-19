import { DC } from "../constants";

export const tabNotifications = {
  firstFusion: {
    id: 0,
    tabsToHighLight: [
      {
        parent: "fermions",
        tab: "electron"
      },
      {
        parent: "automation",
        tab: "quantumAutobuyers"
      },
      {
        parent: "bosons",
        tab: "gluon"
      },
      {
        parent: "bosons",
        tab: "bosonUpgrades"
      }
    ],
    condition: () => !PlayerProgress.matterUnlocked(),
    events: [GAME_EVENT.FUSION_BEFORE]
  },
  FCUnlock: {
    id: 1,
    tabsToHighLight: [
      {
        parent: "challenges",
        tab: "fusion"
      }
    ],
    condition: () => true
  },
  firstInfinity: {
    id: 100,
    tabsToHighLight: [
      {
        parent: "infinity",
        tab: "upgrades"
      },
      {
        parent: "challenges",
        tab: "normal"
      },
      {
        parent: "statistics",
        tab: "multipliers"
      }
    ],
    condition: () => !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked() &&
      !PlayerProgress.infinityUnlocked(),
    events: [GAME_EVENT.BIG_CRUNCH_BEFORE]
  },
  breakInfinity: {
    id: 101,
    tabsToHighLight: [
      {
        parent: "infinity",
        tab: "break"
      }
    ],
    condition: () => !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked() && Autobuyer.bigCrunch.hasMaxedInterval
  },
  IDUnlock: {
    id: 102,
    tabsToHighLight: [
      {
        parent: "dimensions",
        tab: "infinity"
      }
    ],
    condition: () => !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked() && !InfinityDimension(2).isUnlocked
  },
  ICUnlock: {
    id: 103,
    tabsToHighLight: [
      {
        parent: "challenges",
        tab: "infinity"
      }
    ],
    condition: () => !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked()
  },
  replicanti: {
    id: 104,
    tabsToHighLight: [
      {
        parent: "infinity",
        tab: "replicanti"
      }
    ],
    condition: () => !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked() && Currency.infinityPoints.gte(DC.E140),
    events: [GAME_EVENT.BIG_CRUNCH_AFTER]
  },
  firstEternity: {
    id: 105,
    tabsToHighLight: [
      {
        parent: "eternity",
        tab: "studies"
      },
      {
        parent: "eternity",
        tab: "milestones"
      },
      {
        parent: "eternity",
        tab: "upgrades"
      },
      {
        parent: "dimensions",
        tab: "time"
      }
    ],
    condition: () => !PlayerProgress.realityUnlocked() &&
      !PlayerProgress.eternityUnlocked(),
    events: [GAME_EVENT.ETERNITY_RESET_BEFORE]
  },
  dilationAfterUnlock: {
    id: 106,
    tabsToHighLight: [
      {
        parent: "eternity",
        tab: "dilation"
      }
    ],
    condition: () => !PlayerProgress.realityUnlocked()
  },
  realityUnlock: {
    id: 107,
    tabsToHighLight: [
      {
        parent: "eternity",
        tab: "studies"
      }
    ],
    condition: () => !PlayerProgress.realityUnlocked() && TimeStudy.reality.canBeBought,
    events: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION,
      GAME_EVENT.OFFLINE_CURRENCY_GAINED, GAME_EVENT.ACHIEVEMENT_UNLOCKED]
  },
  blackHoleUnlock: {
    id: 108,
    tabsToHighLight: [
      {
        parent: "reality",
        tab: "hole"
      }
    ],
    condition: () => !BlackHoles.areUnlocked && Currency.realityMachines.gte(100),
    events: [GAME_EVENT.REALITY_RESET_AFTER]
  },
  automatorUnlock: {
    id: 109,
    tabsToHighLight: [
      {
        parent: "automation",
        tab: "automator"
      }
    ],
    condition: () => Player.automatorUnlocked,
    events: [GAME_EVENT.REALITY_RESET_AFTER]
  },
  teresaUnlock: {
    id: 110,
    tabsToHighLight: [
      {
        parent: "celestials",
        tab: "celestial-navigation"
      },
      {
        parent: "celestials",
        tab: "teresa"
      }
    ],
    condition: () => player.celestials.teresa.pouredAmount === 0 && Teresa.isUnlocked,
    events: [GAME_EVENT.REALITY_UPGRADE_BOUGHT]
  },
  alchemyUnlock: {
    id: 111,
    tabsToHighLight: [
      {
        parent: "reality",
        tab: "glyphs"
      },
      {
        parent: "reality",
        tab: "alchemy"
      }
    ],
    condition: () => player.celestials.ra.pets.effarig.level >= 2,
    events: [GAME_EVENT.GAME_TICK_AFTER]
  },
  newAutobuyer: {
    id: 112,
    tabsToHighLight: [
      {
        parent: "automation",
        tab: "autobuyers"
      },
    ],
    // Always externally triggered, but needs to be ignored in cel7 because they're unlocked differently
    condition: () => !Pelle.isDoomed,
  },
  imaginaryMachineUnlock: {
    id: 113,
    tabsToHighLight: [
      {
        parent: "reality",
        tab: "imag_upgrades"
      }
    ],
    condition: () => MachineHandler.isIMUnlocked,
    events: [GAME_EVENT.GAME_TICK_AFTER]
  },
  laitelaUnlock: {
    id: 114,
    tabsToHighLight: [
      {
        parent: "celestials",
        tab: "laitela"
      },
    ],
    // Always externally triggered
    condition: () => true,
  },
  pelleUnlock: {
    id: 115,
    tabsToHighLight: [
      {
        parent: "celestials",
        tab: "pelle"
      },
    ],
    // Always externally triggered
    condition: () => true,
  },
  newGlyphCosmetic: {
    id: 116,
    tabsToHighLight: [
      {
        parent: "reality",
        tab: "glyphs",
      },
    ],
    // Always externally triggered
    condition: () => true,
  },
};
