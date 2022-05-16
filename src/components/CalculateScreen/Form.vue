<template>
  <div class="bg-logo">
    <div v-if="loading">Loading</div>
    <div v-else class="flex flex-col space-y-3">
      <label class="block text-sm font-medium text-gray-700 mt-1">Crop</label>

      <Multiselect
        v-model="calculatorValues.crop"
        :mode="'single'"
        :searchable="true"
        :options="crops"
        placeholder="Please select Crop"
        :canClear="false"
        :value-prop="'id'"
        :label="'name'"
        :track-by="'name'"
        :object="true"
      />
      <label class="block text-sm font-medium text-gray-700 mt-1"
        >Procote</label
      >
      <Multiselect
        v-model="calculatorValues.procote"
        :mode="'single'"
        :searchable="true"
        :options="procotes"
        placeholder="Please select Procote"
        :canClear="false"
        :value-prop="'id'"
        :label="'name'"
        :track-by="'name'"
        :object="true"
      />

      <InputField
        label="Yield"
        name="yieldValue"
        type="number"
        :value="calculatorValues.yieldValue"
        :onChange="setAttrValue"
      />
      <InputField
        label="Dry Fertilizer Rate"
        name="dfRate"
        type="number"
        :value="calculatorValues.dfRate"
        :onChange="setAttrValue"
      />
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center">
        <span class="px-2 bg-white text-sm text-gray-500"> Graph </span>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { InputField } from "@/components/Shared/index.js";
import { cropList, procoteList, calculate } from "@/utils/services/index.js";
export default {
  components: { Multiselect, InputField },
  data() {
    return {
      loading: false,
      procotes: [],
      crops: [],
      calculatorValues: {
        procote: null,
        crop: null,
        yieldValue: 0,
        dfRate: 0,
      },
      result: {
        details: {},
        price: null,
        quantity: 0,
        removal: [],
      },
    };
  },
  mounted() {
    this.getDropdownValues();
  },
  methods: {
    setAttrValue(event) {
      const { name, value } = event.target;
      this.calculatorValues[name] = value;
    },
    getDropdownValues() {
      this.loading = true;
      Promise.all([cropList(), procoteList()])
        .then(([crops, procotes]) => {
          this.crops = crops.data;
          this.calculatorValues.crop = crops.data[0];
          this.procotes = procotes.data;
          this.calculatorValues.procote = procotes.data[0];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    calculateResult(crop, procote, yieldValue, dfRate) {
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
<style src="@vueform/multiselect/themes/default.css"></style>
