<script>
import { mapState, mapActions, mapGetters } from "pinia";
import { useCoursesStore } from "../../store/teacher/courses.js";
import { getCourses } from "@/api/student/course";
import CoursesTable from "@/components/student/CoursesTable.vue";
export default {
  name: "StudentCourses",
  components: {
    CoursesTable,
  },
  computed: {
    ...mapState(useCoursesStore, ["courses", "coursesLoading"]),
    ...mapGetters(useCoursesStore, ["getSortedCourses"]),
  },
  methods: {
    ...mapActions(useCoursesStore, ["setCourses", "setCoursesLoading"]),
    async getStudentsCourses() {
      this.setCoursesLoading(true);
      const response = await getCourses();
      this.setCourses(response);
      this.setCoursesLoading(false);
    },
  },
  created() {
    this.getStudentsCourses();
  },
};
</script>
<template>
  <div class="wrap">
    <div class="main-content" v-if="$route.name === 'Student.courses'">
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
<style src="../../styles/MainPage.css" scoped></style>
<style src="../../styles/CoursesPageTeacher.css" scoped></style>
