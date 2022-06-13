<template>
  <div>
    <label
      v-if="label && label.length"
      :for="name"
      class="label"
      >{{ label }}</label
    >
    <div class="mt-1 relative ">
      <input
        :type="type"
        :name="name"
        :id="name"
        :min="min"
        :max="max"
        :class="[
          'text-input block w-full pr-10 sm:text-sm rounded mt-3',
          {
            'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500':
              error,
          },
        ]"
        :placeholder="placeholder.length ? placeholder : name"
        :value="value"
        :aria-invalid="error"
        :aria-describedby="describedBy"
        @change="onChange"
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
    value: { type: [String, Number], required: true },
    placeholder: { type: String, default: "" },
    errorText: { type: String, default: "" },
    onChange: { type: Function, required: true },
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
