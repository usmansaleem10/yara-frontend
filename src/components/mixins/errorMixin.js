/* eslint-disable no-debugger */
export default {
  methods: {
    error(validationObject) {
      return validationObject?.$error ? "This Field is required" : "";
    },

    genericError(validationObject = null) {
      return validationObject.$error ? this.$t("errors.genericError") : "";
    },
  },
};
