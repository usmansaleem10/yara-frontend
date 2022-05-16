<template>
  <div>
    <label
      v-if="label && label.length"
      :for="name"
      class="block text-sm font-medium text-gray-700 mt-1"
      >{{ label }}</label
    >
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :type="type"
        :name="name"
        :id="name"
        :min="min"
        :max="max"
        :class="[
          'block w-full pr-10 sm:text-sm rounded-md',
          {
            'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500':
              error,
          },
        ]"
        :placeholder="placeholder.length ? placeholder : name"
        :value="value"
        :aria-invalid="error"
        :aria-describedby="describedBy"
      />
      <div
        v-if="error"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <ExclamationCircleIcon
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
        />
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" :id="describedBy">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
import { ExclamationCircleIcon } from "@heroicons/vue/solid";

export default {
  components: { ExclamationCircleIcon },
  props: {
    label: { type: String, required: false },
    type: { type: String, default: "text" },
    name: { type: String, required: true },
    value: { type: String, required: true },
    placeholder: { type: String, default: "" },
    errorText: { type: String, default: "" },
    min: { type: String, default: "0" },
    max: { type: String, default: "1000" },
  },
  computed: {
    error() {
      return this.errorText && this.errorText.length;
    },
    describedBy() {
      return `${this.name}-error`;
    },
  },
};
</script>
