<script>
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import CostDisplay from "@/components/CostDisplay";

export default {
  name: "UpQuarkGenMultiButton",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isAutobuyerActive: false,
      isAutoUnlocked: false,
      isAffordable: false,
      description: "",
      multiplier: new Decimal(),
      cost: new Decimal()
    };
  },
  computed: {
    upgrade() {
      return FermionUpgrade.upQuarkMultiplier;
    },
    config() {
      return this.upgrade.config;
    },
    /*autobuyer() {
      return Autobuyer.epMult;
    },*/
    classObject() {
      return {
        "o-quark-upgrade": true,
        //"o-quark-upgrade--bought": this.isBought,
        "o-quark-upgrade--available": this.isAffordable,
        "o-quark-upgrade--unavailable": !this.isAffordable
      };
    }
  },
  watch: {
    /*isAutobuyerActive(newValue) {
      Autobuyer.epMult.isActive = newValue;
    }*/
  },
  methods: {
    update() {
      const upgrade = this.upgrade;
      //this.isAutoUnlocked = this.autobuyer.isUnlocked;
      //this.isAutobuyerActive = this.autobuyer.isActive;
      //this.description = upgrade.description;
      this.multiplier.copyFrom(upgrade.effectValue);
      this.cost.copyFrom(upgrade.cost);
      this.isAffordable = upgrade.isAffordable;
    },
    purchaseUpgrade() {
      this.upgrade.purchase();
    }
  }
};
</script>

<template>
    <div class="l-spoon-btn-group l-margin-top">
      <button
        :class="classObject"
        @click="purchaseUpgrade"
      >
        <DescriptionDisplay :config=config />
        <br>
        <EffectDisplay :config="config" />
        <br>
        <CostDisplay 
        :config="config"
        name="poopoofard"
        />
      </button>
      <!--<PrimaryButton
        class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
        @click="upgrade.buyMax(false)"
      >
        Max Eternity Point mult
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="isAutoUnlocked"
        v-model="isAutobuyerActive"
        label="Autobuy EP mult"
        class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      />-->
    </div>
  </template>
  
  <style scoped>
  .l-margin-top {
    margin-top: 0.55rem;
  }
  </style>
  