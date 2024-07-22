import React from "react";

import * as S from "./styles";
import img from "@/assets/01.jpg";
import { useImageColorPicker } from "./useImageColorPicker";
import ColorPickerIcon from "@/assets/IconColorPicker.svg?react";

interface IImageColorPickerProps {
  width: number;
  height: number;
}

export const ImageColorPicker: React.FC<IImageColorPickerProps> = ({
  width,
  height,
}) => {
  const {
    canvasRef,
    dropletRef,
    dropletImgRef,
    colorCodeRef,
    isDropperSelected,
    onDropperToggle,
    onDropperColorCopy,
  } = useImageColorPicker({
    src: img,
    width,
    height,
  });

  return (
    <S.ImageColorPickerWrapper>
      <S.ImageColorPicker>
        <S.Canvas ref={canvasRef} width={width} height={height} />
        <S.Droplet
          ref={dropletRef}
          onClick={onDropperColorCopy}
          $isDropperSelected={isDropperSelected}
        >
          <S.DropletImg ref={dropletImgRef} src={img} alt="Droplet" />
          <S.ColorCode ref={colorCodeRef} />
        </S.Droplet>
      </S.ImageColorPicker>
      <S.ColorPickerWrapper onClick={onDropperToggle}>
        {!isDropperSelected && <ColorPickerIcon />}
      </S.ColorPickerWrapper>
    </S.ImageColorPickerWrapper>
  );
};
