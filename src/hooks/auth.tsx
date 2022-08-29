import { createContext, ReactNode, useContext } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user: User;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "1",
    name: "Pedro Machado",
    email: "pedro.machado@email.com",
    photo: "https://avatars.githubusercontent.com/u/49461500?v=4",
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
