import { Button } from "@/components/ui/button";
import { GripVertical as GripVerticalIcon } from "lucide-react";

const TokenDragHandler = () => {
  return (
    <Button variant="secondary" className="rounded-r-none h-full cursor-grab">
      <GripVerticalIcon />
    </Button>
  );
};

export default TokenDragHandler;
