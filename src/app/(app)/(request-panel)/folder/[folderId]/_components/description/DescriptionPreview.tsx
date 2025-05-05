"use client";

import React from "react";
import { useFolder } from "@/app/(app)/(request-panel)/folder/[folderId]/_context/FolderProvider";
import MarkdownPreview from "@/components/MarkdownPreview";

const DescriptionPreview = () => {
  const { description } = useFolder();
  return (
    <MarkdownPreview
      code={description}
      className="w-full h-full min-h-96 p-3 overflow-hidden whitespace-break-spaces border rounded-md"
    />
  );
};

export default DescriptionPreview;
