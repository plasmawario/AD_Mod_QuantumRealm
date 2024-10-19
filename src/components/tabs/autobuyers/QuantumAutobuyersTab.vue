<script>
import AutobuyerToggles from "./AutobuyerToggles";
import UpGeneratorAutobuyerBox from "./UpGeneratorAutobuyerBox";
import DownGeneratorAutobuyerBox from "./DownGeneratorAutobuyerBox";
import ElectronGeneratorAutobuyerBox from "./ElectronGeneratorAutobuyerBox";
import OpenModalHotkeysButton from "@/components/OpenModalHotkeysButton";
import SimpleAutobuyersMultiBox from "./SimpleAutobuyersMultiBox";
import QuantumTickspeedAutobuyerBox from "./QuantumTickspeedAutobuyerBox";
import UpBoostAutobuyerBox from "./UpBoostAutobuyerBox";
import DownBoostAutobuyerBox from "./DownBoostAutobuyerBox";
import FusionAutobuyerBox from "./FusionAutobuyerBox";

export default {
  name: "QuantumAutobuyersTab",
  components: {
    AutobuyerToggles,
    OpenModalHotkeysButton,
    QuantumTickspeedAutobuyerBox,
    UpGeneratorAutobuyerBox,
    DownGeneratorAutobuyerBox,
    ElectronGeneratorAutobuyerBox,
    SimpleAutobuyersMultiBox,
    UpBoostAutobuyerBox,
    DownBoostAutobuyerBox,
    FusionAutobuyerBox
  },
  data() {
    return {
      hasFused: false,
      displayUPAutobuyersIndividually: false,
      displayDOWNAutobuyersIndividually: false,
      displayELECTRONAutobuyersIndividually: false,
      hasInstant: false,
      upHasInstant: false,
      downHasInstant: false,
      electronHasInstant: false,
    };
  },
  computed: {
    // It only makes sense to show this if the player has seen gamespeed-altering effects, but we should keep it there
    // permanently as soon as they have
    hasSeenGamespeedAlteringEffects() {
      return PlayerProgress.seenAlteredSpeed();
    },
    gameTickLength() {
      return `${formatInt(player.options.updateRate)} ms`;
    }
  },
  methods: {
    update() {
      this.hasFused = PlayerProgress.matterUnlocked();
      const upInstant = this.checkUpAutoStatus();
      const dwInstant = this.checkDownAutoStatus();
      const elInstant = this.checkElectronAutoStatus();
      this.hasInstant = upInstant || dwInstant || elInstant;
    },
    checkUpAutoStatus() {
      const up = Autobuyer.upQuarkGenerator;
      this.displayUPAutobuyersIndividually = !up.collapseDisplay;

      return up.hasInstant;
    },
    checkDownAutoStatus() {
      const dw = Autobuyer.downQuarkGenerator;
      this.displayDOWNAutobuyersIndividually = !dw.collapseDisplay;

      return dw.hasInstant;
    },
    checkElectronAutoStatus() {
      const el = Autobuyer.electronGenerator;
      this.displayELECTRONAutobuyersIndividually = !el.collapseDisplay;

      return el.hasInstant;
    },
    /*checkADAutoStatus() {
      const ad = Autobuyer.antimatterDimension;

      this.hasInstant = ad.hasInstant;
      this.displayADAutobuyersIndividually = !ad.collapseDisplay;
    },*/
  }
};
</script>

<template>
  <div class="l-autobuyers-tab">
    <AutobuyerToggles />
    <OpenModalHotkeysButton />
    <div v-if="hasSeenGamespeedAlteringEffects">
      Autobuyer intervals and time-based settings are always <b>real time</b> and therefore
      <br>
      unaffected by anything which may alter how fast the game itself is running.
      <br>
      <br>
    </div>
    <div v-if="!hasFused">
      Challenges for upgrading autobuyers are unlocked by reaching Infinity.
    </div>
    <b>Autobuyers with no displayed bulk have unlimited bulk by default.</b>
    <b>
      Generator Autobuyers can have their bulk upgraded once interval is below {{ formatInt(100) }} ms.
    </b>
    <b v-if="hasInstant">Autobuyers with "Instant" interval will trigger every game tick ({{ gameTickLength }}).</b>
    <FusionAutobuyerBox />
    <UpBoostAutobuyerBox />
    <DownBoostAutobuyerBox />
    <QuantumTickspeedAutobuyerBox />
    <template v-if="displayUPAutobuyersIndividually">
      <UpGeneratorAutobuyerBox
        v-for="tier in 3"
        :key="tier"
        :tier="tier"
      />
    </template>
    <template v-if="displayDOWNAutobuyersIndividually">
      <DownGeneratorAutobuyerBox
        v-for="tier in 3"
        :key="tier+3"
        :tier="tier"
      />
    </template>
    <template v-if="displayELECTRONAutobuyersIndividually">
      <ElectronGeneratorAutobuyerBox
        v-for="tier in 3"
        :key="tier+6"
        :tier="tier"
      />
    </template>
    <SimpleAutobuyersMultiBox />
  </div>
</template>

<style scoped>
/* This is necessary for the ExpandingControlBox within these components to render in the right stacking order
when they're open. It looks slightly hacky but actually can't be done any other way; each AutobuyerBox creates
its own stacking context, which means that all z-indices specified within are essentially scoped and the
AutobuyerBox components will always render in page order regardless of internal z-indices without these. */
.c-reality-pos {
  z-index: 3;
}

.c-eternity-pos {
  z-index: 2;
}

.c-infinity-pos {
  z-index: 1;
}
</style>
