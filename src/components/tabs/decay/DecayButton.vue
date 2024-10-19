<script>
export default {
  name: "DecayButton",
  data() {
    return {
      isUnlocked: false,
      isRunning: false,
      hasGain: false,
      requiredForGain: new Decimal(),
      canFuse: false,
      fusionGoal: new Decimal(),
      zGain: new Decimal(),
      //creditsClosed: false
    };
  },
  computed: {
    disableText() {
      return "Exit Decay.";
    }
  },
  methods: {
    update() {
      this.isUnlocked = PlayerProgress.decayUnlocked();
      this.isRunning = player.decay.isActive;
      if (!this.isRunning) return;
      this.canFuse = Player.canFuse;
      // This lets this.hasGain be true even before eternity.
      this.hasGain = getTachyonGain(false).gt(0);
      if (this.canFuse && this.hasGain) {
        this.tachyonGain.copyFrom(getTachyonGain(true));
      } else if (this.hasGain) {
        this.eternityGoal.copyFrom(Player.eternityGoal);
      } else {
        this.requiredForGain.copyFrom(getTachyonReq());
      }
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    dilate() {
      if (this.creditsClosed) return;
      startDilatedEternityRequest();
    }
  }
};
</script>

<template>
  <button
    class="o-decay-tab-btn"
    :class="isUnlocked ? 'o-decay-tab-btn--unlocked' : 'o-decay-tab-btn--locked'"
    @click="dilate()"
  >
    <span v-if="!isUnlocked">Purchase the Decay String Theory to unlock.</span>
    <span v-else-if="!isRunning">
      Decay your Matter.
    </span>
    <span v-else-if="canFuse && hasGain">
      {{ disableText }}
      <br>
      Gain {{ quantify("Tachyon Particle", tachyonGain, 2, 1) }}.
    </span>
    <span v-else-if="hasGain">
      {{ disableText }}
      <br>
      Reach {{ quantify("Quarks x Electrons", eternityGoal, 1, 0) }} to complete Decay and gain Z Bosons.
    </span>
    <span v-else>
      {{ disableText }}
      <br>
      Reach {{ format(requiredForGain, 2, 1) }} antimatter to gain more Tachyon Particles.
    </span>
  </button>
</template>

<style scoped>

</style>
