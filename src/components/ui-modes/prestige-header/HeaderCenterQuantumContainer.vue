<script>
import { FusionChallenge } from "../../../core/fusion-challenges";
import { Player } from "../../../core/player";
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
      w: new Decimal(0),
      isDecaying: false,
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
      this.w.copyFrom(Currency.w);
      this.isDecaying = player.decay.isActive;
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
    <span v-if="isDecaying">
      You have <span class="c-game-header__w-boson">{{ format(w, 2, 1) }}</span> {{ pluralize("W Boson", w) }}.
    </span>
    <span v-else>
      You have <span class="c-game-header__antimatter">{{ format(matter, 2, 1) }}</span> matter.
    </span>
    
    <div>
      <!--You are getting {{ format(matterPerSec, 2) }} matter per second.-->
      <br>
      <HeaderTickspeedQuantumInfo />
      <br/>
    </div>
  </div>
</template>

<style scoped>

</style>
