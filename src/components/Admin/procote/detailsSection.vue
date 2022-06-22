<template>
  <div>
    <h3 class="font-medium text-gray-900">Information</h3>
    <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Crop</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.name }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Density</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.density }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Manganese Ratio</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.mn_ratio }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Zinc Ratio</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.zn_ratio }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Copper Ratio</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.cu_ratio }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Boron Ratio</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.b_ratio }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">US Price</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.us_price }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">East Canada Price</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.east_canadian_price }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">West Canada Price</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.west_canadian_price }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">URL</dt>
        <dd class="text-gray-900">
          {{ procote?.attributes?.url }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    procote: { type: Object, required: true },
  },
};
</script>
