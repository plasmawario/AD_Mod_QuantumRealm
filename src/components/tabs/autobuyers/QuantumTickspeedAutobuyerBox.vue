<script>
import FermionAutobuyerBox from "./FermionAutobuyerBox";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton";

export default {
  name: "QuantumTickspeedAutobuyerBox",
  components: {
    FermionAutobuyerBox,
    AutobuyerIntervalButton
  },
  data() {
    return {
      mode: AUTOBUYER_MODE.BUY_SINGLE,
      isUnlocked: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.tickspeedQuantum
    ,
    modeDisplay() {
      switch (this.mode) {
        case AUTOBUYER_MODE.BUY_SINGLE: return "Buys singles";
        case AUTOBUYER_MODE.BUY_MAX: return "Buys max";
      }
      throw "Unknown tickspeed autobuyer mode";
    }
  },
  methods: {
    update() {
      this.mode = this.autobuyer.mode;
      this.isUnlocked = this.autobuyer.isUnlocked;
    },
    toggleMode() {
      this.autobuyer.toggleMode();
      this.update();
    }
  }
};
</script>

<template>
  <FermionAutobuyerBox
    :autobuyer="autobuyer"
    name="Tickspeed Autobuyer"
    show-interval
  >
    <template #intervalSlot>
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template #toggleSlot>
      <button
        v-if="isUnlocked"
        class="o-autobuyer-btn"
        @click="toggleMode"
      >
        {{ modeDisplay }}
      </button>
      <button
        v-else
        class="o-autobuyer-btn o-autobuyer-btn--unavailable"
      >
        Complete the challenge to change mode
      </button>
    </template>
  </FermionAutobuyerBox>
</template>

<style scoped>

</style>
