<script>
import ClassicInfinityDimensionsTab from "@/components/tabs/infinity-dimensions/ClassicInfinityDimensionsTab";
import ModernFusionUpgradesTab from "./ModernFusionUpgradesTab";

export default {
  name: "GluonsTab",
  components: {
    ClassicInfinityDimensionsTab,
    ModernFusionUpgradesTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernFusionUpgradesTab"
        : "ClassicInfinityDimensionsTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
