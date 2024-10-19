<script>
import MultipleAutobuyersBox from "./MultipleAutobuyersBox";
import QuantumMultipleAutobuyersBox from "./QuantumMultipleAutobuyersBox";
import MultipleSingleAutobuyersGroup from "./MultipleSingleAutobuyersGroup";

// This component, for some reason, contains every single autobuyer except for tickspeed and prestiges
export default {
  name: "SimpleAutobuyersMultiBox",
  components: {
    MultipleAutobuyersBox,
    QuantumMultipleAutobuyersBox,
    MultipleSingleAutobuyersGroup
  },
  computed: {
    multiple() {
      return Autobuyers.displayQuantum;
    },
  }
};
</script>

<template>
  <span class="l-autobuyers-tab">
    <QuantumMultipleAutobuyersBox
      v-for="(type, id) in multiple"
      :key="id"
      :type="type"
    />
    <!--<MultipleAutobuyersBox
      v-for="(type, id) in multiple"
      :key="id"
      :type="type"
    />-->
    <MultipleSingleAutobuyersGroup />
  </span>
</template>

<style scoped>

</style>
