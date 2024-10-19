import { DC } from "../../constants";

const rebuyable = props => {
  const { effectVal } = props;

  props.cost = () => Decimal.pow(props.costMult, player.electrons.rebuyables[props.id]).times(props.initialCost).clampMin(props.initialCost);
  props.effect = () => Decimal.pow(effectVal + player.electrons.rebuyables[props.id]);
  props.description = () => props.textTemplate.replace("{value}", formatX(effectVal, 2, 1));
  props.formatEffect = value => formatX(value, 2, 1);
  props.formatCost = value => format(value, 2, 1);
  return props;
};

export const electronUpgrades = [
  {
    name: "Electron-Up Quark Synergy",
    id: 1,
    rebuyable: false,
    cost: 50000000,
    description: "Up-type Generators multiplier based on unspent electrons",
    showName: true,
    showEffect: true,
    //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
    effect: () => Math.pow(Currency.electrons.value.exponent + 1, 0.65),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Electron-Down Quark Synergy",
    id: 2,
    rebuyable: false,
    cost: 1000000000,
    description: "Down-type Generators multiplier based on unspent electrons",
    showName: true,
    showEffect: true,
    //effectVal: () => Math.pow(Currency.electrons.value.exponent + 1, 0.45),
    effect: () => Math.pow(Currency.electrons.value.exponent + 1, 0.65),
    formatEffect: value => formatX(value, 2, 2)
  },
  /*{
    name: "Quark Efficiency",
    id: 3,
    rebuyable: false,
    cost: 300000,
    description: "Increase the multiplier for buying Quark Generators 1.2 ➜ 1.22",
    showName: true,
    showEffect: true,
    //effectVal: 1.22,
    effect: () => DC.D0_02,
    formatEffect: () => `${formatX(1.2, 2, 2)} ➜ ${formatX(1.22, 2, 2)}`
  },*/
  {
    name: "Proto-Galaxy",
    id: 3,
    rebuyable: false,
    cost: 100000000000000000000,
    description: "Increase the base tickspeed multiplier",
    showName: true,
    showEffect: false,
    //effectVal: 1.25,
    effect: () => 1,
    /*effect: {
        TickspeedNewBase: () => 1.35,
    },*/
    formatEffect: () => `${formatX(1.125, 2, 2)} ➜ ${formatX(1.15, 2, 2)}`
  },
];
