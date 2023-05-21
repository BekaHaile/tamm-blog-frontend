import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "../models/user";
import { loginUser } from "../services/login";
import { logoutUser } from "../services/logout";

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: any) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async (inputs) => {},
  logout: async () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if the user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
    }
  }, []);

  const login = async (inputs: any) => {
    // Call the login service to authenticate the user
    const response = await loginUser(inputs);
    setCurrentUser(response);
  };

  const logout = async () => {
    // Call the logout service to clear the user session
    await logoutUser();
    setCurrentUser(null);
  };

  useEffect(() => {
    // Update the localStorage whenever the currentUser changes
    if (!currentUser) return;

    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    // Provide the authentication context value to the children components
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
