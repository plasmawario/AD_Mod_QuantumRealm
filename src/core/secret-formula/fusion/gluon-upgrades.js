import { DC } from "../../constants";

const rebuyable = props => {
  const { effectVal } = props;

  //props.cost = () => Decimal.pow(props.costMult, player.nuclearFusion.rebuyables[props.id]).times(props.initialCost).clampMin(props.initialCost);
  props.cost = () => BuyGluonUpgrade[props.id - 1].cost;
  props.effect = () => Decimal.pow(effectVal + player.nuclearFusion.rebuyables[props.id]);
  props.description = () => props.textTemplate.replace("{value}", formatX(effectVal, 2, 1));
  props.formatEffect = value => formatX(value, 2, 1);
  props.formatCost = value => format(value, 2, 1);
  return props;
};

export const buyGluonUpgrade = [
  rebuyable({
      name: "Buy Gluon",
      id: 1,
      rebuyable: true,
      initialCost: DC.E1,
      showName: false,
      showEffect: false,
      //costMult: [DC.E2, DC.E3, DC.E4, DC.E5],
      //costMultThresholds: [DC.E100, DC.E500, DC.E1000],
      cost: () => BuyGluonUpgrade[0].cost,
      costMult: [DC.E1, DC.E2],
      costMultWebUpgrade: [DC.D5, DC.E1],   //is only applied after buying A-GMUL
      costIncreaseThreshold: DC.E100,
      costCap: Decimal.MAX_VALUE,
      textTemplate: "Buy a Gluon to increase Matter gains on Fusion",
      effectVal: 1,
      effect: () => null,
  }),
]