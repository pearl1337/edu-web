import axios from "../../axios";

export async function createCourse(name, authorId) {
  try {
    const response = await axios.post("/course/", {
      name,
      authorId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchCourses(userId) {
  try {
    const response = await axios.get(`/course/teacher/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await axios.delete(`/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTask(name, deadline, courseId) {
  try {
    const response = await axios.post(`/task/`, {
      name,
      deadline,
      courseId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getData(courseId) {
  try {
    const response = await axios.get(`/course/courseInfo/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createAdvert(courseId, text) {
  try {
    const response = await axios.post(`/course/advert`, {
      courseId,
      text,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createMeeting(data) {
  try {
    const response = await axios.post(`/course/meeting`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMeetings() {
  try {
    const response = await axios.get(`/course/meetings`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
