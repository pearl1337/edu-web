<script>
import CourseCard from "../../components/teacher/CourseCard.vue";
import MeetingCard from "../../components/teacher/TeacherMeetingCard.vue";
import { mapState, mapActions, mapGetters } from "pinia";
import { useCoursesStore } from "../../store/teacher/courses.js";
import { getTeacherCourses } from "../../services/Teacher/course.js";
import { getMeetings } from "@/api/teacher/course";

export default {
  name: "MainPage",
  computed: {
    ...mapState(useCoursesStore, ["courses", "coursesLoading"]),
    ...mapGetters(useCoursesStore, ["getNewCourses"]),
    sortedMeetings() {
      const data = [...this.meetings];

      return data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
  },
  data() {
    return {
      meetings: [],
    };
  },
  methods: {
    ...mapActions(useCoursesStore, ["setCourses", "setCoursesLoading"]),
    async getCourses() {
      this.setCoursesLoading(true);
      const response = await getTeacherCourses();
      this.setCourses(response.data);
      this.setCoursesLoading(false);
    },
    async fetchMeetings() {
      const meetings = await getMeetings();
      this.meetings = meetings;
    },
  },
  created() {
    this.getCourses();
    this.fetchMeetings();
  },
  components: {
    CourseCard,
    MeetingCard,
  },
};
</script>
<template>
  <div class="wrap">
    <div class="main-content">
      <div v-if="!coursesLoading">
        <div class="course-cards" v-if="getNewCourses.length">
          <CourseCard
            v-for="course in getNewCourses"
            :key="course.id"
            :course="course"
          />
        </div>
      </div>
      <div v-else>
        <va-progress-circle indeterminate />
      </div>
      <div>
        <h2 class="title">Заплановані заняття</h2>
        <div class="meetings-block">
          <MeetingCard
            v-for="meeting in sortedMeetings"
            :key="meeting.id"
            :meeting="meeting"
          />
        </div>
        <div class="empty-meetings" v-if="!meetings.length">
          <span>Немає занять</span>
        </div>
      </div>
    </div>
    <div class="chatbox">
      <h3>Повідомлення</h3>
      <div class="chatbox-content">
        <span style="color: gray">В розробці</span>
      </div>
    </div>
  </div>
</template>
<style src="../../styles/TeacherMainPage.css" scoped></style>
