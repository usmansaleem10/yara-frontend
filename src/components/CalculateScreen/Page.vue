<template>
  <div class="bg-logo">
    <Loader :open="loading" />
    <div>
      <CalculatorForm
        :formValues="calculatorValues"
        :setAttrValue="setAttrValue"
      />
      <div class="mt-4">
        <div v-if="result.price" class="flex">
          <InputField
            :label="`Price ${result.price}`"
            name="price"
            type="range"
            :value="result.price"
            :onChange="setResultAttrValue"
          />
        </div>

        <div class="mt-3 flex text-sm font-medium items-center">
          <span class="mr-4">
            Quantity:
            {{ resultQuantity() }}</span
          >
          <SwitchGroup as="div" class="flex items-center">
            <SwitchLabel as="span" class="ml-3 mr-2">
              <span class="text-sm font-medium">Liters </span>
            </SwitchLabel>
            <Switch
              v-model="unitKg"
              :class="[
                unitKg ? 'bg-teal-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500',
              ]"
            >
              <span
                aria-hidden="true"
                :class="[
                  unitKg ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                ]"
              />
            </Switch>
            <SwitchLabel as="span" class="ml-3">
              <span>Kilograms </span>
            </SwitchLabel>
          </SwitchGroup>
        </div>
      </div>
      <Chart v-if="showChart()" :chartData="result.removal" />
    </div>
  </div>
</template>
<script>
import { Chart, CalculatorForm } from "@/components/index.js";
import { calculate } from "@/utils/services/index.js";
import { InputField, Loader } from "@/components/Shared/index.js";
import { calculateChange } from "@/utils/helpers/calculation.js";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

export default {
  components: {
    Chart,
    CalculatorForm,
    InputField,
    Switch,
    SwitchGroup,
    SwitchLabel,
    Loader,
  },
  data() {
    return {
      loading: false,
      unitKg: true,
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
    resultQuantity() {
      let qunatity = 0;
      if (this.result.quantity) {
        qunatity = this.unitKg
          ? this.result.quantity.kg
          : this.result.quantity.liter;
      }

      return qunatity.toFixed(2);
    },
    showChart() {
      return Object.values(this.result.removal).some((val) => val != null);
    },
    shouldCallApi(crop, procote) {
      const result = this.result.details;
      return (
        Object.keys(this.result.details).length === 0 ||
        !result.crop ||
        !result.procote ||
        (crop && crop.name != result.crop.name) ||
        (procote && procote.name != result.procote.name)
      );
    },
    calculateResult(crop, procote, yieldValue, dfRate) {
      console.log(this.shouldCallApi());
      if (this.shouldCallApi()) {
        this.callApi(crop, procote, yieldValue, dfRate);
      } else {
        const res = calculateChange(
          this.result.details.procote,
          parseFloat(yieldValue),
          parseFloat(dfRate),
          this.result.details.removal,
          this.result.details.region.currency,
          this.result.details.procote_multiplier
        );
        this.result = Object.assign({}, this.result, res);
      }
    },
    callApi(crop, procote, yieldValue, dfRate) {
      if (crop == null || procote == null || yieldValue == 0) return;
      this.loading = true;
      calculate(crop.name, procote.label, yieldValue, dfRate)
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
