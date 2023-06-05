<script>
import {
  createTask,
  getData,
  createAdvert,
  createMeeting,
} from "@/api/teacher/course.js";
import TaskItem from "../../components/TaskItem.vue";
import AdvertItem from "../../components/AdvertItem.vue";
import MeetingItem from "../../components/MeetingItem.vue";
import ListItemIcon from "@/components/UI/ListItemIcon.vue";
import { buildURL } from "@/services/url";
import UsersTable from "@/components/UsersTable.vue";
export default {
  name: "CoursePage",
  components: {
    TaskItem,
    AdvertItem,
    MeetingItem,
    ListItemIcon,
    UsersTable,
  },
  data() {
    return {
      tab: 0,
      tabs: ["Потік", "Учасники"],
      actionTab: "Додати завдання",
      actionTabs: [
        "Додати завдання",
        "Додати оголошення",
        "Запланувати зустріч",
      ],
      taskValidation: null,
      advertValidation: null,
      meetingValidation: null,
      createTaskInput: "",
      deadLine: null,
      tasks: [],
      adverts: [],
      meetings: [],
      course: {},
      loading: true,
      advertInput: "",
      meetingName: "",
      meetingLink: "",
      meetingTime: "",
      meetingDate: null,
      deletePopup: false,
      members: [],
    };
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
    courseID() {
      return this.$route.params.courseID;
    },
  },
  methods: {
    async newTask() {
      this.$refs.createForm.validate();

      if (this.taskValidation) {
        const task = await createTask(
          this.createTaskInput,
          this.deadLine,
          this.$route.params.courseID,
        );
        this.createTaskInput = "";
        this.tasks.push(task);
      }
    },

    async newAdvert() {
      this.$refs.advertForm.validate();

      if (
        this.advertValidation &&
        this.advertInput.replace(/<\/?[^>]+>/g, "") !== ""
      ) {
        const advert = await createAdvert(
          this.$route.params.courseID,
          this.advertInput,
        );
        this.advertInput = "";
        this.adverts.push(advert);
      }
    },

    async newMeeting() {
      this.$refs.meetingForm.validate();

      if (this.meetingValidation) {
        const meeting = await createMeeting({
          name: this.meetingName,
          courseId: this.$route.params.courseID,
          startsAtTime: this.meetingTime,
          startsAt: this.meetingDate,
          volume: "45",
          link: this.meetingLink,
        });
        this.meetingName = "";
        this.meetingLink = "";
        this.meetingDate = "";
        this.meetingTime = "";
        this.meetings.push(meeting);
      }
    },

    async getCourseData(id) {
      const data = await getData(id);
      this.tasks = data.tasks;
      this.course = data.course;
      this.adverts = data.adverts;
      this.meetings = data.meetings;
      this.members = data.members;
      this.loading = false;
    },

    async deleteCourse() {
      alert("Поки давайте уявимо що його більше нема :)");
      this.toggleDeleteCoursePopup();
    },

    async addMembers() {
      const url = buildURL(`/app/student/join/${this.courseID}`);
      await navigator.clipboard.writeText(url.href);
      this.$vaToast.init({
        message: `Посилання на курс скопійовано`,
        color: "success",
      });
    },
    toggleDeleteCoursePopup() {
      this.deletePopup = !this.deletePopup;
    },
  },
  created() {
    this.getCourseData(this.courseID);
  },
};
</script>
<template>
  <div class="wrap">
    <div class="popup-wrap">
      <va-modal v-model="deletePopup" no-padding>
        <template #content="{ ok }">
          <va-card-title>
            <h2 class="mh-1">Ви дійсно хочете видалити курс?</h2>
          </va-card-title>
          <va-card-content>
            <span>Всі матеріали будуть видалені назавжди</span>
          </va-card-content>
          <va-card-actions>
            <va-button @click="deleteCourse" color="danger">Видалити</va-button>
            <va-button @click="ok" color="info">Закрити</va-button>
          </va-card-actions>
        </template>
      </va-modal>
    </div>
    <div class="main-content" v-if="!loading">
      <div class="course-header">
        <div class="course-header__top-menu">
          <va-button-dropdown preset="" class="mr-2 mb-2" hide-icon>
            <template #label>
              <va-icon name="menu" />
            </template>
            <ul>
              <ListItemIcon icon="delete" @click="toggleDeleteCoursePopup"
                >Видалити курс</ListItemIcon
              >
            </ul>
          </va-button-dropdown>
        </div>
        <div class="course-header__actions">
          <h1 class="title">{{ course.name }}</h1>
          <button @click="addMembers">Додати учасників</button>
        </div>
      </div>
      <va-tabs v-model="tab" center>
        <template #tabs>
          <va-tab v-for="tab in tabs" :key="tab">
            {{ tab }}
          </va-tab>
        </template>
      </va-tabs>
      <div v-if="tab === 0">
        <div class="add-block">
          <va-tabs v-model="actionTab" vertical>
            <template #tabs>
              <va-tab v-for="title in actionTabs" :name="title" :key="title">
                {{ title }}
              </va-tab>
            </template>
          </va-tabs>
          <div v-if="actionTab === actionTabs[0]" class="tabs-content">
            <div class="create-task-block">
              <va-avatar>M</va-avatar>
              <va-form
                @validation="taskValidation = $event"
                @submit.prevent="newTask"
                ref="createForm"
              >
                <va-input
                  class="mb-4"
                  type="textarea"
                  placeholder="Завдання"
                  autosize
                  :min-rows="3"
                  :max-rows="5"
                  v-model="createTaskInput"
                  :rules="[
                    (value) =>
                      (value && value.length > 0) || 'Обов\'я зкове поле',
                  ]"
                />
                <va-date-input placeholder="Термін" v-model="deadLine" />
                <va-button class="ml-3" @click="newTask">Створити</va-button>
              </va-form>
            </div>
          </div>
          <div v-if="actionTab === actionTabs[1]" class="tabs-content">
            <div class="create-task-block advert-block">
              <va-avatar>M</va-avatar>
              <va-form
                @validation="advertValidation = $event"
                @submit.prevent="newTask"
                ref="advertForm"
              >
                <!-- <va-input
                  class="mb-4"
                  type="textarea"
                  placeholder="Оголошення"
                  autosize
                  :min-rows="3"
                  :max-rows="5"
                  v-model="advertInput"
                  :rules="[
                    (value) =>
                      (value && value.length > 0) || 'Обов\'я зкове поле',
                  ]"
                /> -->
                <QuillEditor
                  v-model:content="advertInput"
                  content-type="html"
                  :toolbar="['bold', 'italic', 'underline', 'strike', 'link']"
                />
                <va-button @click="newAdvert" style="margin-top: 10px"
                  >Додати</va-button
                >
              </va-form>
            </div>
          </div>
          <div v-if="actionTab === actionTabs[2]" class="tabs-content">
            <div class="create-task-block">
              <va-avatar>M</va-avatar>
              <va-form
                @validation="meetingValidation = $event"
                @submit.prevent="newTask"
                ref="meetingForm"
              >
                <va-input
                  class="mb-4"
                  placeholder="Назва"
                  autosize
                  :min-rows="3"
                  :max-rows="5"
                  v-model="meetingName"
                  :rules="[
                    (value) =>
                      (value && value.length > 0) || 'Обов\'я зкове поле',
                  ]"
                />
                <va-input
                  class="mb-4"
                  placeholder="Посилання на зустріч"
                  autosize
                  :min-rows="3"
                  :max-rows="5"
                  v-model="meetingLink"
                  :rules="[
                    (value) =>
                      (value && value.length > 0) || 'Обов\'я зкове поле',
                  ]"
                />
                <va-time-input
                  placeholder="Час початку"
                  v-model="meetingTime"
                  :rules="[(value) => value || 'Обов\'я зкове поле']"
                />
                <va-date-input
                  placeholder="Дата початку"
                  class="ml-3"
                  v-model="meetingDate"
                  :rules="[(value) => value || 'Обов\'я зкове поле']"
                />
                <va-button @click="newMeeting" class="ml-3"
                  >Запланувати</va-button
                >
              </va-form>
            </div>
          </div>
        </div>
        <div class="add-block">
          <div class="content-gap"></div>
          <div class="tasks-block">
            <template v-for="item in sortedData" :key="item.id">
              <TaskItem v-if="item.type === 'TASK'" :task="item"></TaskItem>
              <AdvertItem
                v-if="item.type === 'ADVERT'"
                :advert="item"
              ></AdvertItem>
              <MeetingItem
                v-if="item.type === 'MEETING'"
                :meeting="item"
              ></MeetingItem>
            </template>
          </div>
        </div>
      </div>
      <div v-if="tab === 1">
        <UsersTable :users="members" />
      </div>
    </div>
  </div>
</template>
<style src="../../styles/CoursePage.css" scoped></style>
