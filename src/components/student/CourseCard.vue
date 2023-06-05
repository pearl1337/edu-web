<script>
import { RouterLink } from "vue-router";
import { fetchUserInfo } from "@/api/User";

export default {
  name: "CourseCard",
  data() {
    return {
      isLoading: true,
      user: {},
    };
  },
  props: {
    course: {
      required: true,
    },
  },
  components: { RouterLink },
  methods: {
    async getTeacherInfo() {
      const user = await fetchUserInfo(this.course.authorId);
      this.user = user;
      this.isLoading = false;
    },
  },
  created() {
    this.getTeacherInfo();
  },
};
</script>
<template>
  <RouterLink :to="{ name: 'Student.course', params: { courseID: course.id } }">
    <div class="course-card">
      <span class="course-card__name">{{ course.name }}</span>
      <div class="user-block" v-if="!isLoading">
        <div class="avatar">{{ user.name.substr(0, 1) }}</div>
        <span>{{ user.name }} {{ user.surname }}</span>
      </div>
    </div>
  </RouterLink>
</template>
<style src="../../styles/CourseCard.css" scoped></style>
