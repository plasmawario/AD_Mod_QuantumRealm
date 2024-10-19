<script>
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "QuantumWebLabel",
  components: {
    PrimaryButton
  },
  data() {
    return {
      pp: 0,
      treeLayout: 0,
      physicsEnabled: false,
      physicsOverride: false,
    };
  },
  computed: {
    physicsText() {
      const enableStr = (this.physicsOverride ?? this.physicsEnabled) ? "Enabled" : "Disabled";
      return `${enableStr}${this.physicsOverride === undefined ? "" : " (fixed)"}`;
    }
  },
  created() {
    this.treeLayout = player.options.perkLayout;
    this.physicsOverride = PerkLayouts[this.treeLayout].forcePhysics;
  },
  methods: {
    update() {
      this.pp = Math.floor(Currency.perkPoints.value);
      this.physicsEnabled = player.options.perkPhysicsEnabled;
    },
    togglePhysics() {
      if (this.physicsOverride !== undefined) return;
      player.options.perkPhysicsEnabled = !player.options.perkPhysicsEnabled;
      WebNetwork.setPhysics(player.options.perkPhysicsEnabled);
    },
    physicsClassObject() {
      return {
        "o-primary-btn c-button-physics": true,
        "o-primary-btn--disabled": this.physicsOverride !== undefined
      };
    },
    centerTree() {
        WebNetwork.resetPosition(true);
    },
    straightenEdges() {
        WebNetwork.setEdgeCurve(false);
        WebNetwork.setEdgeCurve(true);
    },
    cycleLayout() {
      // Step forward once, but if this lands us on a locked layout, keep stepping until it doesn't
      let newIndex = (player.options.perkLayout + 1) % PerkLayouts.length;
      while (!(PerkLayouts[newIndex].isUnlocked?.() ?? true)) {
        newIndex = (newIndex + 1) % PerkLayouts.length;
      }

      player.options.perkLayout = newIndex;
      this.treeLayout = newIndex;
      this.physicsOverride = PerkLayouts[this.treeLayout].forcePhysics;
      WebNetwork.currentLayout = PerkLayouts[this.treeLayout];
      WebNetwork.setPhysics(player.options.perkPhysicsEnabled);
      WebNetwork.moveToDefaultLayoutPositions(this.treeLayout);
    }
  }
};
</script>

<template>
  <div class="c-perk-tab__header">
    You have <span class="c-perk-tab__perk-points">{{ format(pp, 2) }}</span> {{ pluralize("Perk Point", pp) }}.
    <br>
    Perk choices are permanent and cannot be respecced.
    <br>
    Diamond-shaped perks also give Automator Points.
    <br>
    <div class="perk-settings">
      <br>
      <PrimaryButton
        class="o-primary-btn"
        @click="centerTree"
      >
        Center Tree on START
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.perk-settings > button {
  margin-right: 1rem;
}

.c-button-perk-layout {
  width: 30rem;
  margin-bottom: 1rem;
}

.c-button-physics {
  width: 27rem;
  margin-bottom: 1rem;
}
</style>
