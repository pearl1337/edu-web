import axios from "../../axios";

export async function get(taskID) {
  try {
    const response = await axios.get(`/task/${taskID}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAnswer(answerID) {
  try {
    const response = await axios.get(`/task/answer/${answerID}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function setMark(answerID, mark) {
  try {
    const response = await axios.patch(`/task/answer/mark`, {
      answerID,
      mark,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
