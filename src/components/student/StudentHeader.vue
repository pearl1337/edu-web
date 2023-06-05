<script>
import UserLabel from "../UserLabel.vue";
import { GetUserInfo, Logout } from "@/api/User";
export default {
  components: {
    UserLabel,
  },
  computed: {
    userData() {
      return GetUserInfo();
    },
  },
  methods: {
    logout() {
      Logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<template>
  <header class="header">
    <div class="header__content">
      <UserLabel :name="userData.name" :surname="userData.surname" />
      <button class="light-button" @click="logout">Вийти з акаунту</button>
    </div>
  </header>
</template>
<style src="../../styles/Header.css" scoped></style>
