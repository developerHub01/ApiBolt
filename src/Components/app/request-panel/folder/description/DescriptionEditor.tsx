import { useCallback, useEffect, useState } from "react";
import { useFolder } from "@/context/folder/FolderProvider";
import Code from "@/components/ui/code";

const DescriptionEditor = () => {
  const { description, handleChangeDescription } = useFolder();
  const [descriptionState, setDescriptionState] = useState<string>("");

  useEffect(() => {
    setDescriptionState(description);
  }, [description]);

  const handleChange = useCallback((value: string) => {
    setDescriptionState(value);
  }, []);

  const handleBlur = useCallback(() => {
    handleChangeDescription(descriptionState);
  }, [descriptionState, handleChangeDescription]);

  return (
    <div className="w-full h-full min-h-80 md:min-h-96 border rounded-lg overflow-hidden">
      <Code
        contentType="markdown"
        code={descriptionState}
        onChange={handleChange}
        onBlur={handleBlur}
        fontSize={18}
        lineWrap={true}
        zoomable={true}
        lineNumbers={false}
        foldLine={false}
        className="p-3 h-full pt-4"
      />
    </div>
  );
};

export default DescriptionEditor;
