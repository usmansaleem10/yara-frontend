<template>
  <H1>My Preferences</H1>
  <div class="bg-white shadow overflow-hidden rounded-md mt-5">
    <ul role="list" class="divide-y divide-gray-200">
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
          :details="details('weight')"
          name="weight"
          :value="pref.weight"
          :setValue="setValue"
          :options="options('weight')"
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
export default {
  components: { Toggle },
  data() {
    return {
      pref: {
        area: "Hectres",
        weight: "Grams",
        weightAppliedPerArea: "Kg",
        weightAsBlended: "Tonne",
        weightAppliedToBlended: "Liters",
      },
    };
  },
  methods: {
    setValue(name, val) {
      this.pref[name] = val;
    },
    options(name) {
      return {
        area: ["Hectres", "Acres"],
        weight: ["Pounds", "Grams"],
        weightAppliedPerArea: ["Pounds", "Kilograms"],
        weightAsBlended: ["Ton", "Tonne"],
        weightAppliedToBlended: ["Quarts", "Liters"],
      }[name];
    },
    details(name) {
      return {
        area: {
          heading: "Area of Measure",
          subHeading: "This is a description text",
        },
        weight: {
          heading: "Micronutriats as applied",
          subHeading: "This is a description text",
        },
        weightAppliedPerArea: {
          heading: "Dry Fertilizer as Applied/Area",
          subHeading: "This is a description text",
        },
        weightAsBlended: {
          heading: "Dry Fertilizer as Blended",
          subHeading: "This is a description text",
        },
        weightAppliedToBlended: {
          heading: "Procote Applied to blend",
          subHeading: "This is a description text",
        },
      }[name];
    },
  },
};
</script>
