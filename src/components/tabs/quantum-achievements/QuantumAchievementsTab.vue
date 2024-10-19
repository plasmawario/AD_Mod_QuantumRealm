<script>
import QuantumAchievementRow from "./QuantumAchievementRow";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SwapAchievementImagesButton from "../normal-achievements/SwapAchievementImagesButton";

export default {
  name: "QuantumAchievementsTab",
  components: {
    SwapAchievementImagesButton,
    QuantumAchievementRow,
    PrimaryToggleButton
  },
  data() {
    return {
      achMultToElectron: false,

      achievementPower: 0,
      achTPEffect: 0,
      achCountdown: 0,
      totalCountdown: 0,
      missingAchievements: 0,
      showAutoAchieve: false,
      isAutoAchieveActive: false,
      hideCompletedRows: false,
      achMultBreak: false,
      achMultToIDS: false,
      achMultToTDS: false,
      achMultToBH: false,
      achMultToTP: false,
      achMultToTT: false,
      renderedRowIndices: []
    };
  },
  computed: {
    rows: () => QuantumAchievements.allRows,
    renderedRows() {
      return this.rows.filter((_, i) => this.renderedRowIndices.includes(i));
    },
    boostText() {
      const achievementPower = formatX(this.achievementPower, 2, 3);
      const achTPEffect = formatX(this.achTPEffect, 2, 3);

      const boostList = [];

      const dimMultList = [];
      dimMultList.push("Up-type");
      dimMultList.push("Down-type");
      if (this.achMultToElectron) dimMultList.push("Electron-type");
      boostList.push(`${makeEnumeration(dimMultList)} Generators: ${achievementPower}`);

      //if (this.achMultToTP) boostList.push(`Tachyon Particles: ${achTPEffect}`);
      //if (this.achMultToBH) boostList.push(`Black Hole Power: ${achievementPower}`);
      //if (this.achMultToTT) boostList.push(`Time Theorem production: ${achievementPower}`);
      return `${boostList.join("<br>")}`;
    },
  },
  watch: {
    hideCompletedRows(newValue) {
      player.options.hideCompletedAchievementRows = newValue;
      this.startRowRendering();
    }
  },
  created() {
    this.startRowRendering();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.renderAnimationId);
  },
  methods: {
    update() {
      const gameSpeedupFactor = getGameSpeedupFactor();
      this.achievementPower = QuantumAchievements.power;
      this.achMultToElectron = QuantumAchievement(46).isUnlocked;

      this.achTPEffect = RealityUpgrade(8).config.effect();

      this.hideCompletedRows = player.options.hideCompletedAchievementRows;
      this.achMultBreak = BreakInfinityUpgrade.achievementMult.canBeApplied;
      this.achMultToIDS = Achievement(75).isUnlocked;
      this.achMultToTDS = EternityUpgrade.tdMultAchs.isBought;
      this.achMultToTP = RealityUpgrade(8).isBought;
      this.achMultToBH = VUnlocks.achievementBH.canBeApplied;
      this.achMultToTT = Ra.unlocks.achievementTTMult.canBeApplied;
    },
    startRowRendering() {
      const unlockedRows = [];
      const lockedRows = [];
      for (let i = 0; i < this.rows.length; i++) {
        const targetArray = this.rows[i].every(a => a.isUnlocked) ? unlockedRows : lockedRows;
        targetArray.push(i);
      }
      const renderedLockedRows = lockedRows.filter(row => this.renderedRowIndices.includes(row));
      const nonRenderedLockedRows = lockedRows.filter(row => !this.renderedRowIndices.includes(row));
      let rowsToRender;
      if (player.options.hideCompletedAchievementRows) {
        this.renderedRowIndices = unlockedRows.concat(renderedLockedRows);
        rowsToRender = nonRenderedLockedRows;
      } else {
        this.renderedRowIndices = renderedLockedRows;
        rowsToRender = unlockedRows.concat(nonRenderedLockedRows);
      }
      const stepThroughRendering = () => {
        const ROWS_PER_FRAME = 2;
        for (let i = 0; i < ROWS_PER_FRAME; i++) {
          if (rowsToRender.length === 0) {
            return;
          }
          this.renderedRowIndices.push(rowsToRender.shift());
        }
        this.renderAnimationId = requestAnimationFrame(stepThroughRendering);
      };
      stepThroughRendering();
    },
    isRendered(row) {
      return this.renderedRowIndices.includes(row);
    },
    isObscured(row) {
      return this.isDoomed ? false : row === 17;
    },
    timeDisplay,
    timeDisplayNoDecimals,
  }
};
</script>

<template>
  <div class="l-achievements-tab">
    <div class="c-subtab-option-container">
      <PrimaryToggleButton
        v-model="hideCompletedRows"
        class="o-primary-btn--subtab-option"
        label="Hide completed rows:"
      />
      <PrimaryToggleButton
        v-if="showAutoAchieve"
        v-model="isAutoAchieveActive"
        class="o-primary-btn--subtab-option"
        label="Auto Achievements:"
      />
    </div>
    <div class="c-achievements-tab__header c-achievements-tab__header--multipliers">
      <span>
        Achievements provide a multiplier to<SwapAchievementImagesButton />
        <div v-html="boostText" />
      </span>
    </div>
    <div class="c-achievements-tab__header c-achievements-tab__header--multipliers">
      Achievements with a <i class="fas fa-star" /> icon also give an additional reward.
    </div>
    <div class="l-achievement-grid">
      <QuantumAchievementRow
        v-for="(row, i) in renderedRows"
        :key="i"
        :row="row"
        :is-obscured="isObscured(i)"
      />
    </div>
  </div>
</template>
