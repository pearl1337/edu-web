<template>
  <li>
    <div class="list-item">
      <va-icon :name="icon"></va-icon>
      <slot></slot>
    </div>
  </li>
</template>
<script>
export default {
  name: "ListItemIcon",
  props: {
    icon: {
      required: true,
    },
    link: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
};
</script>
<style scoped>
.list-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 8px 2px;
  border-bottom: 1px solid rgb(160, 160, 160);
  color: rgb(131, 131, 131);
}
</style>
