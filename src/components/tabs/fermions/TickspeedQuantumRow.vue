<script>
export default {
  name: "TickspeedQuantumRow",
  data() {
    return {
      purchasedTickspeed: 0,
      isVisible: false,
      mult: new Decimal(0),
      cost: new Decimal(0),
      isAffordable: false,
      tickspeed: new Decimal(0),
      gameSpeedMult: 1,
      galaxyCount: 0,
      hasTutorial: false,
    };
  },
  computed: {
    classObject() {
      return {
        "l-tickspeed-container": true,
        "l-tickspeed-container--hidden": !this.isVisible
      };
    },
    multiplierDisplay() {
      const tickmult = this.mult;
      return `${formatX(tickmult.reciprocal(), 2, 3)} faster / upgrade.`;
    },
    tickspeedDisplay() {
      return `Tickspeed: ${format(this.tickspeed, 2, 3)} / sec`;
    },
    upgradeCount() {
      const purchased = this.purchasedTickspeed;
      return quantifyInt("Purchased Upgrade", purchased);
    }
  },
  methods: {
    update() {
      this.purchasedTickspeed = player.totalTickQuantumBought;
      this.isVisible = Tickspeed_Quantum.isUnlocked;
      if (!this.isVisible) return;
      this.mult.copyFrom(Tickspeed_Quantum.multiplier);
      this.cost.copyFrom(Tickspeed_Quantum.cost);
      this.isAffordable = Tickspeed_Quantum.isAvailableForPurchase && Tickspeed_Quantum.isAffordable;
      this.tickspeed.copyFrom(Tickspeed_Quantum.perSecond);
      this.gameSpeedMult = getGameSpeedupForDisplay();
      this.galaxyCount = player.galaxies;
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.TICKSPEED);
    },
    buttonClass() {
      return {
        "o-primary-btn": true,
        "tickspeed-btn": true,
        "o-primary-btn--disabled": !this.isAffordable,
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    },
  }
};
</script>

<template>
  <div :class="classObject">
    <div class="tickspeed-buttons">
      <button
        v-tooltip="upgradeCount"
        :class="buttonClass()"
        onclick="buyTickSpeedQuantum()"
      >
        <span>
          Tickspeed Cost: {{ format(cost) }}
        </span>
        <div
          v-if="hasTutorial"
          class="fas fa-circle-exclamation l-notification-icon"
        />
      </button>
      <button
        class="o-primary-btn tickspeed-max-btn"
        :class="{ 'o-primary-btn--disabled': !isAffordable}"
        onclick="buyMaxTickSpeedQuantum()"
      >
        Buy Max
      </button>
    </div>
    <div
      class="tickspeed-labels"
    >
      {{ tickspeedDisplay }} | {{ multiplierDisplay }}
    </div>
  </div>
</template>

<style scoped>
.o-primary-btn {
  position: relative;
  vertical-align: middle;
}

.tickspeed-btn {
  position: relative;
  width: 30rem;
  height: 2.5rem;
  padding: 0.25rem;
}

.tickspeed-labels {
  color: var(--color-text);
  padding: 0.25rem;
}

.l-tickspeed-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
}

.l-tickspeed-container--hidden {
  visibility: hidden;
}

.tickspeed-max-btn {
  margin-left: 0.5rem;
  width: 10rem;
  height: 2.5rem;
  padding: 0.25rem;
}

.o-non-clickable {
  cursor: auto;
}
</style>
