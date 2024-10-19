import { DC } from "../../constants";

export const fusionChallenges = [
  {
    id: 1,
    description: `You can only buy 1 Down-type Generator at a time, rather than 10 at a time. Down-type generator costs are modified`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Upgradable Up Quark Generator autobuyer",
      /*effect: () => Math.pow(1.3, InfinityChallenges.completed.length),
      formatEffect: value => formatX(value, 1, 1)*/
    },
    unlockMatter: DC.D1,
  },
  {
    id: 2,
    description: () => `Buying Tickspeed upgrades gives a ${formatPercents(0.012, 1, 1)} penalty to Quark production.
    Up and Down Boosts resets the production multiplier`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Upgradable Down Quark Generator autobuyer",
    },
    unlockMatter: DC.D1,
  },
  {
    id: 3,
    description: `Buying a Generator will reset all Generators that aren't of the same type to their bought amount`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Upgradable Top Quark Generator autobuyer",
    },
    unlockMatter: DC.D1,
  },
  {
    id: 4,
    description: () => `You cannot buy Electron upgrades, and Up and Down Boosts only gove a ${formatX(5, 1, 1)} multiplier`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Upgradable Strange Quark Generator autobuyer",
    },
    unlockMatter: DC.D1,
  },
  {
    id: 5,
    description: () => `You start off with ${formatX(1.15, 0, 3)} tickspeed multiplier, instead of ${formatX(1.1245, 0, 3)},
    but Up Boosts and Down Boosts only give a ${formatX(3, 1, 1)} multiplier`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Upgradable Charm Quark Generator autobuyer",
    },
    unlockMatter: DC.D1,
  },
  {
    id: 6,
    description: () => `Generator cost increase multipliers are higher`,
    goal: Decimal.NUMBER_MAX_VALUE,
    effect: 1.1,
    isQuickResettable: false,
    reward: {
      description: "Upgradable Bottom Quark Generator autobuyer",
    },
    unlockMatter: DC.D1,
  },
  {
    id: 7,
    description: `You can only buy 2 Up Boosts and 2 Down Boosts, but they instead give a small multiplier to Tickspeed upgrades`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Upgradable Tickspeed autobuyer",
    },
    unlockMatter: DC.D1,
  },
  {
    id: 8,
    description: () => `There are only Up and Down quark generators. Up and Down Boost costs are modified, and they now give a
    ${formatX(12, 0, 0)} multiplier to Up and Down-type Generators`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Up Generator Boost autobuyer",
    },
    unlockMatter: DC.D1,
  },
  {
    id: 9,
    description: `Quark Generators are significantly nerfed (multiplier ^0.75) when the amount of Up Boosts and Down Boosts are not equal`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Down Generator Boost autobuyer",
    },
    unlockMatter: DC.D1,
  },
  {
    id: 10,
    description: () => `Tickspeed upgrade and Galaxies are disabled. Up and Down Boost costs are modified`,
    goal: Decimal.NUMBER_MAX_VALUE,
    isQuickResettable: false,
    reward: {
      description: "Nuclear Fusion autobuyer",
    },
    unlockMatter: DC.D1,
  },
];
