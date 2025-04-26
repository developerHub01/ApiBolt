import React from "react";
import ThemeToggle from "@/app/(app)/_components/sidebar/ThemeToggle";
import Logo from "@/app/(app)/_components/sidebar/Logo";

const Sidebar = () => {
  return (
    <div className="max-w-14 bg-background border-r-2 py-2.5 px-2 flex flex-col gap-2.5">
      <Logo />
      <ThemeToggle />
    </div>
  );
};

export default Sidebar;
