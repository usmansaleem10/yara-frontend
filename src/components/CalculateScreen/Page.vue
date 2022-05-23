<template>
  <div class="bg-logo">
    <div v-if="loading">Loading</div>
    <div v-else>
      <CalculatorForm
        :formValues="calculatorValues"
        :setAttrValue="setAttrValue"
      />
      <div class="flex">
        <InputField
          v-if="result.price"
          label="Price"
          name="price"
          type="range"
          :value="result.price"
          :onChange="setResultAttrValue"
        />
      </div>
      <Chart v-if="showChart()" :chartData="result.removal" />
    </div>
  </div>
</template>
<script>
import { Chart, CalculatorForm } from "@/components/index.js";
import { calculate } from "@/utils/services/index.js";
import { InputField } from "@/components/Shared/index.js";
export default {
  components: { Chart, CalculatorForm, InputField },
  data() {
    return {
      loading: false,
      calculatorValues: {
        procote: null,
        crop: null,
        yieldValue: 0,
        dfRate: 0,
      },
      result: {
        details: {},
        price: 0,
        quantity: 0,
        removal: {},
      },
    };
  },
  methods: {
    showChart() {
      return Object.values(this.result.removal).some((val) => val != null);
    },
    calculateResult(crop, procote, yieldValue, dfRate) {
      if (crop == null || procote == null || yieldValue == 0) return;

      this.loading = true;
      calculate(crop.name, procote.name, yieldValue, dfRate)
        .then((response) => {
          const { details, price, quantity_per_tonne, removal } = response.data;
          this.result.details = details;
          this.result.price = price;
          this.result.quantity = quantity_per_tonne;
          this.result.removal = removal;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setLoading(value) {
      this.loading = value;
    },
    setResultAttrValue(event) {
      const { name, value } = event.target;
      this.result[name] = value;
    },
    setAttrValue(event) {
      const { name, value } = event.target;
      this.calculatorValues[name] = value;
    },
  },
  watch: {
    calculatorValues: {
      deep: true,
      handler(formValues) {
        const { crop, procote, yieldValue, dfRate } = formValues;
        this.calculateResult(crop, procote, yieldValue, dfRate);
      },
    },
  },
};
</script>
