<template>
  <div class="wrapper">
    <Navigation />
    <div class="container">
      <Header />
      <div class="layout-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from "../components/TheNavigation.vue";
import Header from "../components/TheHeader.vue";

export default {
  name: "BaseLayout",
  components: {
    Navigation,
    Header,
  },
};
</script>
<style src="../styles/BaseLayout.css" scoped></style>
