<script>
import moment from "moment";
export default {
  name: "AdvertItem",
  props: {
    advert: {
      required: true,
    },
  },
  computed: {
    time() {
      return moment(this.advert.createdAt).lang("uk").fromNow();
    },
  },
};
</script>
<template>
  <div class="task-item">
    <div>
      <va-avatar size="small">В</va-avatar>
    </div>
    <div class="taskText">
      <div v-html="advert.content"></div>
      <span>{{ time }}</span>
    </div>
  </div>
</template>
<style src="../../styles/AdvertItem.css" scoped></style>
