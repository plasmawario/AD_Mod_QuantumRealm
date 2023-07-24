<script>
import ClassicAntimatterDimensionsTab from "@/components/tabs/antimatter-dimensions/ClassicAntimatterDimensionsTab";
import ModernQuarksTab from "@/components/tabs/fermions/ModernQuarksTab";

export default {
  name: "QuarksTab",
  components: {
    ClassicAntimatterDimensionsTab,
    ModernQuarksTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernQuarksTab"
        : "ClassicAntimatterDimensionsTab";
    }
  },
};
</script>

<template>
  <component :is="activeComponent" />
</template>
