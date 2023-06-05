import { ReadStorage, ClearStorage } from "./Storage";
import axios from "../axios";

export function GetUserInfo() {
  try {
    return JSON.parse(ReadStorage("userData"));
  } catch {
    return null;
  }
}

export function GetUserToken() {
  return ReadStorage("token");
}

export function Logout() {
  ClearStorage();
}

export async function fetchUserInfo(id) {
  try {
    const response = await axios.get(`/user/${id}`);
    return response.data;
  } catch {
    return null;
  }
}
