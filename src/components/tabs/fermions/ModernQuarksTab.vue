<script>
import UpQuarkRow from "@/components/tabs/fermions/ModernUpQuarksRow";
import DownQuarkRow from "@/components/tabs/fermions/ModernDownQuarksRow";
import QuarkUpgrades from "@/components/tabs/fermions/ModernQuarkMultiplierRow";
import UpGenBoostRow from "@/components/tabs/fermions/ModernUpGenBoostRow";
import DownGenBoostRow from "@/components/tabs/fermions/ModernDownGenBoostRow";
import PrimaryButton from "@/components/PrimaryButton";
import TickspeedQuantumRow from "@/components/tabs/fermions/TickspeedQuantumRow";
//import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernQuarksTab",
  components: {
    PrimaryButton,
    UpQuarkRow,
    DownQuarkRow,
    QuarkUpgrades,
    UpGenBoostRow,
    DownGenBoostRow,
    TickspeedQuantumRow,
  },
  data() {
    return {
      hasUpBoosts: false,
      hasDownBoosts: false,
      isDownGenUnlocked: false,
      buyUpQuarkGenMultiplier: new Decimal(),
      buyDownQuarkGenMultiplier: new Decimal(),
      upMultiplierText: "",
      downMultiplierText: "",
    };
  },
  methods: {
    update() {
      this.hasUpBoosts = player.upBoosts > 0;
      this.hasDownBoosts = player.downBoosts > 0;
      this.isDownGenUnlocked = DownQuarkGenerator(1).requirementReached || DownQuarkGenerator(1).isUnlocked;
      this.buyUpQuarkGenMultiplier.copyFrom(UpQuarkGenerators.generatorPurchaseMultiplier);
      this.buyDownQuarkGenMultiplier.copyFrom(DownQuarkGenerators.generatorPurchaseMultiplier);
      this.upMultiplierText = `up quark generator purchase multiplier: ${formatX(this.buyUpQuarkGenMultiplier, 2, 2)}`;
      this.downMultiplierText = `down quark generator purchase multiplier: ${formatX(this.buyDownQuarkGenMultiplier, 2, 2)}`;
    },
    maxAll() {
      maxAllDownQuarkGenerator();
      maxAllUpQuarkGenerator();
      buyMaxTickSpeedQuantum();
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
        Max All
      </button>
    </div>
    <div>
      {{ upMultiplierText }}
      <br/>
      {{ downMultiplierText }}
      <TickspeedQuantumRow />
      <br><br>
    </div>
    <div>
      Up-type generators
    </div>
    <div class="l-dimensions-container">
      <UpQuarkRow
        v-for="tier in 3"
        :key="tier"
        :tier="tier"
      />
    </div>
    <br/>
    <br/>
    <div
      v-if="isDownGenUnlocked">
      Down-type generators
    </div>
    <div class="l-dimensions-container">
      <DownQuarkRow
        v-for="tier in 3"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div class="resets-container">
      <UpGenBoostRow />
      <DownGenBoostRow />
    </div>
  </div>
</template>

<style scoped>
.l-button-container {
  width: 100px;
  height: 30px;
  padding: 0;
}
</style>
