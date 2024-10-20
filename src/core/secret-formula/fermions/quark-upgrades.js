import { DC } from "../../constants";

const rebuyable = props => {
  const { effectVal } = props;

  props.cost = () => Decimal.pow(props.costMult, player.quarks.rebuyables[props.id]).times(props.initialCost).clampMin(props.initialCost);
  props.effect = () => Decimal.pow(effectVal + player.quarks.rebuyables[props.id]);
  props.description = () => props.textTemplate.replace("{value}", formatX(effectVal, 2, 1));
  props.formatEffect = value => formatX(value, 2, 1);
  props.formatCost = value => format(value, 2, 1);
  return props;
};

export const quarkUpgrades = [
  rebuyable({
    name: "Up Quark Amplifier",
    id: 1,
    rebuyable: true,
    initialCost: DC.D2E4,
    showName: true,
    showEffect: false,
    costMult: 25,
    buyCap: 75,
    textTemplate: "Give a {value} multiplier to your Up Quark Generators",
    effectVal: 2.5,
    effects: {
      QuarkGeneratorMulti: () => 2.5,
    }
  }),
  rebuyable({
    name: "Down Quark Amplifier",
    id: 2,
    rebuyable: true,
    initialCost: DC.D2E4,
    showName: true,
    showEffect: false,
    costMult: 25,
    buyCap: 75,
    textTemplate: "Give a {value} multiplier to your Down Quark Generators",
    effectVal: 2.5,
    effects: {
      QuarkGeneratorMulti: () => 2.5,
    }
  }),
  /*{
    name: "one-time-upgrade example",
    id: 3,
    rebuyable: false,
    cost: 1,
    description: "1st gen Quark Generators multiplier based on how many 1st gen Quark Generators you own",
    showEffect: false,
    effects: {

    },
    formatEffect: value => formatX(value, 2, 2)
  },*/
];
