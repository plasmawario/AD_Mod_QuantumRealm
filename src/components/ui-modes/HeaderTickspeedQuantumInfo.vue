<script>
import GameSpeedDisplay from "@/components/GameSpeedDisplay";

export default {
  name: "HeaderTickspeedQuantumInfo",
  components: {
    GameSpeedDisplay
  },
  data() {
    return {
      mult: new Decimal(0),
      tickspeed: new Decimal(0),
      galaxyCount: 0,
      purchasedTickspeed: 0,
    };
  },
  computed: {
    tickspeedDisplay() {
      return `Total Tickspeed: ${format(this.tickspeed, 2, 3)} / sec`;
    },
    perUpgrade() {
      return `Quark Generators produce ${formatX(this.mult.reciprocal(), 2, 3)} faster per Tickspeed upgrade`;
    },
  },
  methods: {
    update() {
      this.mult.copyFrom(Tickspeed_Quantum.multiplier);
      this.tickspeed.copyFrom(Tickspeed_Quantum.perSecond);
      this.galaxyCount = player.galaxies;
      this.purchasedTickspeed = player.totalTickQuantumBought;
    },
  },
};
</script>

<template>
  <div>
    <br>
    {{ perUpgrade }}
    <br>
    {{ tickspeedDisplay }}
    <br>
    <GameSpeedDisplay />
  </div>
</template>

<style scoped>

</style>
