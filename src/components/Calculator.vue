<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="contentWrapper">
    <div class="px-4 py-5 sm:p-6">
      <CalculatorPage
        v-if="selectedTab == 'Calculate'"
        :calculatorValues="calculatorValues"
        :setAttrValue="setAttrValue"
        :preferences="preferences"
      />
      <Preferences v-else :pref="preferences" :setValue="setValue" />
    </div>
    <div class="px-4 py-4 sm:px-6 footer">
      <nav
        class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
        aria-label="Tabs"
      >
        <span
          v-for="(tab, tabIdx) in tabs"
          :key="tab.name"
          :class="[
            tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
            tabIdx === 0 ? 'rounded-l-lg' : '',
            tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-gray-50 py-4 px-4 text-sm font-medium text-center hover:bg-gray-100 focus:z-10',
          ]"
          :aria-current="tab.current ? 'page' : undefined"
          @click="() => tabAction(tab.name)"
        >
          <span>{{ tab.name }}</span>
          <span
            aria-hidden="true"
            :class="[
              tab.current ? 'bg-indigo-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
          />
        </span>
      </nav>
    </div>
  </div>
</template>
<script>
const tabs = [
  { name: "Agronomy", current: false },
  { name: "Calculate", current: true },
  { name: "My Preferences", current: false },
];
import { CalculatorPage, Preferences } from "@/components/index.js";
export default {
  components: { CalculatorPage, Preferences },
  data() {
    return {
      tabs: tabs,
      selectedTab: "Calculate",
      calculatorValues: {
        procote: null,
        crop: null,
        yieldValue: 0,
        dfRate: 0,
      },
      preferences: {
        region: "New Brunswick",
        area: "Hectares",
        weight: "Grams",
        weightAppliedPerArea: "Kg",
        weightAsBlended: "Tonne",
        weightAppliedToBlended: "Liters",
      },
    };
  },
  methods: {
    setAttrValue(event) {
      const { name, value } = event.target;
      this.calculatorValues[name] = value;
    },
    tabAction(name) {
      if (name == "Agronomy") {
        const url = this.calculatorValues?.procote?.url?.length
          ? this.calculatorValues.procote.url
          : "http://www.google.com";
        window.open(url, "_newtab");
        return;
      }
      this.selectTab(name);
    },
    setValue(name, val) {
      this.preferences[name] = val;
    },
    selectTab(name) {
      this.selectedTab = name;
      this.tabs.forEach((tab) => {
        tab.current = tab.name == name;
      });
    },
  },
};
</script>
<style scoped>
.footer {
  @apply fixed bottom-0 w-full bg-white border border-t;
}
</style>
