import {
  createCourse as create,
  fetchCourses,
  deleteCourse as remove,
} from "@/api/teacher/course";
import { GetUserInfo } from "@/api/User";

export async function createCourse(courseData) {
  try {
    const response = await create(courseData.name, GetUserInfo().sub);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, data: error.message };
  }
}

export async function getTeacherCourses() {
  try {
    const response = await fetchCourses(GetUserInfo().sub);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, data: error.message };
  }
}

export async function deleteCourse(courseID) {
  try {
    const response = await remove(courseID);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, data: error.message };
  }
}
