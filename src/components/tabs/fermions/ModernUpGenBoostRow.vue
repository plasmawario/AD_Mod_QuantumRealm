<script>
export default {
  name: "ModernUpGenBoostRow",
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
      return UpQuarkGenerator(this.requirement.tier).shortDisplayName;
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
        "o-primary-btn--up-boost-gen o-primary-btn--generator-reset": true,
        "tutorial--glow": this.isBuyable && this.hasTutorial,
        "o-primary-btn--up-gen-disabled": !this.isBuyable,
      };
    }
  },
  methods: {
    update() {
      const requirement = GenBoostUp.requirement;
      this.requirement.tier = requirement.tier;
      this.requirement.amount = requirement.amount;
      this.isBuyable = requirement.isSatisfied && GenBoostUp.canBeBought;
      this.purchasedBoosts = GenBoostUp.purchasedBoosts;
      this.lockText = GenBoostUp.lockText;
      this.unlockedByBoost = GenBoostUp.unlockedByBoost;
      this.hasTutorial = Tutorial.isActive(TUTORIAL_QUANTUM_STATE.BOOST);
    },
    UpQuarkBoost(bulk) {
      if (!GenBoostUp.requirement.isSatisfied || !GenBoostUp.canBeBought) return;
      manualRequestUpGenBoost(bulk);
    }
  }
};
</script>

<template>
  <div class="genboost-container">
    <h3>Up Generator Boost ({{ boostCountText }})</h3>
    <span>Requires: {{ formatInt(requirement.amount) }} {{ genName }} Generators</span>
    <button
      :class="classObject"
      @click.exact="UpQuarkBoost(true)"
      @click.shift.exact="UpQuarkBoost(false)"
    >
      {{ unlockedByBoost }}
      <div
        v-if="hasTutorial"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </button>
  </div>
</template>
