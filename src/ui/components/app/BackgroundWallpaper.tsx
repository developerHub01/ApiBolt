import { memo, useEffect, useState } from "react";
import useCheckApplyingBackground from "@/hooks/setting/use-check-applying-background";

const SLIDE_INTERVAL = 5000;

const BackgroundWallpaper = () => {
  const backgroundSettings = useCheckApplyingBackground();

  const {
    backgroundImages = [],
    backgroundOpacity = 1,
    backgroundBlur = 0,
  } = backgroundSettings || {};

  if (
    !backgroundSettings ||
    !Array.isArray(backgroundSettings.backgroundImages)
  )
    return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-background z-0 pointer-events-none transition-opacity duration-1000 ease-in-out overflow-hidden">
        <BackgroundImageSlider list={backgroundImages} blur={backgroundBlur} />
      </div>
      <span
        className="absolute top-0 left-0 w-full h-full bg-background z-[1] pointer-events-none"
        style={{
          opacity: backgroundOpacity,
        }}
      />
    </div>
  );
};

interface BackgroundImageSliderProps {
  list: string[];
  blur?: number;
}
const BackgroundImageSlider = memo(
  ({ list, blur = 0 }: BackgroundImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const imagesLength = list.length;

    useEffect(() => {
      if (imagesLength === 0) return;

      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imagesLength);
      }, SLIDE_INTERVAL);

      return () => clearInterval(interval);
    }, [imagesLength]);

    return (
      <>
        {list.map((bg, index) => (
          <img
            key={index}
            src={bg}
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              filter: `blur(${blur}px)`,
            }}
            loading="lazy"
          />
        ))}
      </>
    );
  }
);

export default BackgroundWallpaper;
