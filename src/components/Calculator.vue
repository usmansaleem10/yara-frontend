<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white overflow-hidden rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <CalculatorForm v-if="selectedTab == 'Calculate'" />
      <Preferences v-else />
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
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
          ]"
          :aria-current="tab.current ? 'page' : undefined"
          @click="() => selectTab(tab.name)"
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
  { name: "My Preferances", current: false },
  { name: "Calculate", current: true },
];
import { CalculatorForm, Preferences } from "@/components/index.js";
export default {
  components: { CalculatorForm, Preferences },
  data() {
    return {
      tabs: tabs,
      selectedTab: "Calculate",
    };
  },
  methods: {
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
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
