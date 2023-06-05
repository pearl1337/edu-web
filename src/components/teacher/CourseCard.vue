<script>
import { RouterLink } from "vue-router";

export default {
  name: "CourseCard",
  props: {
    course: {
      required: true,
    },
  },
  components: { RouterLink },
};
</script>
<template>
  <RouterLink :to="{ name: 'Teacher.course', params: { courseID: course.id } }">
    <div class="course-card">
      <span class="course-card__name">{{ course.name }}</span>
    </div>
  </RouterLink>
</template>
<style src="../../styles/CourseCard.css" scoped></style>
