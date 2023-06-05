<script>
import { VerifyUser } from "../services/User";
export default {
  name: "VerifyPage",
  async mounted() {
    const { key } = this.$route.params;

    const response = await VerifyUser(key);

    if (!response.success) {
      console.error(response.error);
      return;
    }

    this.$router.push({ name: "AppWrap" });
  },
};
</script>
<template>
  <div class="wrap"><va-inner-loading loading></va-inner-loading></div>
</template>
<style scoped>
.wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
