import { memo } from "react";
import Empty from "@/components/ui/empty";
import animationData from "@/assets/lottie/no-data-found.json";

const CONTENT = {
  folder: {
    label: "Folder Not Found",
    description:
      "This folder may have been moved, deleted, or the reference is invalid.",
  },
  request: {
    label: "Request Not Found",
    description:
      "This request may have been moved, deleted, or the reference is invalid.",
  },
};

interface Props {
  type: "request" | "folder";
}

const RequestOrFolderNotFound = memo(({ type }: Props) => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-3">
      <Empty
        label={CONTENT[type].label}
        description={CONTENT[type].description}
        animationData={animationData}
        showFallback
        className="w-full h-full md:max-w-xl md:max-h-[450px]"
      />
    </div>
  );
});

export default RequestOrFolderNotFound;
