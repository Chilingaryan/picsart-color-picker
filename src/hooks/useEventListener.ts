import { useEffect } from "react";

export const useEventHandler = <K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (e: DocumentEventMap[K]) => void
) => {
  useEffect(() => {
    document.addEventListener(eventName, handler);
    return () => document.removeEventListener(eventName, handler);
  }, [handler]);
};
