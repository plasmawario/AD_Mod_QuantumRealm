<script>
import BigCrunchButton from "../BigCrunchButton";
import HeaderBlackHole from "../HeaderBlackHole";
import HeaderChallengeDisplay from "../HeaderChallengeDisplay";
import HeaderChallengeEffects from "../HeaderChallengeEffects";
import HeaderPrestigeGroup from "../HeaderPrestigeGroup";
import NewsTicker from "../NewsTicker";

import GameSpeedDisplay from "@/components/GameSpeedDisplay";

import Init from "@/components/tabs/initial-view";


export default {
  name: "ModernUi",
  components: {
    BigCrunchButton,
    HeaderChallengeDisplay,
    HeaderChallengeEffects,
    NewsTicker,
    HeaderBlackHole,
    HeaderPrestigeGroup,
    GameSpeedDisplay,
    Init,
  },
  data() {
    return {
      bigCrunch: false,
      hasReality: false,
      newGameKey: "",

      isPastInit: false,
    };
  },
  computed: {
    news() {
      return this.$viewModel.news;
    },
    topMargin() {
      return this.$viewModel.news ? "" : "margin-top: 3.9rem";
    }
  },
  methods: {
    update() {
      const crunchButtonVisible = !player.break && Player.canCrunch;
      this.bigCrunch = crunchButtonVisible && Time.bestInfinityRealTime.totalMinutes > 1;
      this.hasReality = PlayerProgress.realityUnlocked();
      // This only exists to force a key-swap after pressing the button to start a new game; the news ticker can break
      // if it isn't redrawn
      this.newGameKey = Pelle.isDoomed;

      this.isPastInit = player.pastInitialScreen;
    },
    handleClick() {
      if (PlayerProgress.infinityUnlocked()) manualBigCrunchResetRequest();
      else Modal.bigCrunch.show();
    }
  },
};
</script>

<template>
  <div id="page">
    <link
      rel="stylesheet"
      type="text/css"
      href="stylesheets/new-ui-styles.css"
    >
    <div
      :key="newGameKey"
      class="game-container"
      :style="topMargin"
    >
      <span v-if="!isPastInit">
        <Init />
      </span>
      <span v-else>
        <NewsTicker
          v-if="news"
        />
        <BigCrunchButton />
        <div
          v-if="!bigCrunch"
          class="tab-container"
        >
          <HeaderPrestigeGroup />
          <div class="information-header">
            <HeaderChallengeDisplay />
            <HeaderChallengeEffects />
            <GameSpeedDisplay v-if="hasReality" />
            <br v-if="hasReality">
            <HeaderBlackHole />
          </div>
          <slot />
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
