<script>
import UserLabel from "./UserLabel.vue";
export default {
  components: {
    UserLabel,
  },
};
</script>
<template>
  <header class="header">
    <div class="header__content">
      <UserLabel />
      <button class="light-button">Створити курс</button>
      <button class="light-button">Запланувати заняття</button>
    </div>
  </header>
</template>
<style src="../styles/Header.css" scoped></style>
