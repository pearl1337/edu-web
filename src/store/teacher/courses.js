import { defineStore } from "pinia";

export const useCoursesStore = defineStore("courses", {
  state: () => ({ courses: [], coursesLoading: true }),
  getters: {
    getNewCourses: (state) => {
      if (state.courses.length < 4) {
        return state.courses;
      }

      return state.courses.slice(
        state.courses.length - 4,
        state.courses.length,
      );
    },

    getSortedCourses: (state) => {
      return state.courses.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    },
  },
  actions: {
    setCourses(courses) {
      this.courses = courses;
    },
    setCoursesLoading(loading) {
      this.coursesLoading = loading;
    },
    addCourse(newCourse) {
      this.courses = [...this.courses, newCourse];
    },
  },
});
