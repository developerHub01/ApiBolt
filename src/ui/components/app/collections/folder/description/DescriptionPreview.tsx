import { memo } from "react";
import MarkdownPreview from "@/components/markdown-preview";

interface DescriptionPreviewProps {
  content: string;
}

const DescriptionPreview = memo(({ content = "" }: DescriptionPreviewProps) => {
  return (
    <MarkdownPreview
      code={content}
      className="w-full h-full min-h-96 p-3 overflow-hidden border rounded-md"
    />
  );
});

export default DescriptionPreview;
