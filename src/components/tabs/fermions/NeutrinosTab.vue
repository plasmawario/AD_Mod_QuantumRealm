<script>
import ClassicAntimatterDimensionsTab from "../antimatter-dimensions/ClassicAntimatterDimensionsTab";
import ModernAntimatterDimensionsTab from "../antimatter-dimensions/ModernAntimatterDimensionsTab";

export default {
  name: "NeutrinosTab",
  components: {
    ClassicAntimatterDimensionsTab,
    ModernAntimatterDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernAntimatterDimensionsTab"
        : "ClassicAntimatterDimensionsTab";
    }
  },
};
</script>

<template>
  <component :is="activeComponent" />
</template>
