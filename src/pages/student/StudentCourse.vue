<script>
import TaskItem from "../../components/student/TaskItem.vue";
import AdvertItem from "../../components/student/AdvertItem.vue";
import MeetingItem from "../../components/student/MeetingItem.vue";
import { getData } from "@/api/teacher/course.js";
export default {
  name: "StudentCourse",
  data() {
    return {
      tasks: [],
      adverts: [],
      meetings: [],
      course: {},
    };
  },
  components: {
    TaskItem,
    AdvertItem,
    MeetingItem,
  },
  computed: {
    sortedData() {
      const adverts = this.adverts.map((item) => {
        return {
          ...item,
          type: "ADVERT",
        };
      });

      const tasks = this.tasks.map((item) => {
        return {
          ...item,
          type: "TASK",
        };
      });

      const meetings = this.meetings.map((item) => {
        return {
          ...item,
          type: "MEETING",
        };
      });

      const data = [...adverts, ...tasks, ...meetings];

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
  },
  methods: {
    async getCourseData(id) {
      const data = await getData(id);
      this.tasks = data.tasks;
      this.course = data.course;
      this.adverts = data.adverts;
      this.meetings = data.meetings;
      this.loading = false;
    },
  },
  created() {
    this.getCourseData(this.$route.params.courseID);
  },
};
</script>
<template>
  <div class="wrap">
    <div class="main-content" v-if="!loading">
      <div class="course-header" style="flex-direction: column-reverse">
        <div class="course-header__actions">
          <h1 class="title">{{ course.name }}</h1>
        </div>
      </div>
      <div class="tasks-block">
        <template v-for="item in sortedData" :key="item.id">
          <TaskItem v-if="item.type === 'TASK'" :task="item"></TaskItem>
          <AdvertItem v-if="item.type === 'ADVERT'" :advert="item"></AdvertItem>
          <MeetingItem
            v-if="item.type === 'MEETING'"
            :meeting="item"
          ></MeetingItem>
        </template>
      </div>
      <div v-if="!sortedData.length">
        <p class="noTasks">Ще немає завдань</p>
      </div>
    </div>
  </div>
</template>
<style src="../../styles/CoursePage.css" scoped></style>
