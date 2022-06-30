<template>
  <div>
    <InputField
      label="Name"
      name="name"
      type="text"
      :error-text="error(v$.cropData?.name)"
      :value="cropData.name"
      :onChange="setAttrValue"
    />
    <InputField
      label="Unit"
      name="unit"
      type="text"
      :error-text="error(v$.cropData?.unit)"
      :value="cropData.unit"
      :onChange="setAttrValue"
    />
    <span v-if="cropData.removal">
      <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Removal</h3>
      <InputField
        label="Boron Removal(grams per harvested unit)"
        name="b_ratio"
        type="number"
        :error-text="error(v$.cropData?.removal?.b_ratio)"
        :value="cropData.removal.b_ratio"
        :onChange="setRemovalValue"
      />
      <InputField
        label="Manganese Removal(grams per harvested unit)"
        name="mn_ratio"
        type="number"
        :error-text="error(v$.cropData?.removal?.mn_ratio)"
        :value="cropData.removal.mn_ratio"
        :onChange="setRemovalValue"
      />
      <InputField
        label="Copper Removal(grams per harvested unit)"
        name="cu_ratio"
        type="number"
        :error-text="error(v$.cropData?.removal?.cu_ratio)"
        :value="cropData.removal.cu_ratio"
        :onChange="setRemovalValue"
      />
      <InputField
        label="Zinc Removal(grams per harvested unit)"
        name="zn_ratio"
        type="number"
        :error-text="error(v$.cropData?.removal?.zn_ratio)"
        :value="cropData.removal.zn_ratio"
        :onChange="setRemovalValue"
      />
    </span>
    <span v-if="cropData.crop_procotes">
      <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">
        Procote Ratio
      </h3>
      <InputField
        v-for="cropProcote in crop?.attributes?.crop_procotes"
        :key="cropProcote.id"
        :label="procoteName(cropProcote.procote_id)"
        :name="`procote-${cropProcote.procote_id}`"
        type="number"
        :value="cropProcoteValue(cropProcote.procote_id).ratio"
        :onChange="
          (event) => setCropProcoteValue(event, cropProcote.procote_id)
        "
      />
    </span>
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
import { updateCrop } from "@/utils/services/index.js";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import { ErrorMixin } from "@/components/mixins/index.js";
export default {
  mixins: [ErrorMixin],
  props: {
    closeAction: { type: Function, default: () => {} },
    crop: { type: Object, required: true },
    procotes: { type: Array, required: () => [] },
  },
  components: { InputField },
  data() {
    return {
      cropData: this.crop.attributes,
      v$: useVuelidate(),
    };
  },
  methods: {
    cropProcoteValue(id) {
      return this.crop.attributes.crop_procotes.find(
        (cropProcote) => cropProcote.procote_id == id
      );
    },
    setCropProcoteValue(event, procote_id) {
      const index = this.cropData.crop_procotes.findIndex(
        (cropProcote) => cropProcote.procote_id == procote_id
      );
      this.cropData.crop_procotes[index].ratio = event.target.value;
    },
    setRemovalValue(event) {
      const { name, value } = event.target;
      this.cropData.removal[name] = value;
    },
    setAttrValue(event) {
      const { name, value } = event.target;
      this.cropData[name] = value;
    },

    procoteName(id) {
      return this.procotes.find((procote) => procote.id == id)?.attributes
        ?.name;
    },
    async saveFormValues() {
      const result = await this.v$.$validate();
      if (!result) {
        this.$toast.error("Validation Failed for the Form!");
        return;
      }
      updateCrop(this.crop.id, { crop: this.cropData }).then(() => {
        this.closeAction();
        this.v$.$reset();
        this.$toast.success("Crop Updated Successfully!");
      });
    },
  },
  validations() {
    return {
      cropData: {
        name: { required },
        unit: { required },
        removal: {
          b_ratio: requiredIf(this.cropData.removal),
          cu_ratio: requiredIf(this.cropData.removal),
          mn_ratio: requiredIf(this.cropData.removal),
          zn_ratio: requiredIf(this.cropData.removal),
        },
      },
    };
  },
};
</script>
