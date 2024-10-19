<script>
import { Player } from '../../../core/player';

export default {
  name: "FusionButton",
  data() {
    return {
      isVisible: false,
      gainedMatter_penispoopooblast: new Decimal(0),
      currentMatterRate: new Decimal(0),
      peakMatterRate: new Decimal(0),
      peakMatterRateVal: new Decimal(0),
      currentMatter: new Decimal(0),
      canFuse: false,
      gainedZ: new Decimal(0),
      currentZrate: new Decimal(0),
      isDecaying: false,
      FusionGoal: new Decimal(0),
      inFusionChallenge: false,
      hover: false,
      headerTextColored: true,
      //creditsClosed: false,
      showMatterRate: false,
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "o-fusion-button--unavailable": !this.canFuse && !this.isDecaying,
        "o-decay-button--unavailable": !this.canFuse && this.isDecaying,
        "o-decay-button": this.canFuse && this.isDecaying,
      };
    },
    // Show Matter/min below this threshold, color the Matter number above it
    rateThreshold: () => 1e50,
    amountStyle() {
      if (!this.headerTextColored || this.currentMatter.lt(this.rateThreshold)) return {
        "transition-duration": "0s"
      };
      if (this.hover) return {
        color: "black",
        "transition-duration": "0.2s"
      };

      // Dynamically generate red-text-green based on the CSS entry for text color, returning a raw 6-digit hex color
      // code. stepRGB is an array specifying the three RGB codes, which are then interpolated between in order to
      // generate the final color; only ratios between 0.9-1.1 give a color gradient
      const textHexCode = getComputedStyle(document.body).getPropertyValue("--color-text").split("#")[1];
      const stepRGB = [
        [255, 0, 0],
        [
          parseInt(textHexCode.substring(0, 2), 16),
          parseInt(textHexCode.substring(2, 4), 16),
          parseInt(textHexCode.substring(4), 16)
        ],
        [0, 255, 0]
      ];
      const ratio = this.gainedMatter_penispoopooblast.log10() / this.currentMatter.log10();
      const interFn = index => {
        if (ratio < 0.9) return stepRGB[0][index];
        if (ratio < 1) {
          const r = 10 * (ratio - 0.9);
          return Math.round(stepRGB[0][index] * (1 - r) + stepRGB[1][index] * r);
        }
        if (ratio < 1.1) {
          const r = 10 * (ratio - 1);
          return Math.round(stepRGB[1][index] * (1 - r) + stepRGB[2][index] * r);
        }
        return stepRGB[2][index];
      };
      const rgb = [interFn(0), interFn(1), interFn(2)];
      return {
        color: `rgb(${rgb.join(",")})`,
        "transition-duration": "0.2s"
      };
    },
  },
  methods: {
    update() {
      this.isVisible = player.timesNuclearFused.gte(0) || Player.canFuse;
      if (!this.isVisible) return;
      this.canFuse = Player.canFuse;
      this.isDecaying = player.decay.isActive;
      this.FusionGoal.copyFrom(Player.fusionGoal);
      this.inFusionChallenge = Player.inFusionChallenge;
      this.headerTextColored = player.options.headerTextColored;
      this.creditsClosed = GameEnd.creditsEverClosed;

      const gainedMatter_penispoopooblast = gainedMatter();
      this.currentMatter.copyFrom(Currency.matter_quantum);
      this.gainedMatter_penispoopooblast.copyFrom(gainedMatter_penispoopooblast);
      this.currentMatterRate.copyFrom(gainedMatter_penispoopooblast.dividedBy(Math.clampMin(0.0005, Time.thisFusionRealTime.totalMinutes)));
      this.peakMatterRate.copyFrom(player.records.thisFusion.bestMattermin);
      this.peakMatterRateVal.copyFrom(player.records.thisFusion.bestMatterminVal);
      this.showMatterRate = this.peakMatterRate.lte(this.rateThreshold);
    },
    switchToInfinity() {
      Tab.dimensions.infinity.show(true);
    },
    Fuse() {
      if (!Player.canFuse) return;
      manualFusionResetRequest();
    }
  },
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClassObject"
    class="o-prestige-button o-fusion-button"
    @click="Fuse"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Cannot Fuse -->
    <template v-if="!canFuse">
      Reach {{ format(FusionGoal, 2, 2) }}
      <br>
      quarks
    </template>

    <!-- Can Fuse in challenge -->
    <template v-else-if="inFusionChallenge">
      Perform a Nuclear Fusion to
      <br>
      complete the challenge
    </template>

    <!-- Can Fuse AND is decaying -->
    <template v-else-if="canFuse && isDecaying">
      <div v-if="!showMatterRate" />
      <b>
        Exit Decay for
        <span :style="amountStyle">{{ format(gainedMatter_penispoopooblast, 2) }}</span>
        <span> {{ quantify("Z Boson", gainedZ) }}</span>
      </b>
      <template v-if="showMatterRate">
        <br>
        Current: {{ format(currentMatterRate, 2) }} Z/min
      </template>
      <div v-else />
    </template>

    <!-- Can Fuse -->
    <template v-else>
      <div v-if="!showMatterRate" />
      <b>
        Fuse for
        <span :style="amountStyle">{{ format(gainedMatter_penispoopooblast, 2) }}</span>
        <span> Matter</span>
      </b>
      <template v-if="showMatterRate">
        <br>
        Current: {{ format(currentMatterRate, 2) }} Matter/min
        <br>
        Peak: {{ format(peakMatterRate, 2) }} Matter/min
        <br>
        at {{ format(peakMatterRateVal, 2) }} Matter
      </template>
      <div v-else />
    </template>
  </button>
</template>

<style scoped>

</style>
