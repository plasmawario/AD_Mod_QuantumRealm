import { DC } from "../../constants";

export const quantumAchievements = [
  {
    id: 11,
    name: "Where are my dimensions?",
    description: "Buy an Up Quark Generator.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 12,
    name: "2 ways to produce quarks??",
    description: "Buy 10 Down Quark Generators.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 13,
    name: "Oh, there are my dimensions",
    description: "Buy a Charm Quark Generator.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 14,
    name: "We're really continuing this trend, huh?",
    description: "Buy 10 Strange Quark Generators.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 15,
    name: "Yes, i'm a top",
    description: "Buy a Top Quark Generator",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 16,
    name: "Actually no, i'm a switch",
    description: "Buy 10 Bottom Quark Generators.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 17,
    name: "It's quarkin' time",
    get description() { return `Produce ${format(DC.E55)} quarks`; },
    checkRequirement: () => player.records.totalQuarks.gte(1e55),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {return `Quark Generators are ${formatPercents(0.5)} stronger`},
    effect: 1.5
  },
  {
    id: 18,
    name: "Just play this game for me",
    description: "Buy all quark autobuyers and the tickspeed autobuyer.",
    checkRequirement: () => player.auto.upQuarkGens.all[0].isBought &&
                            player.auto.upQuarkGens.all[1].isBought &&
                            player.auto.upQuarkGens.all[2].isBought &&
                            player.auto.downQuarkGens.all[0].isBought &&
                            player.auto.downQuarkGens.all[1].isBought &&
                            player.auto.downQuarkGens.all[2].isBought &&
                            player.auto.tickspeed_quantum.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 21,
    name: "Haha funni Numbr",
    description: "Play the game for 4 hours",
    checkRequirement: () => player.records.realTimePlayed > 14400000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    //get reward() {return `up and down generator boosts are now ${formatX(10)} stronger`},
    //effect: 10
  },
  {
    id: 22,
    name: "3 generator types already?",
    description: "Buy an Electron Generator.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 23,
    name: "Matter Dimensions",
    description: "Fuse your Quarks and Electrons into matter.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.FUSION_RESET_BEFORE,
    get reward() { return `You start every fusion with ${formatInt(110)} quarks`; },
    effect: 110
  },
  {
    id: 24,
    name: "What's the Matter?",
    description: "Have at least 50 unspent Matter",
    checkRequirement: () => Currency.matter_quantum.value.gte(50),
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 25,
    name: "Solar-powered!",
    get description() {return `Generate ${format(DC.E100)} quarks within 2 minutes of a new Fusion`},
    checkRequirement: () => Currency.quarks1.gte(DC.E100) && Time.thisFusionRealTime.totalSeconds <= 120,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {return `Quark Generators are much stronger within the first 10 seconds of each new Fusion`},
    effect: () => Math.max((10 - Time.thisFusion.totalSeconds) * 80, 1),
    effectCondition: () => Time.thisFusion.totalSeconds < 10,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 26,
    name: "Physically-challenged",
    description: "Complete all 10 Fusion Challenges",
    checkRequirement: () => player.challenge.fusion.completedBits >= 2046,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() {return `Unlock the 17th Fusion upgrade`},
    effect: 1
  },
  {
    id: 27,
    name: "Copy-pasted objectives",
    description: "Purchase all initial 13 Fusion upgrades",
    checkRequirement: () => player.nuclearFusion.upgradeBits >= 8190 &&
                            player.nuclearFusion.upgradeBbits >= 1,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() {return `Up-type, Down-type, and Electron-type Generators are ${formatPercents(0.15, 0, 0)} stronger, and unlock String Theories`},
    effect: 1.15
  },
  {
    id: 28,
    name: "Electricity-y, electricity!",
    get description() {return `Produce ${format(DC.E75)} electrons.`;},
    checkRequirement: () => player.records.totalElectrons.exponent >= 75,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 31,
    name: "Positively-charged",
    description: "Perform a Fusion without producing Electrons during the Fusion",
    checkRequirement: () => player.records.thisFusion.maxElectrons.lte(0),
    checkEvent: GAME_EVENT.FUSION_RESET_AFTER,
    get reward() {return `Electron-type Generators are ${formatPercents(0.1, 0, 0)} times stronger`},
    effect: () => 1.1,
  },
  {
    id: 32,
    name: "Not so challenging now, is it?",
    get description() {return `Reduce total Fusion Challenge completion time to less than ${format(1, 0, 0)} minute`;},
    checkRequirement: () => Time.fusionChallengeSum.totalMinutes < 1,
    checkEvent: GAME_EVENT.FUSION_RESET_AFTER,
  },
  {
    id: 33,
    name: "Well that escalated quickly",
    description: "Perform a Fusion in less than 5 seconds",
    checkRequirement: () => Time.bestFusion.totalSeconds < 5,
    checkEvent: GAME_EVENT.FUSION_RESET_AFTER,
  },
  {
    id: 34,
    name: "I used the Matter to create the Matter",
    description: "Create 100 Matter in a single fusion",
    checkRequirement: () => gainedMatter().gte(100),
    checkEvent: GAME_EVENT.FUSION_RESET_BEFORE,
    get reward() {return `Start every Fusion with ${format(DC.E10)} Quarks`},
    effect: () => 10000000000
  },
  {
    id: 35,
    name: "When can i start getting more galaxies?",
    get description() {return `Reach ${format(DC.E30, 0, 0)} ticks per second`},
    checkRequirement: () => Tickspeed_Quantum.perSecond.exponent >= 30,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 36,
    name: "Full of Ups and Downs",
    get description() {return `Produce ${format(DC.E800, 0, 0)} quarks`},
    checkRequirement: () => player.records.totalQuarks.exponent >= 800,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 37,
    name: "Sacrificing can't save you now",
    get description() {return `Have either your Top or Bottom Quark Generators's multiplier reach ${formatX(DC.E50, 0, 0)}`},
    checkRequirement: () => UpQuarkGenerator(3).multiplier.exponent >= 50 || DownQuarkGenerator(3).multiplier.exponent >= 50,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() {return `Top and Bottom Quark Generators are now ${formatPercents(0.15)} stronger`},
    effect: () => 1.15
  },
  {
    id: 38,
    name: "Mewon",
    description: "Buy a Muon generator",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,  
  },
  {
    id: 41,
    name: "Infinitely shocking",
    get description() {return `Produce ${format(Number.MAX_VALUE, 2, 2)} electrons`},
    checkRequirement: () => Currency.electrons.gte(Number.MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,  
  },
  {
    id: 42,
    name: "Another Half-Life joke wheeeeeee",
    description: "Buy a Tau generator",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,  
  },
  {
    id: 43,
    name: "Overkill",
    description: "Complete fusion challenges 1000 times",
    checkRequirement: () => player.challenge.fusion.totalCompletions >= 1000,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,  
    get reward() {return `fusions are multiplied by ${formatX(16, 0, 0)} per fusion`},
    effect: () => 16
  },
  {
    id: 44,
    name: "Vibe to the beat!",
    description: "Reach 140 total strings",
    checkRequirement: () => player.web.totalStrings.gte(140),
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,  
  },
  {
    id: 45,
    name: "It's as shrimple as that",
    description: "Perform a fusion while having no other Generators and tickspeed upgrades except for 1 Up Generator",
    checkRequirement: () => (UpQuarkGenerator(1).amount.eq(1) && UpQuarkGenerator(2).amount.eq(0) && 
                            UpQuarkGenerator(3).amount.eq(0) && DownQuarkGenerator(1).amount.eq(0) &&
                            DownQuarkGenerator(2).amount.eq(0) && DownQuarkGenerator(3).amount.eq(0) &&
                            ElectronGenerator(1).amount.eq(0) && ElectronGenerator(2).amount.eq(0) &&
                            ElectronGenerator(3).amount.eq(0) && Tickspeed_Quantum.totalUpgrades === 0),
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() {return `Quark and Electron-type Generators are ${formatPercents(0.5)} stronger`},
    effect: () => 1.5
  },
  {
    id: 46,
    name: "Super-boosted",
    description: "Gain 35 of either Up or Down Boosts outside of Fusion Challenge 8",
    checkRequirement: () => (player.upBoosts >= 35 || player.downBoosts >= 35) &&
                            (Player.fusionChallenge && Player.fusionChallenge._config.id != 8),
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() {return `Your Achievement multiplier now affects Electron-type Generators`},
    effect: () => true,
  },
  {
    id: 47,
    get name() {return !player.dev_lock_chpt1 ? "To be continued..." : "Gone, reduced to atoms"},
    get description() {return !player.dev_lock_chpt1 ? "To be continued..." : "Decay your Matter"},
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,  
  },
  {
    id: 48,
    get name() {return !player.dev_lock_chpt1 ? "To be continued..." : "amongus"},
    get description() {return !player.dev_lock_chpt1 ? "To be continued..." : "penis"},
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,  
  },
];
