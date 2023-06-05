<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { reactive, ref } from "vue";
import { IsEmailExists, SendVerifyMail } from "../services/User/index";
import { useToast } from "vuestic-ui";
import { ROLE } from "../types/";
import { useRouter } from "vue-router";

const router = useRouter();
const schema = yup.object({
  email: yup.string().required().email(),
  name: yup.string().required().min(3),
  lastname: yup.string().required().min(3),
  password: yup.string().required().min(8),
});

const TABS = {
  LOGIN: "LOGIN",
  ROLE: "ROLE",
  MESSAGE: "MESSAGE",
};

const { init } = useToast();

const error = reactive({ message: "" });
const tab = ref(TABS.LOGIN);
const isLoading = ref(true);
let formData = {};

async function onSubmit(values) {
  if (values.repeatpassword !== values.password) {
    error.message = "Паролі мають співпадати";
    return;
  }

  const response = await IsEmailExists(values.email.trim());

  if (!response.success) {
    init({ message: "Error", position: "top-right", color: "danger" });
  }

  if (response.data.isExists) {
    error.message = "Email вже зареєстрований";
    return;
  }

  tab.value = TABS.ROLE;
  formData = values;
}

async function sendMail(role) {
  tab.value = TABS.MESSAGE;
  delete formData.repeatpassword;
  const response = await SendVerifyMail({
    ...formData,
    role,
  });
  const { data } = response;

  if (!response.success) {
    init({ message: response.error, position: "top-right", color: "danger" });
    return;
  }
  isLoading.value = false;
  router.push(`/verify/${data}`);
}
</script>
<template>
  <div class="wrap">
    <div class="login-block" v-if="tab === TABS.LOGIN">
      <h2>Реєстрація</h2>
      <Form @submit="onSubmit" :validation-schema="schema" class="form">
        <Field
          type="email"
          name="email"
          class="default-input"
          placeholder="Email"
        ></Field>
        <ErrorMessage name="email" class="error" />

        <Field type="text" name="name" class="default-input" placeholder="Ім'я">
        </Field>
        <ErrorMessage name="name" class="error" />

        <Field
          type="text"
          name="lastname"
          class="default-input"
          placeholder="Прізвище"
        ></Field>
        <ErrorMessage name="lastname" class="error" />

        <Field
          type="password"
          name="password"
          class="default-input"
          placeholder="Пароль"
        ></Field>
        <ErrorMessage name="password" class="error" />

        <Field
          type="password"
          name="repeatpassword"
          class="default-input"
          placeholder="Повторіть пароль"
        >
        </Field>
        <ErrorMessage name="repeatpassword" class="error" />
        <span class="error">{{ error.message }}</span>
        <va-button type="submit">Реєстрація</va-button>
      </Form>
      <div class="links">
        <router-link :to="{ name: 'login' }" class="link">Вхід</router-link>
      </div>
    </div>
    <div v-if="tab === TABS.ROLE" class="change-role">
      <h2>Оберіть тип аккаунту</h2>
      <div class="chose-role">
        <va-button color="warning" @click="sendMail(ROLE.STUDENT)"
          >Учень</va-button
        >
        <va-button color="danger" @click="sendMail(ROLE.TEACHER)"
          >Вчитель</va-button
        >
      </div>
    </div>
    <div v-if="tab === TABS.MESSAGE">
      <va-inner-loading :loading="isLoading">
        <div>
          <va-card v-if="!isLoading">
            <va-card-content
              >На вказаний email було відправлено посилання для
              підтвердження</va-card-content
            >
          </va-card>
        </div>
      </va-inner-loading>
    </div>
  </div>
</template>
<style src="../styles/Login.css" scoped></style>
