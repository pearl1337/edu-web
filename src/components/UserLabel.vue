<script>
export default {
  name: "UserLabel",
  props: {
    name: {
      required: true,
    },
    surname: {
      required: true,
    },
  },
};
</script>
<template>
  <div class="label-body">
    <va-avatar>{{ name.substr(0, 1) }}</va-avatar>
    <div class="label-user-name">
      <span>{{ name }}</span>
      <span>{{ surname }}</span>
    </div>
  </div>
</template>
<style scoped>
.label-body {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
}
.label-user-name {
  display: flex;
  gap: 5px;
}
</style>
