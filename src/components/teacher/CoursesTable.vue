<script>
export default {
  name: "CoursesTable",
  props: {
    courses: {
      required: true,
    },
  },
};
</script>
<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--striped">
      <thead>
        <tr>
          <th>Назва</th>
          <th>Учасники</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="course in courses"
          :key="course.id"
          class="courses-table-row"
          @click="
            $router.push({
              name: 'Teacher.course',
              params: { courseID: course.id },
            })
          "
        >
          <td>{{ course.name }}</td>
          <td>{{ course.members.length }}</td>
          <td class="course-action-tr">
            <div class="course-action"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style src="vuestic-ui/styles/reset.css" scoped></style>
<style src="vuestic-ui/styles/typography.css" scoped></style>
<style scoped>
.courses-table-row {
  cursor: pointer;
}
.course-action-tr {
  width: 40px;
}
.courses-table-row .course-action {
  display: none;
}
.courses-table-row:hover .course-action {
  display: block;
}
.va-table {
  width: 100%;
}
</style>
