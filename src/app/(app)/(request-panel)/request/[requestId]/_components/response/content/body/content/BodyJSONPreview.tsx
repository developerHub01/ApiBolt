import React from "react";

interface BodyJSONPreviewProps {
  data: Record<string, unknown>;
}

const BodyJSONPreview = ({ data }: BodyJSONPreviewProps) => {
  console.log({ data });

  return <div>BodyJSONPreview</div>;
};

export default BodyJSONPreview;
