import { createContext } from "react";

export const EventPromptCtx = createContext({
  isEventPromptVisible: false,
  setIsEventPromptVisible: (auth: boolean) => {},
});
