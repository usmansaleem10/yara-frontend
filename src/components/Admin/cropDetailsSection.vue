<template>
  <div>
    <h3 class="font-medium text-gray-900">Information</h3>
    <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Name</dt>
        <dd class="text-gray-900">
          {{ crop?.attributes?.name }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Unit</dt>
        <dd class="text-gray-900">
          {{ crop?.attributes?.unit }}
        </dd>
      </div>
    </dl>
  </div>
  <div>
    <h3 class="font-medium text-gray-900">Removal</h3>
    <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Boron</dt>
        <dd class="text-gray-900">
          {{ crop?.attributes?.removal?.b_ratio }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Copper</dt>
        <dd class="text-gray-900">
          {{ crop?.attributes?.removal?.cu_ratio }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Magnesium</dt>
        <dd class="text-gray-900">
          {{ crop?.attributes?.removal?.mn_ratio }}
        </dd>
      </div>
      <div class="flex justify-between py-3 text-sm font-medium">
        <dt class="text-gray-500">Zinc</dt>
        <dd class="text-gray-900">
          {{ crop?.attributes?.removal?.zn_ratio }}
        </dd>
      </div>
    </dl>
  </div>
  <div>
    <h3 class="font-medium text-gray-900">Procote Ratios</h3>
    <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
      <div
        v-for="cropProcote in crop?.attributes?.crop_procotes"
        :key="cropProcote.id"
        class="flex justify-between py-3 text-sm font-medium"
      >
        <dt class="text-gray-500">
          {{ procoteName(cropProcote.procote_id) }}
        </dt>
        <dd class="text-gray-900">
          {{ cropProcote.ratio }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    crop: { type: Object, required: true },
    procotes: { type: Array, required: true },
  },
  methods: {
    procoteName(id) {
      return this.procotes.find((procote) => procote.id == id)?.attributes
        ?.name;
    },
  },
};
</script>
