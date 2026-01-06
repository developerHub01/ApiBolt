import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TabList from "@/components/app/tab-sidebar/horizontal/TabList";
import TabsModifier from "@/components/app/tab-sidebar/horizontal/TabsModifier";

const TabHorizontalSidebar = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setIsOverflowing(scrollWidth > clientWidth);
    setShowLeftArrow(scrollLeft > 0);
    // Using a small buffer (1px) for precision
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScroll();

    const handleWheel = (e: WheelEvent) => {
      // Only take over if it's a vertical scroll (which we convert to horizontal)
      // or if horizontal scroll is already happening
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY,
          // We use 'auto' here for wheel scrolling to feel responsive/native
          behavior: "auto",
        });
      }
    };

    container.addEventListener("scroll", checkScroll);
    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 200;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "flex items-center border-b-2 divide-x divide-border backdrop-blur-lg",
      )}
    >
      {/* Left Arrow with Gradient */}
      {isOverflowing && (
        <Button
          variant="secondary"
          className="rounded-none"
          size="icon"
          onClick={() => scroll("left")}
          disabled={!showLeftArrow}
        >
          <LeftIcon className="h-4 w-4" />
        </Button>
      )}
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth flex-1"
      >
        <TabList />
      </div>
      {/* Right Arrow with Gradient */}
      {isOverflowing && (
        <Button
          variant="secondary"
          className="rounded-none"
          size="icon"
          onClick={() => scroll("right")}
          disabled={!showRightArrow}
        >
          <RightIcon className="h-4 w-4" />
        </Button>
      )}
      <TabsModifier />
    </div>
  );
};

export default TabHorizontalSidebar;
