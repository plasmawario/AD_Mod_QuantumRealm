<script>
import GenericDimensionRowText from "@/components/GenericDimensionRowText";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "ModernUpQuarksRow",
  components: {
    GenericDimensionRowText,
    PrimaryButton,
    PrimaryToggleButton,
  },
  props: {
    tier: {
      type: Number,
      required: true
    },
    areAutobuyersUnlocked: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isUnlocked: false,
      isCapped: false,
      multiplier: new Decimal(0),
      amount: new Decimal(0),
      bought: 0,
      rateOfChange: new Decimal(0),
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isAutobuyerOn: false,
      requirementReached: false,
      hasTutorial: false,
    }
  },
  computed: {
    name() {
      let name = "";
      switch (this.tier){
        case 1:
          name = "Up";
          break;
        case 2:
          name = "Charm";
          break;
        case 3:
          name = "Top";
          break;
      }
      return name + ` Quark Generator`;
    },
    buttonContents2() {
      return "Buy 1";
    },
    buttonContents() {
      return this.formattedQuarkCost;
    },
    tooltipContents() {
      return `Purchased ${quantifyInt("time", this.bought)}`;
    },
    showRow() {
      return this.isUnlocked || this.requirementReached || this.amount.gt(0);
    },
    formattedQuarkCost() {
      return `Cost: ${format(this.cost, 2)} Quarks`;
    },
    hasLongText() {
      return this.buttonContents.length > 15;
    },
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.upQuarkGenerator(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = UpQuarkGenerator(tier);
      this.isUnlocked = dimension.isUnlocked;
      this.multiplier.copyFrom(dimension.multiplier);
      this.amount.copyFrom(dimension.amount);
      this.bought = dimension.bought;
      this.rateOfChange.copyFrom(dimension.rateOfChange);
      this.cost.copyFrom(dimension.cost);
      this.isAffordable = dimension.isAffordable;

      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      if (!this.isUnlocked) {
        this.isAvailableForPurchase = dimension.requirementReached;
      }
      this.requirementReached = dimension.requirementReached;

      this.hasTutorial = (tier === 1 && TutorialQuantum.isActive(TUTORIAL_QUANTUM_STATE.UP));
      this.isAutobuyerOn = Autobuyer.upQuarkGenerator(this.tier).isActive;
    },
    buyQuarkGenerator() {
      buySingleUpQuarkGenerator(this.tier);
    },
    buyMaxQuarkGenerator() {
      buyMaxUpQuarkGenerator(this.tier);
    },
    tutorialClass() {
      return {
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    }
  }
};
</script>

<template>
  <div
    v-show="showRow"
    class="c-dimension-row l-dimension-row-up-quark-dim l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 1)"
      :amount-text="format(amount, 2)"
      :rate="rateOfChange"
    />
    <div class="l-dim-row-multi-button-container c-modern-dim-tooltip-container">
      <div class="c-modern-dim-purchase-count-tooltip">
        <span v-html="tooltipContents" />
      </div>
      <PrimaryButton 
        :enabled="isAvailableForPurchase"
        class="o-primary-btn--buy-ad o-primary-btn o-primary-btn--new o-primary-btn--buy-dim"
        :class="{ 'l-dim-row-small-text': hasLongText }"
        @click="buyQuarkGenerator"
      >
      <div :class="tutorialClass()">
        <div
          v-if="hasTutorial"
          class="fas fa-circle-exclamation l-notification-icon"
        />
        {{ buttonContents2 }}
        <br/>
        {{ buttonContents }}
      </div>
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="areAutobuyersUnlocked"
        v-model="isAutobuyerOn"
        class="o-primary-btn--buy-td-auto"
        label="Auto:"
      />
      <!--<PrimaryButton left over from time dimension template
        v-else
        :enabled="isAvailableForPurchase"
        class="o-primary-btn--buy-td-auto"
        @click="buyMaxQuarkGenerator"
      >
        Buy Max
      </PrimaryButton>-->
    </div>
  </div>
</template>

<style scoped>
.c-modern-dim-tooltip-container .c-modern-dim-purchase-count-tooltip {
  position: absolute;
  width: 20rem;
  top: 50%;
  font-size: 1.3rem;
  line-height: 1.6rem;
  color: white;
  background: black;
  border: 0.1rem solid var(--color-text);
  border-radius: var(--var-border-width, 0.5rem);
  /* Buttons are 40rem wide, tooltip is 20rem */
  transform: translate(calc(-125% - 1rem), -50%);
  padding: 0.5rem;
  visibility: hidden;
}
</style>
