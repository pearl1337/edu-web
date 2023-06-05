<template>
  <div class="file-item">
    <div class="file-item__name">
      <va-icon name="description" fill="false" color="#FFAC0A " size="large" />
      <span>{{ fileName }}</span>
    </div>
    <div
      class="file-item__action"
      v-if="canDelete"
      @click="$emit('remove', file)"
    >
      <va-icon name="delete" color="rgba(21, 78, 193, 0.7)"></va-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: "FileItem",
  props: {
    file: {
      type: Object,
      required: true,
    },
    canDelete: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    fileName() {
      const name = this.file.name || this.file.originalName;
      if (name.length < 10) {
        return name;
      }
      return `${name.substr(0, 7)}...(${name.split(".").pop()})`;
    },
  },
};
</script>
<style scoped>
.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 5px;
  border: 1px solid rgba(21, 78, 193, 0.1);
  background: rgba(21, 78, 193, 0.1);
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-item__action {
  display: none;
  cursor: pointer;
}
.file-item:hover > .file-item__action {
  display: block;
}
.file-item__name {
  display: flex;
  gap: 6px;
  align-items: center;
}
.file-item span {
  font-weight: 700;
}
</style>
