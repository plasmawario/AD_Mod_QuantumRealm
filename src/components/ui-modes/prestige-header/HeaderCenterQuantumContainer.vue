<script>
import HeaderTickspeedQuantumInfo from "../HeaderTickspeedQuantumInfo";

// This component contains antimatter and antimatter rate at the start of the game, as well as some additional
// information depending on the UI (tickspeed for Classic, game speed for Modern). Everything but antimatter is
// removed once Reality is unlocked, to make room for the reality button
export default {
  name: "HeaderCenterQuantumContainer",
  components: {
    HeaderTickspeedQuantumInfo,
  },
  data() {
    return {
      shouldDisplay: true,
      isModern: false,
      matter: new Decimal(0),
      //matterPerSec: new Decimal(0),
      energy: new Decimal(0),
      energyPerSec: new Decimal(0),
    };
  },
  methods: {
    update() {
      if (!this.shouldDisplay) return;

      this.isModern = player.options.newUI;
      this.matter.copyFrom(Currency.matter_quantum);
      //this.matterPerSec.copyFrom(Currency.matter.productionPerSecond);
    },
  },
};
</script>

<template>
  <div
    v-if="shouldDisplay"
    class="c-prestige-button-container"
  >
    <span>You have <span class="c-game-header__antimatter">{{ format(matter, 2, 1) }}</span> matter.</span>
    
    <div>
      <!--You are getting {{ format(matterPerSec, 2) }} matter per second.-->
      <br>
      <HeaderTickspeedQuantumInfo />
    </div>
  </div>
</template>

<style scoped>

</style>
