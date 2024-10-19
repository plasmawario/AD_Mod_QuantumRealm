<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "FusionModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedFusions: new Decimal(),
      gainedMatter: new Decimal(),
      startingQuarks: 10,
    };
  },
  computed: {
    isFirstFusion() {
      return !PlayerProgress.matterUnlocked();
    },
    message() {
      const info = this.isFirstFusion ? this.firstFusionInfo : ``;
      return `Upon Nuclear Fusion, Quarks, Electrons, and their generators are reset. Additionally, your generator boosts and electron upgrades will also be reset. ${info}`;
    },
    firstFusionInfo() {
      return `In return, you gain Matter. This allows you to buy various upgrades and other things that you will
        encounter throughout the game. You will also gain one Fusion, which is the stat shown in the Statistics tab.`;
    },
    matterGainInfo() {
      return `You will gain ${quantify("Fusion", this.gainedFusions, 2, 0)}
        and Matter.`;
    },
    startingResources() {
      const gainedResources = [];
      if (this.startingQuarks.gte(10)) gainedResources.push(`${quantify("Quarks", this.startingQuarks, 2, 1)}`);

      return `You will start your next Fusion with ${makeEnumeration(gainedResources)}.`;
    }
  },
  methods: {
    update() {
      this.gainedFusions = gainedFusions().round();
      this.gainedMatter = gainedMatter().round();
      this.startingQuarks = Currency.quarks1.startingValue;
    },
    handleYesClick() {
      fusionResetRequest();
      EventHub.ui.offAll(this);
      if (this.isFirstFusion) {
        setTimeout(() => Modal.message.show(`This animation will occur after every manually-triggered Fusion. If
          you would like to disable it, there is a setting to do so in the Options tab. This can be done for any
          visual animation effect in the game after seeing it for the first time.`, {}, 3), 2000);
      }
    }
  },
};
</script>

<template>
  <ResetModal
    header="You are about to Fuse your fermions into matter"
    :message="message"
    :gained-resources="matterGainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstFusion"
    :alternate-text="message"
    :confirm-option="isFirstFusion ? undefined : 'fusion'"
  />
</template>
