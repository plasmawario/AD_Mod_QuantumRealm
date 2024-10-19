<script>
import GluonUpgradeButton from "@/components/tabs/bosons/GluonUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "BuyGluonButton",
  components: {
    PrimaryButton,
    PrimaryToggleButton,
    GluonUpgradeButton
  },
  data() {
    return {
      isAutobuyerActive: false,
      isAutoUnlocked: false,
      isCapped: false
    };
  },
  computed: {
    upgrade() {
      return BuyGluonUpgrade[0];
    }
  },
  watch: {
    /*isAutobuyerActive(newValue) {
      Autobuyer.ipMult.isActive = newValue;
    }*/
  },
  methods: {
    update() {
      //this.isAutoUnlocked = Autobuyer.ipMult.isUnlocked;
      //this.isAutobuyerActive = Autobuyer.ipMult.isActive;
      this.isCapped = this.upgrade.isCapped;
    },
    buyMaxGluonMult() {
      upgrade.buyMax();
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group">
    <p>Buy 1 gluon</p>
    <GluonUpgradeButton
      :upgrade="upgrade"
      class=".o-buy-gluon-upgrade-btn"
    >
      <template v-if="isCapped">
        <br>
        <span>(Capped at {{ quantify("Matter", upgrade.config.costCap) }})</span>
      </template>
    </GluonUpgradeButton>
    <!--<PrimaryButton
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      @click="buyMaxIPMult()"
    >
      Max Infinity Point mult
    </PrimaryButton>
    <PrimaryToggleButton
      v-if="isAutoUnlocked"
      v-model="isAutobuyerActive"
      label="Autobuy IP mult"
      class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
    />-->
  </div>
</template>

<style scoped>

</style>
