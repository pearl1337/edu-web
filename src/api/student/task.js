import axios from "../../axios";
import { GetUserInfo } from "../User";

export async function get(taskID) {
  try {
    const response = await axios.get(`/task/${taskID}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postAnswer(data) {
  try {
    const formData = new FormData();
    const { sub: userID } = GetUserInfo();

    for (let i = 0; i < data.files.length; i++) {
      formData.append("files[]", data.files[i], data.files[i].name);
    }

    formData.append("taskID", data.taskID);
    formData.append("text", data.text);
    formData.append("studentID", userID);

    const response = await axios.post(`/task/answer/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
