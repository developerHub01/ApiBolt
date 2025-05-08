import MarkdownPreview from "@/components/markdown-preview";
import { useFolder } from "@/context/folder/FolderProvider";

const DescriptionPreview = () => {
  const { description } = useFolder();
  return (
    <MarkdownPreview
      code={description}
      className="w-full h-full min-h-96 p-3 overflow-hidden border rounded-md"
    />
  );
};

export default DescriptionPreview;
