<template>
  <div class="bg-logo">
    <div v-if="loading">Loading</div>
    <div v-else class="flex flex-col space-y-3">
      <label class="block text-sm font-medium text-gray-700 mt-1">Crop</label>

      <Multiselect
        v-model="crop"
        :mode="'single'"
        :searchable="true"
        :options="crops"
        placeholder="Please select Crop"
        :canClear="false"
        :value-prop="'id'"
        :label="'name'"
        :track-by="'name'"
        :object="true"
      />
      <label class="block text-sm font-medium text-gray-700 mt-1"
        >Procote</label
      >
      <Multiselect
        v-model="procote"
        :mode="'single'"
        :searchable="true"
        :options="procotes"
        placeholder="Please select Procote"
        :canClear="false"
        :value-prop="'id'"
        :label="'name'"
        :track-by="'name'"
        :object="true"
      />

      <InputField label="Yield" name="yield" type="number" value="85" />
      <InputField
        label="Dry Fertilizer Rate"
        name="dry-fertilizer-rate"
        type="number"
        value="150"
      />
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center">
        <span class="px-2 bg-white text-sm text-gray-500"> Graph </span>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { InputField } from "@/components/Shared/index.js";
import { cropList, procoteList } from "@/utils/services/index.js";
export default {
  components: { Multiselect, InputField },
  data() {
    return {
      loading: false,
      procotes: [],
      procote: null,
      crops: [],
      crop: null,
    };
  },
  mounted() {
    this.getDropdownValues();
  },
  methods: {
    getDropdownValues() {
      this.loading = true;
      Promise.all([cropList(), procoteList()])
        .then(([crops, procotes]) => {
          this.crops = crops.data;
          this.crop = crops.data[0];
          this.procotes = procotes.data;
          this.procote = procotes.data[0];
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
