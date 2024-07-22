import { useEffect } from "react";

export const useImageLoader = (
  imgSrc: string,
  onLoad: GlobalEventHandlers["onload"]
) => {
  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = onLoad;
  }, [imgSrc, onLoad]);
};
