<template>
  <div class="flex flex-col space-y-3">
    <label class="label">Crop</label>

    <Multiselect
      v-model="crop"
      :mode="'single'"
      :searchable="true"
      :options="cropDropDownValues"
      placeholder="Please select Crop"
      :canClear="false"
      :value-prop="'id'"
      :label="'name'"
      :track-by="'name'"
      :object="true"
    />

    <InputField
      label="Yield"
      name="yieldValue"
      type="number"
      :value="formValues.yieldValue"
      :onChange="setAttrValue"
      :class="text - input"
    />
    <InputField
      label="Dry Fertilizer Rate"
      name="dfRate"
      type="number"
      :value="formValues.dfRate"
      :onChange="setAttrValue"
    />
    <label class="block text-sm font-medium text-gray-700 mt-1">Procote</label>
    <Multiselect
      v-model="procote"
      :mode="'single'"
      :searchable="true"
      :options="procoteDropDownValues"
      placeholder="Please select Procote"
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
        procote.label = this.procoteLabel(procote.name);
        return procote;
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
<style src="@vueform/multiselect/themes/default.css"></style>
