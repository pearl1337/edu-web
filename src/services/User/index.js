import axios from "../../axios/";
import { WriteStorage } from "@/api/Storage";

export async function IsEmailExists(email) {
  try {
    const response = await axios.get("/auth/exists", {
      params: {
        email,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
}

export async function SendVerifyMail(payload) {
  try {
    const response = await axios.post("/auth/singup", {
      email: payload.email,
      name: payload.name,
      surname: payload.lastname,
      role: payload.role,
      password: payload.password,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function VerifyUser(key) {
  try {
    const response = await axios.get("/auth/verify/" + key);

    WriteStorage("token", response.data.access_token);
    WriteStorage("userData", response.data.payload);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function login(login, password) {
  try {
    const response = await axios.post("/auth/signin", {
      email: login,
      password,
    });

    WriteStorage("token", response.data.access_token);
    WriteStorage("userData", response.data.payload);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}
