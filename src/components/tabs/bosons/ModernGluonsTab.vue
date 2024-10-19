<script>
//import InfinityDimensionRow from "./ModernInfinityDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";
import FusionButton from "@/components/ui-modes/prestige-header/FusionButton"
import BuyGluonButton from "@/components/tabs/bosons/BuyGluonButton"

export default {
  name: "ModernGluonsTab",
  components: {
    PrimaryButton,
    FusionButton,
    BuyGluonButton,
    //InfinityDimensionRow
  },
  data() {
    return {
      gluons: new Decimal(0),
      dimMultiplier: new Decimal(0),
      powerPerSecond: new Decimal(0),
      incomeType: "",
      isAnyAutobuyerUnlocked: false,
      conversionRate: 0,
      showLockedDimCostNote: true,
      canFuse: false,
      gainedOnFusion: new Decimal(0),
    };
  },
  computed: {
    sacrificeBoostDisplay() {
      return formatX(this.sacrificeBoost, 2, 2);
    },
    sacrificeTooltip() {
      return `Boosts 8th Antimatter Dimension by ${this.sacrificeBoostDisplay}`;
    },
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !InfinityDimension(8).isUnlocked;
      this.gluons.copyFrom(Currency.gluons);
      this.conversionRate = player.nuclearFusion.gluonMult;
      this.dimMultiplier.copyFrom(this.gluons.mul(this.conversionRate).max(1));
      this.powerPerSecond.copyFrom(InfinityDimension(1).productionPerSecond);
      this.incomeType = "Gluons";
      this.canFuse = true;

      //this.isAnyAutobuyerUnlocked = Autobuyer.infinityDimension(1).isUnlocked;
    },
    maxAll() {
      InfinityDimensions.buyMax();
    },
    toggleAllAutobuyers() {
      toggleAllInfDims();
    },
  }
};
</script>

<template>
  <div class="l-infinity-dim-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        Max all
      </PrimaryButton>
      <PrimaryButton
        v-if="isAnyAutobuyerUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        Toggle all autobuyers
      </PrimaryButton>
    </div>
    <div>
      <p>
        You have
        <span class="c-gluon__accent">{{ format(gluons, 2, 1) }}</span>
        {{ pluralize("Gluon", gluons) }}, with a
        <span class="c-gluon__accent">{{ formatX(conversionRate, 2, 1) }}</span>
        multiplier
        <br/>
        giving a
        <span class="c-gluon__accent">{{ formatX(dimMultiplier, 2, 1) }}</span>
        multiplier on matter gained per nuclear fusion
      </p>
    </div>
    <br/>
    <!--<div>
      <p>
        You have
        <span class="c-gluon__accent">{{ format(infinityPower, 2, 1) }}</span>
        Infinity Power,
        <br>
        <span>
          increased by
          <span class="c-gluon__accent">{{ formatPow(conversionRate, 2, 3) }}</span>
        </span>
        to a
        <span class="c-gluon__accent">{{ formatX(dimMultiplier, 2, 1) }}</span>
        multiplier on all
      </p>
    </div>-->
    <div>You are getting {{ format(powerPerSecond, 2, 0) }} {{ incomeType }} per second.</div>
    <div class="l-gluon-tab__fusion-container">
      <!--<button
        class="c-gluon-tab__fusion-button temp"
        :class="{
          'c-gluon-tab__fusion-button--disabled': !canFuse,
        }"
        @click="buyTesseract"
      >
        <p>
          Perform a Nuclear Fusion
        </p>
        <p>Create {{ format(nextDimCapIncrease, 2) }} Matter</p>
        <p><b>Costs: {{ format(tesseractCost) }} IP</b></p>
      </button>
      <br/>-->
      <FusionButton class="fuse-button" />
      <br/><br/>
      <BuyGluonButton />
    </div>
  </div>
</template>

<style scoped>
.fuse-button {
  margin-top: 1.2rem;
  min-width: 35rem;
  height: 10rem;
  font-size: 1.5rem;
}
.temp {
  min-width: 35rem;
}
</style>