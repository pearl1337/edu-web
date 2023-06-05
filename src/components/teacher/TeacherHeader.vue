<script>
import UserLabel from "../UserLabel.vue";
import { createCourse } from "../../services/Teacher/course.js";
import { mapActions } from "pinia";
import { useCoursesStore } from "../../store/teacher/courses.js";
import { GetUserInfo, Logout } from "@/api/User";
export default {
  data() {
    return {
      isCourseModalOpen: false,
      courseName: "",
    };
  },
  components: {
    UserLabel,
  },
  computed: {
    userData() {
      return GetUserInfo();
    },
  },
  methods: {
    ...mapActions(useCoursesStore, ["addCourse"]),
    closeCourseModal() {
      this.isCourseModalOpen = false;
      this.courseName = "";
    },
    async create() {
      const response = await createCourse({
        name: this.courseName,
      });
      if (!response.success) {
        this.$vaToast.init({
          message: "Невдалося створити курс :( " + response.data,
          color: "danger",
        });
      } else {
        this.addCourse(response.data);
        this.closeCourseModal();
        this.$vaToast.init({
          message: `Курс  ${response.data.name} успішно створений`,
          color: "success",
        });
      }
    },
    logout() {
      Logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<template>
  <header class="header">
    <va-modal
      v-model="isCourseModalOpen"
      blur
      cancelText="Відмінити"
      noDismiss
      hide-default-actions
    >
      <template #header>
        <h2>Створити курс</h2>
      </template>
      <va-form class="modal-form">
        <va-input
          class="mb-4"
          v-model="courseName"
          placeholder="Назва (предмет, клас, група)"
        />
      </va-form>
      <template #footer>
        <button class="light-button" @click="closeCourseModal">
          Відмінити
        </button>
        <va-button class="ml-4" @click="create" :disabled="!courseName">
          Створити
        </va-button>
      </template>
    </va-modal>

    <div class="header__content">
      <UserLabel :name="userData.name" :surname="userData.surname" />
      <button class="light-button" @click="isCourseModalOpen = true">
        Створити курс
      </button>
      <button class="light-button" @click="logout">Вийти з акаунту</button>
    </div>
  </header>
</template>
<style src="../../styles/Header.css" scoped></style>
