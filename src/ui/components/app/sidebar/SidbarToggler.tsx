import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleToggleSidebar } from "@/context/redux/sidebar/sidebar-slice";

const SidbarToggler = memo(() => {
  const dispath = useAppDispatch();

  const handleClick = useCallback(
    () => dispath(handleToggleSidebar()),
    [dispath]
  );

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleClick}>
      <MenuIcon />
    </Button>
  );
});

SidbarToggler.displayName = "Sidebar toggler";

export default SidbarToggler;
