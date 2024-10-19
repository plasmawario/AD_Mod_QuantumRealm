<script>
import ClassicInfinityDimensionsTab from "@/components/tabs/infinity-dimensions/ClassicInfinityDimensionsTab";
import ModernGluonsTab from "./ModernGluonsTab";

export default {
  name: "GluonsTab",
  components: {
    ClassicInfinityDimensionsTab,
    ModernGluonsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernGluonsTab"
        : "ClassicInfinityDimensionsTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
