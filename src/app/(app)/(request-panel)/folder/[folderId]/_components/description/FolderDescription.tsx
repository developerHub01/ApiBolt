"use client";

import React, { useState } from "react";
import DescriptionEditor from "@/app/(app)/(request-panel)/folder/[folderId]/_components/description/DescriptionEditor";
import DescriptionPreview from "@/app/(app)/(request-panel)/folder/[folderId]/_components/description/DescriptionPreview";
import { cn } from "@/lib/utils";

const buttonList: Array<{
  id: TTab;
  label: string;
}> = [
  {
    id: "markdown",
    label: "Markdown",
  },
  {
    id: "preview",
    label: "Preview",
  },
];

type TTab = "markdown" | "preview";

const FolderDescription = () => {
  const [activeTab, setActiveTab] = useState<TTab>("markdown");

  const handleChangeTab = (id: TTab) => setActiveTab(id);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex items-center gap-1.5 px-2">
        {buttonList.map(({ id, label }) => (
          <button
            key={id}
            className={cn(
              "border-b-2 px-3 py-1 cursor-pointer hover:bg-accent rounded-t-md",
              {
                "border-b-primary": id === activeTab,
                "border-b-transparent": id !== activeTab,
              }
            )}
            onClick={() => handleChangeTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      {activeTab === "markdown" ? (
        <DescriptionEditor />
      ) : (
        <DescriptionPreview />
      )}
    </div>
  );
};

export default FolderDescription;
