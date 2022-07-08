<template>
  <div class="flex items-center justify-evenly">
    <h1 class="block font-bold text-center text-xl mb-1 text-blue-900">
      User Preferences
    </h1>
    <div>
      <img
        width="90"
        class="mx-auto"
        src="https://brandeps.com/logo-download/Y/Yara-logo-vector-01.svg"
        alt="logo"
      />
      <div class="block font-bold text-center text-xl mb-1 text-blue-900">
        ApplyIt
      </div>
    </div>
  </div>
  <div class="bg-white shadow overflow-hidden rounded-md mt-5">
    <ul role="list" class="divide-y divide-gray-200">
      <li class="py-4">
        <label class="block font-bold text-center text-xl mb-2 text-blue-900"
          >Region</label
        >
        <Multiselect
          v-model="region"
          :mode="'single'"
          :searchable="true"
          :options="regions"
          placeholder="Please select Region"
          :canClear="false"
          :value-prop="'state_name'"
          :label="'state_name'"
          :track-by="'state_name'"
        />
      </li>
      <li class="py-4">
        <Toggle
          :details="details('procoteAsAppliedPerArea')"
          name="procoteAsAppliedPerArea"
          :value="pref.procoteAsAppliedPerArea"
          :setValue="setValue"
          :options="options('procoteAsAppliedPerArea')"
        />
      </li>
      <li class="py-4">
        <Toggle
          :details="details('weightAsBlended')"
          name="weightAsBlended"
          :value="pref.weightAsBlended"
          :setValue="setValue"
          :options="options('weightAsBlended')"
        />
      </li>
      <li class="py-4">
        <Toggle
          :details="details('weightAppliedToBlended')"
          name="weightAppliedToBlended"
          :value="pref.weightAppliedToBlended"
          :setValue="setValue"
          :options="options('weightAppliedToBlended')"
        />
      </li>
      <li class="py-4">
        <Toggle
          :details="details('weightAppliedPerArea')"
          name="weightAppliedPerArea"
          :value="pref.weightAppliedPerArea"
          :setValue="setValue"
          :options="options('weightAppliedPerArea')"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import { Toggle } from "@/components/Shared/index.js";
import { regionList } from "@/utils/services/index.js";
import Multiselect from "@vueform/multiselect";
export default {
  components: { Toggle, Multiselect },
  data() {
    return {
      regions: [],
      region: this.pref.region,
    };
  },
  props: {
    setValue: { type: Function, required: true },
    pref: { type: Object, required: true },
  },
  mounted() {
    regionList().then((response) => {
      this.regions = response.data;
    });
  },
  watch: {
    region: {
      handler(val) {
        this.setValue("region", val);
      },
    },
  },
  methods: {
    options(name) {
      return {
        weight: ["Pounds", "Grams"],
        weightAppliedPerArea: ["Pounds", "Kilograms"],
        weightAsBlended: ["Ton", "Tonne"],
        weightAppliedToBlended: ["Quarts", "Liters"],
        procoteAsAppliedPerArea: ["Ounces", "Milliliters"],
      }[name];
    },
    details(name) {
      return {
        area: {
          heading: "Area of Measure",
        },
        weight: {
          heading: "Micronutriats as applied",
        },
        weightAppliedPerArea: {
          heading: "Procote Applied to Blend",
        },
        weightAsBlended: {
          heading: "Dry Fertilizer as Blended",
        },
        weightAppliedToBlended: {
          heading: "Procote Applied to blend",
        },
        procoteAsAppliedPerArea: {
          heading: "Procote as Applied Per Area",
        },
      }[name];
    },
  },
};
</script>
