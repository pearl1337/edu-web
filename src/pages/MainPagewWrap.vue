<template>
  <BaseLayout>
    <RouterView></RouterView>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../layouts/BaseLayout.vue";
export default {
  name: "MainPage",
  components: {
    BaseLayout,
  },
};
</script>
