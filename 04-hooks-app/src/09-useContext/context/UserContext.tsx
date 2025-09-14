import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { users, type User } from "../data/user-mock.data";

// interface UserContextProps {
//     children: React.ReactNode
// }

type authStatus = "checking" | "autheticated" | "not-authenticated";

interface UserContextProps {
  //State
  authStatus: authStatus;
  user: User | null;
  isAuthenticated: boolean;
  //Methods
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<authStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      handleLogin(Number(storedUserId));
      return;
    }

    handleLogout();
  }, []);

  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      setUser(null);
      setAuthStatus("not-authenticated");
      return false;
    }

    setUser(user);
    setAuthStatus("autheticated");
    localStorage.setItem("user", userId.toString());
    return true;
  };

  const handleLogout = () => {
    setAuthStatus("not-authenticated");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext
      value={{
        authStatus: authStatus,
        user: user,
        isAuthenticated: authStatus === "autheticated",
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
