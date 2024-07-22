import {
  useRef,
  useMemo,
  useState,
  RefObject,
  useEffect,
  useCallback,
} from "react";

import { rgbaToHex } from "@/utils";
import { useEventHandler } from "@/hooks/useEventListener";

interface IUseDropletArgs {
  src: string;
  ctx: CanvasRenderingContext2D | null;
  dropletRef: RefObject<HTMLElement>;
  dropletImgRef: RefObject<HTMLElement>;
  colorCodeRef: RefObject<HTMLElement>;
}

export const useDropletRenderer = ({
  ctx,
  src,
  colorCodeRef,
  dropletRef,
  dropletImgRef,
}: IUseDropletArgs) => {
  const size = 100;
  const offset = useRef({ x: 0, y: 0 });

  const { left, top } = useMemo(() => {
    if (!ctx) {
      return { left: 0, top: 0 };
    }

    return ctx.canvas.getBoundingClientRect();
  }, [ctx]);

  const updateColorCode = useCallback(
    (imageData: Uint8ClampedArray) => {
      if (!colorCodeRef.current) return;
      const [r, g, b, a] = imageData;
      colorCodeRef.current.innerText = rgbaToHex([r, g, b, a]);
    },
    [colorCodeRef]
  );

  const updateDroplet = useCallback(
    (x: number, y: number, imageData: Uint8ClampedArray) => {
      if (!dropletRef.current) return;
      const [r, g, b, a] = imageData;
      dropletRef.current.style.borderColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      dropletRef.current.style.left = `${x - size}px`;
      dropletRef.current.style.top = `${y - size}px`;
    },
    [dropletRef]
  );

  const updateDropletImg = useCallback(
    (x: number, y: number) => {
      if (!ctx || !dropletImgRef.current) return;
      const { canvas } = ctx;
      const xOffset = canvas.width / 2 - x + offset.current.x;
      const yOffset = canvas.height / 2 - y + offset.current.y;
      dropletImgRef.current.style.maxWidth = `${canvas.width}px`;
      dropletImgRef.current.style.minWidth = `${canvas.width}px`;
      dropletImgRef.current.style.maxHeight = `${canvas.height}px`;
      dropletImgRef.current.style.minHeight = `${canvas.height}px`;
      dropletImgRef.current.style.objectPosition = `${xOffset}px ${yOffset}px`;
    },
    [ctx, dropletImgRef]
  );

  const handleMouseMove = useCallback(
    ({ pageX: x, pageY: y }: MouseEvent) => {
      if (dropletRef.current && dropletImgRef.current) {
        requestAnimationFrame(() => {
          if (!ctx) return;

          const realX = x - left;
          const realY = y - top;
          const imageData = ctx.getImageData(realX, realY, size, size).data;

          updateColorCode(imageData);
          updateDroplet(realX, realY, imageData);
          updateDropletImg(realX, realY);
        });
      }
    },
    [
      ctx,
      dropletRef,
      dropletImgRef,
      updateColorCode,
      updateDroplet,
      updateDropletImg,
    ]
  );

  useEventHandler("mousemove", handleMouseMove);

  useEffect(() => {
    if (!ctx) return;
    const image = new Image();
    image.src = src;

    image.onload = () => {
      const { width, height } = ctx.canvas;

      const imageRatio = image.naturalWidth / image.naturalHeight;

      let drawWidth = width;
      let drawHeight = width / imageRatio;

      if (width / height > imageRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
      }

      offset.current.x = (width - drawWidth) / 2;
      offset.current.y = (height - drawHeight) / 2;

      const { x, y } = offset.current;
      ctx.drawImage(image, x, y, drawWidth, drawHeight);
    };
  }, [ctx]);

  const [isDropperSelected, setIsDropperSelected] = useState(false);

  const onDropperToggle = () => {
    setIsDropperSelected(!isDropperSelected);
  };

  const onDropperColorCopy = async () => {
    if (!colorCodeRef.current) return;

    await navigator.clipboard.writeText(colorCodeRef.current.innerText);
    setIsDropperSelected(false);
  };

  return { onDropperToggle, onDropperColorCopy, isDropperSelected };
};
