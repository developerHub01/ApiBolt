import { memo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Copy as CopyIcon } from "lucide-react";
import CopyButton from "@/components/ui/copy-button";
import { toast } from "sonner";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { Input } from "@/components/ui/input";

interface Props {
  path?: string | null;
}

const SettingBackgroundImagesFolderPath = memo(({ path = "" }: Props) => {
  const inuptRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFileExplorer = async () => {
    const success = await window.electronFileSystem.openFolder(path!);
    if (!success) toast.warning("Failed to open folder.");
  };

  const handleFocus = () => inuptRef.current?.select();

  const handleBlur = () => window.getSelection()?.removeAllRanges();

  if (!path?.trim()) return null;

  return (
    <div className="w-full flex gap-2 py-2 rounded-md">
      <ButtonLikeDiv variant={"secondary"} className="flex-1 px-0 py-0">
        <Input
          ref={inuptRef}
          readOnly
          value={path}
          placeholder="Selected Folder"
          className="w-full h-full outline-0 border-none py-1 bg-transparent focus-visible:ring-0"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </ButtonLikeDiv>
      <Button variant={"secondary"} onClick={handleOpenFileExplorer}>
        Open in explorer
      </Button>
      <CopyButton
        value={path}
        label="Copy folder path"
        align="end"
        Icon={CopyIcon}
      />
    </div>
  );
});

export default SettingBackgroundImagesFolderPath;
