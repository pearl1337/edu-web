<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { reactive } from "vue";
import { login } from "../services/User/index";
import { useRouter } from "vue-router";

const router = useRouter();

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

const error = reactive({ message: "" });

async function onSubmit(values) {
  const response = await login(values.email.trim(), values.password.trim());
  console.log(response);

  if (!response.success) {
    error.message = "Неправильний email або пароль";
  } else {
    router.push({ name: "AppWrap" });
  }
}
</script>
<template>
  <div class="wrap">
    <div class="login-block">
      <h2>Логін</h2>
      <Form @submit="onSubmit" :validation-schema="schema" class="form">
        <Field
          type="email"
          name="email"
          class="default-input"
          placeholder="Email"
        ></Field>
        <ErrorMessage name="email" class="error" />
        <Field
          type="password"
          name="password"
          class="default-input"
          placeholder="Пароль"
        ></Field>
        <ErrorMessage name="password" class="error" />
        <span class="error">{{ error.message }}</span>
        <va-button type="submit">Увійти</va-button>
      </Form>
      <div class="links">
        <router-link :to="{ name: 'signup' }" class="link"
          >Реєстрація</router-link
        >
      </div>
    </div>
  </div>
</template>
<style src="../styles/Login.css" scoped></style>
