import LoginPage from "../pages/LoginPage.vue";
import StartPage from "../pages/StartPage.vue";
import { ReadStorage } from "../api/Storage.js";
import SigninPage from "../pages/SigninPage.vue";
import VerifyPage from "../pages/VerifyPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { GetUserInfo } from "../api/User.js";
import { ROLE } from "@/types";
import StudentWrap from "../pages/student/StudentWrap.vue";
import StudentMainPage from "../pages/student/MainPage.vue";
import TeacherWrap from "../pages/teacher/TeacherWrap.vue";
import TeacherMainPage from "../pages/teacher/MainPage.vue";
import TimeTable from "../pages/student/TimeTable.vue";
import StudentCourses from "../pages/student/Courses.vue";
import TeacherCourses from "../pages/teacher/CoursesPage.vue";
import TeacherCourse from "../pages/teacher/CoursePage.vue";
import JoinCourse from "../pages/student/JoinCourse.vue";
import StudentCourse from "../pages/student/StudentCourse.vue";
import TaskPage from "../pages/student/TaskPage.vue";
import TeacherTaskPage from "../pages/teacher/TaskPage.vue";
import AnswerPage from "../pages/teacher/AnswerPage.vue";

const routes = [
  {
    path: "/",
    name: "StartPage",
    component: StartPage,
  },
  {
    path: "/app",
    name: "AppWrap",
  },
  {
    path: "/app/teacher",
    name: "Teacher",
    component: TeacherWrap,
    children: [
      {
        path: "dashboard",
        component: TeacherMainPage,
        name: "Teacher.dashboard",
      },
      {
        path: "courses",
        component: TeacherCourses,
        name: "Teacher.courses",
        children: [
          {
            path: ":courseID",
            component: TeacherCourse,
            name: "Teacher.course",
          },
        ],
      },
      {
        path: "messages",
        component: StudentCourses,
        name: "Teacher.messages",
      },
      {
        path: "profile",
        component: StudentCourses,
        name: "Teacher.profile",
      },
      {
        path: "task/:taskID",
        component: TeacherTaskPage,
        name: "Teacher.task",
      },
      {
        name: "Teacher.answer",
        component: AnswerPage,
        path: "answer/:answerID",
      },
    ],
  },
  {
    path: "/app/student",
    name: "Student",
    component: StudentWrap,
    children: [
      {
        path: "dashboard",
        component: StudentMainPage,
        name: "Student.dashboard",
      },
      {
        path: "courses",
        component: StudentCourses,
        name: "Student.courses",
        children: [
          {
            path: ":courseID",
            component: StudentCourse,
            name: "Student.course",
          },
        ],
      },
      {
        path: "messages",
        component: StudentCourses,
        name: "Student.messages",
      },
      {
        path: "profile",
        component: StudentCourses,
        name: "Student.profile",
      },
      {
        path: "join/:courseID",
        component: JoinCourse,
        name: "Student.join",
      },
      {
        path: "task/:taskID",
        component: TaskPage,
        name: "Student.task",
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SigninPage,
  },
  {
    path: "/verify/:key",
    name: "verify",
    component: VerifyPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "nav-item__active",
});

const UNLOGED_PAGES = ["login", "signup", "verify", "StartPage"];

router.beforeEach((to, from, next) => {
  const token = ReadStorage("token");
  const userInfo = GetUserInfo();
  const role = userInfo?.role;

  const isLoggedIn = token && userInfo && role;

  if (!isLoggedIn && !UNLOGED_PAGES.includes(to.name)) {
    next({ name: "login" });
    return;
  }

  if (to.name === "StartPage") {
    next({ name: "AppWrap" });
    return;
  }

  if (to.fullPath.includes("/app/student") && role !== ROLE.STUDENT) {
    next({ name: "AppWrap" });
    return;
  }

  if (to.fullPath.includes("/app/teacher") && role !== ROLE.TEACHER) {
    next({ name: "AppWrap" });
    return;
  }

  if (to.name === "AppWrap" || to.name === "Teacher" || to.name === "Student") {
    switch (role) {
      case ROLE.STUDENT:
        next({ name: "Student.dashboard" });
        return;
      case ROLE.TEACHER:
        next({ name: "Teacher.dashboard" });
        return;
      default:
        next({ name: "login" });
        return;
    }
  }

  next();
});

export default router;
