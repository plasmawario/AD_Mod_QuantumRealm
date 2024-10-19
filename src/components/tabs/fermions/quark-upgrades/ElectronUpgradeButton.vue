<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "ElectronUpgradeButton",
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
      disabled: false,
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
        "o-electron-upgrade": true,
        "o-electron-upgrade--bought": this.isBought,
        "o-electron-upgrade--available": this.canBeBought,
        "o-electron-upgrade--unavailable": !this.isBought && !this.canBeBought,
        "o-electron-upgrade--disabled": this.disabled,
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
      this.disabled = Player.fusionChallenge && Player.fusionChallenge._config.id === 4;
      this.canBeBought = upgrade.canBeBought;
      this.isRebuyable = upgrade.isRebuyable;
      this.isBought = !upgrade.isRebuyable && upgrade.isBought;
      this.showEffect = upgrade.config.showEffect;
      this.showName = upgrade.config.showName;
      //if (this.isRebuyable) this.isAutobuyerOn = Autobuyer.realityUpgrade(upgrade.id).isActive;
    },
    /*purchaseUpgrade() {
      this.upgrade.purchase();
    }*/
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
      class="l-quantum-upgrade-btn c-electron-upgrade-btn"
      @click.exact="upgrade.purchase()"
    >
      <DescriptionDisplay :config="config" />
      <EffectDisplay
        v-if="showEffect"
        :config="config"
      />
      <CostDisplay
        v-if="!isBought"
        :config="config"
        name="Electron"
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
