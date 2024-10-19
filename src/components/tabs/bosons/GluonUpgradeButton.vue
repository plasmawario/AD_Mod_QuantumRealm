<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "GluonUpgradeButton",
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
      showName: true,
    };
  },
  computed: {
    config() {
      return this.upgrade.config;
    },
    classObject() {
      return {
        "o-gluon-upgrade": true,
        "o-gluon-upgrade--bought": this.isBought,
        "o-gluon-upgrade--available": this.canBeBought,
        "o-gluon-upgrade--unavailable": !this.isBought && !this.canBeBought,
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
      this.showName = upgrade.config.showName;
      //if (this.isRebuyable) this.isAutobuyerOn = Autobuyer.realityUpgrade(upgrade.id).isActive;
    },
    purchaseUpgrade() {
      this.upgrade.purchase();
      console.log(this.upgrade.config);
    }
  }
};
</script>

<template>
  <div class="l-spoon-btn-group">
    <p
      v-if="showName"
      class="l-upgrade-name"
    >
      {{ config.name }}
    </p>
    <button
      :class="classObject"
      class="c-gluon-upgrade-btn"
      @click.exact="purchaseUpgrade()"
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
      name="Matter"
    />
    </button>
  </div>
</template>

<style scoped>
.l-margin-top {
  margin-top: 0.55rem;
}

.l-upgrade-name {
  text-align: left;
}
</style>
