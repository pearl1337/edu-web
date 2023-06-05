<template>
  <div class="wrap">
    <va-progress-bar indeterminate v-if="loading" />
    <div class="main-content">
      <div class="content" v-if="!loading && answer">
        <div class="header">
          <h1>{{ answer.student.name }} {{ answer.student.surname }}</h1>
          <div class="mark-block" v-if="answer.mark == 0">
            <va-button size="small" @click="sendMark(-1)">
              Позначити як перевірене
            </va-button>
            <span>або</span>
            <div class="mark-input-block">
              <va-input
                placeholder="Оцінка"
                type="number"
                min="1"
                max="12"
                v-model="mark"
              ></va-input>
              <va-button
                size="small"
                :disabled="!isValidMark"
                @click="sendMark(mark)"
                >Відправити</va-button
              >
            </div>
          </div>
          <div v-else-if="answer.mark == -1">
            <va-chip color="success">Перевірено</va-chip>
          </div>
          <div v-else>
            <va-chip color="success">{{ answer.mark }} бал.</va-chip>
          </div>
        </div>
        <div class="text-block">
          <div v-html="answer.text"></div>
        </div>
        <div class="files" v-if="answer.File.length">
          <div class="files-header">
            <h3>Вкладені файли:</h3>
            <va-button size="small" @click="downloadAll">Завантажити</va-button>
          </div>
          <div class="files-block">
            <FileItem
              v-for="file in answer.File"
              :key="file.id"
              :file="file"
              :canDelete="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAnswer, setMark } from "@/api/teacher/task";
import { downloadFiles } from "@/api/File";
import FileItem from "@/components/UI/FileItem.vue";
export default {
  name: "AnswerPage",
  components: {
    FileItem,
  },
  data() {
    return {
      loading: true,
      answer: null,
      mark: "",
    };
  },
  methods: {
    async loadAnswer() {
      this.loading = true;
      const { answerID } = this.$route.params;
      const data = await getAnswer(answerID);
      this.answer = data;
      this.loading = false;
    },
    downloadAll() {
      const { answerID } = this.$route.params;
      const name = `${this.answer.student.name}_${this.answer.student.surname}_${this.answer.createdAt}`;
      downloadFiles(answerID, name);
    },
    async sendMark(mark) {
      this.loading = true;
      const { answerID } = this.$route.params;
      const data = await setMark(answerID, +mark);
      this.answer.mark = data.mark;
      this.loading = false;
    },
  },
  computed: {
    isValidMark() {
      if (!this.mark) {
        return false;
      }
      return this.mark > 0 && this.mark <= 12;
    },
  },
  created() {
    this.loadAnswer();
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
}
.files-block {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
}
.files-header {
  display: flex;
  justify-content: space-between;
}
.files {
  margin-top: 50px;
}
.text-block {
  margin-top: 50px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header > h1 {
  font-size: 24px;
}
.mark-block {
  display: flex;
  align-items: center;
  gap: 10px;
}
.mark-block span {
  font-size: 12px;
  color: gray;
}
.mark-input-block {
  display: flex;
}
.va-input-wrapper {
  width: 100px !important;
}
</style>
