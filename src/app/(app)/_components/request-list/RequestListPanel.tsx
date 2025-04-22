import React from "react";
import ListTopAction from "@/app/(app)/_components/request-list/_components/ListTopAction";

const RequestListPanel = () => {
  console.log("RequestListPanel============");
  return (
    <div className="flex flex-col h-full">
      <ListTopAction />
      <span className="font-semibold">RequestListPanel</span>
    </div>
  );
};

export default RequestListPanel;
