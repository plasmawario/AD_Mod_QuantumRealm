<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import FusionChallengeBox from "./FusionChallengeBox";

export default {
  name: "FusionChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    FusionChallengeBox
  },
  data() {
    return {
      nextFC: 0,
      showAllChallenges: false
    };
  },
  computed: {
    challenges() {
      return FusionChallenges.all;
    },
  },
  methods: {
    update() {
      this.nextFC = FusionChallenges.nextFC;
      this.showAllChallenges = player.options.showAllChallenges;
    },
    isChallengeVisible(challenge) {
      return challenge.isUnlocked || (this.showAllChallenges);// && PlayerProgress.eternityUnlocked());
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      An active Nuclear Fusion autobuyer will automatically perform a Fusion
      upon reaching the challenge goal regardless of settings
      <br/>
      The Goal for each of these challenges is reaching 1.8e308 Quarks
    </div>
    <br/>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <FusionChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
</template>

<style scoped>

</style>
