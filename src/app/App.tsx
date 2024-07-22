import { ImageColorPicker } from "@/components/ImageColorPicker/ImageColorPicker";

// The window resize is not handled
export const App = () => (
  <ImageColorPicker
    width={window.innerWidth - 300}
    height={window.innerHeight - 300}
  />
);
