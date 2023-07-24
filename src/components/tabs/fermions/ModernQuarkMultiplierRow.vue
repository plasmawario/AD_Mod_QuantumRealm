<script>
import UpQuarkMultiplierButton from "./quark-upgrades/QuarkUpgradeButton";
//import FermionUpgrade from "@/components/core/secret-formula/fermions/fermions"

export default {
  name: "ModernQuarkMultiplierRow",
  components: {
    UpQuarkMultiplierButton,
  },
  computed: {
    grid() {
      return [
        [
          FermionUpgrade.idUpGenMulti,
        ],
        [
        ]
      ];
    },
    costIncreases: () => EternityUpgrade.epMult.costIncreaseThresholds.map(x => new Decimal(x))
  },
  methods: {
    formatPostBreak
  }
};
</script>

<template>
  <div class="l-eternity-upgrades-grid">
    <div
      v-for="(row, i) in grid"
      :key="i"
      class="l-eternity-upgrades-grid__row"
    >
      <UpQuarkMultiplierButton
        v-for="upgrade in row"
        :key="upgrade.id"
        :upgrade="upgrade"
        class="l-eternity-upgrades-grid__cell"
      />
    </div>
  </div>
</template>

<style scoped>
.l-eternity-upgrades-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.l-eternity-upgrades-grid__row {
  display: flex;
  flex-direction: row;
}

.l-eternity-upgrades-grid__cell {
  margin: 0.5rem 0.8rem;
}
</style>
