<script>
import ElectronUpgradeButton from "./quark-upgrades/ElectronUpgradeButton";

export default {
  name: "ModernElectronUpgradeRow",
  components: {
    ElectronUpgradeButton
  },
  computed: {
    upgrades: () => ElectronUpgrades.all
  },
  methods: {
    /*id(row, column) {
      return (row - 1) * 5 + column - 1;
    }*/
  }
};
</script>

<template>
  <div class="l-upgrades-grid">
    <div class="l-upgrades-grid__row">
      <ElectronUpgradeButton
        v-for="column in 3"
        :key="column"
        :upgrade="upgrades[column - 1]"
        class="l-upgrades-grid__cell"
        />
    </div>
  </div>
</template>

<style scoped>
.l-upgrades-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.l-upgrades-grid__row {
  display: flex;
  flex-direction: row;
}

.l-upgrades-grid__cell {
  margin: 0.5rem 0.4rem;
}
</style>
