<script>
  export default {
    props: {
      budget: Decimal,
      cost: Decimal,
      formatCost: {
        type: Function,
        required: true,
      },
      action: {
        type: Function,
        required: true
      },
    },
    data() {
      return {
        isLocked: false
      };
    },
    computed: {
      isEnabled() {
        if (this.isLocked) return false;
        return this.budget.gte(this.cost);
      },
      enabledClass() {
        if (!this.isEnabled || this.isLocked) return "c-string-buy-button--locked";

        return "c-string-buy-button--unlocked";
      }
    },
    methods: {
      update() {
        this.isLocked = !QuantumAchievement(27).isUnlocked;
      }
    }
  };
</script>

<template>
  <button
    class="l-string-buy-button c-string-buy-button"
    :class="enabledClass"
    @click="action"
  >
    {{ isLocked ? "Requires Achievement 27 to unlock" : formatCost(cost, 2, 2) }}
  </button>
</template>