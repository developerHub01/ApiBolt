import { useState } from "react";

type FullScreenProps = {
  containerRef?: React.RefObject<HTMLDivElement | null>;
};

export const useFullScreen = ({
  containerRef,
}: FullScreenProps | undefined = {}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const target = containerRef?.current || document.documentElement;

    if (!document.fullscreenElement) {
      target
        ?.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error("Failed to enter fullscreen", err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error("Failed to exit fullscreen", err));
    }
  };

  return { isFullscreen, toggleFullscreen };
};
