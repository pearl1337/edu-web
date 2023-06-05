<script>
import { join } from "@/api/student/course.js";
export default {
  name: "JoinCourse",
  methods: {
    async joinCourse() {
      try {
        const response = await join(this.$route.params.courseID);
        this.$vaToast.init({
          message: `Ви успішно приєднались до курсу`,
          color: "success",
        });
      } catch {
        this.$vaToast.init({
          message: `Не вдалося приєднатись`,
          color: "danger",
        });
      } finally {
        this.$router.push({ name: "AppWrap" });
      }
    },
  },
  created() {
    this.joinCourse();
  },
};
</script>
<template>
  <div></div>
</template>
