const ProjectNotFound = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center text-center p-5 min-h-52">
      <h4 className="text-xl">Not Found</h4>
      <p className="text-muted-foreground text-sm">No projects found</p>
    </div>
  );
};

export default ProjectNotFound;
