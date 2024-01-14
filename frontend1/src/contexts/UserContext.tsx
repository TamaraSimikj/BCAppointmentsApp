import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AuthService from "../services/auth.service";
import { User } from "../data/models/Models";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUser: () => void; // Function to update user
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedUser = AuthService.getCurrentUser();
      setUser(loggedUser);
    };

    fetchUser();
  }, []);

  // Function to update user
  const updateUser = () => {
    const loggedUser = AuthService.getCurrentUser();
    setUser(loggedUser);
  };

  return <UserContext.Provider value={{ user, setUser, updateUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
