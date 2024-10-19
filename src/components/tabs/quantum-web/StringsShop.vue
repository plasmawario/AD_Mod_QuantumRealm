<script>
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import StringsBuyButton from "./StringsBuyButton";

export default {
  name: "TimeTheoremShop",
  components: {
    PrimaryToggleButton,
    StringsBuyButton,
  },
  data() {
    return {
      stringAmount: new Decimal(0),
      totalStrings: new Decimal(0),
      showBuyMax: false,
      budget: {
        matter: new Decimal(0),
      },
      costs: {
        matter: new Decimal(0),
      },
    };
  },
  computed: {
    minimized() {
      return false;
    },
    formatStringType() {
      if (this.stringAmount.gte(1e6)) {
        return format;
      }
      return formatInt;
    },
    totalStringText() {
      return `${quantify("total String", this.totalStrings, 2, 2, this.formatStringType)}`;
    },
    shopBottomRowHeightStyle() {
      return {
        height: "4.4rem",
      };
    }
  },
  watch: {
  },
  methods: {
    formatMatter(matter) {
      return `${format(matter)} Matter`;
    },
    buyWithMatter() {
      WebStrings.buyOne(false, "matter");
    },
    buyMaxTheorems() {
      WebStrings.buyMax(false);
    },
    update() {
      this.stringAmount.copyFrom(Currency.strings);
      this.totalStrings.copyFrom(Currency.strings.max);
      this.showBuyMax = this.totalStrings.gte(1000);
      const budget = this.budget;
      budget.matter.copyFrom(StringPurchaseType.matter.currency);
      const costs = this.costs;
      costs.matter.copyFrom(StringPurchaseType.matter.cost);
    },
  },
};
</script>

<template>
  <div class="strings-buttons">
    <div class="stringshop-container">
      <div
        data-role="page"
        class="stringbuttons-row stringbuttons-top-row"
      >
        <div class="l-load-tree-area">
          <div class="string-gen-container">
            <span>
              You have {{ totalStringText }}.
            </span>
          </div>
        </div>
      </div>
      <div
        class="stringbuttons-row"
        :style="shopBottomRowHeightStyle"
      >
        <p class="buy-string-text string-gen-container">Buy Strings: </p>
        <StringsBuyButton
          :budget="budget.matter"
          :cost="costs.matter"
          :format-cost="formatMatter"
          :action="buyWithMatter"
        />
        <div class="l-string-buy-max-vbox">
          <button
            class="o-string-top-row-button c-string-buy-button c-string-buy-button--unlocked"
            @click="buyMaxTheorems"
            v-if="showBuyMax"
          >
            Buy max
          </button>
        </div>
        <p class="webstrings string-gen-container strings-force-right-align">
            {{ quantify("String", stringAmount, 2, 0) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buy-string-text {
  width: 10rem;
  font-size: 1.35rem;
}

.l-load-tree-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.stringbuttons-bottom-row-hide {
  height: 0;
}

.string-gen-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
