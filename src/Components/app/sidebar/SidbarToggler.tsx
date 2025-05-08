import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";

const SidbarToggler = memo(() => {
  const { handleToggleSidebar } = useSidebar();

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleToggleSidebar}>
      <MenuIcon />
    </Button>
  );
});

SidbarToggler.displayName = "Sidebar toggler";

export default SidbarToggler;
