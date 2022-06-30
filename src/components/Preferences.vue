<template>
  <h1>My Preferences</h1>
  <div class="bg-white shadow overflow-hidden rounded-md mt-5">
    <ul role="list" class="divide-y divide-gray-200">
      <li class="px-6 py-4">
        <label class="block text-sm font-medium text-gray-700 mt-1"
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
          :object="true"
        />
      </li>
      <li class="px-6 py-4">
        <Toggle
          :details="details('procoteAsAppliedPerArea')"
          name="procoteAsAppliedPerArea"
          :value="pref.procoteAsAppliedPerArea"
          :setValue="setValue"
          :options="options('procoteAsAppliedPerArea')"
        />
      </li>
      <li class="px-6 py-4">
        <Toggle
          :details="details('area')"
          name="area"
          :value="pref.area"
          :setValue="setValue"
          :options="options('area')"
        />
      </li>
      <li class="px-6 py-4">
        <Toggle
          :details="details('weightAppliedPerArea')"
          name="weightAppliedPerArea"
          :value="pref.weightAppliedPerArea"
          :setValue="setValue"
          :options="options('weightAppliedPerArea')"
        />
      </li>
      <li class="px-6 py-4">
        <Toggle
          :details="details('weightAsBlended')"
          name="weightAsBlended"
          :value="pref.weightAsBlended"
          :setValue="setValue"
          :options="options('weightAsBlended')"
        />
      </li>
      <li class="px-6 py-4">
        <Toggle
          :details="details('weightAppliedToBlended')"
          name="weightAppliedToBlended"
          :value="pref.weightAppliedToBlended"
          :setValue="setValue"
          :options="options('weightAppliedToBlended')"
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
      region: "",
    };
  },
  props: {
    setValue: { type: Function, required: true },
    pref: { type: Object, required: true },
  },
  mounted() {
    regionList().then((response) => {
      this.regions = response.data;
      this.region = response.data[0];
    });
  },
  watch: {
    region: {
      handler(newVal) {
        this.setValue("region", newVal);
      },
    },
  },
  methods: {
    options(name) {
      return {
        area: ["Hectres", "Acres"],
        weight: ["Pounds", "Grams"],
        weightAppliedPerArea: ["Pounds", "Kilograms"],
        weightAsBlended: ["Ton", "Tonne"],
        weightAppliedToBlended: ["Quarts", "Liters"],
        procoteAsAppliedPerArea: ["Milliliters", "Ounces"],
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
