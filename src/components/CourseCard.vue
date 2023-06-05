<script>
export default {
  name: "CourseCard",
  props: {
    name: {
      required: true,
      type: String,
    },
  },
};
</script>
<template>
  <div class="course-card">
    <span class="course-card__name">{{ name }}</span>
    <div class="user-block">
      <div class="avatar">U</div>
      <span>User Name</span>
    </div>
  </div>
</template>
<style src="../styles/CourseCard.css" scoped></style>
