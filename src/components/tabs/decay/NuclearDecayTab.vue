<script>
import DecayButton from "./DecayButton";
//import DilationUpgradeButton from "./DilationUpgradeButton";

export default {
  name: "NuclearDecayTab",
  components: {
    DecayButton,
    //DilationUpgradeButton
  },
  data() {
    return {
      w: new Decimal(),
      z: new Decimal(),
      nuclearPower: new Decimal(),
    };
  },
  computed: {
  },
  methods: {
    update() {
      this.w.copyFrom(Currency.w);
      this.z.copyFrom(Currency.z);
      this.nuclearPower.copyFrom(Currency.nuclearPower);
    }
  }
};
</script>

<template>
  <div class="l-dilation-tab">
    <span>
      You have
      <span class="c-decay-tab__z">{{ format(z, 2, 1) }}</span>
      {{ pluralize("Z Boson", z) }}.
    </span>
    <div
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <DecayButton />
    </div>
    <span>
      You have
      <span class="c-decay-tab__nuclear-power">{{ format(nuclearPower, 2, 1) }}</span>
      Nuclear Power.
    </span>
  </div>
</template>

<style scoped>
</style>
