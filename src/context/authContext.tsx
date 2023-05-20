import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

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
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
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
