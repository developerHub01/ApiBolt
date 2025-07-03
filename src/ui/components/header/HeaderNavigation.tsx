import { memo, useMemo, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { isElectron } from "@/utils/electron";
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderNavigation = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => navigate(-1);
  const handleGoForward = () => navigate(1);

  const canGoBack = useMemo(() => location.key !== "default", [location.key]);
  const canGoForward = useMemo(
    () => window.history.state?.idx < window.history.length - 1,
    []
  );

  return (
    <div
      className="flex items-center gap-2"
      style={{
        ...(isElectron()
          ? ({
              appRegion: "no-drag",
            } as CSSProperties)
          : {}),
      }}
    >
      <Button
        variant={"ghost"}
        size="iconSm"
        onClick={handleGoBack}
        disabled={!canGoBack}
      >
        <LeftIcon />
      </Button>
      <Button
        variant={"ghost"}
        size="iconSm"
        onClick={handleGoForward}
        disabled={!canGoForward}
      >
        <RightIcon />
      </Button>
    </div>
  );
});

export default HeaderNavigation;
