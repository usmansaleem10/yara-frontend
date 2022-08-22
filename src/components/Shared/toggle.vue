<template>
  <div class="grid grid-flow-row auto-rows-max">
    <div class="bg-custom p-2 mb-2">
      <div class="block font-bold text-center text-xl text-blue-900">
        {{ details.heading }}
      </div>
    </div>
    <div class="text-center text-gray-500">
      Unit used for calculations: <span class="text-black">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    value: { type: String },
    options: { type: Array, required: true },
    details: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    enabled: {
      get: function () {
        return this.value == this.options[1];
      },
    },
  },
};
</script>
