import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

interface Options {
  name: string;
  password: string;
  email: string;
}

export const authRegisterAction = async (
  {name, email, password}: Options
): Promise<AuthResponse> => {
  
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/register", {
      fullName: name,
      email: email,
      password: password,
    });

    return data;

  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    throw error;
  }
};
