<template>
  <div class="grid grid-flow-row auto-rows-max">
    <div>
      {{ details.heading }}
      <p class="text-gray-500">{{ details.subHeading }}</p>
    </div>
    <div>
      <SwitchGroup as="div" class="flex items-center">
        <SwitchLabel as="span" class="mr-3">
          <span class="text-sm font-medium text-gray-900"
            >{{ options[1] }}
          </span>
        </SwitchLabel>
        <Switch
          v-model="enabled"
          class="bg-indigo-400 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <span
            aria-hidden="true"
            :class="[
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            ]"
          />
        </Switch>
        <SwitchLabel as="span" class="ml-3">
          <span class="text-sm font-medium text-gray-900"
            >{{ options[0] }}
          </span>
        </SwitchLabel>
      </SwitchGroup>
    </div>
  </div>
</template>

<script>
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

export default {
  props: {
    name: { type: String, required: true },
    value: { type: String },
    setValue: { type: Function, required: true },
    options: { type: Array, required: true },
    details: { type: Object, required: true },
  },
  components: { Switch, SwitchGroup, SwitchLabel },
  computed: {
    enabled: {
      get: function () {
        return this.value == this.options[0];
      },
      set: function (newValue) {
        const returnValue = newValue ? this.options[0] : this.options[1];
        this.setValue(this.name, returnValue);
      },
    },
  },
};
</script>
