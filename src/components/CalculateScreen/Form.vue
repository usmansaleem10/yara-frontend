<template>
  <div class="flex flex-col space-y-3">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block font-bold text-center text-xl mb-1 text-blue-900">Crop</label>

        <Multiselect
          v-model="crop"
          :mode="'single'"
          :searchable="true"
          :options="cropDropDownValues"
          placeholder="Select Crop"
          :canClear="false"
          :value-prop="'id'"
          :track-by="'name'"
          :label="'name'"
          :object="true"
        >
          <template #option="{ option }">
            {{ option.name }} ({{ option.unit }})
          </template>
        </Multiselect>

        <InputField
        label="Yield"
        name="yieldValue"
        type="number"
        :value="formValues.yieldValue"
        :onChange="setAttrValue"
        class="mt-3"
      />
      </div>
      <div>
        <img width="100" class="mx-auto" src="https://brandeps.com/logo-download/Y/Yara-logo-vector-01.svg" alt="logo">
      </div>
    </div>
    <span>
      <InputField
        label="Dry Fertilizer Rate"
        name="dfRate"
        type="number"
        :value="formValues.dfRate"
        :onChange="setAttrValue"
      />
    </span>
    <label class="block font-bold text-center text-xl mb-1 text-blue-900">YaraVita PROCOTE</label>
    <Multiselect
      v-model="procote"
      :mode="'single'"
      :searchable="true"
      :options="procoteDropDownValues"
      placeholder="Select Procote"
      :canClear="false"
      :value-prop="'id'"
      :label="'label'"
      :track-by="'name'"
      :object="true"
    />
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { InputField } from "@/components/Shared/index.js";
import { ApiCallMixin } from "@/components/mixins";
export default {
  mixins: [ApiCallMixin],
  props: {
    formValues: { type: Object, default: () => {} },
    setAttrValue: { type: Function, required: true },
  },
  components: { Multiselect, InputField },
  computed: {
    procoteDropDownValues() {
      return this.procotes.map((procote) => {
        return {
          id: procote.id,
          label: this.procoteLabel(procote.attributes.name),
        };
      });
    },
    cropDropDownValues() {
      if (!this.crops.length) return [];

      return this.crops.map((crop) => {
        return {
          id: crop.id,
          name: crop.attributes.name,
          unit: crop.attributes.unit,
        };
      });
    },
    crop: {
      get() {
        return this.formValues.crop;
      },
      set(value) {
        const event = {
          target: {
            name: "crop",
            value: value,
          },
        };
        this.setAttrValue(event);
      },
    },
    procote: {
      get() {
        return this.formValues.procote;
      },
      set(value) {
        const event = {
          target: {
            name: "procote",
            value: value,
          },
        };
        this.setAttrValue(event);
      },
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css">
</style>
