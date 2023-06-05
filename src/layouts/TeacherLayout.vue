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
import Navigation from "../components/teacher/TeacherNavigation.vue";
import Header from "../components/teacher/TeacherHeader.vue";

export default {
  name: "TeacherLayout",
  components: {
    Navigation,
    Header,
  },
};
</script>
<style src="../styles/BaseLayout.css" scoped></style>
