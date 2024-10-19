<script>
import QuantumAchievement from "./QuantumAchievement";

export default {
  name: "QuantumAchievementRow",
  components: {
    QuantumAchievement
  },
  props: {
    row: {
      type: Array,
      required: true
    },
    isObscured: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isCompleted: false,
      isHidden: false
    };
  },
  computed: {
    classObject() {
      return {
        "l-achievement-grid__row": true,
        "c-achievement-grid__row--completed": this.isCompleted
      };
    }
  },
  methods: {
    update() {
      this.isCompleted = this.row.every(a => a.isUnlocked);
      this.isHidden = this.isCompleted && player.options.hideCompletedAchievementRows;
    }
  }
};
</script>

<template>
  <div
    v-if="!isHidden"
    :class="classObject"
  >
    <quantum-achievement
      v-for="(achievement, i) in row"
      :key="i"
      :achievement="achievement"
      :is-obscured="isObscured"
      class="l-achievement-grid__cell"
    />
  </div>
</template>
