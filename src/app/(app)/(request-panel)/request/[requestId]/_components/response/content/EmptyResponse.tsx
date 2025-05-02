import React from "react";
import Empty from "@/components/Empty";

const EmptyResponse = () => {
  return <div className="w-full h-full p-2.5 pt-0">
    <Empty label="Click send to get a response"></Empty>
  </div>;
};

export default EmptyResponse;
