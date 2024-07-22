import { useRef } from "react";

import { useCanvas } from "./useCanvas";
import { useDropletRenderer } from "./useDropletRenderer";

interface IUseImageColorPickerArgs {
  src: string;
  width: number;
  height: number;
}

export const useImageColorPicker = ({
  src,
  width,
  height,
}: IUseImageColorPickerArgs) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorCodeRef = useRef(null);
  const dropletRef = useRef(null);
  const dropletImgRef = useRef(null);

  const ctx = useCanvas({ canvasRef, height, width });

  const { isDropperSelected, onDropperToggle, onDropperColorCopy } =
    useDropletRenderer({
      ctx,
      src,
      dropletRef,
      dropletImgRef,
      colorCodeRef,
    });

  return {
    canvasRef,
    dropletRef,
    colorCodeRef,
    dropletImgRef,
    isDropperSelected,
    onDropperToggle,
    onDropperColorCopy,
  };
};
