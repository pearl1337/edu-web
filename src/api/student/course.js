import axios from "../../axios";

export async function join(courseID) {
  try {
    const response = await axios.patch("/course/join", {
      courseID,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCourses() {
  try {
    const response = await axios.get("/course/student/courses");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMeetings() {
  try {
    const response = await axios.get("/course/student/meetings");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
