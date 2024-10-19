<script>
import FullScreenAnimationHandler from "@/core/full-screen-animation-handler";

export default {
  name: "InitTab",
  components: {
  },
  data() {
    return {
      fusionUnlocked: false,
    };
  },
  computed: {
  },
  watch: {
    fusion(newValue) {
      player.options.animations.fusion = newValue;
    },
  },
  methods: {
    update() {
      const progress = PlayerProgress.current;
      this.fusionUnlocked = progress.isMatterUnlocked;
    },
    beginAnim() {
        FullScreenAnimationHandler.display("a-initial-game", 4);
        setTimeout(() => player.pastInitialScreen = true, 3500);
    }
  }
};
</script>

<template>
    <div>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <h2 class="c-center-text">In the beginning, there was nothing...</h2>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <button
            class="o-init-btn"
            @click="beginAnim()"
        >
        <span>Create a new Realm</span>
        </button>
    </div>
</template>

<style scoped>
.c-center-text {
  text-align: center;
  margin-right: 15rem;
}

@keyframes beginAnim {
    0% {box-shadow: 0 0 0 0 var(--color-matter)}
    100% {box-shadow: 0 0 4rem 2rem #181818}
}

.o-init-btn {
  margin-right: 15rem;
  width: 46rem;
  height: 12rem;
  font-family: Typewriter, serif;
  font-size: 1.35rem;
  font-weight: bold;
  color: #e4e4e4;
  background-color: #181818;
  border: var(--var-border-width, 0.5rem) solid var(--color-matter);
  border-radius: var(--var-border-radius, 0.4rem);
  padding: 1rem;
  transition-duration: 0.2s;
  cursor: pointer;
}
.o-init-btn:hover {
  color: #181818;
  background-color: #e4e4e4;
  animation: beginAnim 1.25s linear infinite;
}
</style>
