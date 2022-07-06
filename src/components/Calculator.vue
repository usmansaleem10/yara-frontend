<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="contentWrapper">
    <div class="sm:px-4 py-5 sm:p-6 p-0 bg-custom">
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
        class="flex"
        aria-label="Tabs"
      >
        <span
          v-for="(tab, tabIdx) in tabs"
          :key="tab.name"
          :class="[
            tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
            tabIdx === 0 ? 'rounded-l-lg' : '',
            tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-gray-50 py-4 px-4 font-bold text-lg text-center hover:bg-gray-100 focus:z-10 bg-custom',
          ]"
          :aria-current="tab.current ? 'page' : undefined"
          @click="() => tabAction(tab.name)"
        >
        <span>
           <span v-if="tab.name ==='Agronomy'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto my-1" viewBox="0 0 20 20" fill="currentColor">
             <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
          </span>
          <span v-if="tab.name ==='Calculate'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto my-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </span>
           <span v-if="tab.name ==='Setting'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto my-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
           </span>
        </span>
          <span>{{ tab.name }}</span>
        </span>
      </nav>
    </div>
  </div>
</template>
<script>
const tabs = [
  { name: "Agronomy", current: false },
  { name: "Calculate", current: true },
  { name: "Setting", current: false },
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
        procoteAsAppliedPerArea: "Milliliters",
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
  background: #ebeb7c;
}
.bg-custom {
  background: #ebeb7c;
}
</style>
