import React from "react";
import Empty from "@/components/Empty";
import { ScrollArea } from "@/components/ui/scroll-area";

const Cookies = () => {
  return (
    <ScrollArea className="h-full">
      <Empty label="No cookies found" />
    </ScrollArea>
  );
};

export default Cookies;
