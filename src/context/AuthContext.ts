import { createContext } from "react";

export const AuthCtx = createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {},
});
