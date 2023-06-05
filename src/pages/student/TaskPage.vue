<template>
  <div class="wrap">
    <div class="popup-wrap">
      <va-modal v-model="isTextAnswerOpen" hide-default-actions fullscreen>
        <QuillEditor v-model:content="content" content-type="html" />
        <template #footer>
          <va-button @click="isTextAnswerOpen = false"> Зберегти </va-button>
        </template>
      </va-modal>
    </div>
    <div class="popup-wrap">
      <va-modal v-model="isFilesPopupOpen" blur cancelText="Відмінити"
        ><va-file-upload
          v-model="files"
          dropzone
          upload-button-text="Завантажити файли"
          drop-zone-text="Перенесіть сюди файли або"
      /></va-modal>
    </div>
    <div class="main-content">
      <va-inner-loading :loading="loading">
        <div class="content" v-if="!loading">
          <div class="text-block">
            <h1>Завдання ({{ taskDate }})</h1>
            <div>
              {{ task.authorName }} {{ task.authorLastName }} •
              {{ taskTextDate }}.
            </div>
            <div>
              <p class="task-text">
                {{ task.name }}
              </p>
            </div>
          </div>
          <div class="actions-wrap">
            <div class="actions-block" v-if="studentAnswer?.mark">
              <va-chip color="success" v-if="studentAnswer.mark == -1"
                >Перевірено</va-chip
              >
              <va-chip color="success" v-else
                >{{ studentAnswer.mark }} бал.</va-chip
              >
            </div>
            <div class="actions-block" v-if="!studentAnswer">
              <h3>Ваша робота</h3>
              <div class="action-block__buttons">
                <va-button @click="isFilesPopupOpen = true"
                  >Додати файли</va-button
                >
                <va-button color="warning" @click="isTextAnswerOpen = true">
                  Текстове повідомлення
                </va-button>
              </div>
            </div>
            <div
              class="actions-block"
              v-if="
                (files.length ||
                  content.replace(/<\/?[^>]+>/g, '').length != 0) &&
                !task.taskAnswer.length
              "
            >
              <h3>Додано:</h3>
              <div class="files-block">
                <div
                  class="messageChip"
                  @click="isTextAnswerOpen = true"
                  v-if="content.replace(/<\/?[^>]+>/g, '').length != 0"
                >
                  <va-icon name="mail" color="#FFAC0A"></va-icon>
                  <span>Повідомлення</span>
                </div>
                <File
                  v-for="(file, index) in files"
                  :key="index"
                  :file="file"
                  @remove="removeFile"
                />
              </div>

              <div class="action-block__buttons">
                <va-button
                  @click="pass"
                  border-color="primary"
                  preset="secondary"
                >
                  Здати роботу
                </va-button>
              </div>
            </div>
            <div class="actions-block" v-if="studentAnswer">
              <h3>Додано:</h3>
              <div class="files-block">
                <div class="messageChip" v-if="studentAnswer.text.length">
                  <va-icon name="mail" color="#FFAC0A"></va-icon>
                  <span>Повідомлення</span>
                </div>
                <File
                  v-for="(file, index) in studentAnswer.File"
                  :key="index"
                  :file="file"
                  staticItem
                />
              </div>
            </div>
          </div>
        </div>
      </va-inner-loading>
    </div>
  </div>
</template>
<script>
import { get as getTask } from "@/api/student/task";
import moment from "moment";
import File from "@/components/UI/FileItem.vue";
import { postAnswer } from "@/api/student/task";
import { GetUserInfo } from "@/api/User";
export default {
  name: "TaskPage",
  data() {
    return {
      loading: true,
      task: null,
      isTextAnswerOpen: false,
      isFilesPopupOpen: false,
      content: "",
      files: [],
    };
  },
  components: {
    File,
  },
  methods: {
    async fetchTask(taskID) {
      const task = await getTask(taskID);
      this.task = task;
    },
    removeFile(file) {
      const id = this.getFileID(file);
      const files = this.files.filter((f) => this.getFileID(f) != id);
      this.files = files;
    },
    getFileID(file) {
      return file.name + file.size + file.lastModified;
    },
    async pass() {
      try {
        const { taskID } = this.$route.params;
        this.loading = true;
        const response = await postAnswer({
          files: this.files,
          taskID,
          text: this.content,
        });
        this.task = response;
      } catch (error) {
        this.$vaToast.init({ message: error.message, color: "danger" });
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    taskDate() {
      return moment(this.task.createdAt).format("DD.MM.yyyy");
    },
    taskTextDate() {
      return moment(this.task.createdAt).locale("uk").format("DD MMM");
    },
    studentAnswer() {
      const { sub } = GetUserInfo();
      const studentAnswer = this.task.taskAnswer.find(
        (a) => a.studentId == sub,
      );
      return studentAnswer;
    },
  },
  created() {
    const { taskID } = this.$route.params;
    this.fetchTask(taskID).then(() => (this.loading = false));
  },
};
</script>
<style src="../../styles/StudentTaskPage.css" scoped></style>
