import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
} from "lucide-react";
import React from "react";

const requestList = Array(15)
  .fill(0)
  .map((_, index) => `Request ${index + 1}`);

const Topbar = () => {
  return (
    <div className="w-full flex items-center gap-1">
      <Button size={"iconSm"}>
        <LeftIcon />
      </Button>
      <ScrollArea className="grow w-full">
        <div className="w-full flex gap-1">
          {requestList.map((request) => (
            <Button key={request} size={"sm"}>
              {request}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Button size={"iconSm"}>
        <RightIcon />
      </Button>
    </div>
  );
};

export default Topbar;
