<template>
  <div :class="[{ slidecontainer: type == 'range' }]">
    <label v-if="label && label.length" :for="name" class="label">{{
      label
    }}</label>
    <div class="mt-1 relative">
      <input
        :type="type"
        :name="name"
        :id="name"
        :min="min"
        :max="max"
        step="0.5"
        :class="[
          'text-input block w-full pr-10 sm:text-sm rounded mt-3',
          {
            'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500':
              error,
          },
          { slider: type == 'range' },
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
<style scoped>
.slidecontainer {
  width: 100%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #04aa6d; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #04aa6d; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
