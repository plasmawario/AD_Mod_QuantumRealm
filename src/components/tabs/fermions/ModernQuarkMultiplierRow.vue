<script>
import QuarkUpgradeButton from "./quark-upgrades/QuarkUpgradeButton";

export default {
  name: "ModernQuarkMultiplierRow",
  components: {
    QuarkUpgradeButton
  },
  computed: {
    upgrades: () => FermionUpgrades.all
  },
  methods: {
    /*id(row, column) {
      return (row - 1) * 5 + column - 1;
    }*/
  }
};
</script>

<template>
  <div class="l-gen1quark-upgrades-grid">
    <div class="l-gen1quark-upgrades-grid__row">
      <QuarkUpgradeButton
        v-for="column in 2"
        :key="column"
        :upgrade="upgrades[column - 1]"
        class="l-gen1quark-upgrades-grid__cell"
        />
    </div>
  </div>
</template>

<style scoped>
.l-gen1quark-upgrades-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.l-gen1quark-upgrades-grid__row {
  display: flex;
  flex-direction: row;
}

.l-gen1quark-upgrades-grid__cell {
  margin: 0.5rem 0.4rem;
}
</style>
