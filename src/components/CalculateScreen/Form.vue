<template>
  <div class="flex flex-col space-y-3">
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
    <label class="block text-sm font-medium text-gray-700 mt-1">Procote</label>
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

    <InputField
      label="Yield"
      name="yieldValue"
      type="number"
      :value="formValues.yieldValue"
      :onChange="setAttrValue"
    />
    <InputField
      label="Dry Fertilizer Rate"
      name="dfRate"
      type="number"
      :value="formValues.dfRate"
      :onChange="setAttrValue"
    />
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import { InputField } from "@/components/Shared/index.js";
import { cropList, procoteList } from "@/utils/services/index.js";
export default {
  props: {
    formValues: { type: Object, default: () => {} },
    setAttrValue: { type: Function, required: true },
  },
  components: { Multiselect, InputField },
  data() {
    return {
      procotes: [],
      crops: [],
    };
  },
  computed: {
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
  mounted() {
    if (!this.procotes.length || !this.crops.length) this.getDropdownValues();
  },
  methods: {
    getDropdownValues() {
      Promise.all([cropList(), procoteList()]).then(([crops, procotes]) => {
        this.crops = crops.data;
        this.procotes = procotes.data;
      });
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
