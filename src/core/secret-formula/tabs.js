import { PlayerProgress } from "../player-progress";

export const tabs = [
  {
    key: "fermions",
    name: "Fermions",
    hideAt: 2.9,
    id: 100,
    hidable: true,
    UIClass: "o-tab-btn--fermions",
    subtabs: [
      {
        key: "quarks",
        name: "Quarks",
        symbol: "<i class='fa-solid fa-atom'></i>",
        component: "QuarksTab",
        id: 0,
        hidable: true,
      },
      {
        key: "electron",
        name: "Electrons",
        symbol: "<i class='fa-solid fa-bolt'></i>",
        component: "ElectronsTab",
        condition: () => 
          PlayerProgress.electronsUnlocked() || PlayerProgress.matterUnlocked(),
        id: 1,
        hidable: true,
      },
      {
        key: "neutrinos",
        name: "Neutrinos",
        symbol: "<i class='fa-solid fa-sun'></i>",
        component: "NeutrinosTab",
        condition: () => 
          false,
        id: 2,
        hidable: true,
      },
    ]
  },
  {
    key: "bosons",
    name: "Bosons",
    hideAt: 3,
    id: 101,
    hidable: true,
    UIClass: "o-tab-btn--bosons",
    subtabs: [
      {
        key: "bosonUpgrades",
        name: "Fusion Upgrades",
        symbol: "<i class='fa-solid fa-arrow-up'></i>",
        component: "FusionTab",
        condition: () => PlayerProgress.matterUnlocked(),
        id: 0,
        hidable: true,
      },
      {
        key: "quantumweb",
        name: "String Theories",
        symbol: "<div class='o-tab-btn--string'><img src='images/string_theory.svg'/></div>",
        component: "QuantumWebTab",
        condition: () => PlayerProgress.quantumWebUnlocked(),
        id: 1,
        hidable: true,
      },
      {
        key: "gluon",
        name: "Gluons",
        symbol: "<i class='fa-solid fa-circle-nodes'></i>",
        component: "GluonsTab",
        condition: () => player.canFuse || PlayerProgress.matterUnlocked(),
        id: 2,
        hidable: true,
      },
      {
        key: "wz",
        name: "W / Z",
        symbol: "<i class='fa-solid fa-radiation'></i>",
        component: "DecayTab",
        condition: () => 
          !player.dev_lock_chpt1 && PlayerProgress.decayUnlocked(),
        id: 3,
        hidable: true,
      },
      {
        key: "higgs",
        name: "Higgs",
        symbol: "H",
        component: "h",
        condition: () => 
          false,
        id: 4,
        hidable: true,
      },
      {
        key: "photon",
        name: "Photons",
        symbol: "<i class='fa-solid fa-magnet'></i><i class='fa-solid fa-bolt'></i>",
        component: "h",
        condition: () => 
          false,
        id: 5,
        hidable: true,
      },
      {
        key: "graviton",
        name: "Gravitons",
        symbol: "<div class='o-tab-btn--graviton'><img src='images/graviton.svg'/></div>",
        component: "h",
        condition: () => 
          false,
        id: 6,
        hidable: true,
      },
    ]
  },
  {
    key: "exotic",
    name: "Exotic",
    hideAt: 3.1,
    id: 102,
    hidable: true,
    UIClass: "o-tab-btn--exotic",
    subtabs: [
      {
        key: "particleAccelerator",
        name: "Particle Accelerator",
        symbol: "<i class='fa-solid fa-circle-notch'></i>",
        component: "h",
        condition: () => 
          !player.dev_lock_chpt1,
        id: 0,
        hidable: true,
      },
      {
        key: "tachyon",
        name: "Tachyons",
        symbol: "<div class='o-tab-btn--tachyon'><img src='images/tachyon_test.svg'/></div>",
        component: "h",
        condition: () => 
          !player.dev_lock_chpt1,
        id: 1,
        hidable: true,
      },
      {
        key: "darkmatter",
        name: "Dark Matter",
        symbol: "<i class='fa-regular fa-circle'></i>",
        component: "h",
        condition: () => 
          !player.dev_lock_chpt1,
        id: 2,
        hidable: true,
      },
    ]
  },
  {
    key: "mechanisms",
    name: "Mechanisms",
    hideAt: 3.1,
    id: 103,
    hidable: true,
    UIClass: "o-tab-btn--mechanisms",
    subtabs: [
      {
        key: "greatAttractor",
        name: "Great Attractor",
        symbol: "<i class='fa-solid fa-bullseye'></i>",
        component: "h",
        condition: () => 
          false,
        id: 0,
        hidable: true,
      },
    ]
  },
  {
    key: "dimensions",
    name: "Dimensions",
    hideAt: 2.9,
    id: 0,
    hidable: true,
    subtabs: [
      {
        key: "antimatter",
        name: "Antimatter Dimensions",
        symbol: "Ω",
        component: "AntimatterDimensionsTab",
        condition: () => 
          !player.dev_lock_chpt1,
        id: 0,
        hidable: true,
      },
      {
        key: "infinity",
        name: "Infinity Dimensions",
        hideAt: 2.7,
        symbol: "∞",
        component: "InfinityDimensionsTab",
        condition: () => !player.dev_lock_chpt1 ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          InfinityDimension(1).isUnlocked,
        id: 1,
        hidable: true,
      },
      {
        key: "time",
        name: "Time Dimensions",
        hideAt: 2.6,
        symbol: "Δ",
        component: "TimeDimensionsTab",
        condition: () => !player.dev_lock_chpt1 || PlayerProgress.eternityUnlocked(),
        id: 2,
        hidable: true,
      },
    ]
  },
  {
    key: "options",
    name: "Options",
    hideAt: 1.6,
    id: 1,
    hidable: false,
    subtabs: [
      {
        key: "saving",
        name: "Saving",
        symbol: "<i class='fas fa-save'></i>",
        component: "OptionsSavingTab",
        id: 0,
        hidable: false,
      },
      {
        key: "visual",
        name: "Visual",
        symbol: "<i class='fas fa-palette'></i>",
        component: "OptionsVisualTab",
        id: 1,
        hidable: false,
      },
      {
        key: "gameplay",
        name: "Gameplay",
        symbol: "<i class='fas fa-wrench'></i>",
        component: "OptionsGameplayTab",
        id: 2,
        hidable: false,
      }
    ]
  },
  {
    key: "statistics",
    name: "Statistics",
    hideAt: 1.7,
    id: 2,
    hidable: true,
    subtabs: [
      {
        key: "statistics",
        name: "Statistics",
        symbol: "<i class='fas fa-clipboard-list'></i>",
        component: "StatisticsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "challenges",
        name: "Challenge records",
        symbol: "<i class='fas fa-stopwatch'></i>",
        component: "ChallengeRecordsTab",
        condition: () =>
          !player.dev_lock_chpt1 ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.challengeCompleted(),
        id: 1,
        hidable: true,
      },
      {
        key: "prestige runs",
        name: "Past Prestige Runs",
        symbol: "<i class='fas fa-list-ol'></i>",
        component: "PastPrestigeRunsTab",
        condition: () => !player.dev_lock_chpt1 || PlayerProgress.infinityUnlocked(),
        id: 2,
        hidable: true,
      },
      {
        key: "multipliers",
        name: "Multiplier Breakdown",
        symbol: "<i class='fas fa-calculator'></i>",
        component: "MultiplierBreakdownTab",
        condition: () => !player.dev_lock_chpt1 || PlayerProgress.infinityUnlocked(),
        id: 3,
        hidable: true,
      },
      {
        key: "glyph sets",
        name: "Glyph Set Records",
        symbol: "<i class='fas fa-ellipsis-h'></i>",
        component: "GlyphSetRecordsTab",
        condition: () => !player.dev_lock_chpt1 || PlayerProgress.realityUnlocked(),
        id: 4,
        hidable: true,
      },
      {
        key: "speedrun milestones",
        name: "Speedrun Milestones",
        symbol: "<i class='fas fa-flag-checkered'></i>",
        component: "SpeedrunMilestonesTab",
        condition: () => !player.dev_lock_chpt1 || player.speedrun.isActive,
        id: 5,
        hidable: true,
      },
      {
        key: "speedrun records",
        name: "Speedrun Records",
        symbol: "<i class='fas fa-ranking-star'></i>",
        component: "PreviousSpeedrunTab",
        condition: () => !player.dev_lock_chpt1 || Object.keys(player.speedrun.previousRuns).length > 0,
        id: 6,
        hidable: true,
      },
    ]
  },
  {
    key: "achievements",
    name: "Achievements",
    hideAt: 1.9,
    id: 3,
    hidable: true,
    subtabs: [
      {
        key: "quantum",
        name: "Achievements",
        symbol: "<i class='fas fa-trophy'></i>",
        component: "QuantumAchievementsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "normal",
        name: "AD Achievements",
        symbol: "<i class='fas fa-trophy'></i>",
        component: "NormalAchievementsTab",
        id: 1,
        hidable: true,
        condition: () => !player.dev_lock_chpt1
      },
      {
        key: "secret",
        name: "Secret Achievements",
        symbol: "<i class='fas fa-question'></i>",
        component: "SecretAchievementTab",
        id: 2,
        hidable: true,
        condition: () => !player.dev_lock_chpt1
      }
    ]
  },
  {
    key: "automation",
    name: "Automation",
    id: 4,
    hideAt: 2.1,
    hidable: true,
    subtabs: [
      {
        key: "quantumAutobuyers",
        name: "Autobuyers",
        symbol: "<i class='fas fa-cog'></i>",
        component: "QuantumAutobuyersTab",
        condition: () => player.records.totalQuarks.gte(1e35),
        id: 0,
        hidable: true,
      },
      {
        key: "autobuyers",
        name: "AD Autobuyers",
        symbol: "<i class='fas fa-cog'></i>",
        component: "AutobuyersTab",
        condition: () => !player.dev_lock_chpt1 || player.records.totalAntimatter.gte(1e40),
        id: 1,
        hidable: true,
      },
      {
        key: "automator",
        name: "Automator",
        symbol: "<i class='fas fa-code'></i>",
        component: "AutomatorTab",
        condition: () => !player.dev_lock_chpt1 || PlayerProgress.realityUnlocked(),
        id: 2,
        hidable: true,
      },
    ]
  },
  {
    key: "challenges",
    name: "Challenges",
    hideAt: 2,
    condition: () => 
      PlayerProgress.matterUnlocked() ||
      PlayerProgress.realityUnlocked() ||
      PlayerProgress.eternityUnlocked() ||
      PlayerProgress.infinityUnlocked(),
    id: 5,
    hidable: true,
    subtabs: [
      {
        key: "fusion",
        name: "Fusion Challenges",
        symbol: "<i class='fa-solid fa-atom'></i>",
        component: "FusionChallengesTab",
        id: 1,
        hidable: true
      },
      {
        key: "normal",
        name: "Challenges",
        symbol: "Ω",
        component: "NormalChallengesTab",
        condition: () => !player.dev_lock_chpt1,
        id: 2,
        hidable: true
      },
      {
        key: "infinity",
        name: "Infinity Challenges",
        symbol: "∞",
        component: "infinity-challenges-tab",
        condition: () => !player.dev_lock_chpt1 || PlayerProgress.realityUnlocked() || PlayerProgress.hasBroken() || Pelle.isDoomed,
        id: 3,
        hidable: true
      },
      {
        key: "eternity",
        name: "Eternity Challenges",
        symbol: "Δ",
        component: "eternity-challenges-tab",
        condition: () => !player.dev_lock_chpt1 ||
          PlayerProgress.realityUnlocked() ||
          player.challenge.eternity.unlocked !== 0 ||
          EternityChallenges.all.some(ec => ec.completions > 0),
        id: 4,
        hidable: true
      }
    ],
  },
  {
    key: "infinity",
    name: "Infinity",
    hideAt: 2.2,
    UIClass: "o-tab-btn--infinity",
    before: "InfinityPointsHeader",
    id: 6,
    condition: () => !player.dev_lock_chpt1 || PlayerProgress.infinityUnlocked(),
    hidable: true,
    subtabs: [
      {
        key: "upgrades",
        name: "Infinity Upgrades",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "InfinityUpgradesTab",
        condition: () => !player.dev_lock_chpt1 ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 0,
        hidable: true,
      },
      {
        key: "break",
        name: "Break Infinity",
        symbol: "∝",
        component: "BreakInfinityTab",
        condition: () => !player.dev_lock_chpt1 ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 1,
        hidable: true,
      },
      {
        key: "replicanti",
        name: "Replicanti",
        symbol: "Ξ",
        component: "ReplicantiTab",
        condition: () => !player.dev_lock_chpt1 ||
          PlayerProgress.realityUnlocked() ||
          PlayerProgress.eternityUnlocked() ||
          PlayerProgress.infinityUnlocked(),
        id: 2,
        hidable: true,
      }
    ],
  },
  {
    key: "eternity",
    name: "Eternity",
    hideAt: 1.8,
    UIClass: "o-tab-btn--eternity",
    condition: () => !player.dev_lock_chpt1 ||
      PlayerProgress.realityUnlocked() ||
      PlayerProgress.eternityUnlocked(),
    before: "EternityPointsHeader",
    id: 7,
    hidable: true,
    subtabs: [
      {
        key: "studies",
        name: "Time Studies",
        symbol: "<i class='fas fa-book'></i>",
        component: "TimeStudiesTab",
        id: 0,
        hidable: true,
      },
      {
        key: "upgrades",
        name: "Eternity Upgrades",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "EternityUpgradesTab",
        id: 1,
        hidable: true,
      },
      {
        key: "milestones",
        name: "Eternity Milestones",
        symbol: "<i class='fas fa-star'></i>",
        component: "EternityMilestonesTab",
        id: 2,
        hidable: true,
      },
      {
        key: "dilation",
        name: "Time Dilation",
        symbol: "Ψ",
        component: "TimeDilationTab",
        condition: () => !player.dev_lock_chpt1 || PlayerProgress.dilationUnlocked() || PlayerProgress.realityUnlocked(),
        id: 3,
        hidable: true,
      }
    ],
  },
  {
    key: "reality",
    name: "Reality",
    hideAt: 2.3,
    UIClass: "o-tab-btn--reality",
    condition: () => !player.dev_lock_chpt1 || PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought,
    id: 8,
    hidable: true,
    subtabs: [
      {
        key: "glyphs",
        name: "Glyphs",
        symbol: "<i class='fas fa-clone'></i>",
        component: "GlyphsTab",
        id: 0,
        hidable: true,
      },
      {
        key: "upgrades",
        name: "Reality Upgrades",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "RealityUpgradesTab",
        id: 1,
        hidable: true,
      },
      {
        key: "imag_upgrades",
        name: "Imaginary Upgrades",
        symbol: "<i class='fas fa-level-up-alt'></i>",
        component: "ImaginaryUpgradesTab",
        condition: () => !player.dev_lock_chpt1 || MachineHandler.isIMUnlocked,
        id: 2,
        hidable: true,
      },
      {
        key: "perks",
        name: "Perks",
        symbol: "<i class='fas fa-project-diagram'></i>",
        component: "PerksTab",
        id: 3,
        hidable: true,
      },
      {
        key: "hole",
        name: "Black Hole",
        symbol: "<i class='fas fa-circle'></i>",
        component: "BlackHoleTab",
        condition: () => !player.dev_lock_chpt1 || PlayerProgress.realityUnlocked(),
        id: 4,
        hidable: true,
      },
      {
        key: "alchemy",
        name: "Glyph Alchemy",
        symbol: "<i class='fas fa-vial'></i>",
        component: "AlchemyTab",
        condition: () => !player.dev_lock_chpt1 || Ra.unlocks.unlockGlyphAlchemy.canBeApplied,
        id: 5,
        hidable: true,
      },
    ],
  },
  {
    key: "celestials",
    name: "Celestials",
    hideAt: 2.4,
    UIClass: "o-tab-btn--celestial",
    condition: () => !player.dev_lock_chpt1 || Teresa.isUnlocked,
    id: 9,
    hidable: true,
    subtabs: [
      {
        key: "celestial-navigation",
        name: "Celestial Navigation",
        symbol: "<i class='fas fa-map-marked-alt'></i>",
        component: "CelestialNavigationTab",
        id: 0,
        hidable: true,
      },
      {
        key: "teresa",
        name: "Teresa",
        symbol: "Ϟ",
        component: "TeresaTab",
        id: 1,
        hidable: true,
      },
      {
        key: "effarig",
        name: "Effarig",
        symbol: "Ϙ",
        component: "EffarigTab",
        condition: () => !player.dev_lock_chpt1 || TeresaUnlocks.effarig.isUnlocked,
        id: 2,
        hidable: true,
      },
      {
        key: "enslaved",
        name: "The Nameless Ones",
        symbol: "<div class='o-tab-btn--cel3'>\uf0c1</div>",
        component: "EnslavedTab",
        condition: () => !player.dev_lock_chpt1 || EffarigUnlock.eternity.isUnlocked,
        id: 3,
        hidable: true,
      },
      {
        key: "v",
        name: "V",
        symbol: "⌬",
        component: "VTab",
        condition: () => !player.dev_lock_chpt1 || Achievement(151).isUnlocked,
        id: 4,
        hidable: true,
      },
      {
        key: "ra",
        name: "Ra",
        symbol: "<i class='fas fa-sun'></i>",
        component: "RaTab",
        condition: () => !player.dev_lock_chpt1 || VUnlocks.raUnlock.isUnlocked,
        id: 5,
        hidable: true,
      },
      {
        key: "laitela",
        name: "Lai'tela",
        symbol: "ᛝ",
        component: "LaitelaTab",
        condition: () => !player.dev_lock_chpt1 || Laitela.isUnlocked,
        id: 6,
        hidable: true,
      },
      {
        key: "pelle",
        name: "Pelle",
        symbol: "♅",
        component: "PelleTab",
        condition: () => !player.dev_lock_chpt1 || Pelle.isUnlocked,
        id: 7,
        hidable: true,
      }
    ]
  },
  {
    key: "shop",
    name: "Shop",
    newUIClass: "shop",
    hideAt: 1.5,
    condition: () => Cloud.isAvailable,
    id: 10,
    hidable: true,
    subtabs: [
      {
        key: "shop",
        name: "Shop",
        symbol: "$",
        component: "ShopTab",
        id: 0,
        hidable: true
      }
    ]
  }
];
