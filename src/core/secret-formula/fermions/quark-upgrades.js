import { DC } from "../../constants";

export const quarkUpgrades = {
  idUpGenMulti: {
    id: 1,
    cost: DC.E2,
    description: () => `Increase the multiplier of your Up Quark Generators (+${format(0.1)})`,
    effect: () => QuarkGenerator(1).bought * 0.1, //i dunno how to do this yet so this is here for now
    formatEffect: value => formatX(value, 2, 2),
  }
};
