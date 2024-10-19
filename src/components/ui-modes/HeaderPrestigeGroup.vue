<script>
import HeaderCenterQuantumContainer from "./prestige-header/HeaderCenterQuantumContainer";
import HeaderQuarksContainer from "./prestige-header/HeaderQuarksContainer";
import HeaderElectronContainer from "./prestige-header/HeaderElectronsContainer";

export default {
  name: "HeaderPrestigeGroup",
  components: {
    HeaderCenterQuantumContainer,
    HeaderQuarksContainer,
    HeaderElectronContainer,
  },
  data() {
    return {
      shouldDisplay: true,
    };
  },
  methods: {
    update() {
      if (!this.shouldDisplay) return;
    },
  },
};
</script>

<template>
  <div class="c-prestige-info-blocks">
    <HeaderQuarksContainer class="l-game-header__eternity" />
    <HeaderCenterQuantumContainer class="l-game-header__center" />
    <HeaderElectronContainer class="l-game-header__infinity" />
  </div>
</template>

<style scoped>
.c-prestige-info-blocks {
  display: flex;
  flex-direction: row;
  height: 14rem;
  width: 100%;
  color: var(--color-text);
}

.l-game-header__eternity {
  position: absolute;
  left: calc(25% - 22rem);
  width: 22rem;
}

.l-game-header__center {
  position: absolute;
  right: calc(50% - 25rem);
  width: 50rem;
}

.l-game-header__infinity {
  position: absolute;
  right: calc(25% - 22rem);
  width: 22rem;
}
</style>
