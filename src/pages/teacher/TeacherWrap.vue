<template>
  <TeacherLayout>
    <RouterView></RouterView>
  </TeacherLayout>
</template>
<script>
import TeacherLayout from "../../layouts/TeacherLayout.vue";
export default {
  name: "TeacherWrap",
  components: {
    TeacherLayout,
  },
};
</script>
