import { Button } from "@/components/ui/button";
import { GripVertical as GripVerticalIcon } from "lucide-react";
import type { DragControls } from "motion/react";

interface Props {
  controls: DragControls;
}

const TokenDragHandler = ({ controls }: Props) => {
  return (
    <Button
      variant="secondary"
      className="rounded-r-none h-full cursor-grab"
      onPointerDown={(e) => controls.start(e)}
    >
      <GripVerticalIcon />
    </Button>
  );
};

export default TokenDragHandler;
