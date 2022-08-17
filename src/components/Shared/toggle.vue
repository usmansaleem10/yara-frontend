<template>
  <div class="grid grid-flow-row auto-rows-max">
    <div class="bg-custom p-2 mb-2">
      <div class="block font-bold text-center text-xl text-blue-900">
        {{ details.heading }}
      </div>
    </div>
    <div>
      <SwitchGroup as="div" class="flex items-center justify-center">
        <SwitchLabel as="span" class="mr-3">
          <span class="text-xl font-medium text-gray-500"
            >{{ options[0] }}
          </span>
        </SwitchLabel>
        <Switch
          v-model="enabled"
          :disabled="disabled"
          class="bg-blue-500 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
          <span class="text-xl font-medium text-gray-500"
            >{{ options[1] }}
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
    options: { type: Array, required: true },
    details: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
  },
  components: { Switch, SwitchGroup, SwitchLabel },
  computed: {
    enabled: {
      get: function () {
        return this.value == this.options[1];
      },
    },
  },
};
</script>
