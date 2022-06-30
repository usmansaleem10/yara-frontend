<template>
  <div>
    <InputField
      label="Name"
      name="name"
      type="text"
      :error-text="error(v$.procoteData?.name)"
      :value="procoteData.name"
      :onChange="setAttrValue"
    />
    <InputField
      label="Density(Kg/l)"
      name="density"
      type="text"
      :error-text="error(v$.procoteData?.density)"
      :value="procoteData.density"
      :onChange="setAttrValue"
    />
    <InputField
      label="URL"
      name="url"
      type="text"
      :error-text="error(v$.procoteData?.url)"
      :value="procoteData.url"
      :onChange="setAttrValue"
    />
    <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">
      Analysis(g/ml)
    </h3>
    <InputField
      label="Boron Analysis(g/ml)"
      name="b_ratio"
      type="number"
      :error-text="error(v$.procoteData?.b_ratio)"
      :value="procoteData.b_ratio"
      :onChange="setAttrValue"
    />
    <InputField
      label="Manganese Analysis(g/ml)"
      name="mn_ratio"
      type="number"
      :error-text="error(v$.procoteData?.mn_ratio)"
      :value="procoteData.mn_ratio"
      :onChange="setAttrValue"
    />
    <InputField
      label="Zinc Analysis(g/ml)"
      name="zn_ratio"
      type="number"
      :error-text="error(v$.procoteData?.zn_ratio)"
      :value="procoteData.zn_ratio"
      :onChange="setAttrValue"
    />
    <InputField
      label="Copper Analysis(g/ml)"
      name="cu_ratio"
      type="number"
      :error-text="error(v$.procoteData?.cu_ratio)"
      :value="procoteData.cu_ratio"
      :onChange="setAttrValue"
    />
    <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Prices</h3>
    <InputField
      label="US Price"
      name="us_price"
      type="number"
      :error-text="error(v$.procoteData?.us_price)"
      :value="procoteData.us_price"
      :onChange="setAttrValue"
    />
    <InputField
      label="West Canada Price"
      name="west_canadian_price"
      type="number"
      :error-text="error(v$.procoteData?.west_canadian_price)"
      :value="procoteData.west_canadian_price"
      :onChange="setAttrValue"
    />
    <InputField
      label="East Canada Price"
      name="east_canadian_price"
      type="number"
      :error-text="error(v$.procoteData?.east_canadian_price)"
      :value="procoteData.east_canadian_price"
      :onChange="setAttrValue"
    />
  </div>
  <button
    @click="saveFormValues"
    type="button"
    class="ml-1 flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    Save
  </button>
</template>
<script>
import { InputField } from "@/components/Shared/index.js";
import { updateProcote } from "@/utils/services/index.js";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ErrorMixin } from "@/components/mixins/index.js";
export default {
  mixins: [ErrorMixin],
  props: {
    closeAction: { type: Function, default: () => {} },
    procote: { type: Object, required: true },
    procotes: { type: Array, required: () => [] },
  },
  components: { InputField },
  data() {
    return {
      procoteData: this.procote.attributes,
      v$: useVuelidate(),
    };
  },
  methods: {
    setAttrValue(event) {
      const { name, value } = event.target;
      this.procoteData[name] = value;
    },

    async saveFormValues() {
      const result = await this.v$.$validate();
      if (!result) {
        this.$toast.error("Validation Failed for the Form!");
        return;
      }
      updateProcote(this.procote.id, { procote: this.procoteData }).then(() => {
        this.closeAction();
        this.v$.$reset();
        this.$toast.success("Procote Updated Successfully!");
      });
    },
  },
  validations() {
    return {
      procoteData: {
        name: { required },
        density: { required },
        url: { required },
      },
    };
  },
};
</script>
