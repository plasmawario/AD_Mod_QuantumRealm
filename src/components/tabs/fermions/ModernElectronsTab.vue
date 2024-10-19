<script>
import ElectronRow from "@/components/tabs/fermions/ModernElectronRow";
import ElectronUpgrades from "@/components/tabs/fermions/ModernElectronUpgradeRow";
//import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ModernElectronsTab",
  components: {
    ElectronRow,
    ElectronUpgrades,
  },
  data() {
    return {
      electricCharge: new Decimal(0),
      dimMultiplier: new Decimal(0),
      chargePerSecond: new Decimal(0),
      //conversionRate: 0,
      showElectricCharge: false,
      buyElectronGenMultiplier: new Decimal(),
      gen1MultiplierText: "",
    };
  },
  methods: {
    update() {
      this.electricCharge.copyFrom(Currency.electricCharge);
      this.conversionRate = ElectronGenerators.powerConversionRate;
      this.dimMultiplier = this.electricCharge.max(1).times(this.conversionRate);
      this.chargePerSecond = ElectronGenerator(1).productionChargePerSecond;
      this.showElectricCharge = WebNode.electricCharge.canBeApplied;
      this.buyElectronGenMultiplier.copyFrom(ElectronGenerators.generatorPurchaseMultiplier);
      this.gen1MultiplierText = `electron-type generator purchase multiplier: ${formatX(this.buyElectronGenMultiplier, 2, 2)}`
    },
    maxAll() {
      maxAllElectronGenerator();
    },
  }
};
</script>

<template>
  <div class="l-antimatter-dim-tab">
    <div class="modes-container">     
        <button
            class="o-primary-btn l-button-container"
            @click="maxAll"
        >
            Max All
      </button> 
    </div>
    <div>
      {{ gen1MultiplierText }}
      <br><br>
    </div>
    <div v-if="showElectricCharge">
      <p>
        You have
        <span class="c-electriccharge-dim-description__accent">{{ format(electricCharge, 2, 1) }}</span>
        Electric Charge,
        <br>
        <span>
          with a
        <span class="c-electriccharge-dim-description__accent">{{ formatX(conversionRate, 2, 3) }}</span>
        </span> multiplier -
        giving a
        <span class="c-electriccharge-dim-description__accent">{{ formatX(dimMultiplier, 2, 1) }}</span>
        multiplier on all
        <span>Quark Generators.</span>
        <div>You are getting {{ format(chargePerSecond, 2, 0) }} Electric Charge per second.</div>
      </p>
      <br/>
    </div>
    <div>
      Electron-type generators
    </div>
    <div class="l-dimensions-container">
      <ElectronRow
        v-for="tier in 3"
        :key="tier"
        :tier="tier"
      />
    </div>
    <ElectronUpgrades/>
  </div>
</template>

<style scoped>
.l-button-container {
  width: 100px;
  height: 30px;
  padding: 0;
}
</style>
