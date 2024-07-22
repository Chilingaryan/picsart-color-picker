import { useState, useEffect, RefObject } from "react";

interface IUseCanvasArgs {
  canvasRef: RefObject<HTMLCanvasElement>;
  height: number;
  width: number;
}

export const useCanvas = ({ canvasRef, height, width }: IUseCanvasArgs) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, [canvasRef, height, width]);

  return context;
};
