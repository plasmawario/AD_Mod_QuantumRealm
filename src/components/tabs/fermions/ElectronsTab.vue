<script>
import ClassicAntimatterDimensionsTab from "@/components/tabs/antimatter-dimensions/ClassicAntimatterDimensionsTab";
import ModernElectronsTab from "@/components/tabs/fermions/ModernElectronsTab";

export default {
  name: "ElectronsTab",
  components: {
    ClassicAntimatterDimensionsTab,
    ModernElectronsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernElectronsTab"
        : "ClassicAntimatterDimensionsTab";
    }
  },
};
</script>

<template>
  <component :is="activeComponent" />
</template>
