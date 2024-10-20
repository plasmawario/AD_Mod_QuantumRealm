<script>
import AutobuyerBox from "./AutobuyerBox";
import AutobuyerDropdownEntry from "./AutobuyerDropdownEntry";
import AutobuyerInput from "./AutobuyerInput";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton";
import ExpandingControlBox from "@/components/ExpandingControlBox";

export default {
  name: "FusionAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerIntervalButton,
    AutobuyerInput,
    ExpandingControlBox,
    AutobuyerDropdownEntry
  },
  props: {
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      postBreak: false,
      hasMaxedInterval: false,
      isIntervalAt100: false,
      mode: AUTO_CRUNCH_MODE.AMOUNT,
      hasAdditionalModes: false,
      increaseWithMult: true,
    };
  },
  computed: {
    autobuyer: () => Autobuyer.fusion,
    modes: () => [
      AUTO_CRUNCH_MODE.AMOUNT,
      AUTO_CRUNCH_MODE.TIME,
      AUTO_CRUNCH_MODE.X_HIGHEST,
    ],
    amountMode: () => AUTO_ETERNITY_MODE.AMOUNT
  },
  watch: {
    increaseWithMult(newValue) {
      this.autobuyer.increaseWithMult = newValue;
    }
  },
  methods: {
    update() {
      this.isIntervalAt100 = this.autobuyer.isIntervalAt100;
      this.hasMaxedInterval = this.autobuyer.hasMaxedInterval;
      this.postBreak = this.isIntervalAt100; //too lazy to find a better fix for this
      this.mode = this.autobuyer.mode;
      this.hasAdditionalModes = this.autobuyer.hasAdditionalModes;
      this.increaseWithMult = this.autobuyer.increaseWithMult;
    },
    modeProps(mode) {
      switch (mode) {
        case AUTO_CRUNCH_MODE.AMOUNT: return {
          title: "Nuclear Fusion at X Matter",
          input: {
            property: "amount",
            type: "decimal"
          },
        };
        case AUTO_CRUNCH_MODE.TIME: return {
          title: "Seconds between Fusions",
          input: {
            property: "time",
            type: "float"
          },
        };
        case AUTO_CRUNCH_MODE.X_HIGHEST: return {
          title: "X times highest Matter",
          input: {
            property: "xHighest",
            type: "decimal"
          },
        };
      }
      throw new Error("Unknown Auto Fusion mode");
    },
    modeName(mode) {
      return this.modeProps(mode).title;
    },
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    :show-interval="true"
    :is-modal="isModal"
    name="Automatic Nuclear Fusion"
  >
    <template
      v-if="!isIntervalAt100 && true"
      #intervalSlot
    >
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template
      v-else-if="postBreak"
      #intervalSlot
    >
      <ExpandingControlBox
        v-if="hasAdditionalModes"
        :auto-close="true"
      >
        <template #header>
          <div class="o-primary-btn c-autobuyer-box__mode-select c-autobuyer-box__mode-select-header">
            ▼ Current Setting: ▼
            <br>
            {{ modeName(mode) }}
          </div>
        </template>
        <template #dropdown>
          <AutobuyerDropdownEntry
            :autobuyer="autobuyer"
            :modes="modes"
            :mode-name-fn="modeName"
          />
        </template>
      </ExpandingControlBox>
      <span v-else>
        {{ modeProps(mode).title }}:
      </span>
    </template>
    <template
      v-if="postBreak"
      #toggleSlot
    >
      <AutobuyerInput
        :key="mode"
        :autobuyer="autobuyer"
        v-bind="modeProps(mode).input"
      />
    </template>
    <template
      v-if="postBreak && mode === amountMode"
      #checkboxSlot
    >
      <label
        class="o-autobuyer-toggle-checkbox o-clickable"
      >
        <input
          v-model="increaseWithMult"
          type="checkbox"
          class="o-clickable"
        >
        Dynamic amount
      </label>
    </template>
  </AutobuyerBox>
</template>

<style scoped>
.o-clickable {
  cursor: pointer;
}
</style>
