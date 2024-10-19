<script>
import AutobuyerGroupToggleLabel from "./AutobuyerGroupToggleLabel";
import AutobuyerIntervalLabel from "./AutobuyerIntervalLabel";
import SingleAutobuyerInRow from "./SingleAutobuyerInRow";

// This component is the container for an individual group of autobuyers, such as all of the AD autobuyers in the
// single-row layout once they're all maxed and have the same parameters
export default {
  name: "QuantumMultipleAutobuyersBox",
  components: {
    AutobuyerIntervalLabel,
    AutobuyerGroupToggleLabel,
    SingleAutobuyerInRow,
  },
  props: {
    type: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      anyUnlocked: false,
      displayLabelAsGroup: false,
      parentActive: false,
    };
  },
  computed: {
    autobuyers() {
      return this.type.zeroIndexed;
    },
    name() {
      return this.type.groupName;
    },
    entryCount() {
      return this.type.entryCount;
    },
    rowCount() {
      return Math.ceil(this.entryCount / 3);
    },
    entryCountPerRow() {
      return this.rowCount === 1 ? this.entryCount : 5;
    },
    boxSize() {
      // The 1% reduced flex-basis is used to prevent wrapping due to the margins.
      return `flex: 1 0 ${100 / this.entryCountPerRow - 1}%`;
    },
    isUpBox() {
      return this.name === Autobuyer.upQuarkGenerator.groupName;
    },
    isDwBox() {
      return this.name === Autobuyer.downQuarkGenerator.groupName;
    },
    isElBox() {
      return this.name === Autobuyer.electronGenerator.groupName;
    },
    showUpDwAutobuyers() {
      // Only display the Antimatter Dimension Autobuyers if the bulk is the same and there are any of them unlocked
      if (this.isUpBox || this.isDwBox || this.isElBox) return this.anyUnlocked && this.displayLabelAsGroup;
      return this.anyUnlocked;
    },
  },
  methods: {
    update() {
      const type = this.type;
      this.anyUnlocked = type.anyUnlocked;
      this.displayLabelAsGroup = (type.allMaxedInterval ?? true) && (type.allUnlimitedBulk ?? true);
      this.parentActive = type.isActive;
    },
    toggleGroup() {
      this.type.toggle();
    }
  }
};
</script>

<template>
  <span
    v-if="showUpDwAutobuyers && (!isUpBox || !isDwBox || isElBox)"
    class="c-autobuyer-box-row"
  >
    <AutobuyerGroupToggleLabel
      :is-active="parentActive"
      :name="name"
      @click="toggleGroup"
    />
    <div class="l-autobuyer-box__title">
      {{ name }}<br>Autobuyers
      <!-- If we're showing as a group, then all attributes are the same and we can arbitrarily take the first one -->
      <AutobuyerIntervalLabel
        v-if="displayLabelAsGroup"
        :autobuyer="autobuyers[0]"
      />
    </div>
    <div class="l-autobuyer-box__autobuyers">
      <template
        v-for="(autobuyer, id) in autobuyers"
      >
        <SingleAutobuyerInRow
          :key="id"
          class="l-autobuyer-box__autobuyers-internal"
          :style="boxSize"
          :autobuyer="autobuyer"
          :show-individual="!displayLabelAsGroup"
          :parent-disabled="!parentActive"
        />
        <br
          v-if="id % entryCountPerRow === entryCountPerRow"
          :key="id"
        >
      </template>
    </div>
  </span>
</template>

<style scoped>

</style>
