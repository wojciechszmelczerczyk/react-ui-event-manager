import { createContext } from "react";

export const DeleteDialogCtx = createContext({
  isDialogVisible: false,
  setIsDialogVisible: (auth: boolean) => {},
});
