<template>
  <div>
    <va-list>
      <va-list-item
        class="list__item"
        v-for="(user, index) in users"
        :key="index"
      >
        <va-list-item-section avatar>
          <va-avatar> {{ user.name.substr(0, 1) }} </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            {{ user.name }} {{ user.surname }}
          </va-list-item-label>

          <va-list-item-label caption>
            {{ user.email }}
          </va-list-item-label>
        </va-list-item-section>
      </va-list-item>
    </va-list>
    <div v-if="users.length == 0" class="noMembers">Немає учасників</div>
  </div>
</template>
<script>
export default {
  name: "UsersTable",
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style>
.noMembers {
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: gray;
}
.list__item {
  margin-top: 10px;
}
</style>
