<script>
import { PlayerProgress } from "../../../core/player-progress";
import FusionButton from "./FusionButton";

export default {
  name: "HeaderQuarksContainer",
  components: {
    FusionButton,
  },
  data() {
    return {
      showContainer: true,
      showFuseButton: false,
      showGen1Quarks: true,
      gen1Quarks: new Decimal(0),

      showNextMatter: false,
      nextMatter: new Decimal(0),
    };
  },
  methods: {
    update() {
        this.showContainer = true;
        this.gen1Quarks.copyFrom(Currency.quarks1.value.floor());

        this.showFuseButton = Player.canFuse || PlayerProgress.matterUnlocked();
        this.showNextMatter = Player.canFuse && player.records.maxMatter.lt(10000) &&
        gainedMatter().lt(100);
      if (this.showNextMatter) this.nextMatter.copyFrom(requiredFermionsForMatter(gainedMatter().floor().toNumber() + 1));
    },
  },
};
</script>

<template>
  <div
    v-if="showContainer"
    class="c-prestige-button-container"
  >
    <div class="c-quarks">
      <p 
        v-if="showGen1Quarks"
        class="c-spacer"
      >
        You have
        <span class="c-game-header__quark1-amount">{{ format(gen1Quarks, 2) }}</span>
        {{ pluralize("Quark", gen1Quarks) }}.
        <span v-if="showNextMatter">(Next Matter at {{ format(nextMatter, 1) }} Quarks x Electrons)</span>
      </p>
    </div>
    <FusionButton v-if="showFuseButton"/>
  </div>
</template>

<style scoped>
.c-quarks {
  font-size: 1.2rem;
  padding-bottom: 0.25rem;
}
.c-spacer {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
</style>
