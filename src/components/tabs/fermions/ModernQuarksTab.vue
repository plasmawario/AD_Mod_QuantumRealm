<script>
import QuarkRow from "@/components/tabs/fermions/ModernQuarksRow";
import QuarkUpgrades from "@/components/tabs/fermions/ModernQuarkMultiplierRow";
import { maxAllQuarkGenerator } from "../../../core/globals";
//import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernQuarksTab",
  components: {
    QuarkRow,
    QuarkUpgrades,
  },
  data() {
    return {

    };
  },
  methods: {
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
