import { memo, useCallback, useEffect, useState } from "react";
import { X as CloseIcon } from "lucide-react";
import useMounted from "@/hooks/use-mounted";
import { Link } from "react-router-dom";

const githubLink = "https://github.com/developerHub01";

const CopyRight = memo(() => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const mounted = useMounted();

  useEffect(() => {
    try {
      setIsVisible(!sessionStorage.getItem("copy-right-hide"));
    } catch {
      // fallback if sessionStorage not available
      setIsVisible(true);
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        sessionStorage.setItem("copy-right-hide", "true");
        setIsVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleClick = useCallback(() => {
    try {
      sessionStorage.setItem("copy-right-hide", "true");
    } catch {
      // Ignoring sessionStorage errors
    }
    setIsVisible(false);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="p-1 pt-1 bg-accent/50 relative">
      <p className="text-center text-xs md:text-sm select-none">
        All rights reserved for
        <Link
          to={githubLink}
          target="_blank"
          className="text-primary underline ml-1"
        >
          Shakil
        </Link>
      </p>
      <button
        onClick={handleClick}
        className="absolute top-1/2 right-1.5 -translate-y-1/2 p-0.5 cursor-pointer aspect-square rounded-full hover:bg-accent-foreground/20 transition-all duration-100"
      >
        <CloseIcon size={16} />
      </button>
    </div>
  );
});

CopyRight.displayName = "Copyright bar";

export default CopyRight;
