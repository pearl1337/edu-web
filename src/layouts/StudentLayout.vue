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
import Navigation from "../components/student/StudentNavigation.vue";
import Header from "../components/student/StudentHeader.vue";

export default {
  name: "StudentLayout",
  components: {
    Navigation,
    Header,
  },
};
</script>
<style src="../styles/BaseLayout.css" scoped></style>
