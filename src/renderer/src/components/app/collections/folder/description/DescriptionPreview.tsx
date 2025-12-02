import { memo } from "react";
import MarkdownPreview from "@/components/markdown-preview";
import { useRequestFolder } from "@/context/collections/folder/FolderProvider";

const DescriptionPreview = memo(() => {
  const { folderDescription } = useRequestFolder();

  return (
    <MarkdownPreview
      code={folderDescription}
      className="w-full h-full min-h-96 p-3 overflow-hidden border rounded-md"
    />
  );
});

export default DescriptionPreview;
