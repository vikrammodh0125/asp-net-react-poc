import { useMemo } from "react";
import { AuthService } from "../services";

export const useMe = () => {
  const authService = useMemo(() => new AuthService(), []);

  const user = authService.getUser();

  return {
    user,
    isLoggedIn: !!user.username,
    isAdmin: user.role === 'admin',
  };
};
