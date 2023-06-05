<template>
  <StudentLayout>
    <RouterView v-slot="{ Component }">
      <transition name="fade"> <component :is="Component" /> </transition
    ></RouterView>
  </StudentLayout>
</template>
<script>
import StudentLayout from "../../layouts/StudentLayout.vue";
export default {
  name: "TeacherWrap",
  components: {
    StudentLayout,
  },
};
</script>
