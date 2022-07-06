<template>
  <div class="bg-logo">
    <Loader :open="loading" />
    <div class="overflow-x-scroll">
      <CalculatorForm
        :formValues="calculatorValues"
        :setAttrValue="setAttrValue"
      />
      <div class="mt-4">
        <div v-if="result.price" class="flex">
          <InputField
            :label="`Price: $${result.price}`"
            name="price"
            type="range"
            :min="0"
            :max="30"
            :value="result.price"
            :onChange="setResultAttrValue"
          />
        </div>
        <div class="" v-if="result?.details?.ml_procote_per_acre">
          {{ preferences.procoteAsAppliedPerArea }} per acre:
          {{ procoteAppliedValue() }}
        </div>
        <div class="mt-3 flex text-sm font-medium items-center justify-center">
          <span class="mr-4 block font-bold text-center text-xl mb-1 text-blue-900">
            Quantity:
            {{ resultQuantity() }}</span
          >
          <SwitchGroup as="div" class="flex items-center">
            <SwitchLabel as="span" class="mr-2">
              <!-- <span class="block font-bold text-center text-xl mb-1 text-blue-900"
                >{{ preferences.weightAppliedToBlended }}/{{
                  preferences.weightAsBlended
                }}
              </span> -->
            </SwitchLabel>
            <Switch
              v-model="unitKg"
              :class="[
                unitKg ? 'bg-blue-500' : 'bg-gray-400',
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
              <span class="block font-bold text-xl mb-1 text-blue-900"
                >{{ preferences.weightAppliedPerArea }}/{{
                  preferences.weightAsBlended
                }}
              </span>
            </SwitchLabel>
          </SwitchGroup>
        </div>
      </div>
      <Chart v-if="showChart()" :chartData="result.removal" />
      <div v-else-if="result.price" class="p-10 text-gray-500">
        No removal data is present against this crop
      </div>
    </div>
  </div>
</template>
<script>
import { Chart, CalculatorForm } from "@/components/index.js";
import { calculate } from "@/utils/services/index.js";
import { InputField, Loader } from "@/components/Shared/index.js";
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
  props: {
    calculatorValues: { type: Object, required: true },
    setAttrValue: { type: Function, required: true },
    preferences: { type: Object, required: true },
  },
  data() {
    return {
      loading: false,
      unitKg: true,
      result: {
        details: {},
        price: 0,
        quantity: { kg: null, liter: null },
        removal: {},
      },
    };
  },
  mounted() {
    const { crop, procote, yieldValue, dfRate } = this.calculatorValues;
    this.calculateResult(crop, procote, yieldValue, dfRate);
  },
  methods: {
    procoteAppliedValue() {
      let result = this.result.details.ml_procote_per_acre;
      if (this.preferences.procoteAsAppliedPerArea == "Ounces")
        result = (result / 29.574).toFixed();
      return result;
    },
    applyPreferences(quantity) {
      if (this.preferences.weightAsBlended == "Ton")
        quantity = quantity * 0.907185;
      if (this.preferences.weightAppliedToBlended == "Quarts")
        quantity = quantity / 1.05669;
      if (this.preferences.weightAppliedPerArea == "Pounds")
        quantity = quantity / 2.20462;

      return quantity;
    },
    resultQuantity() {
      let quantity = 0;
      if (this.result.quantity.kg && this.result.quantity.kg) {
        quantity = this.unitKg
          ? this.result.quantity.kg
          : this.result.quantity.liter;
        quantity = parseFloat(quantity);
      }
      quantity = this.applyPreferences(quantity);
      return quantity ? quantity.toFixed(1) : 0;
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
    procoteValue(procote) {
      return {
        Zinc: "Zn",
        Boron: "B",
        Manganese: "Mn",
        Copper: "Cu",
        BMZ: "BMZ",
        BCMZ: "BCMZ",
      }[procote];
    },
    calculateResult(crop, procote, yieldValue, dfRate) {
      if (crop == null || procote == null || yieldValue == 0) return;
      this.loading = true;
      calculate(
        crop.name,
        this.procoteValue(procote.label),
        yieldValue,
        dfRate,
        this.preferences.region.state_name
          ? this.preferences.region.state_name
          : this.preferences.region
      )
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
    calculateMlPerAcre(value) {
      const procote_amount =
        this.result.details.procote[this.result.details.region.currency] / 1000;
      this.result.details.ml_procote_per_acre = (
        value / procote_amount
      ).toFixed(2);
    },
    calculateQuantity() {
      const LBS_PER_METRIC_TON = 2204.62;
      const dfRate = parseFloat(this.calculatorValues.dfRate);
      const mlPerAcre = parseFloat(this.result.details.ml_procote_per_acre);
      const literValue = (
        ((LBS_PER_METRIC_TON / dfRate) * mlPerAcre) /
        1000
      ).toFixed(2);
      this.result.quantity.liter = literValue;
      this.result.quantity.kg =
        this.result.details.procote.density * literValue;
    },
    calculatePriceChangeResult(value) {
      this.calculateMlPerAcre(value);
      this.calculateQuantity();
    },
    setResultAttrValue(event) {
      const { name, value } = event.target;
      this.calculatePriceChangeResult(value);
      this.result[name] = value;
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
