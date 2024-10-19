<script>
import ModernSidebarCurrency from "./ModernSidebarCurrency";
import ModernTabButton from "./ModernTabButton";

export default {
  name: "ModernSidebar",
  components: {
    ModernSidebarCurrency,
    ModernTabButton
  },
  data() {
    return {
      isHidden: false,
      tabVisibilities: [],
      isPastInit: false,
    };
  },
  computed: {
    tabs: () => Tabs.newUI
  },
  methods: {
    update() {
      this.isHidden = AutomatorData.isEditorFullscreen;
      this.tabVisibilities = Tabs.newUI.map(x => x.isAvailable);

      this.isPastInit = player.pastInitialScreen;
    },
  },
};
</script>

<template>
  <span v-if="isPastInit">
    <div
      v-if="!isHidden"
      class="c-modern-sidebar"
    >
      <ModernSidebarCurrency />
      <template
        v-for="(tab, tabPosition) in tabs"
      >
        <ModernTabButton
          v-if="tabVisibilities[tabPosition]"
          :key="tab.name"
          :tab="tab"
          :tab-position="tabPosition"
        />
      </template>
    </div>
  </span>
</template>

<style scoped>

</style>
