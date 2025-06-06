import { Button } from "@/components/ui/button";
import { Grid2x2 as ProjectsIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ViewAllProjects = () => {
  return (
    <Link to="/" className="w-full">
      <Button
        className="w-full rounded-none border-t justify-start"
        variant={"ghost"}
      >
        <ProjectsIcon /> View All Projects
      </Button>
    </Link>
  );
};

export default ViewAllProjects;
