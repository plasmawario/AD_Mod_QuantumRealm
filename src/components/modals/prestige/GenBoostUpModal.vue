<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "GenBoostUpModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    topLabel() {
      return `You are about to reset your Generators`;
    },
    message() {

      const electrons = ElectronGenerator(1).isUnlocked ? "Electrons, " : "";
      const electrons2 = ElectronGenerator(1).isUnlocked ? "down-type, and electron-type generators" : "and down-type generators";

      const keepDimensions = Perk.antimatterNoReset.canBeApplied || Achievement(111).canBeApplied ||
        PelleUpgrade.dimBoostResetsNothing.isBought
        ? `not actually reset anything due to an upgrade you have which prevents Antimatter and Antimatter Dimensions
          from being reset in this situation. You will still gain the multiplier from the Boost, as usual.`
        : ` reset your Quarks, ${electrons}and your up-type ${electrons2}. 
        You will gain a multiplier boost to your Up-type Generators in return. Are you sure you want to proceed?`;

      return `By peforming a Generator Boost on your Up-type generators, you will ${keepDimensions}`;
    },
  },
  methods: {
    handleYesClick() {
      requestUpGenBoost(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="upGenBoost"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
