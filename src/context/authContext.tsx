import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "../models/user";
import { loginUser } from "../services/login";
import { logoutUser } from "../services/logout";

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: { id: undefined, username: "", email: "" },
  login: async (inputs) => {},
  logout: async () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = localStorage.getItem("user");
      if (user) setCurrentUser(JSON.parse(user));
    }
  }, []);

  const login = async (inputs: any) => {
    setCurrentUser(await loginUser(inputs));
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
