<script>
import QuarkRow from "@/components/tabs/fermions/ModernQuarksRow";
import QuarkUpgrades from "@/components/tabs/fermions/ModernQuarkMultiplierRow";
import TickspeedQuantumRow from "@/components/tabs/fermions/TickspeedQuantumRow";
import { maxAllQuarkGenerator } from "../../../core/globals";
//import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernQuarksTab",
  components: {
    QuarkRow,
    QuarkUpgrades,
    TickspeedQuantumRow,
  },
  data() {
    return {
      buyQuark1GenMultiplier: new Decimal(),
      gen1MultiplierText: "",
    };
  },
  methods: {
    update() {
      this.buyQuark1GenMultiplier.copyFrom(QuarkGenerators.generatorPurchaseMultiplier);
      this.gen1MultiplierText = `1st gen quark generator purchase multiplier: ${formatX(this.buyQuark1GenMultiplier, 2, 2)}`
    },
    maxAll() {
      maxAllQuarkGenerator();
    },
  }
};
</script>

<template>
  <div class="l-antimatter-dim-tab">
    <div class="modes-container">      
      <button
        class="o-primary-btn l-button-container"
        @click="maxAll"
      >
        Max All (M)
      </button>
    </div>
    <div>
      {{ gen1MultiplierText }}
      <TickspeedQuantumRow />
      <br><br>
    </div>
    <div>
      1st generation quarks
    </div>
    <div class="l-dimensions-container">
      <QuarkRow
        v-for="tier in 2"
        :key="tier"
        :tier="tier"
      />
    </div>
    <QuarkUpgrades/>
  </div>
</template>

<style scoped>
.l-button-container {
  width: 100px;
  height: 30px;
  padding: 0;
}
</style>
