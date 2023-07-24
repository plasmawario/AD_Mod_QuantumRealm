<script>

export default {
  name: "HeaderFermionsContainer",
  components: {

  },
  data() {
    return {
      showContainer: true,
      showGen1Quarks: true,
      showGen2Quarks: false,
      showGen3Quarks: false,
      gen1Quarks: new Decimal(0),
      gen2Quarks: new Decimal(0),
      gen3Quarks: new Decimal(0),
      showGen1Leptons: false,
      showGen2Leptons: false,
      showGen3Leptons: false,
      gen1Leptons: new Decimal(0),
      gen2Leptons: new Decimal(0),
      gen3Leptons: new Decimal(0),
    };
  },
  methods: {
    update() {
        this.gen1Quarks.copyFrom(Currency.quarks1.value.floor());
        this.gen2Quarks.copyFrom(Currency.quarks2.value.floor());
        this.gen3Quarks.copyFrom(Currency.quarks3.value.floor());
    },
  },
};
</script>

<template>
  <div
    v-if="showContainer"
    class="c-prestige-button-container"
  >
    <div
      class="c-quarks"
    >
      <p 
        v-if="showGen1Quarks"
        class="c-spacer"
      >
        You have
        <span class="c-game-header__quark1-amount">{{ format(gen1Quarks, 2) }}</span>
        {{ pluralize("Gen 1 quark", gen1Quarks) }}.
      </p>

      <p 
        v-if="showGen2Quarks"
        class="c-spacer"
      >
        You have
        <span class="c-game-header__quark2-amount">{{ format(gen2Quarks, 2) }}</span>
        {{ pluralize("Gen 2 quark", gen2Quarks) }}.
      </p>

      <p 
        v-if="showGen3Quarks"
        class="c-spacer"
      >
        You have
        <span class="c-game-header__quark3-amount">{{ format(gen3Quarks, 2) }}</span>
        {{ pluralize("Gen 3 quark", gen3Quarks) }}.
      </p>
    </div>
  </div>
</template>

<style scoped>
.c-quarks {
  font-size: 1.2rem;
  padding-bottom: 0.25rem;
}
.c-spacer {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
</style>
