<script>
import { playerInfinityUpgradesOnReset } from '../../../game';

//import BigCrunchButton from "./BigCrunchButton";

export default {
  name: "HeaderElectronsContainer",
  components: {

  },
  data() {
    return {
      showContainer: false,
      showElectrons: true,
      Electrons: new Decimal(0),
    };
  },
  methods: {
    update() {
      this.showContainer = Currency.electrons.value.gt(0) || player.timesNuclearFused.gt(0);
      this.Electrons.copyFrom(Currency.electrons.value);
    },
  },
};
</script>

<template>
  <div
    v-if="showContainer"
    class="c-prestige-button-container"
  >
    <div class="c-electrons">
      <p 
        v-if="showElectrons"
        class="c-spacer"
      >
        You have
        <span class="c-game-header__electrons-amount">{{ format(Electrons, 2) }}</span>
        {{ pluralize("Electron", Electrons) }}.
      </p>
    </div>
  </div>
</template>

<style scoped>
.c-electrons {
  font-size: 1.2rem;
  padding-bottom: 0.25rem;
}
.c-spacer {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
</style>
