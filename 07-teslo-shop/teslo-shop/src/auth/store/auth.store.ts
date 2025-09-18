import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { authRegisterAction } from "../actions/authRegister.action";

// type Store = {
//   count: number;
//   inc: () => void;
//   decrement: ()=> void
//   incBy: (value:number)=> void
// };

type AuthStatus = "authenticated" | "no-authenticated" | "checking";

type AuthState = {
  //properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  //getters
  isAdmin: () => boolean;

  //actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  authRegister: ( name: string, email:string, password: string,)=>Promise<boolean>
};

// export const useCounterStore = create<Store>()((set) => ({
//   count: 100,
//   inc: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   incBy: (value:number) => set((state) =>({count: state.count + value}))
// }));

export const useAuthStore = create<AuthState>()((set, get) => ({
  //properties
  user: null,
  token: null,
  authStatus: "checking",

  //getters
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
  },

  //actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      console.error(error);
      set({ user: null, token: null, authStatus: "no-authenticated" });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "no-authenticated" });
  },
  authRegister: async( name:string, email: string, password:string, )=> {
    try {
      const { token } = await authRegisterAction({name, email, password})
      localStorage.setItem('token', token )
      return true
    } catch (error) {
      console.error(error)
      set({user:null, token: null, authStatus: 'no-authenticated'})
      return false
    }
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user, token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      console.error(error);
      set({
        user: undefined,
        token: undefined,
        authStatus: "no-authenticated",
      });
      return false;
    }
  },
}));
