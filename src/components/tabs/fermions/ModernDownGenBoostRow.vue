<script>
export default {
  name: "ModernDownGenBoostRow",
  data() {
    return {
      requirement: {
        tier: 1,
        amount: 0
      },
      isBuyable: false,
      purchasedBoosts: 0,
      lockText: null,
      unlockedByBoost: null,
      creditsClosed: false,
      requirementText: null,
      hasTutorial: false,
    };
  },
  computed: {
    genName() {
      return DownQuarkGenerator(this.requirement.tier).shortDisplayName;
    },
    boostCountText() {
      if (this.requirementText) return this.requirementText;
      const parts = [this.purchasedBoosts];
      const sum = parts.map(formatInt).join(" + ");
      if (parts.length >= 2) {
        return `${sum} = ${formatInt(parts.sum())}`;
      }
      return sum;
    },
    classObject() {
      return {
        "o-primary-btn--down-boost-gen o-primary-btn--generator-reset": true,
        "tutorial--glow": this.isBuyable && this.hasTutorial,
        "o-primary-btn--down-gen-disabled": !this.isBuyable,
      };
    }
  },
  methods: {
    update() {
      const requirement = GenBoostDown.requirement;
      this.requirement.tier = requirement.tier;
      this.requirement.amount = requirement.amount;
      this.isBuyable = requirement.isSatisfied && GenBoostDown.canBeBought;
      this.purchasedBoosts = GenBoostDown.purchasedBoosts;
      this.lockText = GenBoostDown.lockText;
      this.unlockedByBoost = GenBoostDown.unlockedByBoost;
      this.hasTutorial = Tutorial.isActive(TUTORIAL_QUANTUM_STATE.BOOST);
    },
    DownQuarkBoost(bulk) {
      if (!GenBoostDown.requirement.isSatisfied || !GenBoostDown.canBeBought) return;
      manualRequestDownGenBoost(bulk);
    }
  }
};
</script>

<template>
  <div class="genboost-container">
    <h3>Down Generator Boost ({{ boostCountText }})</h3>
    <span>Requires: {{ formatInt(requirement.amount) }} {{ genName }} Generators</span>
    <button
      :class="classObject"
      @click.exact="DownQuarkBoost(true)"
      @click.shift.exact="DownQuarkBoost(false)"
    >
      {{ unlockedByBoost }}
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </button>
  </div>
</template>
