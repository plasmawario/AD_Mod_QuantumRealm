<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "QuarkUpgradeButton",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      canBeBought: false,
      isRebuyable: false,
      isBought: false,
      isAutoUnlocked: false,
      isAutobuyerOn: false,
      showEffect: true,
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    classObject() {
      return {
        "o-quark1generator-upgrade": true,
        "o-quark1generator-upgrade--bought": this.isBought,
        "o-quark1generator-upgrade--available": this.canBeBought,
        "o-quark1generator-upgrade--unavailable": !this.isBought && !this.canBeBought,
      };
    },
    requirementConfig() {
      return {
        description: this.config.requirement
      };
    },
  },
  watch: {
    /*isAutobuyerOn(newValue) {
      Autobuyer.realityUpgrade(this.upgrade.id).isActive = newValue;
    }*/
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      this.canBeBought = upgrade.canBeBought;
      this.isRebuyable = upgrade.isRebuyable;
      this.isBought = !upgrade.isRebuyable && upgrade.isBought;
      this.showEffect = upgrade.config.showEffect;
      //if (this.isRebuyable) this.isAutobuyerOn = Autobuyer.realityUpgrade(upgrade.id).isActive;
    },
    /*purchaseUpgrade() {
      this.upgrade.purchase();
    }*/
  }
};
</script>

<template>
  <div class="l-spoon-btn-group l-margin-top">
    <button
      :class="classObject"
      @click.exact="upgrade.purchase()"
    >
    <DescriptionDisplay :config="config" />
    <EffectDisplay
      v-if="showEffect"
      :config="config"
      br
    />
    <CostDisplay
      v-if="!isBought"
      :config="config"
      br
      name="Gen 1 quark"
    />
    </button>
  </div>
</template>

<style scoped>
.l-margin-top {
  margin-top: 0.55rem;
}
</style>
