<script>
import FusionUpgradeButton from "./FusionUpgradeButton";

export default {
  name: "ModernFusionUpgradesTab",
  components: {
    FusionUpgradeButton
  },
  data() {
    return {
      showSetB: false,
      showSet2: false,
    }
  },
  computed: {
    upgrades: () => FusionUpgrades.all,
    upgradesB: () => FusionUpgradeBs.all,
    upgrades2: () => FusionUpgrade2s.all,
  },
  methods: {
    update() {
      this.showSetB = QuantumAchievement(26).isUnlocked;
      this.showSet2 = WebNode.fusionUpgrades2.canBeApplied;
    },
  }
};
</script>

<template>
  <div class="l-upgrades-grid">
    <!--set 1 upgrades-->
    <div
      v-for="row in 3"
      :key="'A'+row"
      class="l-upgrades-grid__row"
    >
      <FusionUpgradeButton
        v-for="column in 4"
        :key="'A'+(row, column)"
        :upgrade="upgrades[row + (3 * (column - 1)) - 1]"
        class="l-upgrades-grid__cell"
        />
    </div>

    <!--set B upgrades-->
    <div
      v-if="showSetB"
      class="l-upgrades-grid__row"
    >
      <FusionUpgradeButton
        :key="'B'+0"
        :upgrade="upgradesB[0]"
        class="l-upgrades-grid__cell"
        />
    </div>

    <!--set 2 upgrades-->
    <div
      v-if="showSet2"
      v-for="row in 3"
      :key="'C'+row"
      class="l-upgrades-grid__row"
    >
      <FusionUpgradeButton
        v-for="column in 4"
        :key="'C'+(row, column)"
        :upgrade="upgrades2[row + (3 * (column - 1)) - 1]"
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

.l-upgrades-grid__column {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  position: relative;
  border-radius: var(--var-border-radius, 0.3rem);
  margin: 0 0.3rem;
}

.l-upgrades-grid__row {
  display: flex;
  flex-direction: row;
}

.l-upgrades-grid__cell {
  margin: 0.5rem 0.4rem;
}
</style>
