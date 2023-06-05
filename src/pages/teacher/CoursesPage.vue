<script>
import { mapState, mapActions, mapGetters } from "pinia";
import { useCoursesStore } from "../../store/teacher/courses.js";
import { getTeacherCourses } from "../../services/Teacher/course.js";
import CoursesTable from "@/components/teacher/CoursesTable.vue";
export default {
  name: "TeacherCourses",
  components: {
    CoursesTable,
  },
  computed: {
    ...mapState(useCoursesStore, ["courses", "coursesLoading"]),
    ...mapGetters(useCoursesStore, ["getSortedCourses"]),
  },
  methods: {
    ...mapActions(useCoursesStore, ["setCourses", "setCoursesLoading"]),
    async getCourses() {
      this.setCoursesLoading(true);
      const response = await getTeacherCourses();
      this.setCourses(response.data);
      this.setCoursesLoading(false);
    },
  },
  created() {
    this.getCourses();
  },
};
</script>
<template>
  <div class="wrap">
    <div class="main-content" v-if="$route.name === 'Teacher.courses'">
      <h1>Мої курси</h1>
      <div v-if="getSortedCourses.length">
        <CoursesTable :courses="getSortedCourses" />
      </div>
      <div v-else class="mt-5">
        <p>Курсів не знайдено</p>
      </div>
    </div>
    <div v-else>
      <RouterView></RouterView>
    </div>
  </div>
</template>
<style src="../../styles/CoursesPageTeacher.css" scoped></style>
