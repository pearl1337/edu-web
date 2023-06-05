<template>
  <div>
    <QuillEditor v-model="content" />
  </div>
</template>
<script>
export default {
  name: "TextTaskAnswer",
  data() {
    return {
      content: "",
    };
  },
};
</script>
<style>
#editor-container {
  height: 100%;
  /* added these styles */
  flex: 1;
  display: flex;
  flex-direction: column;
}

#editor {
  height: 100%;
  /* added these styles */
  flex: 1;
  overflow-y: auto;
  width: 100%;
}
</style>
