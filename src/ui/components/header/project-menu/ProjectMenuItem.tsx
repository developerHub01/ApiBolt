import { memo } from "react";
import { Button } from "@/components/ui/button";

interface ProjectMenuItemProps {
  value: string;
  label: string;
  activeValue: string | null;
  onChange: (value: string) => void;
}

const ProjectMenuItem = memo(
  ({ value, label, activeValue, onChange }: ProjectMenuItemProps) => {
    return (
      <Button
        className="w-full rounded-none justify-start"
        variant={value === activeValue ? "secondary" : "ghost"}
        key={value}
        onClick={() => onChange(value)}
      >
        {label}
      </Button>
    );
  }
);

export default ProjectMenuItem;
