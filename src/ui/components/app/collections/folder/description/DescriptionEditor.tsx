import { memo, useCallback, useEffect, useState } from "react";
import Code from "@/components/ui/code";
import { useAppDispatch } from "@/context/redux/hooks";
import { changeFolderContent } from "@/context/redux/request-response/request-response-thunk";

interface DescriptionEditorProps {
  content: string;
}

const DescriptionEditor = memo(({ content = "" }: DescriptionEditorProps) => {
  const dispatch = useAppDispatch();
  const [descriptionState, setDescriptionState] = useState<string>(content);

  useEffect(() => {
    setDescriptionState(content);
  }, [content]);

  const handleChange = useCallback((value: string) => {
    setDescriptionState(value);
  }, []);

  const handleBlur = useCallback(() => {
    dispatch(
      changeFolderContent({
        type: "description",
        value: descriptionState,
      })
    );
  }, [descriptionState, dispatch]);

  return (
    <Code
      contentType="markdown"
      code={descriptionState}
      onChange={handleChange}
      onBlur={handleBlur}
      fontSize={18}
      lineWrap={true}
      zoomable={true}
      className="h-full pr-1 static"
      beforeComp={<div className="w-full h-6 bg-accent/50" />}
    />
  );
});

export default DescriptionEditor;
