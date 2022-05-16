<template>
  <Calculator />
</template>

<script>
import { Calculator } from "@/components/index";

export default {
  name: "App",
  components: {
    Calculator,
  },
};
</script>
<style>
body {
  @apply bg-blue-50;
}
</style>
