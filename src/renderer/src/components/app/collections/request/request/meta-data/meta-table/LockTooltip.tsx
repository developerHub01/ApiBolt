import { memo } from "react";
import { Lock as LockIcon } from "lucide-react";

const LockTooltip = memo(() => {
  return (
    <span className="aspect-square rounded-full grid place-items-center p-1.5 bg-accent/50 hover:bg-accent">
      <LockIcon size={14} />
    </span>
  );
});

export default LockTooltip;
