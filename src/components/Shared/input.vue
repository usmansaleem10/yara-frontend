<template>
  <div :class="[{ 'range-wrap': type == 'range' }]">
    <label v-if="label && label.length" :for="name" class="block font-bold text-center text-xl mb-1 text-blue-900">{{
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
          'input-field',
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
input[type="range"] {
  -webkit-appearance: none;
  margin: 20px 0;
  width: 100%;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  animate: 0.2s;
  background: #03a9f4;
  border-radius: 25px;
}
input[type="range"]::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -8px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #03a9f4;
}
.range-wrap {
  width: 500px;
  position: relative;
}
.range-value {
  position: absolute;
  top: -50%;
}
.range-value span {
  width: 30px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background: #03a9f4;
  color: #fff;
  font-size: 12px;
  display: block;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 6px;
}
.range-value span:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 10px solid #03a9f4;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  margin-top: -1px;
}
</style>
