import React from "react";

const BodyNone = () => {
  return (
    <div className="w-full h-full min-h-14 flex justify-center items-center text-center text-muted-foreground select-none border-2 border-dashed rounded-md">
      This request doesn't have a body
    </div>
  );
};

export default BodyNone;
