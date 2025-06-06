import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProjectMenuTop = () => {
  return (
    <div className="px-4 py-2 pb-0 space-y-2">
      <input
        type="text"
        placeholder="Search projects"
        className="w-full px-1.5 py-1 outline-none border-muted border focus:ring-2 focus:ring-primary rounded-sm text-sm"
      />
      <Link to="/">
        <Button className="w-full justify-start" size={"sm"}>
          Create New Project
        </Button>
      </Link>
    </div>
  );
};

export default ProjectMenuTop;
