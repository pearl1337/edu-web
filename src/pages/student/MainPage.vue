<script>
import CourseCard from "../../components/student/CourseCard.vue";
import MeetingCard from "../../components/student/MeetingCard.vue";
import { getCourses, getMeetings } from "@/api/student/course";
import { mapState, mapActions, mapGetters } from "pinia";
import { useCoursesStore } from "../../store/student/courses.js";

export default {
  name: "MainPage",
  components: {
    CourseCard,
    MeetingCard,
  },
  computed: {
    ...mapState(useCoursesStore, ["courses", "coursesLoading"]),
    ...mapGetters(useCoursesStore, ["getNewCourses"]),
  },
  data() {
    return {
      meetings: [],
    };
  },
  methods: {
    ...mapActions(useCoursesStore, ["setCourses", "setCoursesLoading"]),
    async fetchCourses() {
      this.setCoursesLoading(true);
      const response = await getCourses();
      this.setCourses(response);
      this.setCoursesLoading(false);
    },
    async fetchMeetings() {
      const meetings = await getMeetings();
      this.meetings = meetings;
    },
  },
  created() {
    this.fetchCourses();
    this.fetchMeetings();
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
      <div>
        <h2 class="title">Заплановані заняття</h2>
        <div class="meetings-block">
          <MeetingCard
            v-for="meeting in meetings"
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
<style src="../../styles/MainPage.css" scoped></style>
