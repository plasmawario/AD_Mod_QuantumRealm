import QuantumAchievement from "../../../components/tabs/quantum-achievements/QuantumAchievement.vue";
import { DC } from "../../constants";

export const fusionUpgrades = [
    {
        name: "Achievement Refinery",
        id: 1,
        rebuyable: false,
        cost: 1,
        description: "Achievements give a stronger boost to your up-type and down-type generators",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => 0.05,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => `${formatX(QuantumAchievements.power, 2, 2)}`
    },
    {
        name: "Up Quark Efficiency",
        id: 2,
        rebuyable: false,
        cost: 50,
        description: "Increase the base up-type generator purchase multiplier",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => DC.D1_21,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => `${formatX(1.2, 2, 2)} ➜ ${formatX(1.21, 2, 2)}`
    },
    {
        name: "Down Quark Efficiency",
        id: 3,
        rebuyable: false,
        cost: 60,
        description: "Increase the base down-type generator purchase multiplier",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => DC.D1_21,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => `${formatX(1.2, 2, 2)} ➜ ${formatX(1.21, 2, 2)}`
    },
    {
        name: "Clock I",
        id: 4,
        rebuyable: false,
        cost: 2,
        description: "Top and Bottom generator multiplier based on time played",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => Decimal.max(Math.pow(Time.realTimePlayed.totalMinutes / 4, 0.25), 1),
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(Decimal.max(Math.pow(Time.realTimePlayed.totalMinutes / 4, 0.25), 1), 2, 2)
    },
    {
        name: "Clock II",
        id: 5,
        rebuyable: false,
        cost: 2,
        description: "Charm and Strange generator multiplier based on time played",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => Decimal.max(Math.pow(Time.realTimePlayed.totalMinutes / 4, 0.25), 1),
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(Decimal.max(Math.pow(Time.realTimePlayed.totalMinutes / 4, 0.25), 1), 2, 2)
    },
    {
        name: "Clock III",
        id: 6,
        rebuyable: false,
        cost: 3,
        description: "Up and Down generator multiplier based on time spent played",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => Decimal.max(Math.pow(Time.realTimePlayed.totalMinutes / 4, 0.25), 1),
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(Decimal.max(Math.pow(Time.realTimePlayed.totalMinutes/ 4, 0.25), 1), 2, 2)
    },
    {
        name: "Nuclear Imbuement",
        id: 7,
        rebuyable: false,
        cost: 15,
        description: "Quark Generator multiplier based on number of times Fused",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => Currency.fused.value.times(0.22).plus(1),
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(Currency.fused.value.times(0.22).plus(1), 2, 2)
    },
    {
        name: "Up Boost Efficiency",
        id: 8,
        rebuyable: false,
        cost: 18,
        description: "Increase the up generator boost multiplier",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => 10,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => `${formatX(7.5, 2, 2)} ➜ ${formatX(10, 2, 2)}`
    },
    {
        name: "Down Boost Efficiency",
        id: 9,
        rebuyable: false,
        cost: 20,
        description: "Increase the down generator boost multiplier",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => 10,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => `${formatX(7.5, 2, 2)} ➜ ${formatX(10, 2, 2)}`
    },
    {
        name: "Proto-Galaxy",
        id: 10,
        rebuyable: false,
        cost: 50,
        description: "Gain 1 Proto-Galaxy",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => 1,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(1, 2, 2)
    },
    {
        name: "Quark Persistance I",
        id: 11,
        rebuyable: false,
        cost: 85,
        description: "You start every Fusion with one Up and Down generator boosts, automatically unlocking the Charm and Strange generator",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => true,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => ``
    },
    {
        name: "Quark Persistance II",
        id: 12,
        rebuyable: false,
        cost: 100,
        description: "You start every Fusion with two Up and Down generator boosts, automatically unlocking the Top and Bottom generator",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => true,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => ``
    },
];

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export const fusionUpgrades_B = [
    {
        name: "Quark Persistance III",
        id: 1,
        rebuyable: false,
        cost: 500,
        description: "You keep all Electron upgrades on Nuclear Fusion",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => true,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => ``
    },
];
  
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

export const fusionUpgrades_set2 = [
    {
        name: "Up Superbooster",
        id: 1,
        rebuyable: false,
        cost: 5000000000000,
        description: "Up Boosts affect Down-type generators with reduced effect",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => true,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => ``
    },
    {
        name: "Down Superbooster",
        id: 2,
        rebuyable: false,
        cost: 7000000000000,
        description: "Down Boosts affect Up-type generators with reduced effect",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => true,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => ``
    },
    {
        name: "Buy Max Boosts",
        id: 3,
        rebuyable: false,
        cost: 100000000000000,
        description: "Unlock the Buy Max Up and Down Boost autobuyer mode",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => true,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => ``
    },
    {
        name: "Galaxy Amplifier",
        id: 4,
        rebuyable: false,
        cost: 5000000000000000,
        description: () => `All galaxies are ${formatPercents(0.25)} stronger`,
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => 1.25,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => ``
    },
    {
        name: "Electric Charge Efficiency",
        id: 5,
        rebuyable: false,
        cost: 500000000000000,
        description: "Increase base production of Electric Charge",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => 0.3,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => `${formatPow(0.25, 2, 2)} ➜ ${formatPow(0.3, 2, 2)}`
    },
    {
        name: "Fusion-ception",
        id: 6,
        rebuyable: false,
        cost: 150000000000000000,
        description: "You passively gain Matter based on your best Matter per fusion",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => Player.bestMatterFusion.dividedBy(50),
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: value => `${format(value, 2, 1)} Matter/min`
    },
    {
        name: "Matter Influence",
        id: 7,
        rebuyable: false,
        cost: 10000000000000,
        description: "Quark Generator Multiplier based on unspent Matter",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => Currency.matter_quantum.value.dividedBy(2).pow(1.75).plus(1),
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(Currency.matter_quantum.value.dividedBy(2).pow(1.75).plus(1), 2, 2)
    },
    {
        name: "String-Spinnor Amplifier",
        id: 8,
        rebuyable: false,
        cost: 20000000000000,
        description: "Quark Generator Multiplier based on total Strings",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => Currency.strings.max.times(120),
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(Currency.strings.max.times(120), 2, 2)
    },
    {
        name: "Electron Efficiency",
        id: 9,
        rebuyable: false,
        cost: 2000000000000000,
        description: "Increase the base Electron-type Generator purchase multiplier",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => DC.D1_31,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => `${formatX(1.3, 1, 1)} ➜ ${formatX(1.31, 2, 2)}`
    },
    {
        name: "Infinite Penetration",
        id: 10,
        rebuyable: false,
        cost: 40000000000000,
        description: "Quark Generator, Electron Generator, and Tickspeed post-fusion cost scaling reduced by 2",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => 2,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(GameCache.postFusionCostScaleMulti, 0, 0)
    },
    {
        name: "Charged Fusions",
        id: 11,
        rebuyable: false,
        cost: 1200000000000000,
        description: "You gain more fusions based on Electric Charge",
        showName: false,
        showEffect: true,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => Currency.electricCharge.value.exponent ** 0.5,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => formatX(Currency.electricCharge.value.exponent ** 0.5, 2, 2)
    },
    {
        name: "Electric Automation",
        id: 12,
        rebuyable: false,
        cost: 100000000000000000000,
        description: "Unlock autobuyers for your Electron-type generators",
        showName: false,
        showEffect: false,
        //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
        effect: () => true,
        /*effect: {
            Synergy1: () => Currency.electrons.value.times(1.3),
        },*/
        formatEffect: () => ``
    },
]