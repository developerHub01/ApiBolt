import { memo } from "react";
import Code from "@/components/ui/code";
import { useRequestFolder } from "@/context/collections/folder/FolderProvider";

const DescriptionEditor = memo(() => {
  const {
    folderDescription,
    handleChangeDescription,
    handleBlurDescription,
    handleLineWrap,
    isLineWrap,
  } = useRequestFolder();

  if (folderDescription === null) return null;

  return (
    <Code
      contentType="markdown"
      code={folderDescription}
      onChange={handleChangeDescription}
      onBlur={handleBlurDescription}
      fontSize={18}
      lineWrap={isLineWrap}
      zoomable={true}
      handleLineWrap={handleLineWrap}
      className="h-full pr-1 static"
      placeholder="Start typing here..."
    />
  );
});

export default DescriptionEditor;
