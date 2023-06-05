<template>
  <div class="wrap">
    <va-progress-bar indeterminate v-if="loading" />
    <div class="main-content">
      <div class="content" v-if="!loading && task">
        <div class="text-block">
          <h1>Завдання ({{ taskDate }})</h1>
          <div class="answers-list">
            <router-link
              v-for="answer in task.taskAnswer"
              :key="answer.id"
              :to="{ name: 'Teacher.answer', params: { answerID: answer.id } }"
            >
              <div class="answer-item">
                <div class="answer-item__user">
                  <va-avatar size="small">{{
                    answer.student.name.substr(0, 1)
                  }}</va-avatar>
                  {{ answer.student.name }} {{ answer.student.surname }}
                </div>
                <div>
                  <va-chip color="gray" v-if="answer.mark == 0"
                    >Не перевірено</va-chip
                  >
                  <va-chip color="success" v-else-if="answer.mark == -1">
                    Перевірено
                  </va-chip>
                  <va-chip color="success" v-else
                    >{{ answer.mark }} бал.</va-chip
                  >
                </div>
              </div>
            </router-link>
          </div>
          <div v-if="!task.taskAnswer.length">
            <span>Немає робіт</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get as getTask } from "@/api/teacher/task";
import moment from "moment";

export default {
  name: "TaskPage",
  data() {
    return {
      loading: true,
      task: null,
    };
  },
  methods: {
    async loadTask() {
      this.loading = true;
      const { taskID } = this.$route.params;
      const response = await getTask(taskID);
      this.task = response;
    },
  },
  computed: {
    taskDate() {
      return moment(this.task.createdAt).format("DD.MM.yyyy");
    },
  },
  created() {
    this.loadTask().finally(() => {
      this.loading = false;
    });
  },
};
</script>
<style scoped>
.wrap {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
}
.main-content {
  margin: 0 auto;
  width: 1000px;
  padding-top: 30px;
}
.text-block h1 {
  font-size: 30px;
}
.answers-list {
  margin-top: 30px;
}
.answer-item {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
